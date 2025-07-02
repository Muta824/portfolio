'use client'

import { signInWithCredentials, signInWithProvider } from "./actions";
import { use } from "react";  
import { providerMap } from "../../../auth";


export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined; error?: string }>;
}) {
  const { callbackUrl } = use(searchParams);

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border border-gray-200 rounded-lg shadow-md">
      <h1>ログイン</h1>
      {providerMap.map((provider) => (
        <form action={signInWithProvider} key={provider.id}>
          <input type="hidden" name="providerId" value={provider.id} />
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign in with {provider.name}
          </button>
        </form>
      ))}

      <hr className="my-4" />
      <p className="text-center text-gray-600 mb-4">または</p>

      <form action={signInWithCredentials}>
        <div className="mb-4">
          <label className="block mb-2">メールアドレス</label>
          <input type="email" name="email" placeholder="メールアドレス" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">パスワード</label>
          <input type="password" name="password" placeholder="パスワード" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">ログイン</button>
      </form>
      
    </div>
  );
}
