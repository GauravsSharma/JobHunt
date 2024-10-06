import { getUser, getUserProfilePhotoAndName, loginUser, logout, registerUser, updateUser } from '@/actions/Auth';
import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
    name: 'user',
    initialState: {
       userLoading:false,
       user:null,
       error:null,
       message:"",
       usernameAndProfile:null
    },
    reducers:{
       setUserNameAndProfile:(state)=>{
          state.usernameAndProfile = null;
       }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error;
            })
            .addCase(getUser.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.message = action.payload;
                state.user = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.error;
            })
    },
});
// export const { clearError } = UserSlice.actions;
export default UserSlice.reducer;
export const {setUserNameAndProfile} = UserSlice.actions
