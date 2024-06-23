import React from "react";

const MappingContainer = ({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  return <div key={index}>{children}</div>;
};

export default MappingContainer;
