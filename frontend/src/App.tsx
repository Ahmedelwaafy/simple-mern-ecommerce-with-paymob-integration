import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { setTheme, theme } from "./app/Features/MiscellaneousSlice.tsx";
import { useAppDispatch, useAppSelector } from "./app/reduxHooks.ts";
import { AuthLayout, Layout } from "./components/LayoutComponents";
import ProtectedRoutes from "./components/MainComponents/ProtectedRoutes.tsx";
import UseAuth from "./Hooks/UseAuth.tsx";
import { PrivateRoutes, routes, UserAuthRoutes } from "./Constants/Routes.ts";

function App() {
  const Theme = useAppSelector(theme);
  const { i18n } = useTranslation("");
  const dispatchRedux = useAppDispatch();
  const { UserSession } = UseAuth();
  console.log({ UserSession });
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  //!we use startsWith instead of ==== whereas some languages codes consist of 2 words as en-us but the language in the url always consists of one word
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = lng;
  }, [dispatchRedux, i18n, lng]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (!Theme) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      dispatchRedux(setTheme(systemTheme));
      return;
    }

    root.classList.add(Theme);
  }, [Theme, dispatchRedux]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navigate to={`/${i18n.language?.startsWith("ar") ? "ar" : "en"}`} />
      ),
    },
    {
      path: `/${i18n.language?.startsWith("ar") ? "ar" : "en"}`,
      children: [
        //!-------- Private Pages Layout--------
        {
          element: (
            <ProtectedRoutes
              redirectPath={`/${lng}${routes.signin}`}
              isAllowed={UserSession ? true : false}
            >
              <Layout />{" "}
            </ProtectedRoutes>
          ),
          children: PrivateRoutes,
        },

        //! ------- Auth routes--------
        {
          element: (
            <ProtectedRoutes
              redirectPath={`/${lng}`}
              isAllowed={UserSession ? false : true}
            >
              <AuthLayout />
            </ProtectedRoutes>
          ),
          children: UserAuthRoutes,
        },
      ],
    }, //!NotFound
    {
      path: "*",
      lazy: () => import("./components/MainComponents/NotFound.tsx"),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
