import { cn } from "@/lib/utils";
import React from "react";

function FieldError({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) {
  if (!error) return;
  return (
    <h6
      className={cn(
        "mt-px text-xs font-light text-destructive animate-in leading-3 ",
        className
      )}
    >
      {error}
    </h6>
  );
}

export default FieldError;
