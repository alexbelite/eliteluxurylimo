"use client";
import store, { persistor } from "@/store/store";
import {NextUIProvider} from "@nextui-org/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
export default function Providers({ children }: { children: ReactNode }) {
  const recaptchaKey: string | undefined =
  process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
return(
    <NextUIProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleReCaptchaProvider
          reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}
          language="en"
          container={{
            element: "",
            parameters: {
              badge: 'bottomright',
              theme: 'dark'
            }
          }}
         scriptProps={{
           async: false,
           defer: false,
           appendTo: "head",
           nonce: undefined,
           
         }}
        >
          {children}
        </GoogleReCaptchaProvider>
        </PersistGate>
      </Provider>
    </NextUIProvider>
    )
}