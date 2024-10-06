import { createJob, getInternships, getInternshipsByQuery, getJobById, getJobs, getJobsByQuery, getJobsPostedByAdmin, getLatestJobs, getTitleAndLocation } from "@/actions/Job";

import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        singleJob:null,
        jobLoading:false,
        adminJobs:[],
        error:null,
        message:"",
        locations:[],
        titles:[]
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;
            })
            .addCase(createJob.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.message = action.payload;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;
            })
            .addCase(getInternships.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getInternships.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getInternships.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;
            })
            .addCase(getJobById.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.singleJob = action.payload;
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;
            })
            .addCase(getLatestJobs.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getLatestJobs.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getLatestJobs.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;
            })
            .addCase(getJobsPostedByAdmin.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getJobsPostedByAdmin.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.adminJobs = action.payload;
            })
            .addCase(getJobsPostedByAdmin.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;
            })
            .addCase(getTitleAndLocation.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getTitleAndLocation.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.locations = action.payload.locations;
                state.titles = action.payload.jobTitles;
            })
            .addCase(getTitleAndLocation.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;
            })
            .addCase(getInternshipsByQuery.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getInternshipsByQuery.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getInternshipsByQuery.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;                
                state.jobs = []
            })
            .addCase(getJobsByQuery.pending, (state) => {
                state.jobLoading = true;
            })
            .addCase(getJobsByQuery.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobsByQuery.rejected, (state, action) => {
                state.jobLoading = false;
                state.error = action.payload;                
                state.jobs = []
            })
            .addCase("CLEAR_ERROR", (state) => {
                state.error = null;                
            })
    }
})
export default jobSlice.reducer;