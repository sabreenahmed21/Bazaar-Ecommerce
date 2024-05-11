import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./UserSlice.js";
import cartReducer from "./CartSlice";
import favReducer from "./FavoriteSlice.js";
import { productApi } from "../services/Jsonserverapi.js";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favorite: favReducer,
  [productApi.reducerPath]: productApi.reducer,
});

// Redux persist configuration for both user and cart data
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "cart", "favorite"], // Now persisting both user and cart slices of the state
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
