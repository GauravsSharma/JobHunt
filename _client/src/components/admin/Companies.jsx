
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { AiFillEdit } from "react-icons/ai";
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
const Companies = () => {
    const {companies, companyLoading} = useSelector(store => store.company);
    const [company, setCompany] = useState("");
    const [filteredCompany, setFilteredCompany] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCompany())
    }, [])
    useEffect(() => {
        if(company===""){
            setFilteredCompany(companies);
            return;
        };
        const timeout = setTimeout(() => {
            const filterCompany = companies.filter((com) => com.name.toLowerCase().includes(company.toLowerCase()));
            setFilteredCompany(filterCompany)
            console.log(filterCompany, company);
        }, 2000);
        return () => {
            clearTimeout(timeout)
        }
    }, [company,companies])
    if (companyLoading) {
        return <Loader />
    }
    return (
        <div className='companies relative px-3 py-8 sm:px-20 sm:py-8 md:px-40 md:py-16'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col'>
                <Input placeholder="Filter by name..." className="sm:w-80 w-full bg-transparent"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                />
                <Link to="/admin/companies/create" className='sm:w-auto w-full sm:mt-0 mt-5'>
                    <Button className="bg-blue-500  hover:bg-blue-400 sm:w-auto w-full">New Company</Button>
                </Link>
            </div>
        {filteredCompany && <Table className="mt-5">
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
                    {filteredCompany?.map((company, i) => {
                         const logoUrl = company?.logo?.url||"https://img.freepik.com/free-vector/silhouette-skyline-illustration_53876-78786.jpg?w=740&t=st=1726374290~exp=1726374890~hmac=9f666b819e3b500470264a0ad0d2281b58b4da7831d9487f3e9e84934b6dbe9b";
                       return <TableRow key={i} className="hover:bg-blue-900">
                            <TableCell className="font-medium">
                                <Avatar>
                                    <AvatarImage className='cursor-pointer w-full h-full object-cover' src={logoUrl} alt="@shadcn" />
                                    <AvatarFallback>DP</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{company?.name}</TableCell>
                            <TableCell>{formatReadableDateWithFullMonth(company?.createdAt, false)}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <div className='text-2xl '
                                        ><BsThreeDots /></div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-24 h-10 border-2 border-slate-600 bg-blue-900 text-white flex justify-center items-center">
                                        <div className='flex cursor-pointer justify-center items-center gap-2'  onClick={()=>navigate(`/admin/companies/${company?._id}`)}>
                                            <AiFillEdit />
                                            Edit
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
})
                }
                </TableBody>
            </Table>}
            {!filteredCompany && <h1 className='text-xl my-10 w-full text-center font-semibold text-slate-300'>No Companies found click to add button to register a company</h1>}
        </div>
    )
}

export default Companies