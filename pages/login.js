import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Footer from "@/components/ui/footer";
import Link from "next/link"; // ✅ Correct Import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>Login | AlignAI</title>
      </Head>

      <div className="flex justify-center items-center px-4 pt-20 pb-32">
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-white text-3xl font-bold mb-6 text-center">Login</h1>

          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 mb-4"
            required
          />

          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 mb-6"
            required
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Login
          </button>

          <p className="text-gray-400 mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
