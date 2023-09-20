import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("getUser", async () => {
    const response = await axios.get("http://localhost:3000/users")
    return response.data
})

export const changeActiveUser = createAsyncThunk("changeActiveUser", async (user) => {
    
     await axios.patch(`http://localhost:3000/users/${user.id}`, {
        active: !user.active
    })
    return user.id;
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: [],
        mess: "no mess",
        isLoadingGet: false,
        isLoadingChange: false
    },    extraReducers: (builder) => {
        builder
           .addCase(getUser.pending, (state) => {
                return {
                    ...state,
                    mess: "pending",
                    isLoadingGet: true
                }
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    mess: "ok",
                    data: action.payload,
                    isLoadingGet: false
                }
            })
            .addCase(getUser.rejected, (state) => {
                return {
                    ...state,
                    mess: "no",
                    isLoadingGet: false
                }
            })
            .addCase(changeActiveUser.pending, (state) => {
                return {
                    ...state,
                    mess: "pending",
                    isLoadingChange: true
                }
            })
            .addCase(changeActiveUser.fulfilled, (state) => {
                return {
                    ...state,
                    mess: "oke",
                    isLoadingChange: false
                }
            })
            .addCase(changeActiveUser.rejected, (state) => {
                return {
                    ...state,
                    mess: "no",
                    isLoadingChange: false
                }
            })
            // .addCase(deleteUser.fulfilled, (state, action) => {
            //     const newUser = state.data.filter(user => user.id != action.payload)
            //     return {
            //         ...state,
            //         mess: "oke",
            //         data: [...newUser]
            //     }
            // })
    }
})

export default userSlice.reducer