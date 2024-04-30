"use client";
import { theme } from "@/app/theme";
import store, { persistor } from "@/store/store";
import { ThemeProvider } from "@mui/material";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <NextUIProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </NextUIProvider>
    </ThemeProvider>
  );
}
