import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";  // ✅ ADD THIS
import { Link } from "@heroui/link";    // ✅ ADD THIS
import { Divider } from "@heroui/divider";
import Head from "next/head";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { RocketIcon, SearchIcon, LightbulbIcon } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      
      <Head>
      <title>AlignAI</title>
      <link rel="icon" type="image/svg+xml" href="/align-ai-navbar-logo.svg" />
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
      src="/align-ai-navbar-logo.svg"
      alt="AlignAI Logo"
      width={150}
      height={150}
      className="mb-6"
    />

    <motion.h1 
      className="text-5xl md:text-7xl font-bold mb-4 tracking-tight relative inline-block text-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      AlignAI
    </motion.h1>

    <motion.h2 
      className="text-2xl md:text-3xl font-semibold mb-8 text-gray-300 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      Empowering students to build their future with AI-driven tools and opportunities.
    </motion.h2>

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
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-5xl font-bold text-white mb-6"
  >
    About AlignAI
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    viewport={{ once: true }}
    className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
  >
    At AlignAI, our mission is to bridge the gap between students and real-world opportunities through AI-powered tools.
    We believe every student deserves personalized guidance, easy access to jobs, and skills that make a difference.
  </motion.p>

  <div className="flex flex-wrap justify-center gap-8">
    {/* Card 1 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group bg-blue-700 p-8 rounded-xl w-[300px] text-white flex flex-col items-center hover:bg-sky-950 shadow-lg transition-all duration-300"
    >
      <RocketIcon className="w-12 h-12 mb-6 text-blue-400 group-hover:text-blue-300 transition-all duration-150" />
      <h3 className="text-2xl font-bold mb-2">Build Your Resume</h3>
      <p className="text-gray-300 text-sm">
        Use AI to craft a resume that stands out to recruiters.
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="group bg-blue-700 p-8 rounded-xl w-[300px] text-white flex flex-col items-center hover:bg-sky-950 shadow-lg transition-all duration-300"
    >
      <SearchIcon className="w-12 h-12 mb-6 text-blue-400 group-hover:text-blue-300 transition-all duration-150" />
      <h3 className="text-2xl font-bold mb-2">Find Opportunities</h3>
      <p className="text-gray-300 text-sm">
        Discover internships and jobs that match your skills and goals.
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="group bg-blue-700 p-8 rounded-xl w-[300px] text-white flex flex-col items-center hover:bg-sky-950 shadow-lg transition-all duration-300"
    >
      <LightbulbIcon className="w-12 h-12 mb-6 text-blue-400 group-hover:text-blue-300 transition-all duration-150" />
      <h3 className="text-2xl font-bold mb-2">Grow Your Skills</h3>
      <p className="text-gray-300 text-sm">
        Access resources, workshops, and mentorships to level up.
      </p>
    </motion.div>
  </div>
</section>




<Footer/>
    </div>
  );
}