import React from "react";
import ContainerSection from "../partials/ContainerSection";
import { CheckCircle, CreditCard, DollarSign, Home, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface FeatureInterface{
    title: string;
    description: string;
    Icon: React.ElementType
}

const features : FeatureInterface[] = [
  {
    title: "Secure Expense Tracking",
    description:
      "Easily track, categorize, and manage your expenses with real-time updates and secure data encryption.",
    Icon: DollarSign
  },
  {
    title: "Group Management",
    description:
      "Create and manage groups for different events or trips, invite participants, and keep everyone updated with shared expenses.",
    Icon: Users
  },
  {
    title: "Easy Settlements",
    description:
      "Effortlessly calculate balances and simplify the settlement process with clear tracking and direct payment integrations.",
    Icon: CheckCircle
  },
  {
    title: "Payment Gateway Integration",
    description:
      "Integrate with popular payment gateways to facilitate direct payments and settlements within the app.",
    Icon: CreditCard
  },
];

const FeatureCard = ({ title, description, Icon }: FeatureInterface) => (
    <Card className="text-center">
      <CardHeader className="flex flex-col justify-center items-center gap-4">
        <div className="bg-secondary-color text-white p-4 w-fit rounded-[50%]">
        <Icon size={30}  />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-primary-color text-base text-opacity-90">{description}</CardDescription>
      </CardContent>
    </Card>
  );

const Features = () => {
  return <ContainerSection className="flex flex-col gap-10">
    <h2 className="text-primary-color text-2xl font-bold">Features</h2>
     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          Icon={feature.Icon}
        />
      ))}
    </div>
  </ContainerSection>;
};

export default Features;
