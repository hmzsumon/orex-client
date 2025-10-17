// src/redux/features/push/pushApi.ts
import { apiSlice } from "../api/apiSlice";

export const pushApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    pushSubscribe: builder.mutation<
      { success: boolean },
      { subscription: PushSubscriptionJSON }
    >({
      query: ({ subscription }) => ({
        url: "/push/subscribe",
        method: "POST",
        body: { subscription },
      }),
    }),

    pushUnsubscribe: builder.mutation<
      { success: boolean },
      { endpoint: string }
    >({
      query: ({ endpoint }) => ({
        url: "/push/unsubscribe",
        method: "POST",
        body: { endpoint },
      }),
    }),

    // ঐচ্ছিক: টেস্ট পুশ ট্রিগার
    pushTest: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/push/test",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  usePushSubscribeMutation,
  usePushUnsubscribeMutation,
  usePushTestMutation,
} = pushApi;
