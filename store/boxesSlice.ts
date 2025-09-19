import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Box } from "../models/Box";
import { addBox, fetchBoxes } from "./boxesOps";

type BoxesState = {
    items: Box[];
    loading: boolean;
    error: string | null;
};

const initialState: BoxesState = {
    items: [],
    loading: false,
    error: null,
};


const boxesSlice = createSlice({
    name: "boxes",
    initialState,
    reducers: {
        clearBoxes: (state) => {
            state.items = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchBoxes
            .addCase(fetchBoxes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoxes.fulfilled, (state, action: PayloadAction<Box[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBoxes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // addBox
            .addCase(addBox.pending, (state) => {
                state.error = null;
            })
            .addCase(addBox.fulfilled, (state, action: PayloadAction<Box>) => {
                state.items.unshift(action.payload);
            })
            .addCase(addBox.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearBoxes } = boxesSlice.actions;
export default boxesSlice.reducer;
