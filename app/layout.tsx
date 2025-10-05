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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <StoreProvider>
          <main className="flex flex-col min-h-screen">
            {/* <NavBar /> */}
            {children}
            {/* <Footer /> */}
          </main>
        </StoreProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          theme="colored"
          hideProgressBar={true}
        />
      </body>
    </html>
  );
}
