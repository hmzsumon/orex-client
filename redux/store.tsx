import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import depositMethodReducer from "./depositMethodSlice";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";
import kycLocal from "./features/kyc/kycSlice";
import miningReducer from "./features/mining/miningSlice";
import resetPassSlice from "./resetPassSlice";
import signUpData from "./signupDataSlice";
import stepperSlice from "./stepperSlice";
import verificationSlice from "./verificationSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  mining: miningReducer,
  depositMethod: depositMethodReducer,
  signUpData,
  stepper: stepperSlice,
  resetPass: resetPassSlice,
  verification: verificationSlice,
  kycLocal,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware);
  },
});
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
