import { ChildrenProps } from "@/types";
import React from "react";

export const ErrorMessage = ({ children }: ChildrenProps) => {
  return <p className="text-xs text-red-500 ml-2">{children}</p>;
};
