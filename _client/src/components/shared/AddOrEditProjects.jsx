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

const AddOrEditProjects = ({ projectDialogBox, setProjectDialogBox, project }) => {
    const dispatch = useDispatch()
    const[loading,setLoading] = useState(false)
    const handleSubmit = async(values) => {
        setLoading(true)
        const project = {
            title: values.title,
            description: values.description,
            live_link:values.live_link,
            github_link:values.github_link
        }
    const formData = new FormData()
        formData.append("project",JSON.stringify(project))
        const res = await dispatch(updateUser(formData))
        console.log(res);
        setLoading(false)
        if(res.error){
            toast.error(res.payload ||"Error occured")
            return;
        }
        toast.success("Project added")
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        live_link: Yup.string().required('Live link is required'),
        github_link: Yup.string().required('Github link is required'),
    });
    return (
        <Dialog
            className="px-2 sm:px-0"
            open={projectDialogBox}
            onOpenChange={setProjectDialogBox}
        >
            <DialogContent className="sm:w-[60%] w-full bg-[#020021] text-slate-300">
                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={{
                        title: project?.title||"",
                        description: project?.description||"",
                        live_link: project?.live_link||"",
                        github_link: project?.github_link||"",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ errors, touched ,setFieldValue}) => (
                        <Form className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-left">
                                    Title
                                </Label>
                                <Field
                                    id="title"
                                    name="title"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="title"
                                />
                            </div>
                                {errors.title && touched.title && (
                                    <ErrorMessage name="title" className="text-red-500 text-xs -mt-3" component="div"/>
                                )}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-left">
                                    Description:
                                </Label>
                                <Field
                                    id="description"
                                    name="description"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="Description"
                                />
                               
                            </div>
                            {errors.description && touched.description && (
                                    <ErrorMessage name="description" className="text-red-500 text-xs -mt-3" component="div" />
                                )}
                            {/* ... (rest of the form fields) */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="livelink" className="text-left">
                                   Live link:
                                </Label>
                                <Field
                                    id="start_livelinkdate"
                                    name="live_link"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="eg: June 2022"
                                />
                            </div>
                                {errors.live_link && touched.live_link && (
                                    <ErrorMessage name="live_link" className="text-red-500 text-xs -mt-3" component="div"/>
                                )}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="github" className={`text-left`}>
                                    Github:
                                </Label>
                                <Field
                                    id="github"
                                    name="github_link"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                    placeholder="eg: June 2032"
                                    
                                />
                            </div>
                                {errors.github_link && touched.github_link && (
                                    <ErrorMessage name="github_link" className="text-red-500 text-xs -mt-3" component="div" />
                                )}
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

export default AddOrEditProjects;
