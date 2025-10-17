/* ──────────────────────────────────────────────────────────────────────────── */
/* ── Notifications Page — Web Push + Smart UI + Mark-all + Delete + Toasts ── */
/* ──────────────────────────────────────────────────────────────────────────── */

"use client";

/* ────────── imports ────────── */
import { BellRing, Loader2, RotateCcw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useSocket } from "@/context/SocketContext";
import { formDateWithTime } from "@/lib/functions";
import { createBrowserPushSubscription } from "@/lib/push";

import {
  useDeleteNotificationMutation, // DELETE /notification/:id
  useGetNotificationsQuery, // GET /my-notifications
  useGetUnreadCountQuery, // GET /notifications/unread-count
  useUpdateNotificationStatusMutation, // PUT /update-all-notifications
} from "@/redux/features/notify/notificationApi";

import {
  usePushSubscribeMutation, // POST /push/subscribe
} from "@/redux/features/push/pushApi";

/* ────────── types ────────── */
type RootState = { auth: { user?: { _id?: string } } };
type Notify = {
  _id: string;
  title: string;
  message?: string;
  category?: string;
  is_read?: boolean;
  createdAt?: string; // server থেকে string আসে
};

/* ────────── helpers ────────── */
const chipClass =
  "inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[12px]";

/* ────────── Notification Card ────────── */
function NotificationCard({
  n,
  onDelete,
  deleting,
}: {
  n: Notify;
  onDelete: (id: string) => void;
  deleting: boolean;
}) {
  const unread = !n?.is_read;

  // ✅ createdAt কে নিরাপদে Date বানালাম
  const createdAt: Date | undefined = n?.createdAt
    ? new Date(n.createdAt)
    : undefined;

  return (
    <article
      className={`group relative rounded-xl p-4 transition-all
      border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03]
      hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:border-white/15 hover:-translate-y-0.5
      ${
        unread
          ? "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-emerald-400/80 rounded-l-xl"
          : ""
      }`}
    >
      {/* header */}
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] md:text-[16px] font-extrabold tracking-tight">
              {n?.title}
            </h3>
            {unread && (
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] font-medium text-white/70">
            <span className="opacity-80">
              {createdAt ? formDateWithTime(createdAt) : "—"}
            </span>
            {n?.category ? (
              <span className={chipClass}>{n.category}</span>
            ) : null}
          </div>
        </div>

        <button
          onClick={() => onDelete(n._id)}
          title="Delete"
          aria-label="Delete notification"
          className="shrink-0 inline-flex items-center justify-center rounded-md p-2
            text-white/70 hover:text-white hover:bg-white/10
            border border-white/10 hover:border-white/20 transition-colors disabled:opacity-60"
          disabled={deleting}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {n?.message ? (
        <p className="mt-2 text-sm font-medium text-white/90 leading-5">
          {n.message}
        </p>
      ) : null}
    </article>
  );
}

/* ────────── page component ────────── */
const NotificationsPage = () => {
  /* auth */
  const { user } = useSelector((s: RootState) => s.auth);

  /* local */
  const [enablingPush, setEnablingPush] = useState(false);
  const [pushSupported, setPushSupported] = useState(true);

  /* queries & mutations */
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery(undefined, { skip: !user?._id });

  const [markAllRead, { isLoading: isMarking }] =
    useUpdateNotificationStatusMutation();

  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

  const [pushSubscribe, { isLoading: isSubscribing }] =
    usePushSubscribeMutation();

  const { refetch: refetchUnread } = useGetUnreadCountQuery(undefined, {
    skip: !user?._id,
  });

  /* socket live updates */
  const { lastNotification, clearLastNotification } = useSocket() ?? {};

  /* derived */
  const notifications: Notify[] = useMemo(
    () => data?.notifications ?? [],
    [data?.notifications]
  );

  /* bulk refresh helper */
  const refreshAll = useCallback(
    async (okMsg?: string) => {
      await Promise.all([refetchNotifications(), refetchUnread()]);
      if (okMsg) toast.success(okMsg);
    },
    [refetchNotifications, refetchUnread]
  );

  /* detect push support */
  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    setPushSupported(ok);
  }, []);

  /* mark-all on enter */
  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      try {
        await markAllRead({}).unwrap();
        await refreshAll();
      } catch {
        /* silently ignore on first load */
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  /* refresh when socket says new notification */
  useEffect(() => {
    if (!lastNotification) return;
    (async () => {
      await refreshAll();
      clearLastNotification?.();
      if (lastNotification?.title) toast.info(lastNotification.title);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastNotification]);

  /* handlers */
  const handleDelete = async (id: string) => {
    try {
      await deleteNotification({ id }).unwrap();
      await refreshAll("Notification deleted");
    } catch (e: any) {
      toast.error(e?.data?.message || "Delete failed");
    }
  };

  const handleEnablePush = async () => {
    if (!pushSupported) {
      toast.warn("This browser does not support Web Push.");
      return;
    }
    setEnablingPush(true);
    try {
      const subscription = await createBrowserPushSubscription();
      await pushSubscribe({ subscription }).unwrap();
      toast.success("Push enabled!");
    } catch (e: any) {
      toast.error(e?.message || e?.data?.message || "Failed to enable push");
    } finally {
      setEnablingPush(false);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllRead({}).unwrap();
      await refreshAll("All notifications marked as read");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to mark as read");
    }
  };

  const handleManualRefresh = async () => {
    await refreshAll("Refreshed");
  };

  /* auth guard */
  if (!user?._id) {
    return (
      <div className="p-6">
        <h2 className="text-center font-bold text-xl">Please sign in</h2>
      </div>
    );
  }

  /* loading */
  if (isLoading || isFetching || isMarking) {
    return (
      <div className="px-2 py-4">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Notifications
          </h2>
          <span className="inline-flex items-center gap-2 text-sm opacity-80">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading…
          </span>
        </header>
        <div className="grid md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-white/5 animate-pulse border border-white/10"
            />
          ))}
        </div>
      </div>
    );
  }

  /* error */
  if (isError) {
    return (
      <div className="px-2 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Notifications
          </h2>
          <button
            onClick={handleManualRefresh}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
        </div>
        <p className="text-red-400">
          {(error as any)?.data?.message || "Failed to load notifications."}
        </p>
      </div>
    );
  }

  /* main */
  return (
    <div className="px-2 py-4">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Notifications{" "}
          <span className="text-white/60 font-semibold">
            ({notifications.length})
          </span>
        </h2>

        <div className="flex items-center gap-2">
          {/* enable push */}
          <button
            onClick={handleEnablePush}
            disabled={enablingPush || isSubscribing || !pushSupported}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-60"
            title={
              pushSupported
                ? "Enable browser push notifications"
                : "Web Push not supported"
            }
          >
            <BellRing className="h-4 w-4" />
            {enablingPush || isSubscribing ? "Enabling…" : "Enable Push"}
          </button>

          {/* mark all */}
          <button
            onClick={handleMarkAll}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 transition-colors"
            disabled={isMarking}
          >
            {isMarking ? "Marking…" : "Mark all as read"}
          </button>

          {/* manual refresh */}
          <button
            onClick={handleManualRefresh}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 transition-colors"
            title="Refresh"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* list / empty */}
      {isSuccess && notifications.length === 0 ? (
        <div className="text-center text-sm opacity-70">
          No notifications yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-3">
          {notifications.map((n) => (
            <NotificationCard
              key={n._id}
              n={n as Notify}
              onDelete={handleDelete}
              deleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
