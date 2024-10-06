import React, { useEffect, useState } from 'react';
import { LuFilter } from "react-icons/lu";
import Select from 'react-select';
import { RxCross2 } from "react-icons/rx";
import { Button } from '../ui/button';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FilterSidebar = ({
    filterByLocation,
    filterByTitle,
    salary = 0,
    handleTitleChange,
    handleSalaryChange = () => { },
    handleLocationChange,
    isFilteredSidebarOpen,
    setIsFilteredSidebarOpen,
    applyFilter,
    resetFilter
}) => {
    const { titles, locations: locationArray } = useSelector(store => store.job)
    const [isInternship, setIsInternship] = useState()
    const [jobTitles, setJobTitles] = useState(null)
    const [jobLocations, setJobLocations] = useState(null)
    const location = useLocation();
    useEffect(() => {
        if (locationArray) {
            const locationsObj = locationArray.map((location) => {
                return { value: location.split(",")[0].toLowerCase(), label: location.split(",")[0] }
            })
            setJobLocations(locationsObj)
            console.log(locationsObj);
            
        }
        if (titles) {
            const titlesObj = titles.map((title) => {
                return { value: title.split(" ")[0].toLowerCase(), label: title }
            })
            setJobTitles(titlesObj)
        }
    }, [titles, locationArray])
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Control background color
            borderColor: '#64748B',  // Control border color
            color: 'white',  // Control text color
            height: '40px',  // Set fixed height
            overflow: 'hidden',  // Prevent overflow
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#102C57',  // Menu background color  // Set max height for dropdown menu
            overflowY: 'auto',  // Enable vertical scrolling
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#64748B' : 'transparent',  // Option hover background color
            color: 'white',  // Option text color
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#64748B',  // Selected value background color
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white',  // Selected value label color
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'white',
            ':hover': {
                backgroundColor: '#334155',  // Background color when hovering over the remove icon
                color: 'white',
            },
        }),
        input: (provided) => ({
            ...provided,
            color: 'white',  // Text color when typing
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgba(255, 255, 255, 0.5)',  // Placeholder text color
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',  // Selected single value text color
        }),
    };
    

    useEffect(() => {
        setIsInternship(() => location.pathname === "/internships" ? true : false);
    }, [location])
    return (
        <div className={`w-full z-50 lg:w-[20%] h-screen flex justify-center items-center lg:block lg:static fixed top-0 ${isFilteredSidebarOpen ? "left-0" : "-left-full"} bg-[#020021DE] border-r border-slate-800 duration-200 lg:bg-transparent`}>
            <div className="lg:hidden flex absolute top-2 right-2 text-2xl p-1 rounded-full justify-center items-center border-2"
                onClick={() => setIsFilteredSidebarOpen(false)}
            >
                <RxCross2 />
            </div>
            <div className='filter_sidebar relative w-[90%] sm:w-1/2 lg:w-full h-[90vh] px-3 py-20 '>
                <h1 className='flex justify-center items-center gap-1 text-2xl sm:text-xl font-bold text-slate-300'
                >
                    <LuFilter className='text-blue-400' />
                    Filters
                </h1>
                <div className='mt-10 flex flex-col justify-center items-center w-full gap-6 '>
                    <div className='w-full'>
                        <div className="mb-4">
                            <Select
                                isMulti
                                name="jobTitles"
                                options={jobTitles||{}}
                                className="basic-multi-select w-full bg-transparent"
                                classNamePrefix="select"
                                placeholder="Select job titles"
                                value={jobTitles?.filter(option => filterByTitle.includes(option.value))}  // Pre-fill with selected values
                                styles={customStyles}
                                onChange={handleTitleChange}  // Handle title changes
                            />
                        </div>
                        <div className="mb-4">
                            <Select
                                isMulti
                                name="locations"
                                options={jobLocations||{}}
                                className="basic-multi-select bg-transparent"
                                classNamePrefix="select"
                                placeholder="Select locations"
                                value={jobLocations?.filter(option => filterByLocation.includes(option.value))}  // Pre-fill with selected values
                                onChange={handleLocationChange}
                                styles={customStyles}  // Handle location changes
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center flex-col-reverse">
                        <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={salary}
                            onChange={handleSalaryChange}
                            className='mt-2 w-full'
                        />
                        <label htmlFor="salary-range" className="text-sm font-semibold text-slate-300">
                            {
                                isInternship ? ` Monthly Stipend (in INR): ${salary.toLocaleString()}` : ` Annual Salary (in INR): ${salary.toLocaleString()}`
                            }
                        </label>
                    </div>
                    <div className="flex w-full gap-2 px-5">
                        <Button className="w-1/2 py-3 bg-white hover:bg-slate-200 text-black"
                            onClick={resetFilter}
                        >Reset</Button>
                        <Button className="w-1/2 py-3 hover:bg-blue-600 bg-blue-500"
                            onClick={applyFilter}
                        >Apply</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar;
