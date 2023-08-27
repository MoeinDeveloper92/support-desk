import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketService from "./ticketService"


const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: () => { }
})


export const { reset } = ticketSlice.actions
export default ticketSlice.reducer