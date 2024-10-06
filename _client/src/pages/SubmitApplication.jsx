import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiSolidFilePdf } from "react-icons/bi";
import { toast, Toaster } from 'sonner';
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from '@/components/ui/button';
import { applyJob } from '@/actions/Applications';
const SubmitApplication = () => {
    const { jobId } = useParams();
    const { user } = useSelector(store => store.user)
    const { singleJob } = useSelector(store => store.job)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const answers = JSON.parse( localStorage.getItem(`${jobId}`))
    const questionAnswer = singleJob?.questions?.map((que,i)=>{
      return {question:que,answer:answers[i]}
    })
   const handleApply = async()=>{
      setLoading(true);
      const res = await dispatch(applyJob({questionAnswer,id:jobId}))
      console.log(res);
      
      setLoading(false);
      if(res.error){
        toast.error(res.payload)
        return;
      }
      toast.success(res.payload)
      localStorage.removeItem(`${jobId}`)
      navigate(`/job/${jobId}/apply/submit-application/success`);
   }
    return (
        <div className='flex flex-col gap-5 items-center justify-center px-5 sm:px-0 w-full py-10'>
            <div className="p-5 rounded-lg border border-slate-600 w-full sm:w-[80%]  md:w-1/2">
                <h1 className='text-xl text-slate-300 font-semibold'>Please review your appication</h1>
                <div className="flex justify-between mt-3  items-center font-semibold ">
                    <span className='text-slate-300'> Name</span>

                    <Link className='text-blue-500' to={`/user/profile`}>Edit</Link>
                </div>
                <div className="flex justify-between items-center font-semibold ">
                    <span className=' '>{user?.fullname}</span>
                </div>
                <div className="mt-3 font-semibold">
                    <p className='text-slate-300'> Email</p>
                    <p className='text-lg'> {user?.email}</p>
                </div>
                <div className="mt-3 font-semibold ">
                    <span className='text-slate-300 font-semibold'>Resume</span>
                   <div className="flex justify-start gap-1 items-center p-1">
                   <p className='text-red-500 text-xl'><BiSolidFilePdf/></p>
                   <p className='text-lg'> {user?.profile?.resumeOriginalName}</p>
                   </div>
                </div>
            </div>
          { questionAnswer?.length>0 && <div className="p-5 rounded-lg border border-slate-600 w-full sm:w-[80%]  md:w-1/2">
            <h1 className='text-xl text-slate-300 font-semibold flex'>Recruiters Questions.</h1>
              {
                questionAnswer?.map((obj,i)=>(
                    <div className='p-1 mt-3'>
                    <h1 > <span className='text-red-500'>Que.{i+1}</span> {obj.question}</h1>
                     <h1 className='text-slate-300'><span className='text-green-500'>Ans:</span> {obj.answer}</h1>
                    </div>
                ))
              }
            </div>}
            {
                    loading ? <Button disabled className="w-full sm:w-[80%]  md:w-1/2 mt-4 bg-blue-500">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> : <Button className="w-full sm:w-[80%]  md:w-1/2 mt-4 bg-blue-500" type="submit"
                    onClick = {handleApply}
                    >Apply</Button>
                }
            <Toaster/>
        </div>
    )
}

export default SubmitApplication