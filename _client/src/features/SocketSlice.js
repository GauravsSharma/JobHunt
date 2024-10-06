import { createSlice } from '@reduxjs/toolkit';
const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        notifications:[],
        notificationCount:0,
        newMessage:0,
        unreadMessageObj:null
    },
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload
        },
        setNotifications: (state, action) => {     
            state.notifications = action.payload
        },
        setNotificationCount: (state,action) => {
            state.notificationCount = action.payload;
        },
        setNewMessage: (state,action) => {
            state.newMessage = action.payload;
        },
        setUnreadMessageObjByKey: (state, action) => {
            const { senderId, count } = action.payload;
            const obj = {
                ...state.unreadMessageObj,  // Spread the current state
                [senderId]: count           // Update or add the new count for the senderId
            }; 
            state.unreadMessageObj = obj;
        },
        setUnreadMessageObj: (state, action) => {
            state.unreadMessageObj = action.payload; 
        },
        removeMessageFromUnread: (state, action) => {
            const messageId = action.payload;
            delete state.unreadMessageObj[messageId]; // Remove the message by its ID
        }
    },
})
export default socketSlice.reducer;
export const { setSocket,setNotificationCount,setNotifications ,setNewMessage,setUnreadMessageObj,removeMessageFromUnread,setUnreadMessageObjByKey} = socketSlice.actions