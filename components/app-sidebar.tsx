"use client";
import Logo from "@/public/logo_1.png";
import {
  AudioWaveform,
  Award,
  BookMarked,
  Command,
  CreditCard,
  GalleryVerticalEnd,
  HandCoins,
  House,
  Settings2,
  Users,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: House,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Home",
          url: "/",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Add Funds",
          url: "/deposit",
        },
        {
          title: "Withdraw",
          url: "/withdraw",
        },
      ],
    },
    {
      title: "Plans",
      url: "#",
      icon: HandCoins,
      items: [
        {
          title: "All Plans",
          url: "/all-plans",
        },
        {
          title: "My Plans",
          url: "/my-plans",
        },
      ],
    },
    {
      title: "Team View",
      url: "#",
      icon: Users,
      items: [
        {
          title: "1St Level",
          url: "/team-view/1st-level",
        },
        {
          title: "2nd Level",
          url: "/team-view/2nd-level",
        },
        {
          title: "3rd Level",
          url: "/team-view/3rd-level",
        },
        {
          title: "4th Level",
          url: "/team-view/4th-level",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BookMarked,
      items: [
        {
          title: "Recent Transaction",
          url: "/reports/transactions",
        },
        {
          title: "Balance Summary",
          url: "#",
        },
        {
          title: "Add Fund Report",
          url: "#",
        },
        {
          title: "Withdraw Report",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Security ",
          url: "/settings/security",
        },
        {
          title: "Kyc Verification",
          url: "/kyc",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Rank Rewards",
      url: "/rank-reward",
      icon: Award,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-gray-900">
        <div className="flex items-center justify-center h-10 -ml-9 mt-2">
          <Image src={Logo} alt="Logo" className=" w-36" />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="bg-gray-900">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
