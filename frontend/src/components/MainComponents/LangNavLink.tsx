import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface LangNavLinkProps {
  to: string;
  children: React.ReactNode | string;
  className?: string;
  title?: string;
  replace?: boolean;
  homepage?: boolean;
  end?: boolean;
  style?: object;
}
function LangNavLink({
  to,
  replace,
  children,
  className,
  homepage,
  end,
  style,
}: LangNavLinkProps) {
  const { i18n } = useTranslation();

  const lng = i18n.language?.startsWith("ar") ? "/ar" : "/en";
  return (
    <NavLink
      style={style}
      end={end ? true : false}
      //!if we set the homepage link to "" it will match all routes and take the active style forever and whatever the current url path and if we set it to "/" it may cause error whereas no route called en/ or ar/, and it may work but we don't need to show the / at the end, just /en or / ar so the sol is to make this check for to and end props, whereas end will match exactly the route
      to={homepage ? to : lng + to}
      replace={replace}
      className={className}
    >
      {children}
    </NavLink>
  );
}

export default LangNavLink;
