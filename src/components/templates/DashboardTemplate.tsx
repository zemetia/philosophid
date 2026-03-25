"use client";
import React from "react";
import { Sidebar } from "../organisms/Sidebar";
import { usePathname } from "next/navigation";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const isEditorPage = pathname === "/dashboard/publication/new";

  if (isEditorPage) {
    return (
      <div className="min-h-screen bg-white">
        <main className="w-full h-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F4F2ED]">
      {/* Sidebar hidden on mobile for now, until we have a mobile drawer */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <main className="flex-1 p-6 md:p-12 lg:p-24 overflow-y-auto w-full">
        {children}
      </main>

      {/* Noise overlay specific to dashboard if needed, though global usually handles it */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 mix-blend-multiply opacity-30"></div>
    </div>
  );
};
