import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import React from "react";
const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
