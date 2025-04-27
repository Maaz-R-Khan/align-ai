import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@heroui/image";
import { AlignCenter } from "lucide-react";
import Footer from '@/components/ui/Footer';


export default function About_us() {
  return (

    <div className="min-h-screen flex flex-col bg-black">
      
      {/* Navbar */}
      <nav className="w-full bg-black p-4 ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          
    <Image
      src="/align-ai-navbar-logo.svg"
      alt="AlignAI Logo"
      width={60}
      height={60}
      className="rounded-full"
    />
    <div className="text-white text-2xl font-bold">AlignAI</div>
  </div>

          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="text-white hover:underline">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/jobs" className="text-white hover:underline">Jobs</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/resume" className="text-white hover:underline">Resume Optimizer</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="text-white hover:underline">About Us</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>


     {/* Hero Section */}

      <motion.section
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1.0 }}
      className="py-20 text-center">
        <div className="container mx-auto px-6">
                <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                At AlignAI, we're transforming the job search experience by connecting the right people with the right opportunities through AI-powered resume optimization and intelligent job matching.
                </p>
              </div>
      </motion.section>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Image 
        src="/align-ai-navbar-logo.svg"   
        alt="AlignAI Logo"
        width={150}                       
        height={150}
        className="mb-6"
        al                  // margin bottom to separate from heading
      />
    </div>

      <motion.section
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1.0 }}
      className="py-20 text-center">

            <h1 className="text-5xl font-bold mb-6">Meet the Minds Behind AlignAI</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We’re a team of creators, thinkers, and problem-solvers committed to using AI to simplify and elevate your job search journey.
              </p>

              </motion.section>
            

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        <TeamMemberCard 
          name="Simon Ramirez"
          role="Software Engineer"
          bio="Passionate about AI & Web Development"
          img="https://heroui.com/images/album-cover.png"
        />

        <TeamMemberCard 
          name="Oscar Gurrero"
          role="Product Designer"
          bio="Creating seamless user experiences"
          img="https://heroui.com/images/album-cover.png"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-10 mt-10 ">
        <TeamMemberCard 
          name="Maaz Khan"
          role="Software Engineer"
          bio="Passionate about AI & Web Development"
          img="https://heroui.com/images/album-cover.png"
        />

        <TeamMemberCard 
          name="Gagan Sapkota"
          role="Product Designer"
          bio="Creating seamless user experiences"
          img= "https://heroui.com/images/album-cover.png"
        />
      </div>

      <div className="min-h-screen flex flex-col bg-black text-white p-8 max-h-15">
    {/* Your page content */}

    <Footer />
    </div>

    </div>



)};

