"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, Image as ImageIcon, Info, Shield } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Book", href: "/booking", icon: <Calendar className="w-6 h-6" /> },
    { name: "Gallery", href: "/gallery", icon: <ImageIcon className="w-6 h-6" /> },
    { name: "About", href: "/about", icon: <Info className="w-6 h-6" /> },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header
        className={clsx(
          "hidden md:block fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b",
          isScrolled
            ? "bg-black/70 backdrop-blur-md py-4 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-6 border-transparent"
        )}
      >
        <div className="container mx-auto px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex flex-col items-start group">
            <span className="text-3xl font-outfit font-black tracking-tighter text-white uppercase flex items-center gap-2">
              ACM <span className="text-primary font-light">Turf</span>
            </span>
            <span className="text-[10px] tracking-widest text-accent uppercase font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
              Est. 2026
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm uppercase tracking-wider font-semibold transition-colors relative group",
                  pathname === link.href ? "text-primary" : "text-gray-300 hover:text-white"
                )}
              >
                {link.name}
                <span className={clsx("absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ease-out", pathname === link.href ? "w-full" : "w-0 group-hover:w-full")} />
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 pb-safe">
        <nav className="flex items-center justify-around px-2 py-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex flex-col items-center gap-1 min-w-[64px] transition-colors",
                  isActive ? "text-primary" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <div className={clsx("p-1 rounded-full", isActive && "bg-primary/10")}>
                  {link.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
