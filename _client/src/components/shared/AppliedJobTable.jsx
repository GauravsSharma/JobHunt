import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"
import { formatReadableDateWithFullMonth } from "@/utils/formatDate"

const appliedJob = [
    {
        date: "10/20/2004",
        job_role: "Frontend Intern",
        company: "Microsoft",
        status: " Pending",
    },
    {
        date: "10/20/2004",
        job_role: "Frontend Intern",
        company: "Microsoft",
        status: " Pending",
    },
    {
        date: "10/20/2004",
        job_role: "Frontend Intern",
        company: "Microsoft",
        status: " Pending",
    },
    {
        date: "10/20/2004",
        job_role: "Frontend Intern",
        company: "Microsoft",
        status: " Pending",
    },
    {
        date: "10/20/2004",
        job_role: "Frontend Intern",
        company: "Microsoft",
        status: " Pending",
    },

]

export function TableDemo({
    appliedApplications,
}) {
    return (
        <Table>
            <TableCaption>List of jobs that you have applied</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Job role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appliedApplications.map((job, i) => (
                    <TableRow key={i}>
                        <TableCell className="font-medium">{formatReadableDateWithFullMonth(job?.createdAt,false)}</TableCell>
                        <TableCell>{job?.job?.title}</TableCell>
                        <TableCell>{job?.job?.company.name}</TableCell>
                        <TableCell className="text-right">
                            <Badge className={`pb-1 ${job.status==="accepted"?"bg-green-500":job.status==="rejected"?"bg-rose-500":"bg-yellow-500"}`}>{job?.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
