import { applicantionBaseUrl } from '@/utils/baseUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const applyJob = createAsyncThunk(
    "job/apply",
    async ({questionAnswer,id}, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(token);
        try {
            const { data } = await axios.post(`${applicantionBaseUrl}/apply/${id}`,{questionAnswer} ,{
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
export const updateJobStatus = createAsyncThunk(
    "job/status/update",
    async ({status,id}, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(token);
        
        try {
            const { data } = await axios.post(`${applicantionBaseUrl}/update-status/${id}`,status ,{
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
export const getAppliedJob = createAsyncThunk(
    "job/appliedJob",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));        
        try {
            const { data } = await axios.get(`${applicantionBaseUrl}/get-applied-job`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.applications;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getApplicants = createAsyncThunk(
    "job/applicants",
    async (id, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));        
        try {
            const { data } = await axios.get(`${applicantionBaseUrl}/get-applicants/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.applications;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getApplication = createAsyncThunk(
    "job/get/application",
    async (id, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));        
        try {
            const { data } = await axios.get(`${applicantionBaseUrl}/get-applicationById/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.application;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);