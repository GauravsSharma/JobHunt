import React, { useEffect, useState } from 'react';
import { SiTicktick } from "react-icons/si";
import { useNavigate, useParams } from 'react-router-dom';

const SubmitApplicationSuccess = () => {
    const [time, setTime] = useState(5);
    const navigate  = useNavigate()
    const {jobId} = useParams()
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(prev => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);
    useEffect(() => {
        if (time === 0) {
            navigate(`/job/${jobId}`)
        }
    }, [time]);

    return (
        <div className='success relative md:px-20 sm:px-10 px-5 flex justify-center items-center h-[80vh] flex-col gap-3'>
            <div className='flex justify-center items-center gap-2 sm:flex-row flex-col w-full'>
                <SiTicktick className='text-[8rem] sm:mb-0 mb-3 sm:text-3xl text-green-500' />
                <h1 className='text-2xl font-bold'>Your Application is submitted</h1>
            </div>
            <p className='text-slate-300 font-bold text-center'>Your application is being submitted. Recruiter will get back to you soon.</p>
            <p className='text-slate-300 font-bold text-center'>Redirecting ({time})</p>
        </div>
    );
}

export default SubmitApplicationSuccess;
