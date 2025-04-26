import { cn } from "@/lib/utils";

function Container({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "max-w-sm mx-auto bg-background min-h-screen shadow-lg relative",
        className
      )}
    >
      {children}
    </section>
  );
}

export default Container;
