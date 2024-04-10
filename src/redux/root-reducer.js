import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice  from "./auth/auth-slice";
import { financeReducer } from "./finances/financesSlice";
import { globalReducer } from "./modal/modalSlice";




const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ["token"]
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice );

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    finance: financeReducer,
    global: globalReducer,

})
export default rootReducer;