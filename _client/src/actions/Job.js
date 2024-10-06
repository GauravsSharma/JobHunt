import { jobBaseUrl } from '@/utils/baseUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createJob = createAsyncThunk(
    "job/create",
    async (userData, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.post(`${jobBaseUrl}/createJob`, userData, {
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
export const getJobs = createAsyncThunk(
    "job/get",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.get(`${jobBaseUrl}/getJobs`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.jobs;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getInternships = createAsyncThunk(
    "job/getinternship",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.get(`${jobBaseUrl}/getInternships`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.jobs;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getLatestJobs = createAsyncThunk(
    "job/latestJob",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.get(`${jobBaseUrl}/getLatestJobs`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.jobs;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getJobById = createAsyncThunk(
    "job/getJobById",
    async (id, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.get(`${jobBaseUrl}/getJobById/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.job;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getInternshipsByQuery = createAsyncThunk(
    "job/internships/query",
    async ({keywords,location,salary}, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const { data } = await axios.get(`${jobBaseUrl}/getInternships?keyword=${keywords}&location=${location}&salary=${salary}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.jobs;
        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getJobsByQuery = createAsyncThunk(
    "job/query",
    async ({keywords,location,salary}, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));        
        try {     
         
            console.log(salary);
            
            const { data } = await axios.get(`${jobBaseUrl}/getJobs?keyword=${keywords}&location=${location}&salary=${salary}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(`${jobBaseUrl}/getJobs?keyword=${keywords}&location=${location}&salary=${salary}`);
            
            return data.jobs;
        } catch (error) {
           return rejectWithValue(error.response.data.message);
        }
    }
);
export const getJobsPostedByAdmin = createAsyncThunk(
    "admin/jobs",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));        
        try {     
            const { data } = await axios.get(`${jobBaseUrl}/getJobsPostedByAdmin`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });            
            return data.jobs;
        } catch (error) {
           return rejectWithValue(error.response.data.message);
        }
    }
);
export const getTitleAndLocation = createAsyncThunk(
    "get/titleAndLocation",
    async (_, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem("token"));        
        try {     
            const { data } = await axios.get(`${jobBaseUrl}/get/titleAndLocaton`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });     
            return data;
        } catch (error) {
           return rejectWithValue(error.response.data.message);
        }
    }
);
