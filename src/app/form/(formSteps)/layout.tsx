"use client";

import React from "react";

import { usePathname } from "next/navigation";

const FormLayout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div>
      <h1 className="margin-top-4">{pathname}</h1>
      <div className="margin-top-4">{children}</div>
    </div>
  );
};

export default FormLayout;
