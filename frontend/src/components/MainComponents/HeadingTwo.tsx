import { cn } from "@/lib/utils";
import { IHeadingsProps } from "@/types";
function HeadingTwo({ className, children, colored = true }: IHeadingsProps) {
  const Text = (children as string)?.split(" ");
  return (
    <h2
      className={cn(
        "text-3xl sm:text-2xl  uppercase font-semibold  text-start sm:text-center",
        className
      )}
    >
      <span
        className={cn(
          `${colored ? "" : ""}`,
          className
        )}
      >
        {Text?.slice(0, 2)?.join(" ")}
      </span>
      <span className={cn("text-secondary", className)}>
        {Text?.slice(2)?.join(" ")}
      </span>
    </h2>
  );
}

export default HeadingTwo;
