"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth, signOut } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Logo } from "../atoms/Logo";
import { MetaText } from "../atoms/Typography";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  User, 
  FileText, 
  BarChart3, 
  Trophy,
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Publication", href: "/dashboard/publication", icon: FileText },
  { label: "Competition", href: "/dashboard/competition", icon: Trophy },
  { label: "Stats", href: "/dashboard/stats", icon: BarChart3 },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState<{ username?: string } | null>(null);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await signOut(auth);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Persistence of sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch("/api/user/profile");
          if (response.ok) {
            const result = await response.json();
            setUserProfile(result.data.user);
          }
        } catch (error) {
          console.error("Failed to fetch user profile for sidebar:", error);
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const items = NAV_ITEMS.map(item => {
    if (item.label === "Profile" && userProfile?.username) {
      return { ...item, href: `/${userProfile.username}` };
    }
    return item;
  });

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? 80 : 256,
        paddingLeft: isCollapsed ? 12 : 32,
        paddingRight: isCollapsed ? 12 : 32,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen sticky top-0 flex flex-col border-r border-black/10 bg-[#F4F2ED] py-8 z-40 group/sidebar"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-black text-white p-1 rounded-full border border-black shadow-sm transform transition-transform hover:scale-110 z-50"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={clsx("mb-16", isCollapsed ? "flex justify-center" : "")}>
        <div className={clsx("transition-transform duration-300", isCollapsed ? "scale-110 origin-center" : "origin-left")}>
          <Logo withText={!isCollapsed} />
        </div>
      </div>

      <nav className="flex flex-col gap-6">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={clsx(
                "group flex items-center gap-4 transition-all duration-300 rounded-lg py-2",
                isCollapsed ? "justify-center px-0" : "px-2 hover:bg-black/5"
              )}
            >
              <div 
                className={clsx(
                  "transition-colors duration-300 flex items-center justify-center",
                  isActive ? "text-black" : "text-[#8E8E8E] group-hover:text-black"
                )}
              >
                <Icon size={isCollapsed ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1 overflow-hidden"
                >
                  <MetaText
                    className={clsx(
                      "transition-colors duration-300 whitespace-nowrap",
                      isActive
                        ? "text-black font-semibold"
                        : "text-[#8E8E8E] group-hover:text-black",
                    )}
                  >
                    {item.label}
                  </MetaText>
                </motion.div>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-16 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-ui uppercase tracking-widest whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button 
          onClick={handleLogout}
          className={clsx(
            "group flex items-center gap-4 transition-all duration-300 py-2 w-full text-left",
            isCollapsed ? "justify-center" : "px-2 hover:bg-black/5 rounded-lg"
          )}
        >
          <div className="text-[#8E8E8E] group-hover:text-black transition-colors duration-300">
            <LogOut size={isCollapsed ? 22 : 18} />
          </div>
          
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <MetaText className="text-[#8E8E8E] group-hover:text-black transition-colors duration-300 text-[10px] opacity-70 whitespace-nowrap">
                Exit Dashboard
              </MetaText>
            </motion.div>
          )}
        </button>
      </div>
    </motion.aside>
  );
};
