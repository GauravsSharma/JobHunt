import { getUser, loginUser, logout, registerUser, updateUser } from '@/actions/Auth';
import { getConversation, getMessages } from '@/actions/Conversation';
import { createSlice } from '@reduxjs/toolkit';

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
       conversationLoading:false,
       contact:null,
       messages:[],
       selectedUser:null,
       error:null,
    },
    reducers:{
       setSelectedUser:(state,action)=>{
           state.selectedUser = action.payload
       },
       setMessages:(state,action)=>{
           state.messages = action.payload
       },
       setContact:(state,action)=>{
           state.contact = action.payload
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversation.pending, (state) => {
                state.conversationLoading = true;
            })
            .addCase(getConversation.rejected, (state, action) => {
                state.conversationLoading = false;
                state.error = action.error;
            })
            .addCase(getConversation.fulfilled, (state, action) => {
                state.conversationLoading = false;
                state.contact = action.payload;
            })
            .addCase(getMessages.pending, (state) => {
                state.conversationLoading = true;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.conversationLoading = false;
                state.error = action.error;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.conversationLoading = false;
                state.messages = action.payload;
            })
           
    },
});
export default conversationSlice.reducer;
export const {setSelectedUser,setMessages,setContact} = conversationSlice.actions