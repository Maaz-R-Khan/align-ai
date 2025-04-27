import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Footer from "@/components/ui/footer";
import Link from "next/link"; // ✅ ADD THIS

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCred.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });
      router.push("/");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>Sign Up | AlignAI</title>
      </Head>

      <div className="flex justify-center items-center px-4 pt-20 pb-32">
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-white text-3xl font-bold mb-6 text-center">Sign Up</h1>

          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Username", name: "username" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" }
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="mb-4">
              <label className="block text-white mb-2">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                required
              />
            </div>
          ))}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Sign Up
          </button>

          <p className="text-gray-400 mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
