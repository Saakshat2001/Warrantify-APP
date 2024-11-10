import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
// import themeReducer from "./theme/themeSlice";
import { persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
//import storage from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";
//import  persistStore  from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('store mein toh aarea');

const rootReducer = combineReducers({
  user: userReducer,

});

const persistConfig = {
  key: "root",
 storage:AsyncStorage ,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

