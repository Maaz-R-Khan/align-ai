import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import React from "react";
//import Gagan from "@/components/Images/Gagan.jpeg";


export default function About_us() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      
      {/* Navbar */}
      <nav className="w-full bg-black p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">AlignAI</div>

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
        <section className="py-20 text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                At AlignAI, we're transforming the job search experience by connecting the right people with the right opportunities through AI-powered resume optimization and intelligent job matching.
                </p>
            </div>
            </section>


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
          img="https://via.placeholder.com/200"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-10 mt-10">
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
          img= "/public/images/Gagan.jpeg"
        />
      </div>
    </div>
)};

