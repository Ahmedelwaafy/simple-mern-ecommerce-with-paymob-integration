import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface LangLinkProps {
  to?: string;
  children: React.ReactNode | string;
  className?: string;
  id?: string;
  title?: string;
  replace?: boolean;
  state?: string;
  rel?: string;
  target?: string;
  href?: string;
  onClick?: () => void;
  style?: object;
}
function LangLink({
  to = "",
  replace,
  children,
  className,
  id = "",
  title,
  rel,
  target,
  href = "",
  style,
  onClick,
}: LangLinkProps) {
  const { i18n } = useTranslation();
  const lng = i18n.language?.startsWith("ar") ? "/ar" : "/en";
  return (
    <Link
      rel={rel}
      target={target}
      id={id}
      title={title}
      to={to ? lng + to : lng + href}
      replace={replace}
      className={className}
      onClick={onClick}
      style={style}
    >
      {children}
    </Link>
  );
}

export default LangLink;
