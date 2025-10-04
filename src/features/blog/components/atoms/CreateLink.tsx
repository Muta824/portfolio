import Link from "next/link";
import { auth } from "@/auth";

export async function CreateLink() {
    const session = await auth();

    if (session?.user?.role !== "admin") {
        return null;
    }

    return (
        <Link
            href="/blog/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            新規作成
        </Link>
    )
}