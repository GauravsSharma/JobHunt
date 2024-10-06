import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate()
    const handleQuery = (e) => {
        e.preventDefault()
        if (!query) return;
        if(query.includes("intern")){
            navigate(`/internships?keyword=${query.split(" ")[0].toLowerCase()}`)
        }
        else{
            navigate(`/jobs?keyword=${query.split(" ")[0].toLowerCase()}`)
        }
    }
    return (
        <div className="hero relative h-auto w-full flex justify-center gap-5">
            <div className="mt-20 text-center w-full sm:px-10 sm:w-[80%] lg:w-[50%]">
                <p className="text-blue-500 font-semibold text-[2.1vw] sm:text-lg px-3 py-1 rounded-full bg-slate-100 inline-block">India 's no.1 job hunt plateform.</p>
                <h1 className="text-[8vw] sm:text-[3rem] font-bold leading-[8.5vw] md:leading-[6vw]  lg:leading-[4vw] mt-2">Search, Apply & <br /> Get <span className="text-blue-500">Your Dream Job.</span></h1>
                <p className="text-slate-400 font-semibold mt-3 md:text-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus ipsum itaque quam fugiat ad, provident at distinctio eaque id earum.</p>
                <form className="w-full justify-center flex items-center mt-4"
                    onSubmit={handleQuery}
                >
                    <input type="text" className=" shadow-lg border outline-none w-[70%] sm:w-[80%] h-12 rounded-tl-full rounded-bl-full py-1 px-5 text-slate-700 font-semibold" placeholder="Search here..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <button className="w-[15%] sm:w-[10%] h-12 shadow-lg rounded-tr-full rounded-br-full bg-blue-500 text-white font-medium py-1 flex justify-center items-center text-xl">
                        <FiSearch />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Hero