import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@heroui/image";
import { AlignCenter } from "lucide-react";
import Footer from '@/components/ui/footer';
import Navbar from "@/components/ui/navbar";

export default function About_us() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      
      {/* Navbar */}
      <nav className="w-full bg-black p-4">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <Navbar />
  </div>
</nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="py-20 text-center"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AlignAI was born from our own struggles navigating the job market.
            We know how overwhelming it can feel — applying, getting rejected, not knowing how to improve.
            So we decided to create the solution we wished we had: an AI-powered job matcher and resume optimizer built to empower students&apos; best selves, discover the right opportunities, and connect with employers who value their potential.
            We&apos;re here to make the job search less stressful — and more successful.
          </p>
        </div>
      </motion.section>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src="/align-ai-navbar-logo.svg"
          alt="AlignAI Logo"
          width={150}
          height={150}
          className="mb-6"
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="py-20 text-center"
      >
        <h1 className="text-5xl font-bold mb-6">Meet the Minds Behind AlignAI</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We&apos;re a team of creators, thinkers, and problem-solvers committed to using AI to simplify and elevate your job search journey.
        </p>
      </motion.section>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        <TeamMemberCard
          name="Simon Ramirez"
          role="Software Engineer"
          bio="Passionate about AI & Web Development"
          img="/Simon.jpeg"
        />
        <TeamMemberCard
          name="Oscar Gurrero"
          role="Product Designer"
          bio="Creating seamless user experiences"
          img="/Oscar.jpeg"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        <TeamMemberCard
          name="Maaz Khan"
          role="Software Engineer"
          bio="Passionate about AI & Web Development"
          img="/Maaz.JPG"
        />
        <TeamMemberCard
          name="Gagan Sapkota"
          role="Product Designer"
          bio="Creating seamless user experiences"
          img="/Gagan.jpeg"
        />
      </div>

      <Footer />
    </div>
  );
}
