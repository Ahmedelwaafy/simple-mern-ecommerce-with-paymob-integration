import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRoutesProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

function ProtectedRoutes({
  isAllowed,
  redirectPath,
  children,
}: ProtectedRoutesProps) {
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const redirectTo = redirectPath ? redirectPath : `/${lang}/login`;
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  } else {
    return children ? children : <Outlet />;
  }
}

export default ProtectedRoutes;
