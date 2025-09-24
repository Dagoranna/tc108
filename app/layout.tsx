"use client";

import "./globals.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

type MyProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: MyProps) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
