import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import store from "./store";

import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
