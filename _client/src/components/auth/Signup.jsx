import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner';
import { ReloadIcon } from "@radix-ui/react-icons"
import { registerUser } from '@/actions/Auth';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const handleSubmit = async (values, resetForm) => {
        console.log(values);
        setLoading(true)
        const formData = new FormData();
        formData.append('fullname', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('phoneNumber', values.phone);
        formData.append('role', values.role);
        if (values.file) {
            formData.append('file', values.file);
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        const res = await dispatch(registerUser(formData));
        setLoading(false)
        if (res.error) {
            // toast.error(res?.payload || "Error occured");
            return;
        }
        toast.success("Register Success, You may now login.");
        resetForm()
        setTimeout(() => {
            navigate("/login")
        }, 5000);
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'student',
            file: null // Default role
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Full name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().matches(/^\d+$/, "Phone number must be digits only").required('Phone number is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            role: Yup.string().required('Role is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values, resetForm)
        },
    });
    const handleFileChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue("file", file);
        }
    }
    return (
        <div className='flex justify-center flex-col items-center relative py-5'>
            <Link to="/" className='absolute top-8 sm:top-5 sm:left-5 right-5'>
                <Button variant="outline" size="icon" className="bg-transparent hover:bg-slate-900">
                    <ChevronLeftIcon className="h-4 w-4 bg-transparent" />
                </Button>
            </Link>
            <form className='px-5 md:w-[28rem] w-[95%] shadow-lg border-slate-400 border h-auto py-5 rounded-xl' onSubmit={formik.handleSubmit}>
                <h1 className='text-2xl font-semibold mb-5 '>Signup</h1>
                <div className="grid w-full items-center gap-2 mb-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Full name"
                        className="bg-transparent"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="grid w-full items-center gap-2 mb-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="bg-transparent"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="grid w-full items-center gap-2 mb-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                        type="text"
                        id="phone"
                        placeholder="Phone number"
                        className="bg-transparent"
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                    ) : null}
                </div>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="bg-transparent"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="flex w-full sm:flex-row flex-col justify-center items-start">
                    <RadioGroup
                        defaultValue="student"
                        onValueChange={(value) => formik.setFieldValue('role', value)}
                        className="w-[50%]"
                    >
                        <Label htmlFor="role">Role</Label>
                        <div className="flex gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="student" id="r1" className="text-slate-600" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="recruiter" id="r2" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </div>
                    </RadioGroup>
                    <div className="flex sm:mt-0 mt-2 items-start flex-col justify-start w-full sm:w-[50%]">
                        <Label htmlFor="photo" className="text-left ml-1 sm:py-0 py-1">
                            Profile Photo:
                        </Label>
                        <Input
                            id="photo"
                            name="file"
                            type="file"
                            className="w-full bg-blue-900 sm:mt-0 mt-1 sm:w-auto"
                            onChange={(event) => handleFileChange(event, formik.setFieldValue)}
                        />
                    </div>
                </div>

                {
                    loading ? <Button disabled className="w-full mt-4 bg-blue-500">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> : <Button className="w-full mt-4 bg-blue-500" type="submit">Submit</Button>
                }

            </form>
            <p className='mt-5'>Already have an account? <Link to="/login" className='no-underline hover:underline font-semibold'>Login</Link></p>
            <Toaster />
        </div>
    );
}

export default Signup;
