import { cn } from "@/lib/utils";
import LangLink from "./LangLink";

function Logo({ className }: { className?: string }) {
  return (
    <LangLink href="" className={cn("", className)}>
      <img src="/assets/images/logo.png" alt="logo" className="h-10" />
    </LangLink>
  );
}

export default Logo;
