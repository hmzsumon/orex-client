// components/NotificationBell.tsx
"use client";
import { useGetUnreadCountQuery } from "@/redux/features/notify/notificationApi";
import { Bell } from "lucide-react";
import Link from "next/link";

export default function NotificationBell() {
  const { data, isFetching } = useGetUnreadCountQuery();
  const count = data?.count ?? 0;

  return (
    <Link href="/notifications" className="relative inline-block">
      <Bell className="cursor-pointer" />
      {!isFetching && count > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-5 h-5 px-1 text-[10px] leading-5 text-white
                     bg-red-600 rounded-full text-center"
          aria-label={`${count} unread notifications`}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
