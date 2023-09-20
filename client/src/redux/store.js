import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice"
import categorySlice from "./slice/categorySlice"
import productSlice from "./slice/productSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        category: categorySlice,
        product:productSlice
    }
})