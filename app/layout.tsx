// app/layout.tsx
import SocketProvider from "@/providers/SocketProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-phone-input-2/lib/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Orex Trade - Your Trusted Investment Partner",
  description:
    "Orex Trade offers investment opportunities in forex, cryptocurrency, and oil & gas sectors. Grow your wealth with expert strategies and reliable solutions.",
  // ✅ এখানে সেট করুন
  themeColor: "#0b1120",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/favicon.ico",
    // optional: apple, shortcut ইত্যাদি চাইলে দিন
    // apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <SocketProvider>
            <main className="flex flex-col min-h-screen">{children}</main>
          </SocketProvider>
        </StoreProvider>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          theme="colored"
          hideProgressBar
        />
      </body>
    </html>
  );
}
