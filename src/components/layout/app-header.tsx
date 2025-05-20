"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { VisualFlowLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return ( // Return a placeholder or null to avoid mismatched server/client rendering
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
        <div className="h-8 w-8" /> {/* Placeholder for SidebarTrigger */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6" /> {/* Placeholder for Logo */}
          <h1 className="text-xl font-semibold">VisualFlow</h1>
        </div>
        <div className="ml-auto">
           <div className="h-8 w-8" /> {/* Placeholder for ThemeToggle */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2">
        <VisualFlowLogo className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold text-foreground">VisualFlow</h1>
      </div>
      <div className="ml-auto">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
