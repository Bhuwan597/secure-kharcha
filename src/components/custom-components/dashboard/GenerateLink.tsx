"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Loader2 } from "lucide-react";
import React, { useState } from "react";
import CustomButton from "../CustomButton";

const GenerateLink = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");

  const handleClick = async () => {
    setLoading(true);
    await new Promise(function (myResolve, myReject) {
      setTimeout(function () {
        myResolve("I love You !!");
      }, 3000);
    });
    setLoading(false);
    setContent("https://ui.shadcn.com/docs/installation");
  };
  if (!loading && content) {
    return (
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  return (
    <>
      <CustomButton onClick={handleClick} disabled={loading} className="bg-primary-color">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate Invite Link
      </CustomButton>
    </>
  );
};

export default GenerateLink;
