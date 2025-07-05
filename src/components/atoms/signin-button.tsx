import Link from "next/link"
 
export function SignIn() {
  return (
    <Link href="/signin">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
        Sign in
      </button>
    </Link>
  )
} 