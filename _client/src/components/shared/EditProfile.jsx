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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdModeEditOutline } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast, Toaster } from "sonner";
import { updateUser } from "@/actions/Auth";
import { useState } from "react";

export function EditProfileDialogBox() {
    const { user } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
 
    const handleResumeChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            setFieldValue("file", file);

        }
    };

    const handleSubmit = async (values) => {
        // console.log(values);
        setLoading(true)
        const formData = new FormData();
        formData.append('fullname', values.fullname);
        formData.append('bio', values.bio);
        formData.append('email', values.email);
        formData.append('phoneNumber', values.phone);
        formData.append('skills', values.skills);
        if(values.file){
            formData.append('file', values.file);
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        const res = await dispatch(updateUser(formData));
        setLoading(false)
        if (res.error) {
            toast.error(res?.payload || "Error occured");
            return;
        }
        toast.success("Profile updated");
    };


    return (
        <Dialog className="px-2 sm:px-0">
            <DialogTrigger asChild >
                <div className='absolute top-3 right-3 h-8 w-8 cursor-pointer flex justify-center items-center text-lg border text-bold rounded-full'>
                    <MdModeEditOutline />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#020021] text-slate-300">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        fullname: user?.fullname || "",
                        bio: user?.profile?.bio || "",
                        email: user?.email || "",
                        phone: user?.phoneNumber || "",
                        skills: user?.profile?.skills.join() || "",
                        file: null,
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullname" className="text-left">
                                    Fullname:
                                </Label>
                                <Field
                                    id="fullname"
                                    name="fullname"
                                    as={Input}
                                    className="col-span-3 bg-transparent"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-left">
                                    Bio:
                                </Label>
                                <Field id="bio" name="bio" as={Input} className="col-span-3 bg-transparent" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-left">
                                    Email:
                                </Label>
                                <Field id="email" name="email" as={Input} className="col-span-3 bg-transparent" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-left">
                                    Phone:
                                </Label>
                                <Field id="phone" name="phone" as={Input} className="col-span-3 bg-transparent" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-left">
                                    Skills:
                                </Label>
                                <Field id="skills" name="skills" as={Input} className="col-span-3 bg-transparent" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="resume" className="text-left">
                                    Resume:
                                </Label>
                                <Input
                                    id="resume"
                                    name="file"
                                    type="file"
                                    className="col-span-3 bg-transparent"
                                    onChange={(event) => handleResumeChange(event, setFieldValue)}
                                />
                            </div>
                            <DialogFooter>
                                {
                                    loading ? <Button disabled className="w-full mt-4 bg-blue-500">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button> : <Button className="w-full   mt-4 hover:bg-blue-400 bg-blue-500" type="submit">Update</Button>
                                }
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
}
