import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Box } from "../models/Box";
import { fetchBoxById } from "./boxDetailsOps";

type BoxDetailsState = {
    item: Box | null;
    loading: boolean;
    error: string | null;
};

const initialState: BoxDetailsState = {
    item: null,
    loading: false,
    error: null,
};

const boxDetailsSlice = createSlice({
    name: "boxDetails",
    initialState,
    reducers: {
        clearBox: (state) => {
            state.item = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoxById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBoxById.fulfilled, (state, action: PayloadAction<Box>) => {
                state.loading = false;
                state.item = action.payload;
            })
            .addCase(fetchBoxById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearBox } = boxDetailsSlice.actions;
export default boxDetailsSlice.reducer;
