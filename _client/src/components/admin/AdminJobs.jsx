
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { BsThreeDots } from "react-icons/bs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"
import { useDispatch, useSelector } from 'react-redux'
import { getCompany } from '@/actions/Company'
import Loader from '../shared/loader/Loader'
import { formatReadableDateWithFullMonth } from '@/utils/formatDate'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Link, useNavigate } from 'react-router-dom';
import { getJobsPostedByAdmin } from '@/actions/Job';
import { Eye } from 'lucide-react';
const AdminJobs = () => {
    const {adminJobs, jobLoading} = useSelector(store => store.job);
    const [jobTitle, setJobTitle] = useState("");
    const [jobs, setJobs] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJobsPostedByAdmin())
    }, [])
    useEffect(() => {
        if(jobTitle===""){
            setJobs(adminJobs);
            return;
        };
        const timeout = setTimeout(() => {
            const filterJobs = adminJobs.filter((com) => com.title.toLowerCase().includes(jobTitle.toLowerCase()));
            setJobs(filterJobs)
        }, 2000);
        return () => {
            clearTimeout(timeout)
        }
    }, [jobTitle,adminJobs])
    if (jobLoading) {
        return <Loader />
    }
    
    return (
        <div className='companies relative px-3 py-8 sm:px-20 sm:py-8 md:px-40 md:py-16'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col'>
                <Input placeholder="Filter by name..." className="sm:w-80 w-full bg-transparent"
                    onChange={(e) => setJobTitle(e.target.value)}
                    value={jobTitle}
                />
                <Link to="/admin/jobs/create" className='sm:w-auto w-full sm:mt-0 mt-5'>
                    <Button className="bg-blue-500  hover:bg-blue-400 sm:w-auto w-full">New Job</Button>
                </Link>
            </div>
        {jobs && <Table className="mt-5">
                <TableCaption>List of companies that you have created</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-blue-900">
                        <TableHead className="w-[100px]">Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs?.map((job, i) => {
                       return <TableRow key={i} className="hover:bg-blue-900">
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{formatReadableDateWithFullMonth(job?.createdAt, false)}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <div className='text-2xl '
                                        ><BsThreeDots /></div>
                                    </PopoverTrigger>
                                    <PopoverContent className=" w-48 p-0 h-14 border-2 border-slate-600 bg-blue-900 text-white flex justify-center items-center">
                                        <div className='flex cursor-pointer justify-center items-center gap-2'  onClick={()=>navigate(`/admin/jobs/applicants/${job?._id}`)}>
                                            <Eye />
                                            View applicants
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
})
                }
                </TableBody>
            </Table>}
            {!jobs && <h1 className='text-xl my-10 w-full text-center font-semibold text-slate-300'>No Companies found click to add button to register a company</h1>}
        </div>
    )
}

export default AdminJobs