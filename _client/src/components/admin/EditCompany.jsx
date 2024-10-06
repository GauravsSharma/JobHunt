import React, { useEffect } from 'react';
import { Input } from '../ui/input';
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { getCompanyById, regiterCompany } from '@/actions/Company';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';

const EditCompany = () => {
  const dispatch = useDispatch();
  const {companyLoading,singleCompany} = useSelector(store=>store.company)
  const {id} = useParams()
  useEffect(()=>{
    dispatch(getCompanyById(id))
  },[])
  const initialValues = {
    name: singleCompany?.name,
    description: singleCompany?.description,
    website: singleCompany?.website,
    location: singleCompany?.location,
    file: null
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('website', values.website);
    formData.append('location', values.location);
    if (values.file) {
      formData.append('file', values.file);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const res = await dispatch(regiterCompany({id:id,company:formData}));
    if (res.error) {
      toast.error(res?.payload || "Error occurred");
      return;
    }
    toast.success("Company updated successfully.");
    resetForm();
  };

  return (
    <div className='md:px-20 sm:px-10 px-3 py-10 flex justify-center items-center relative editCompany'>
      <Link to="/" className='absolute top-5 sm:left-10 right-5'>
        <Button variant="outline" size="icon" className="bg-transparent border-2 hover:bg-slate-900">
          <ChevronLeftIcon className="h-4 w-4 bg-transparent" />
        </Button>
      </Link>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
        {({ setFieldValue }) => (
          <Form className='md:w-[60%] sm:w-[80%] w-full  text-slate-300'>
            <h1 className='text-2xl font-semibold mb-5 sm:mb-10'>Company Setup</h1>
            <div className="flex gap-2 sm:flex-row flex-col">
              <div className="w-full sm:w-1/2">
                <label className="font-semibold">Company Name</label>
                <Field
                  name="name"
                  as={Input}
                  className="mt-1 border-2 bg-transparent"
                  placeholder="Company's name"
                />
              </div>
              <div className="w-full sm:w-1/2">
              <label htmlFor="file" className="font-semibold text-slate-300">Company Logo</label>
              <Input
                id="file"
                name="file"
                type="file"
                className="w-full bg-transparent border-2 mt-1"
                onChange={(event) => setFieldValue('file', event.target.files[0])}
              />
            </div>
            </div>
            <div className="flex mt-3 gap-2 sm:flex-row flex-col">
              <div className="w-full sm:w-1/2">
                <label className="font-semibold">Website</label>
                <Field
                  name="website"
                  as={Input}
                  className="mt-1 border-2 bg-transparent"
                  placeholder="Company's website URL"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="font-semibold">Location</label>
                <Field
                  name="location"
                  as={Input}
                  className="mt-1 border-2 bg-transparent"
                  placeholder="Enter your company's location"
                />
              </div>
            </div>
            <div className="w-full mt-2">
                <label className="font-semibold">Description</label>
                <Field
                  name="description"
                  className="mt-1 border-2 bg-transparent h-40 p-4 rounded-lg w-full"
                  placeholder="Company's description"
                  as="textarea"
                />
              </div>
            {
              companyLoading ? (
                <Button disabled className="w-full mt-4 bg-blue-500">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600" type="submit">
                  Submit
                </Button>
              )
            }
          </Form>
        )}
      </Formik>
      <Toaster/>
    </div>
  );
};

export default EditCompany;
