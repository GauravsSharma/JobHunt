import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
 // Assuming you have a Button component
 import { ReloadIcon } from "@radix-ui/react-icons";
 import { ChevronLeftIcon } from 'lucide-react';// Assuming you have Icon components

import { Button } from '@/components/ui/button';

const Answers = () => {
  const { jobId } = useParams();
  const { singleJob, jobLoading } = useSelector(store => store.job);
  const navigate = useNavigate()
  // Generate initial values based on questions array
  const initialValues = singleJob?.questions.reduce((acc, question, i) => {
    acc[`answer_${i}`] = ''; // key names for form fields
    return acc;
  }, {});
  console.log(initialValues);
  const validationSchema = Yup.object(
    singleJob?.questions.reduce((acc, question, i) => {
      acc[`answer_${i}`] = Yup.string().required('This field is required');
      return acc;
    }, {})
  );
  const handleSubmit = (values,{resetForm}) => {
    let answer = [];
    for (const key in values) {
         answer.push(values[key].trim());
    }
    localStorage.setItem(`${jobId}`,JSON.stringify(answer))
    resetForm()
    navigate(`/job/${jobId}/apply/submit-application`)
  };

  return (
    <div className='md:px-20 sm:px-10 px-3 py-10 flex justify-center items-center relative editCompany'>
        <Button variant="outline" size="icon" className="bg-transparent absolute top-5 sm:left-10 right-5 border-2 hover:bg-slate-900" onClick={()=>navigate(-1)}>
          <ChevronLeftIcon className="h-4 w-4 bg-transparent" />
        </Button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Reinitialize form when singleJob changes
      >
        {({ setFieldValue }) => (
          <Form className='md:w-[60%] sm:w-[80%] w-full text-slate-300'>
            <h1 className='text-2xl font-semibold mb-5 sm:mb-10'>Recruiter wants to know.</h1>
            {singleJob?.questions.map((question, i) => (
              <div className="w-full mt-2" key={i}>
                <label className="font-semibold">{question}</label>
                <Field
                  name={`answer_${i}`}
                  className="mt-1 border-2 bg-transparent h-[40vw] sm:h-[10vw] px-3 py-3 sm:py-5 rounded-lg w-full"
                  placeholder="Your answer"
                  as="textarea"
                />
                <ErrorMessage name={`answer_${i}`} component="div" className="text-red-500" />
              </div>
            ))}
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
    </div>
  );
};

export default Answers;
