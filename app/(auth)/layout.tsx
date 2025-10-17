import { AppSidebar } from "@/components/app-sidebar";
import NotificationBell from "@/components/NotificationBell";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "@/public/logo_1.png";
import localFont from "next/font/local";
import Image from "next/image";
import React from "react";

const josefinSans = localFont({
  src: "../../app/fonts/JosefinSans-Regular.ttf",
});

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main>
            <header className="flex  h-16 shrink-0 items-center gap-2  transition-[width,height] border-b ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4 ">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        <div className="flex items-center justify-center h-10 md:hidden">
                          <Image src={Logo} alt="Logo" className=" w-36" />
                        </div>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              {/* ────────── notification ball ────────── */}
              <div className="flex-1 flex items-center justify-end px-4">
                <NotificationBell />
              </div>
            </header>
            <div className={`px-3 py-4 ${josefinSans.className}`}>
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AuthLayout;
