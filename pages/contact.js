import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import Head from "next/head";
import { motion } from "framer-motion";

export default function Contact() {   // Capitalized component name
  return (
    <div className="min-h-screen flex flex-col bg-black">
      
      <Head>
        <title>AlignAI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      {/* Navbar */}
      <Navbar />


      <motion.section
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1.0 }}
      className="py-20 text-center">
        <div className="container mx-auto px-6">
                <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
              </div>
      

      <form
       action="https://api.web3forms.com/submit"
       method="POST"
       className="px-10 py-6">
        {/* Hidden input for Web3Forms Access Key */}
            <input 
                type="hidden" 
                name="access_key" 
                value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} 
            />


        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          
          {/* Username - spans 4 columns */}
            <div className="sm:col-span-3">
            <label htmlFor="username" className="block text-sm font-bold text-white -ml-150">Username</label>
            <div className="mt-2">
                <div className="flex items-center rounded-md bg-gray-600 pl-3 outline-1 -outline-offset-1 outline-gray-600 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-300 focus:outline-none sm:text-sm" 
                    placeholder="Exp: John123" 
                />
                </div>
            </div>
            </div>

            {/* Email - spans 2 columns */}
            <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-bold text-white -ml-145">Email address</label>
            <div className="mt-2">
                <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" 
                placeholder="Exp: JohnDoe@email.com" 
                />
            </div>
            </div>

          {/* First Name */}
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-bold text-white -ml-150">First name</label>
            <div className="mt-2">
              <input 
                type="text" 
                name="first-name" 
                id="first-name" 
                autoComplete="given-name" 
                className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" 
                placeholder='Exp: John'
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-bold text-white -ml-150">Last name</label>
            <div className="mt-2">
              <input 
                type="text" 
                name="last-name" 
                id="last-name" 
                autoComplete="family-name" 
                className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" 
                placeholder='Exp: Doe'
              />
            </div>
          </div>


          {/* About */}
          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-bold text-white -ml-335 ">About</label>
            <div className="mt-2">
              <textarea 
                name="about" 
                id="about" 
                rows="3" 
                className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                placeholder='Exp: I love xyz from your service!'
              ></textarea>
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button 
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition -ml-320"
          >
            Submit
          </button>
        </div>
      </form>
      </motion.section>

      <Footer/>
    </div>
  );
}