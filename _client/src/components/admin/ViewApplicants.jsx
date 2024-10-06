import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getApplication, updateJobStatus } from '@/actions/Applications';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../shared/loader/Loader';
import { BiSolidFilePdf } from 'react-icons/bi';
import { setContact } from '@/features/ConversationSlice';
const ViewApplicants = () => {
    const { singleApplication, applicationLoading } = useSelector(store => store.application)
    const { socket } = useSelector(store => store.socket)
    const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
    const [stylingForAccept, setStylingForAccept] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(
        singleApplication?.status === "pending" ? false : true
    );
    console.log(singleApplication);
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { applicationId } = useParams()
    useEffect(() => {
        dispatch(getApplication(applicationId))
    }, [])
    useEffect(()=>{
        setIsSuccess(()=>singleApplication?.status === "pending" ? false : true)
    },[singleApplication])
    const handleUpdateStatus = async (id) => {
        setLoading(true);
        const status = stylingForAccept ? "accepted" : "rejected"
        const statusObj = {
            status:stylingForAccept ? "accepted" : "rejected",
            applicantId :singleApplication.applicants._id
        }
        const formData = new FormData()
        formData.append("status", status);
        const res = await dispatch(updateJobStatus({ status: formData, id }))
        setLoading(false);
        if (res.error) {
            setIsSuccess(false)
            toast.error(res.payload);
            return;
        }
        setIsSuccess(true)
        toast.success(res.payload);
        setIsDialogBoxOpen(false);
        socket.emit("status_changed",statusObj);
    }
    if (applicationLoading) {
        return <Loader />
    }
    const handleSendMessage = () => {
        navigate(`/messages/${singleApplication.applicants._id}`)
    }
    return (
        <div className='flex flex-col gap-5 items-center justify-center px-5 sm:px-0 w-full py-10 pb-20 '>
            <div className="p-5 rounded-lg border border-slate-600 w-full sm:w-[80%]  md:w-1/2">
                <h1 className='text-xl text-slate-300 font-semibold'>Applicant</h1>
                <div className="flex justify-between mt-3  items-center font-semibold ">
                    <span className='text-slate-300'> Name</span>
                    <Link className='text-blue-500' to={`/user/${singleApplication?.applicants?._id}`}>View profile</Link>
                </div>
                <div className="flex justify-between items-center font-semibold ">
                    <span className=' '>{singleApplication?.applicants?.fullname}</span>
                </div>
                <div className="mt-3 font-semibold">
                    <p className='text-slate-300'> Email</p>
                    <p className='text-lg'> {singleApplication?.applicants?.email}</p>
                </div>
                <div className="mt-3 font-semibold ">
                    <span className='text-slate-300 font-semibold'>Resume</span>
                    <div className="flex justify-start gap-1 items-center p-1">
                        <p className='text-red-500 text-xl'><BiSolidFilePdf /></p>
                        <p className='text-lg'> {singleApplication?.applicants?.profile?.resumeOriginalName}</p>
                    </div>
                </div>
            </div>
            {singleApplication?.questionAnswer?.length > 0 && <div className="p-5 rounded-lg border border-slate-600 w-full sm:w-[80%]  md:w-1/2">
                <h1 className='text-xl text-slate-300 font-semibold flex'>Your Questions.</h1>
                {
                    singleApplication?.questionAnswer?.map((obj, i) => (
                        <div className='p-1 mt-3'>
                            <h1 > <span className='text-red-500'>Que.{i + 1}</span> {obj.question}</h1>
                            <h1 className='text-slate-300'><span className='text-green-500'>Ans:</span> {obj.answer}</h1>
                        </div>
                    ))
                }
            </div>}
            {!isSuccess ? <div className='w-full sm:w-[80%] flex gap-2 items-center justify-center md:w-1/2 flex-col sm:flex-row'>
                <Button className="w-full sm:w-[80%]  md:w-1/2  bg-blue-500 hover:bg-blue-600" type="submit"
                    onClick={() => { setIsDialogBoxOpen(true); setStylingForAccept(true) }}
                >Accept</Button>
                <Button className="w-full sm:w-[80%] mt-2 sm:mt-0 md:w-1/2 bg-red-500 hover:bg-red-600" type="submit"
                    onClick={() => { setIsDialogBoxOpen(true); setStylingForAccept(false) }}
                >Reject</Button>
            </div> : <Button className="w-full sm:w-[80%]  md:w-1/2 mt-4 bg-blue-500 hover:bg-blue-600 flex justify-center items-center gap-2"
                onClick={handleSendMessage}
            > <BsFillSendFill /> Send Message</Button>
            }
            <Toaster />
            <Dialog open={isDialogBoxOpen} onOpenChange={setIsDialogBoxOpen}>
                <DialogContent className="sm:max-w-[425px] bg-[#020021]">
                    <DialogHeader>
                        <DialogTitle className="text-center mb-2 font-semibold">Confim <span className='text-blue-500'>{stylingForAccept ? "Accept" : "Reject"}</span></DialogTitle>
                        <DialogDescription className="text-center">
                            By clicking confirm application will be {stylingForAccept ? "accepted" : "rejected"}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex px-5 justify-center items-center gap-5'>
                        {loading ? <Button disabled className="w-1/2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                            : <Button className="bg-blue-500 hover:bg-blue-600 w-full"
                                onClick={() => handleUpdateStatus(singleApplication._id)}
                            >Confirm</Button>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ViewApplicants