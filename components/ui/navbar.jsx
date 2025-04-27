// components/Navbar.jsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Image } from "@heroui/image"; 
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo and Brand Name */}
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

        {/* Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="text-white hover:no-underline">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/jobs" className="text-white hover:no-underline">
                Jobs
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/jobs?tab=resume" className="text-white hover:no-underline">
                Resume Optimizer
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className="text-white hover:no-underline">
                About Us
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </nav>
  );
}
