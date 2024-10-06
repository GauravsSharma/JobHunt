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
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { TbXboxX } from "react-icons/tb";
import searchFallbackImage from "../../assets/searchFallback.png"
import { getApplicants, updateJobStatus } from '@/actions/Applications'
import Loader from '../shared/loader/Loader'
import { formatReadableDateWithFullMonth } from "@/utils/formatDate";
import { useState } from "react";
import { Button } from "../ui/button";

import { ChevronLeftIcon } from 'lucide-react';

const Applicants = () => {
    const { applications, applicationLoading } = useSelector(store => store.application)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getApplicants(id))
    }, [])
    if (applicationLoading) {
        return <Loader />
    }

    return (
        <div className='companies relative px-3 sm:px-20 md:px-40 py-4 sm:py-16 h-screen'>
            <Link to="/admin/jobs" className='absolute top-5 sm:left-10 right-5'>
                <Button variant="outline" size="icon" className="bg-transparent border-2 hover:bg-slate-900">
                    <ChevronLeftIcon className="h-4 w-4 bg-transparent" />
                </Button>
            </Link>
            <div className='w-full  text-2xl font-bold text-slate-300 flex justify-between items-center '>
                Applicants ({applications?.length})
            </div>
            {applications && <Table className="mt-5">
                <TableCaption>List of applicants</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-blue-900">
                        <TableHead className="w-[200px]">Fullname</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((application, i) => {
                        const { applicants } = application
                        return <TableRow key={i} className="hover:bg-blue-900">
                            <TableCell><Link to={`/user/${applicants._id}`}
                                className="hover:underline"
                            >{applicants?.fullname}</Link></TableCell>
                            <TableCell className="text-center" >{applicants?.email}</TableCell>
                            <TableCell>{applicants?.phoneNumber}</TableCell>
                            <TableCell><a href={applicants?.profile?.resume?.url} className="underline">{applicants?.profile?.resumeOriginalName}</a></TableCell>
                            <TableCell>{formatReadableDateWithFullMonth(application.createdAt, false)}</TableCell>
                                <TableCell className="text-right">
                                    <Popover className="p-0">
                                        <PopoverTrigger>
                                            <div className='text-2xl '
                                            ><BsThreeDots /></div>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-44 p-0 h-16 border-2 border-slate-600 bg-blue-900 overflow-hidden text-white flex justify-center items-center flex-col">
                                            <div className='flex cursor-pointer justify-start items-center gap-1 hover:bg-blue-700 rounded-md py-2 px-3 w-full'
                                                onClick={() => {
                                                    navigate(`/admin/jobs/applicants/${id}/application/${application._id}`); console.log("hrllo");
                                                }}
                                            >
                                                <IoCheckmarkCircleOutline className="text-2xl text-green-500" />
                                                View Applicant
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                        </TableRow>
                    })
                    }
                </TableBody>
            </Table>}

            {!applications && <div className='w-full h-[80vh] flex justify-center items-center flex-col'>
                <img src={searchFallbackImage} alt="" className='h-80' />
                <h1 className='font-semibold text-xl'>No Applicants found !!</h1>
            </div>}

        </div>
    )
}

export default Applicants