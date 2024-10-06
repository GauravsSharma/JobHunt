import React from 'react';
import { MdOutlineLocationOn } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { Button } from '../ui/button';
import amazon from "../../assets/amazon.png";
import { Link } from 'react-router-dom';
import { data } from 'autoprefixer';
import { formatReadableDateWithFullMonth } from '@/utils/formatDate';

const getRandomLightColor = () => {
    const letters = 'BCDEF'; // Using letters from B to F to ensure the color stays light
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
};

const JobCart = ({
    date,
    companyName,
    title,
    skills,
    salary,
    location,
    jobId,
    logo
}) => {
    const backgroundColor = getRandomLightColor();

    return (
        <div className='w-full md:w-[18rem] h-auto p-1 border-2 border-slate-800 shadow-2xl rounded-2xl hover:scale-105 duration-500 hover:shadow-2xl cursor-pointer'>
            <div className="upper h-[80%] px-2 py-4 w-full rounded-2xl">
                <div className='flex justify-between items-center'>
                    <div className=" px-3 py-1 text-sm font-semibold rounded-full">{formatReadableDateWithFullMonth(date,true)}</div>
                    <div className='bg-white p-2 text-slate-500 rounded-full'>
                        <FiBookmark />
                    </div>
                </div>
                <div className='-mb-2 mt-5 font-semibold text-sm text-slate-300'>{companyName}</div>
                <div className='flex justify-between items-center mt-2'>
                    <p className='text-xl font-semibold w-[70%] leading-6 text-slate-300'>{title}</p>
                    <div className='h-10 w-10 flex justify-center items-center bg-red-300 rounded-full overflow-hidden'>
                        <img src={logo} alt="" className='object-cover w-full h-full' />
                    </div>
                </div>
                <div className="flex justify-start items-center flex-wrap gap-2 mt-5">
                   {
                    skills?.map((skill,idx)=>
                        <div key={idx} className="border border-slate-500 px-2 py-1 text-sm font-semibold rounded-full">{skill}</div>
                )
                   }
                </div>
            </div>
            <div className="lower h-[20%] p-2">
                <div className='flex justify-between items-center'>
                    <div className='w-[60%]'>
                        <p className='font-medium text-slate-300'>${salary}</p>
                        <div className='flex items-center text-slate-500 text-sm font-medium'>
                            <MdOutlineLocationOn />
                            <p className=''>{location}</p>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <Link to={`/job/${jobId}`}><Button className="rounded-3xl bg-blue-500 hover:bg-blue-400">View Details</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCart;
