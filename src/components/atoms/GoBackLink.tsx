import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const GoBackLink = ({ href = "" }: { href?: string }) => {
    return (
        <Link href={`/${href}`} className="flex items-center gap-1 px-2 w-fit text-blue-600 rounded-md text-md">
            <ArrowLeftIcon className="w-4 h-4" /> back to {href || "home"}
        </Link>
    )
}