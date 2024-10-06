import { useFormik } from 'formik';  // Import useFormik from formik
import * as Yup from 'yup';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { loginUser } from '@/actions/Auth';
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const Login = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async(values,resetForm)=>{
        setLoading(true);
        const res = await dispatch(loginUser({
            email:values.email,password:values.password,role:values.role
        }))
        setLoading(false);
        if(res.error){
            toast.error(res.payload)
            return;
        }   
        resetForm() 
        toast.success("Login success")
        setTimeout(() => {
            navigate("/")
        }, 4000);
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            role: 'student', // Default role
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values,{resetForm}) => {
            handleSubmit(values,resetForm);
        },
    });

    return (
        <div className='flex justify-center flex-col items-center relative h-screen'>
            <Link to="/" className='absolute top-5 left-5'>
                <Button variant="outline" size="icon" className="bg-transparent hover:bg-slate-900">
                    <ChevronLeftIcon className="h-4 w-4 bg-transparent" />
                </Button>
            </Link>
            <form className='px-5 md:w-[25rem] w-[95%] shadow-md border-slate-600 border h-auto py-5 rounded-xl' onSubmit={formik.handleSubmit}>
                <h1 className='text-2xl font-semibold mb-5 '>Login</h1>
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
                <RadioGroup
                    defaultValue="student"
                    onValueChange={(value) => formik.setFieldValue('role', value)}
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
                {
                    loading ? <Button disabled className="w-full mt-4 bg-blue-500">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> : <Button className="w-full mt-4 bg-blue-500" type="submit">Submit</Button>
                }
            </form>
            <p className='mt-5'>Don't have an account ? <Link to="/signup" className='no-underline hover:underline font-semibold'>Signup</Link></p>
            <Toaster/>
        </div>
    );
}

export default Login;
