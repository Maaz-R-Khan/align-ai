import React from "react";
import { Card, CardBody, Image } from "@heroui/react";

export default function TeamMemberCard({ name, role, bio, img }) {
  return (
    
    <Card
    isBlurred
    className="w-11/12 sm:w-3/4 md:w-2/5 lg:w-1/4 min-w-[260px] 
                border border-gray-700 bg-white/10 backdrop-blur-md rounded-lg shadow-lg transition-all duration-300"
    >
        <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt={`${name} photo`}
              className="object-cover"
              height={200}
              shadow="md"
              src={img}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <h3 className="font-semibold text-foreground/90">{name}</h3>
            <p className="text-small text-foreground/80">{role}</p>
            <h1 className="text-large font-medium mt-2">{bio}</h1>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}