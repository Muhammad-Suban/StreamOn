import authReducer from "./authSlice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // reducer:{
    //     secondAuth: secondAuthReducer
    // }
})

export default store