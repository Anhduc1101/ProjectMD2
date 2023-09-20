import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("getProduct", async () => {
    const response=await axios.get("http://localhost:3000/products")
    return response.data;
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        mess: "no mess",
        isLoadingGet:false
    },
    extraReducers: (builder) => {
        builder
      .addCase(getProduct.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getProduct.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
    }
})

export default productSlice.reducer;