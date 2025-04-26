import { cn } from "@/lib/utils";
import { IHeadingsProps } from "@/types";

function Heading({ className, children }: IHeadingsProps) {
  return (
    <h1
      className={cn(
        "text-3xl   uppercase font-semibold  text-secondary text-center ",
        className
      )}
    >
      {children}
    </h1>
  );
}

export default Heading;
