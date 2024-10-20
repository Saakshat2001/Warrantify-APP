import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
// import themeReducer from "./theme/themeSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  user: userReducer,
//   theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage : AsyncStorage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);