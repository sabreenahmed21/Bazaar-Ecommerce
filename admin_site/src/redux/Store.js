import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "../services/Jsonserverapi";
import adminReducer from "./AdminSlice.js"

// Combine reducers
const rootReducer = combineReducers({
  admin:adminReducer,
    [productApi.reducerPath]: productApi.reducer,
});

// Redux persist configuration
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["admin"],
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and export the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

// Setup listeners for RTK query
setupListeners(store.dispatch);

// Persist store
export const persistor = persistStore(store);
