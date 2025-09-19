import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBoxes, createBox } from "../api/api";
import { Box } from "../models/Box";

export const fetchBoxes = createAsyncThunk<Box[]>(
    "boxes/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await getBoxes();
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to fetch boxes");
        }
    }
);

export const addBox = createAsyncThunk<Box, Omit<Box, "id">>(
    "boxes/add",
    async (payload, { rejectWithValue }) => {
        try {
            return await createBox(payload);
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to create box");
        }
    }
);