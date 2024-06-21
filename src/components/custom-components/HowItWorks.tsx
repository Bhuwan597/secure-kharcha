import React from "react";
import { PlusCircle, List, Send, CheckCircle } from "lucide-react";
import ContainerSection from "../partials/ContainerSection";
import MappingContainer from "../partials/MappingContainer";

interface StepInterface {
  title: string;
  description: string;
  Icon: React.ElementType;
  index?: number;
}

const steps: StepInterface[] = [
  {
    title: "Create or Join a Group",
    description:
      "Start by creating a new group for your event or trip, or join an existing group using an invitation link.",
    Icon: PlusCircle,
  },
  {
    title: "Add Expenses",
    description:
      "Easily add and categorize expenses, specifying who paid and who shared in the expense.",
    Icon: List,
  },
  {
    title: "Track in Real-Time",
    description:
      "Keep track of all expenses in real-time, with instant updates and transparent tracking for everyone in the group.",
    Icon: Send,
  },
  {
    title: "Settle Up",
    description:
      "Simplify the settlement process with clear calculations of who owes whom and direct payment integrations.",
    Icon: CheckCircle,
  },
];

const StepCard = ({ title, description, Icon, index }: StepInterface) => {
  return (
    <li className="mb-10 ms-6">
    <span className="absolute flex items-center justify-center bg-light-color dark:bg-dark-color rounded-full -start-3  text-secondary-color">
     <Icon/>
    </span>
    <h3 className="flex items-center mb-1 text-lg font-semibold text-primary-color">
      {title}
      <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
        {index}
      </span>
    </h3>
    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
      {description}
    </p>
  </li>
  );
};

const HowItWorks = () => {
  return (
    <ContainerSection className="py-20 flex flex-col gap-10">
     <h2 className="text-secondary-color text-2xl font-bold text-center">How it works?</h2>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {steps.map((step, index) => (
          <div key={index}>
            <StepCard
              title={step.title}
              description={step.description}
              Icon={step.Icon}
              index={index+1}
            />
          </div>
        ))}
      </ol>
    </ContainerSection>
  );
};

export default HowItWorks;
