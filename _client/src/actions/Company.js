import { companyBaseUrl } from '@/utils/baseUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getCompany = createAsyncThunk(
    "company/get",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
    
        try {
            const { data } = await axios.get(`${companyBaseUrl}/getcompany`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.companies;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getCompanyById = createAsyncThunk(
    "company/get/id",
    async (id, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        
        try {
            const { data } = await axios.get(`${companyBaseUrl}/getcompany-by-id/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.company;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const regiterCompany = createAsyncThunk(
    "company/register",
    async ({id,company}, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));       
        try {
            const { data } = await axios.put(`${companyBaseUrl}/updatecompany/${id}`,company,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                 },
            });
            return data.company;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);