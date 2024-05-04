import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import ContextProviders from "./context/ContextProviders.tsx";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ContextProviders>
          <App />
        </ContextProviders>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
