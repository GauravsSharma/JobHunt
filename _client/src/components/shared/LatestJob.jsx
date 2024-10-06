import React, { useEffect } from 'react'
import JobCart from './JobCart'
import LatestJobCart from './LatestJobCart'
import { useDispatch, useSelector } from 'react-redux'
import { getAppliedJob } from '@/actions/Applications'
import { getLatestJobs } from '@/actions/Job'

const LatestJob = () => {
  const {jobs} = useSelector(store=>store.job)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getLatestJobs())
  },[])
  return (
    <div className='latest_job relative sm:px-20 py-10'>
        <h1 className=' text-center sm:text-left text-2xl sm:text-3xl font-bold'>Latest & <span className='text-blue-600'>Top Jobs And Internships Opening</span></h1>
        <div className="flex justify-center items-center gap-5 mt-10 flex-wrap px-3 sm:px-0">
            {
                jobs?.slice(0,6)?.map((job)=>(
                    <LatestJobCart 
                    key={job._id}
                    companyName = {job.company?.name}
                    location = {job.location}
                    jobTitle = {job.title}
                    description = {job.description}
                    jobType = {job.jobType}
                    experience = {job.experience_level}
                    salary = {job.salary}
                    jobId = {job._id}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default LatestJob