import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { getCompanyById, regiterCompany } from '@/actions/Company';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup
import { createJob, getJobById } from '@/actions/Job';
import Select from 'react-select';

const AddOrEditCompany = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { jobLoading } = useSelector(store => store.job);
    const { companies } = useSelector(store => store.company);
    const [options, setOptions] = useState(null);
    useEffect(() => {
        if (companies && companies.length > 0) {
            const option = companies.map((company) => {
                return { label: company.name, value: company._id };
            });
            setOptions(option);
        }
    }, [companies])
    // Initial values from the fetched job details
    const initialValues = {
        title: '',
        description: '',
        requirements: '',
        salary: 0,
        location: '',
        jobType: '',
        experience_level: '',
        company: '',
        position: 0,
        questions:""
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string().required('Job title is required'),
        description: Yup.string().required('Description is required'),
        requirements: Yup.string().required('Requirements are required'),
        salary: Yup.string().required('Salary is required'),
        location: Yup.string().required('Location is required'),
        jobType: Yup.string().required('Job type is required'),
        experience_level: Yup.string().required('Experience level is required'),
        company: Yup.string().required('Company name is required'),
        position: Yup.string().required('No. of position is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('location', values.location);
        formData.append('requirement', values.requirements);
        formData.append('salary', values.salary);
        formData.append('jobType', values.jobType);
        formData.append('position', values.position);
        formData.append('experience_level', values.experience_level);
        formData.append('company', values.company);
        formData.append('questions', values.questions);
        const res = await dispatch(createJob(formData));
        if (res.error) {
            toast.error(res?.payload || "Error occurred");
            return;
        }
        toast.success("Job posted successfully.");
        resetForm();
        setTimeout(() => {
            navigate("/admin/jobs")
        }, 2000);
    };
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Change background color here
            borderColor: '#64748B',  // Change border color
            color: 'white',          // Text color
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white', // Change the selected option text color
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#102C57',  // Menu background color
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
    };

    return (
        <div className='md:px-20 sm:px-10 px-3 py-10 flex justify-center items-center relative editCompany'>
            <Link to="/" className='absolute top-5 sm:left-10 right-5'>
                <Button variant="outline" size="icon" className="bg-transparent border-2 hover:bg-slate-900">
                    <ChevronLeftIcon className="h-4 w-4 bg-transparent" />
                </Button>
            </Link>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema} // Add validation schema
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ setFieldValue }) => (
                    <Form className='md:w-[60%] sm:w-[80%] w-full text-slate-300'>
                        <h1 className='text-2xl font-semibold mb-5 sm:mb-10'>Add Job</h1>
                        <div className="flex w-full gap-2 sm:flex-row flex-col">
                            {/* Job Title */}
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">Job Title</label>
                                <Field
                                    name="title"
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full"
                                    placeholder="Job title"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500" />
                            </div>

                            {/* Company Name */}
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">Experience Level</label>
                                <Field
                                    name="experience_level"
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full"
                                    placeholder="Experience level (e.g., Junior, Mid, Senior)"
                                />
                                <ErrorMessage name="experience_level" component="div" className="text-red-500" />
                            </div>

                        </div>

                        <div className="flex w-full gap-2 sm:flex-row flex-col">
                            {/* Location */}
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">Location</label>
                                <Field
                                    name="location"
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full"
                                    placeholder="Enter your job 's location"
                                />
                                <ErrorMessage name="location" component="div" className="text-red-500" />
                            </div>

                            {/* Salary */}
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">Salary</label>
                                <Field
                                    name="salary"
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full"
                                    placeholder="Salary"
                                />
                                <ErrorMessage name="salary" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="flex gap-2 w-full sm:flex-row flex-col">
                            {/* Requirements */}
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">Requirements</label>
                                <Field
                                    name="requirements"
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full"
                                    placeholder="Job requirements"
                                />
                                <ErrorMessage name="requirements" component="div" className="text-red-500" />
                            </div>

                            {/* Job Type */}
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">Job Type</label>
                                <Field
                                    name="jobType"
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full"
                                    placeholder="Job type (e.g., Full-time, Part-time)"
                                />
                                <ErrorMessage name="jobType" component="div" className="text-red-500" />
                            </div>
                        </div>

                        {/* Experience Level */}
                        <div className="flex gap-2 w-full sm:flex-row flex-col">
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">Company Name</label>
                                <Select
                                    name="company"
                                    options={options}
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full text-white rounded-lg"
                                    placeholder="Company's name"
                                    styles={customStyles}
                                    onChange={e => setFieldValue("company", e.value)
                                    }
                                />
                                <ErrorMessage name="company" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4 w-full sm:w-1/2">
                                <label className="font-semibold">No. of position</label>
                                <Field
                                    name="position"
                                    as={Input}
                                    className="mt-1 border-2 bg-transparent w-full"
                                    placeholder="No. of position"
                                />
                                <ErrorMessage name="position" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className="w-full mt-2">
                            <label className="font-semibold">Description</label>
                            <Field
                                name="description"
                                className="mt-1 border-2 bg-transparent h-[40vw] sm:h-[10vw] px-3 py-3 sm:py-5 rounded-lg w-full"
                                placeholder="Job's description"
                                as="textarea"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full mt-2">
                            <label className="font-semibold">Questions</label>
                            <Field
                                name="questions"
                                className="mt-1 border-2 bg-transparent h-[40vw] sm:h-[10vw] px-3 py-3 sm:py-5 rounded-lg w-full"
                                placeholder={`Ask questions seperated by " , " `}
                                as="textarea" 
                            />
                            <ErrorMessage name="questions" component="div" className="text-red-500" />
                        </div>
                        {/* Submit Button */}
                        {jobLoading ? (
                            <Button disabled className="w-full mt-4 bg-blue-500">
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600" type="submit">
                                Submit
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
            <Toaster />
        </div>
    );
};

export default AddOrEditCompany;
