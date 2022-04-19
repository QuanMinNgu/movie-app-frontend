import {createSlice} from '@reduxjs/toolkit';

const authSlice =  createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        failing:false
    },
    reducers:{
        isLoading:(state) => {
            state.loading = true;
            state.failing = false;
        },
        isFailing:(state) => {
            state.failing = true;
            state.isLoading = false;
        },
        isSuccess:(state) => {
            state.failing = false;
            state.loading  = false;
        },
        isLogin:(state,action) => {
            state.loading = false;
            state.failing = false;
            state.user = action.payload;
        },
        isLogOut:(state) => {
            state.loading = false;
            state.failing = false;
            state.user = null;
        }
    }
});

export const {isFailing,isLoading,isLogOut,isLogin,isSuccess} = authSlice.actions;
export default authSlice.reducer;