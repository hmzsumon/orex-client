// redux/features/notify/notificationApi.ts
import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/my-notifications",
      providesTags: ["Notification", "Notifications"],
    }),
    updateNotificationStatus: builder.mutation({
      query: () => ({
        url: "/update-all-notifications",
        method: "PUT",
      }),
      invalidatesTags: ["Notification", "Notifications", "UnreadCount"],
    }),
    getUnreadCount: builder.query<{ success: boolean; count: number }, void>({
      query: () => "/notifications/unread-count",
      providesTags: ["UnreadCount"],
    }),

    deleteNotification: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification", "Notifications", "UnreadCount"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useUpdateNotificationStatusMutation,
  useGetUnreadCountQuery,
  useDeleteNotificationMutation,
} = notificationApi;
