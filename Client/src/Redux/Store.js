import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "../services/Jsonserverapi";
import userReducer from "./UserSlice";
import cartReducer from "./CartSlice";
import favReducer from "./FavoriteSlice";
import orderReducer from "./OrderSlice";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favorite: favReducer,
  orders: orderReducer,
  [productApi.reducerPath]: productApi.reducer,
});

// Redux persist configuration
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "cart", "favorite", "orders"],
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
