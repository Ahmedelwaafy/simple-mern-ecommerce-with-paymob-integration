import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18n from "./i18n/index.tsx";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import MainLoader from "./components/LayoutComponents/MainLoader.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Suspense fallback={<MainLoader />}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </Suspense>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} position="left" />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
