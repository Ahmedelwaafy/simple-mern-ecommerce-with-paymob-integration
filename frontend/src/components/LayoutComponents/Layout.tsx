import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";
import Container from "../MainComponents/Container.tsx";
import ErrorBoundaryFallback from "../MainComponents/ErrorBoundaryFallback.tsx";
import useFetchData from "@/Hooks/useFetch/use-fetch-data.tsx";
import { GET_CART } from "@/services/api/queries.ts";
import { Cart } from "@/types/cart.ts";
import SettingsDropdown from "./SettingsDropdown.tsx";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  //call it here, to be sure that the data is requested initially whatever the page opened initially is, if the checkout page is opened initially,and the cart data request is placed in another page, so the cart data will be not in the cache
  const { data: cart } = useFetchData<Cart>(GET_CART, {
    queryOptions: { gcTime: Infinity },
  });
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main>
          <Container>
            <SettingsDropdown />
            <Outlet />
          </Container>
        </main>
      </ErrorBoundary>
    </>
  );
}

export default Layout;
