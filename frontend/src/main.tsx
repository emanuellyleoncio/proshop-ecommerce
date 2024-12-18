import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);