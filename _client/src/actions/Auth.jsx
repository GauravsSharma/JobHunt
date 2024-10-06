// import { setSelectedUser } from '@/features/ConversationSlice';
import { userBaseUrl } from '@/utils/baseUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useDispatch } from 'react-redux';


export const registerUser = createAsyncThunk(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${userBaseUrl}/register`, userData, {
                headers: {
                   "Content-Type": "multipart/form-data"
                },
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${userBaseUrl}/login`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem("token", JSON.stringify(data.token));
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getUser = createAsyncThunk("user/getUser", async (_,{rejectWithValue}) => {
    try {
        console.log("Entered in getuser");
        const token = JSON.parse(localStorage.getItem("token"));
        const {data} = await axios.get(`${userBaseUrl}/getuser`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);
export const getUserById = createAsyncThunk("user/getUser/id", async (id,{rejectWithValue}) => {
    try {
        console.log("Entered in getuser");
        const token = JSON.parse(localStorage.getItem("token"));
        const {data} = await axios.get(`${userBaseUrl}/getUserById/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);
export const getUserProfilePhotoAndName = createAsyncThunk("user/getUserNameAndProfile/id", async (id,{rejectWithValue}) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        const {data} = await axios.get(`${userBaseUrl}/get/userinfo/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return data.userNameAndProfilePhoto;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);
export const updateUser = createAsyncThunk("user/updateUser", async (userData, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(userData);
        
        const { data } = await axios.put(`${userBaseUrl}/update-profile`,userData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);
export const logout = createAsyncThunk("user/logout", async (_,{rejectWithValue}) => {
    try {

        const token = JSON.parse(localStorage.getItem("token"));
        const {data} = await axios.get(`${userBaseUrl}/logout`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.removeItem("token")
        return data.message;
    } catch (error) {
          
        return rejectWithValue(error.response.data.message);
    }
}
);