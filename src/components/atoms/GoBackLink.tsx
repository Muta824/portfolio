import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const GoBackLink = ({ href }: { href?: string }) => {
    return (
        <Link href={`/${href}` || "/"} className="flex items-center gap-1 px-2 py-1 w-fit text-blue-600 rounded-md mb-4 text-md">
            <ArrowLeftIcon className="w-4 h-4" /> back to {href || "home"}
        </Link>
    )
}