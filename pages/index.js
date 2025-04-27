import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";  // ✅ ADD THIS
import { Link } from "@heroui/link";    // ✅ ADD THIS
import { Divider } from "@heroui/divider";
import Head from "next/head";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      
      <Head>
  <title>AlignAI</title>
  <link rel="icon" href="/favicon.ico" />
</Head>


      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black text-center p-8">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
        >
          <source src="/stars.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center">

        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-50"></div>
        <Image 
      src="/align-ai-navbar-logo.svg"   // your logo path
      alt="AlignAI Logo"
      width={150}                       // adjust size if needed
      height={150}
      className="mb-6"                  // margin bottom to separate from heading
    />
          <motion.h1 
            className="text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AlignAI
          </motion.h1>

          <motion.p 
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Connecting students with real-world opportunities, powered by AI.
          </motion.p>

          <motion.a 
            href="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Get Started
          </motion.a>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-b from-black to-blue-950 text-center px-6">
  <h2 className="text-5xl font-bold text-white mb-6">About AlignAI</h2>
  <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
    At AlignAI, our mission is to bridge the gap between students and real-world opportunities through AI-powered tools. 
    We believe every student deserves personalized guidance, easy access to jobs, and skills that make a difference.
  </p>

  <div className="flex flex-wrap justify-center gap-8 border-solid">
    {/* Card 1 */}
    <div className="bg-blue-900 p-6 rounded-lg w-[300px] text-white flex flex-col items-center hover:bg-sky-950">
      <div className="text-4xl mb-4">🚀</div> 
      <h3 className="text-xl font-bold mb-2">Build Your Resume</h3>
      <p className="text-gray-300">
        Use AI to craft a resume that stands out to recruiters.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-blue-800 p-6 rounded-lg w-[300px] text-white flex flex-col items-center  hover:bg-sky-950">
      <div className="text-4xl mb-4">🔍</div> 
      <h3 className="text-xl font-bold mb-2">Find Opportunities</h3>
      <p className="text-gray-300">
        Discover internships and jobs that match your skills and goals.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-blue-700 p-6 rounded-lg w-[300px] text-white flex flex-col items-center  hover:bg-sky-950">
      <div className="text-4xl mb-4">💡</div> 
      <h3 className="text-xl font-bold mb-2">Grow Your Skills</h3>
      <p className="text-gray-300">
        Access resources, workshops, and mentorships to level up.
      </p>
    </div>
  </div>
</section>

<Footer/>
    </div>
  );
}