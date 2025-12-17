import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const auth = getAuth();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <img src="/logo.svg" alt="DeepForge AI" className="w-48 mb-8" />
      <h1 className="text-3xl mb-4">DeepForge AI</h1>
      <p className="mb-8">Stormworks vehicle & microcontroller intelligence</p>
      <button onClick={login} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500">
        Sign in with Google
      </button>
    </div>
  );
}
