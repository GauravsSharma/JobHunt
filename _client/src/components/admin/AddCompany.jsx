import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { regiterCompany } from '@/actions/Company'
import { toast, Toaster } from 'sonner'
import { ReloadIcon } from "@radix-ui/react-icons"

const AddCompany = () => {
    const {singleCompany,companyLoading:loading} = useSelector(store=>store.company);
    const [name, setName] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!name) return;
        const res = await dispatch(regiterCompany({ name }));
        console.log(res);
        if (res.error) {
            toast.error(res.payload)
            return;
        }
        setName("");
        toast.success("Company registered")
        setTimeout(() => {
            navigate(`/admin/companies/${res?.payload?._id}`)
        }, 2000);
    }
    return (
        <div className='addcompany relative py-10 px-5 sm:px-20 h-screen'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-3xl text-slate-300 font-bold'>Your Company name</h1>
                <h2 className='text-slate-500 mt-2 font-semibold'>What would you like to give your company name ? you can it later.</h2>
                <div className='text-slate-300 mt-6 font-semibold my-2'>Company Name</div>
                <Input placeholder="Company name" className="w-[90%] sm:w-[60%] bg-transparent border-2"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <div className='flex justify-start mt-8 items-center gap-5'>
                    <Link to="/admin/companies">
                        <Button className="bg-slate-200 text-black hover:bg-slate-300"
                        type="button"
                        >Cancel</Button>
                    </Link>
                    {
                    loading ? <Button disabled className=" bg-blue-500" >
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> : <Button className=" bg-blue-500 hover:bg-blue-600" type="submit">Continue</Button>
                }
                </div>
            </form>
            <Toaster/>
        </div>
    )
}

export default AddCompany