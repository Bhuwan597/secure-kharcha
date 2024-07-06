import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { CameraIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { GroupInterface } from "@/types/group.types";
import { uploadImage } from "@/actions/upload_image";
import { toast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/user.context";
import { ConfirmAction } from "../partials/ConfirmAction";
import ButtonLoader from "../partials/ButtonLoader";
import { useGroupSlug } from "@/contexts/group-slug.context";

const UpdateGroupImage = () => {
  const { userDetails } = useAuth();
  const {group, refetch} = useGroupSlug()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (file.size >= 10000000) {
        toast({ title: "Max 10 MB is allowed to upload." });
        setImage(null);
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/HEIC", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast({ title: "Image must be in a valid format (jpeg/png/HEIC/gif)" });
        setImage(null);
        return;
      }
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      try {
        setUploadLoading(true)
        const url = await uploadImage(base64data, group?.name || null);
        mutation.mutate({ url, group: group });
      } catch (error) {
        toast({
          title: "Error uploading image. Please try again.",
        });
      }finally{
        setUploadLoading(false)
      }
    };
  };

  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image, handleUpload]);

  const mutation = useMutation({
    mutationKey: ["group-image-upload", group?._id],
    mutationFn: async ({
      url,
      group,
    }: {
      url?: string | null;
      group?: GroupInterface | null;
    }) => {
      if (!url || !group) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/groups/${group._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userDetails?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ photo: url }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message as string);
      }
      return data as GroupInterface;
    },
    onSuccess: () => {
      toast({
        title: "Successfully updated",
      });
      return refetch();
    },
    onError: (error) => {
      toast({
        title: "Error occured",
        description: error.message,
      });
    },
  });
  if (!group) return;
  return (
    <>
      <div className="absolute bottom-2 right-2 grid w-fit items-center gap-1.5">
        <Label
          htmlFor="picture"
          className="p-2 rounded-lg bg-secondary-color w-fit text-white ring-2 cursor-pointer flex flex-row justify-center items-center gap-2"
        >
          {mutation.isPending || uploadLoading ? (
            <>
              <ButtonLoader />
              <span className="hidden sm:inline">Updating</span>
            </>
          ) : (
            <>
              <CameraIcon size={25} />
              <span className="hidden sm:inline">Update</span>
            </>
          )}
        </Label>
        <Input
          disabled={mutation.isPending || uploadLoading}
          onChange={handleFileChange}
          id="picture"
          type="file"
          className="hidden"
        />
      </div>
    </>
  );
};

export default UpdateGroupImage;
