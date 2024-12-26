import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';

import AuthReducer from "./slices/authSlice";
import EmployeesReducer from "./slices/employeesSlice";

const rootReducer = combineReducers({
    auth: AuthReducer,
    employees: EmployeesReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

const persistor = persistStore(store);

export { store, persistor };