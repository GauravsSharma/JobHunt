import JobCart from '@/components/shared/JobCart'
import React, { useEffect, useState } from 'react'
import FilterSidebar from '@/components/shared/FilterSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { LuFilter } from "react-icons/lu";

import { getInternships, getInternshipsByQuery, getJobs, getJobsByQuery, getTitleAndLocation } from '@/actions/Job';
import Loader from '@/components/shared/loader/Loader';
import { useLocation, useSearchParams } from 'react-router-dom';
import searchFallbackImage from "../assets/searchFallback.png"
import Loader2 from '@/components/shared/loader/Loader2';
const Internships = () => {
    const { jobs, jobLoading, error } = useSelector(store => store.job)
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [searchParams1, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const location1 = searchParams.get('location');
    const salary1 = searchParams.get('salary');
    const [isFilteredSidebarOpen,setIsFilteredSidebarOpen] = useState(false);

    const [salary, setSalary] = useState(salary1 ? salary1 : 0);
    const [filterByTitle, setFilterByTitle] = useState(() => {
        const initialValue = keyword ? keyword.split(",") : []
        return initialValue;
    })
    const [filterByLocation, setFilterByLocation] = useState(() => {
        const initialValue = location1 ? location1.split(",") : []
        return initialValue;
    });
    useEffect(() => {
        if (jobs && error) {
            dispatch({
                type: "CLEAR_ERROR"
            })
        }
        if (keyword || location1 || salary) {
            dispatch(getInternshipsByQuery({ keywords: keyword, location: location1, salary }))
        }
        else {
            dispatch(getInternships());
        }
    }, [])
    useEffect(()=>{
       dispatch(getTitleAndLocation()) 
    },[])
    const handleFilterApply = ()=>{
        setIsFilteredSidebarOpen(false)
        dispatch(getInternshipsByQuery({ keywords: keyword, location: location1, salary }))
    }
        const resetFilter = ()=>{
        setSalary(0);
        setFilterByTitle([])
        setFilterByLocation([])
        dispatch(getJobs())
        if(keyword){
            searchParams1.set('keyword',null);
        }
        if(location1){
            searchParams1.set('location',null);
        }
        if(salary1){
            searchParams1.set('salary',null);
        }
        setSearchParams(searchParams1);
    }
    const title = keyword || location1 || salary1 ? `Total results found (${jobs.length})` : "Recommended Jobs"
    const handleTitleChange = (titleFiltersArray) => {
        let titleFilters = titleFiltersArray.map((option) => option.value);
        setFilterByTitle(titleFilters)
        searchParams1.set('keyword', titleFilters.join(','));
        setSearchParams(searchParams1);
    }
    const handleLocationChange = (locationFiltersArray) => {
        let locationFilters = locationFiltersArray.map((option) => option.value);
        setFilterByLocation(locationFilters)
        searchParams1.set('location', locationFilters.join(','));
        setSearchParams(searchParams1);
    }
    const handleSalaryChange = (event) => {
        const newSalary = parseInt(event.target.value);
        setSalary(newSalary);
        searchParams1.set('salary', newSalary);
        setSearchParams(searchParams1);
    };
    return (
        <div className='w-full internship relative'>
            <div className='flex w-full sm:px-12 relative'>
                <FilterSidebar
                    salary={salary}
                    filterByLocation={filterByLocation}
                    filterByTitle={filterByTitle}
                    handleLocationChange={handleLocationChange}
                    handleTitleChange={handleTitleChange}
                    handleSalaryChange={handleSalaryChange}
                    isFilteredSidebarOpen={isFilteredSidebarOpen}
                    setIsFilteredSidebarOpen={setIsFilteredSidebarOpen}
                    applyFilter = {handleFilterApply}
                    resetFilter={resetFilter}
                />
                <div className="w-full lg:w-[80%] overflow-y-auto px-5 py-5 ">
                    <h1 className='flex lg:hidden px-2 py-1 w-40 mx-auto rounded-full border-2 justify-center items-center gap-1 mb-10 text-xl font-bold text-slate-300'
                     onClick={() => setIsFilteredSidebarOpen(true)}
                    >
                        <LuFilter className='text-blue-400' />
                        Filters
                    </h1>
                    <h1 className='text-2xl font-bold mb-5 flex items-center gap-5 '>{title}</h1>
                    <div className='flex flex-wrap justify-start items-center gap-5'>
                        {
                            !jobLoading && jobs?.map((job) => {
                                const logoUrl = job?.company?.logo?.url || "https://img.freepik.com/free-vector/silhouette-skyline-illustration_53876-78786.jpg?w=740&t=st=1726374290~exp=1726374890~hmac=9f666b819e3b500470264a0ad0d2281b58b4da7831d9487f3e9e84934b6dbe9b";
                                return <JobCart
                                    key={job._id}
                                    date={job.createdAt}
                                    companyName={job.company.name}
                                    title={job.title}
                                    skills={job.requirement}
                                    salary={job.salary}
                                    location={job.location}
                                    jobId={job._id}
                                    logo={logoUrl}
                                />
                            })
                        }
                        {jobLoading && <Loader2 />}
                        {jobs?.length===0 && <div className='w-full flex justify-center items-center flex-col'>
                            <img src={searchFallbackImage} alt="" className='h-80' />
                            <h1 className='font-semibold text-xl'>Could'nt find your search !!</h1>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Internships