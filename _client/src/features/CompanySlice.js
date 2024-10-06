import { getCompany, getCompanyById, regiterCompany } from "@/actions/Company";
import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: null,
        companyLoading: false,
        singleCompany:null,
        error: null,
        message: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompany.pending, (state) => {
                state.companyLoading = true;
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.companyLoading = false;
                state.companies = action.payload;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.companyLoading = false;
                state.error = action.error;
            })
            .addCase(regiterCompany.pending, (state) => {
                state.companyLoading = true;
            })
            .addCase(regiterCompany.fulfilled, (state, action) => {
                state.companyLoading = false;
                state.singleCompany = action.payload;
            })
            .addCase(regiterCompany.rejected, (state, action) => {
                state.companyLoading = false;
                state.error = action.error;
            })
            .addCase(getCompanyById.pending, (state) => {
                state.companyLoading = true;
            })
            .addCase(getCompanyById.fulfilled, (state, action) => {
                state.companyLoading = false;
                state.singleCompany = action.payload;
            })
            .addCase(getCompanyById.rejected, (state, action) => {
                state.companyLoading = false;
                state.error = action.error;
            })

    }
})
export default companySlice.reducer;