import React from "react";

export function SuccessMessage({ message, type = "success", children }: { message?: string; type?: "success" | "error"; children?: React.ReactNode }) {
  const color = type === "success"
    ? "text-green-600 bg-green-50 border-green-200"
    : "text-red-600 bg-red-50 border-red-200";
  return (
    <div className={`border rounded px-4 py-2 my-2 ${color}`}>
      {children ? children : message}
    </div>
  );
}
