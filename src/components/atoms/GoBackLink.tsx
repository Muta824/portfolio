import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface GoBackLinkProps {
    href?: string;
    children?: React.ReactNode;
}

export const GoBackLink = ({ href = "", children }: GoBackLinkProps) => {
    return (
        <Link href={`/${href}`} className="flex items-center gap-1 px-2 w-fit text-blue-600 rounded-md text-md">
            <ArrowLeftIcon className="w-4 h-4" /> {children || "Go Back"}
        </Link>
    )
}