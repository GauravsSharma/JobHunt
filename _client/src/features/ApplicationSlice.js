import { applyJob, getApplicants, getApplication, getAppliedJob, updateJobStatus } from "@/actions/Applications";
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        appliedApplications: [],
        applications:null,
        applicationLoading:false,
        singleApplication:null,
        error:null,
        message:"",
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyJob.pending, (state) => {
                state.applicationLoading = true;
            })
            .addCase(applyJob.fulfilled, (state, action) => {
                state.applicationLoading = false;
                state.message = action.payload;
            })
            .addCase(applyJob.rejected, (state, action) => {
                state.applicationLoading = false;
                state.error = action.error;
            })
            .addCase(getApplicants.pending, (state) => {
                state.applicationLoading = true;
            })
            .addCase(getApplicants.fulfilled, (state, action) => {
                state.applicationLoading = false;
                state.applications = action.payload;
            })
            .addCase(getApplicants.rejected, (state, action) => {
                state.applicationLoading = false;
                state.error = action.error;
            })
            .addCase(getAppliedJob.pending, (state) => {
                state.applicationLoading = true;
            })
            .addCase(getAppliedJob.fulfilled, (state, action) => {
                state.applicationLoading = false;
                state.appliedApplications = action.payload;
            })
            .addCase(getAppliedJob.rejected, (state, action) => {
                state.applicationLoading = false;
                state.error = action.error;
            })
            .addCase(getApplication.pending, (state) => {
                state.applicationLoading = true;
            })
            .addCase(getApplication.fulfilled, (state, action) => {
                state.applicationLoading = false;
                state.singleApplication = action.payload;
            })
            .addCase(getApplication.rejected, (state, action) => {
                state.applicationLoading = false;
                state.error = action.error;
            })
    }
})
export default jobSlice.reducer;