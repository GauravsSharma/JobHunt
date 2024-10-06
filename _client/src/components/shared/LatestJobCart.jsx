import React from 'react';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';

const LatestJobCart = ({
    companyName,
    location,
    jobTitle,
    description,
    jobType,
    experience,
    salary,
    jobId
}) => {


    const truncateDescription = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const truncatedDescription = truncateDescription(description, 18); // Limit to 18 words

    return (
        <Link to={`/job/${jobId}`}>
            <div className={`p-5 border shadow-lg rounded-md w-full sm:w-full lg:w-[22rem] h-auto`}>
                <h1 className='text-xl font-bold'>{companyName}</h1>
                <p className='text-sm text-slate-500 mt-2'>{location}</p>
                <h1 className='text-2xl font-bold'>{jobTitle}</h1>
                <div className='text-md mt-1'>{truncatedDescription}
                    <div className="flex justify-normal items-center gap-3 mt-4">
                        <Badge className={"text-red-500 text-sm"} variant={"outline"}>{experience}</Badge>
                        <Badge className={"text-blue-500 text-sm"} variant={"outline"}>{jobType}</Badge>
                        <Badge className={"text-green-500 text-sm"} variant={"outline"}>{salary}</Badge>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LatestJobCart;
