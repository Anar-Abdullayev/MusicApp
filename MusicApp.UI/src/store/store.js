import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./slices/music/musicSlice";
import accountSlice from "./slices/account/accountSlice";

const store = configureStore({
    reducer: {
        music: musicSlice,
        account: accountSlice
    }
})

export default store;