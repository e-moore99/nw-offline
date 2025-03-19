"use client";
// import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const registerServiceWorker = async () => {
  //   if ("serviceWorker" in navigator) {
  //     try {
  //       const register = await navigator.serviceWorker.register(
  //         "/service-worker.js",
  //         {
  //           scope: `/`,
  //         }
  //       );
  //       if (register.installing) {
  //         console.log("Service worker installing");
  //       } else if (register.waiting) {
  //         console.log("Service worker installed");
  //       } else if (register.active) {
  //         console.log("Service worker active");
  //       }
  //       console.log("Service worker registered", register);
  //     } catch (error) {
  //       console.error("Service worker registration failed", error);
  //     }
  //   }
  //   // window.addEventListener('load', () => {
  //   //     navigator.serviceWorker.register('/service-worker.js')
  //   //         .then((registration) => {
  //   //             console.log('Service Worker registered with scope:', registration.scope);
  //   //         })
  //   //         .catch((error) => {
  //   //             console.error('Service Worker registration failed:', error);
  //   //         });
  //   // });
  // };
  // registerServiceWorker();
  // useEffect(() => {
  // if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         console.log(
  //           "Service Worker registered successfully:",
  //           registration.scope
  //         );
  //       })
  //       .catch((error) => {
  //         console.log("Service Worker registration failed:", error);
  //       });
  //   });
  // }
  // }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/pokeball.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PokeStore</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
