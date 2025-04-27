// components/Navbar.jsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Image } from "@heroui/image";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

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
          <NavigationMenuList className="flex space-x-6 items-center">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="text-white font-bold hover:no-underline">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/jobs" className="text-white font-bold hover:no-underline">
                Jobs
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/jobs?tab=resume" className="text-white font-bold hover:no-underline">
                Resume Optimizer
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/aboutus" className="text-white font-bold hover:no-underline">
                About Us
              </NavigationMenuLink>
            </NavigationMenuItem>

            {user ? (
              <>
                <span className="text-white font-medium">Hi, {user.displayName || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:no-underline px-3 py-1 rounded border border-white transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/login"
                    className="text-white hover:no-underline px-3 py-1 rounded border border-white transition"
                  >
                    Login
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/signup"
                    className="text-white hover:no-underline px-3 py-1 rounded border border-white transition"
                  >
                    Sign Up
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
