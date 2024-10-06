import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '@/actions/Job';
import Loader from '@/components/shared/loader/Loader';
import { toast, Toaster } from 'sonner';
import { IoPeopleOutline } from "react-icons/io5";
const JobDetail = () => {
    const {jobId} = useParams();    
    const {singleJob,jobLoading} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.user);
    const dispatch = useDispatch()
    const isAlreadyApplied  = singleJob?.applications.some((application)=>{       
        return application.applicants===user?._id
    })
    useEffect(()=>{
      const fetchJob =async()=>{
        const res = await dispatch(getJobById(jobId));        
        if(res.payload.applications && res.payload.applications.length<100){
            toast.message("Apply fast, Be an early applicant.")
        }
      }
      fetchJob()
    },[])
    if(jobLoading){
        return <Loader/>
    }
    const logoUrl = singleJob?.company?.logo?.url||"https://img.freepik.com/free-vector/silhouette-skyline-illustration_53876-78786.jpg?w=740&t=st=1726374290~exp=1726374890~hmac=9f666b819e3b500470264a0ad0d2281b58b4da7831d9487f3e9e84934b6dbe9b";
    const isQuestions = singleJob?.questions.length>0?true:false
    return (
        <div className='jobs_detail relative w-full flex justify-center items-center p-3 sm:p-5  md:p-10'>
            <div className="w-full md:w-[80%] border-2 border-slate-800 rounded-xl shadow-2xl p-1 sm:p-5 ">
                <div className='flex justify-between items-center flex-wrap gap-2 p-5 sm:p-0  w-full'>
                    <div className='flex items-center justify-start gap-5'>
                        <div className='h-16 w-16 rounded-lg overflow-hidden'>
                            <img src={logoUrl} alt={singleJob?.company?.name} className='h-full w-full object-cover' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-semibold'>{singleJob?.title}</h1>
                            <h1 className='font-semibold  text-lg'>at <Link to="/company/433453354" className='text-blue-500'>{singleJob?.company?.name}</Link></h1>
                            <div className='flex mt-3 justify-start items-center gap-2'>
                                <div className='h-6 w-6 flex justify-center items-center bg-blue-500 text-white rounded-full pb-1'>{singleJob?.created_by?.fullname.substring(0,1).toLowerCase()}</div>
                                <p className='text-slate-300 font-semibold text-sm' >Posted by <span className='text-blue-500'>{singleJob?.created_by?.fullname}</span></p>
                            </div>
                        </div>
                    </div>
                   <Link to={`${isQuestions?`/job/${jobId}/apply`:`/job/${jobId}/apply/submit-application`}`} className='w-full sm:w-auto'>
                   <Button className={`${isAlreadyApplied?"bg-blue-500":"bg-blue-600"} w-full   sm:w-auto mt-2 sm:mt-0`}
                    disabled={isAlreadyApplied}
                    >{isAlreadyApplied?"Already applied":"Apply to this job"}</Button>
                   </Link>
                </div>
                <div className='mt-5 sm:mt-10 border-2 border-slate-800 p-5 rounded-xl'>
                    <div className='flex justify-start items-center gap-4 flex-wrap-reverse'>
                        <div className='flex justify-center items-center gap-2 text-md font-semibold text-slate-300'>
                            <IoBriefcaseOutline className='text-slate-300' />
                            {singleJob?.experience_level}
                        </div>
                        <div className='flex justify-center items-center gap-2 text-md font-semibold text-slate-300'>
                            <FaRegMoneyBillAlt className='text-slate-300' />
                             {singleJob?.jobType==="internship"?`₹${singleJob?.salary}/mon`:`₹${singleJob?.salary} lpa`}
                        </div>
                        <div className='flex justify-center items-center gap-2 text-md font-semibold text-slate-300'>
                            <CiLocationOn className='text-slate-300' />
                            {singleJob?.location}
                        </div>
                        <div className='flex justify-center items-center gap-2 text-md font-semibold text-slate-300'>
                            <IoPeopleOutline className='text-green-500 ' />
                            {singleJob?.applications.length}{singleJob?.applications.length<=1?" Applicant":" Applicants"}
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h1 className='text-slate-300 font-semibold text-lg'>Skills</h1>
                        <div className='flex justify-start flex-wrap items-center gap-4 mt-2'>
                            {
                                singleJob?.requirement.map((skill,i)=>(
                                    <Badge className='pb-1 bg-blue-500 hover:bg-blue-600' key={i}>{skill}</Badge>
                                ))
                            }
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h1 className='text-slate-300 font-semibold text-lg'>Responsiblity</h1>
                        <ul className='mt-2 w-full sm:w-[80%] flex flex-col gap-2 font-medium text-slate-300 sm:px-0 px-1'>
                        <li className=' list-decimal ml-2'>{singleJob?.description}</li>
                        </ul>
                    </div>

                </div>
                <div className='mt-10 border-slate-800 p-5 rounded-xl'>
                    <div className='text-slate-300 text-lg font-semibold flex justify-between items-center'>
                        <h1>{singleJob?.company?.name}</h1>
                    </div>
                    <div className="flex justify-start sm:justify-between flex-wrap sm:gap-0 gap-5 items-center mt-3">
                        <p className='font-semibold'>Founded: <span className='text-slate-300'>2015</span></p>
                        <p className='font-semibold'>Type: <span className='text-slate-300'>Service</span></p>
                        <p className='font-semibold'>Size: <span className='text-slate-300'>50 emp</span></p>
                        <p className='font-semibold'>Stage: <span className='text-slate-300'>Profitable</span></p>
                    </div>
                    <div className='mt-5'>
                        <h1 className='text-slate-300 font-semibold text-lg'>About</h1>
                        <p className='font-medium text-slate-300'>{singleJob?.company?.description}
                        </p>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default JobDetail