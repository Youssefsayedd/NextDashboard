import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    maleCount: 0,
    femaleCount: 0,
    bloodTypes: {},
    heights: [],
    weights: [],
    role:null,
    loading: false,
    error: null
}

export const getAllUsers = createAsyncThunk("UserData/getAllUsers", async () => {
    const res = await axios.get("https://dummyjson.com/users");
    console.log(res.data.users);
    return res.data.users; 
});

const UserDataSlice = createSlice({
    name: "UserData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.maleCount = action.payload.filter(user => user.gender === 'male').length;
                state.femaleCount = action.payload.filter(user => user.gender === 'female').length;
                state.role = action.payload.map(user=>user.role);
                
               
                const bloodGroups = {};
                action.payload.forEach(user => {
                    if (user.bloodGroup) {
                        bloodGroups[user.bloodGroup] = (bloodGroups[user.bloodGroup] || 0) + 1;
                    }
                });
                state.bloodTypes = bloodGroups;
                
               
                state.heights = action.payload.map(user => user.height);
                state.weights = action.payload.map(user => user.weight);
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default UserDataSlice.reducer;