import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import * as Yup from "yup"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast, Toaster } from "sonner";
import { updateUser } from "@/actions/Auth";
import { useDispatch, useSelector } from "react-redux";

const AddOrEditEducation = ({ educationDialogBox, setEducationDialogBox, course }) => {
    const [persuing, setPersuing] = useState(false); // Date state for the Calendar picker
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (values) => {
        setLoading(true)
        const education = {
            education_level: values.education_level,
            education_name: values.education_name,
            start_date: values.start_date,
            end_date: values.end_date ? values.end_date : null
        }
        const formData = new FormData()
        formData.append("education", JSON.stringify(education))
        const res = await dispatch(updateUser(formData))
        console.log(res);
        setLoading(false)
        if (res.error) {
            // toast.error(res.payload)
            return;
        }
        toast.success("Education added")
    };
    const validationSchema = Yup.object().shape({
        education_level: Yup.string().required('Education level is required'),
        education_name: Yup.string().required('Program name is required'),
        start_date: Yup.string().required('Start date is required'),
    });
    const handlePersuing = (setFieldValue) => {
        setPersuing((prev) => {
            if (!prev) {
                setFieldValue("end_date", null); // If pursuing, set end_date to null
            }
            return !prev;
        });
    }
    return (
        <Dialog
            className="px-2 sm:px-0"
            open={educationDialogBox}
            onOpenChange={setEducationDialogBox}
        >
            <DialogContent className="sm:w-[60%] w-full bg-[#020021] text-slate-300">
                <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={{
                        education_level: course?.education_level || "",
                        education_name: course?.education_name || "",
                        start_date: course?.start_date || "",
                        end_date: course?.end_date || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="education_level" className="text-left">
                                    Education level
                                </Label>
                                <Field
                                    id="education_level"
                                    name="education_level"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="Mssters, Bachlors  etc..."
                                />
                            </div>
                            {errors.education_level && touched.education_level && (
                                <ErrorMessage name="education_level" className="text-red-500 text-xs -mt-3" component="div" />
                            )}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="education_name" className="text-left">
                                    Program name:
                                </Label>
                                <Field
                                    id="education_name"
                                    name="education_name"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="BA, BSC, BCA etc..."
                                />

                            </div>
                            {errors.education_name && touched.education_name && (
                                <ErrorMessage name="education_name" className="text-red-500 text-xs -mt-3" component="div" />
                            )}
                            {/* ... (rest of the form fields) */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start_date" className="text-left">
                                    Start date:
                                </Label>
                                <Field
                                    id="start_date"
                                    name="start_date"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="eg: June 2022"
                                />
                            </div>
                            {errors.start_date && touched.start_date && (
                                <ErrorMessage name="start_date" className="text-red-500 text-xs -mt-3" component="div" />
                            )}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="end_date" className={`text-left ${!persuing ? "text-white" : "text-slate-500"}`}>
                                    End date:
                                </Label>
                                <Field
                                    id="end_date"
                                    name="end_date"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="eg: June 2032"
                                    disabled={persuing}
                                />
                            </div>
                            {errors.end_date && touched.end_date && (
                                <ErrorMessage name="end_date" className="text-red-500 text-xs -mt-3" component="div" />
                            )}
                            <div className="flex items-center gap-2">
                                <input
                                    id="persuing"
                                    name="persuing"
                                    className="col-span-3 bg-transparent"
                                    placeholder="eg: June 2032"
                                    type="checkbox"
                                    onChange={() => handlePersuing(setFieldValue)}
                                />
                                <Label htmlFor="persuing" className={`text-left`}>
                                    Currently persuing
                                </Label>
                            </div>
                            {loading ? (
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
            </DialogContent>
            <Toaster />
        </Dialog>
    );
};

export default AddOrEditEducation;
