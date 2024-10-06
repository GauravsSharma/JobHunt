import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/AuthSlice';
import jobSlice from './features/JobSlice';
import applicationSlice from './features/ApplicationSlice';
import companySlice from './features/CompanySlice';
import conversationSlice from './features/ConversationSlice';
import socketSlice from './features/SocketSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    application: applicationSlice,
    company: companySlice,
    conversation: conversationSlice,
    socket: socketSlice, // Contains non-serializable values like socket instance
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['socket/setSocket'],  // Ignore actions related to the socket
        ignoredPaths: ['socket.socket'],       // Ignore paths where non-serializable data exists
      },
    }),
});

export default store;
