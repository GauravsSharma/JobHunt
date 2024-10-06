import { conversationBaseUrl } from "@/utils/baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getConversation = createAsyncThunk(
    "conversation/get",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.get(`${conversationBaseUrl}/get/contact`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.profiles;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getMessages = createAsyncThunk(
    "conversation/get/messages",
    async (id, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        
        try {
            const { data } = await axios.get(`${conversationBaseUrl}/recieve/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.messages;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const sendMessage = createAsyncThunk(
    "conversation/post/messages",
    async ({message,id}, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.post(`${conversationBaseUrl}/send/${id}`,{message},{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);