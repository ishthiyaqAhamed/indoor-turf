"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex flex-col items-start group inline-block">
              <span className="text-3xl font-outfit font-black tracking-tighter text-white uppercase flex items-center gap-2">
                ACM <span className="text-primary font-light">Turf</span>
              </span>
              <span className="text-xs tracking-widest text-accent uppercase font-semibold opacity-80">
                Est. 2026
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Sri Lanka's premier indoor futsal facility, offering professional-grade pitches, luxury amenities, and an unparalleled sporting experience.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-outfit font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#facilities" className="text-gray-400 hover:text-primary transition-colors text-sm">Our Facilities</Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-primary transition-colors text-sm">Book a Pitch</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-primary transition-colors text-sm">Gallery</Link>
              </li>
              <li>
                <Link href="#rules" className="text-gray-400 hover:text-primary transition-colors text-sm">Rules & Regulations</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-outfit font-bold uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  ACM INDOOR TURF,<br />
                  73/5 Isnapulla Road,<br />
                  Dharga Town
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@acmturf.lk</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-outfit font-bold uppercase tracking-wider mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers, tournaments, and updates.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-black font-bold uppercase tracking-wider text-sm rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} ACM Indoor Turf. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
