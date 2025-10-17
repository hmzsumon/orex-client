/* ──────────────────────────────────────────────────────────────────────────── */
/* ── Socket Context (client) — join per-user room + live events wiring ────── */
/* ──────────────────────────────────────────────────────────────────────────── */

"use client";

/* ────────── imports ────────── */
import socketUrl from "@/config/socketUrl";
import { SocketUser } from "@/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

/* ────────── types ────────── */
interface ISocketContext {
  socket: Socket | null;
  isSocketConnected: boolean;
  onlineUsers: SocketUser[];
  lastNotification: any | null; // you can replace `any` with your Notification type
  clearLastNotification: () => void;
}

/* ────────── context ────────── */
export const SocketContext = createContext<ISocketContext | null>(null);

/* ────────── provider ────────── */
export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /* ────────── auth state ────────── */
  const { user } = useSelector((state: any) => state.auth);

  /* ────────── local states ────────── */
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);
  const [lastNotification, setLastNotification] = useState<any | null>(null);

  /* ────────── refs ────────── */
  const userIdRef = useRef<string | null>(null);
  userIdRef.current = user?._id ?? null;

  /* ────────── connect & join per-user room ────────── */
  useEffect(() => {
    // user unavailable → disconnect if connected
    if (!user || !user._id) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsSocketConnected(false);
      }
      return;
    }

    // init new socket
    const s = io(socketUrl, {
      transports: ["websocket"], // fast path
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 800,
      reconnectionDelayMax: 5000,
    });

    s.on("connect", () => {
      // join private room by userId (server listens to "join-room")
      s.emit("join-room", user._id);
      setIsSocketConnected(true);
      setSocket(s);
      // console.debug("✅ Socket connected:", s.id);
    });

    s.on("disconnect", () => {
      setIsSocketConnected(false);
      // console.debug("🔴 Socket disconnected");
    });

    // cleanup
    return () => {
      s.removeAllListeners();
      s.disconnect();
      setSocket(null);
      setIsSocketConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  /* ────────── event listeners ────────── */
  useEffect(() => {
    if (!socket) return;

    // online users list (optional)
    const onGetUsers = (users: SocketUser[]) => {
      setOnlineUsers(users || []);
    };

    // per-user notification push (emitted from server to user room)
    const onUserNotification = (payload: any) => {
      // keep latest payload — UI can use it to refresh badge/count
      setLastNotification(payload);
      // you can also toast here if desired
      // toast.info(payload?.title ?? "New notification");
    };

    socket.on("getUsers", onGetUsers);
    socket.on("user-notification", onUserNotification);

    return () => {
      socket.off("getUsers", onGetUsers);
      socket.off("user-notification", onUserNotification);
    };
  }, [socket]);

  /* ────────── helpers ────────── */
  const clearLastNotification = () => setLastNotification(null);

  /* ────────── memoized value ────────── */
  const value = useMemo<ISocketContext>(
    () => ({
      socket,
      isSocketConnected,
      onlineUsers,
      lastNotification,
      clearLastNotification,
    }),
    [socket, isSocketConnected, onlineUsers, lastNotification]
  );

  /* ────────── render ────────── */
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

/* ────────── hook ────────── */
export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx)
    throw new Error("useSocket must be used within a SocketContextProvider");
  return ctx;
};
