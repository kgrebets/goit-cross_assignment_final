import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBox } from "../api/api";

export const fetchBoxById = createAsyncThunk(
    "boxDetails/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await getBox(id);
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to fetch box");
        }
    }
);
