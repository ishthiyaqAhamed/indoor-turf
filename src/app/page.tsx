"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Trophy, Shield, Zap, MapPin } from "lucide-react";
import Link from "next/link";
import BookingSystem from "@/components/BookingSystem";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          {/* Silent Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Using a high-quality free football stock video placeholder */}
            <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
          {/* Overlays for contrast and luxury feel */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black z-10" />
        </motion.div>

        <motion.div 
          style={{ opacity, y }}
          className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-widest uppercase text-gray-300">Open 24/7 in Colombo</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl"
          >
            Play Like <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#059669]">Champions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light"
          >
            Welcome to ACM Indoor Turf. Sri Lanka's most luxurious, professional-grade indoor futsal arena designed for the ultimate sporting experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link
              href="#book"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-10 py-4 font-bold text-black transition-all hover:scale-105 hover:bg-gray-100"
            >
              <span>Book Your Pitch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="#location"
              className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/20 px-10 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              <MapPin className="w-5 h-5" />
              <span>Get Directions</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48, 48] }}
              transition={{ repeat: Infinity, duration: 2, ease: "circInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="facilities" className="py-32 bg-[#050505] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-4">
              World Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FFF3B0]">Facilities</span>
            </h2>
            <p className="text-gray-400 text-lg">Every detail crafted for an elite football experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Trophy className="w-10 h-10 text-accent" />,
                title: "FIFA Approved Turf",
                desc: "Premium quality artificial grass, providing perfect bounce, grip, and safety for professional play."
              },
              {
                icon: <Zap className="w-10 h-10 text-primary" />,
                title: "Pro Lighting",
                desc: "Shadowless LED sports lighting system illuminating the pitch perfectly for night games and recordings."
              },
              {
                icon: <Shield className="w-10 h-10 text-blue-400" />,
                title: "Luxury Amenities",
                desc: "Air-conditioned dressing rooms, hot showers, spectator lounges, and a premium cafe area."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="glass-card p-10 rounded-3xl group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-outfit">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <BookingSystem />

      {/* About Us / Location Section */}
      <section id="about" className="py-24 bg-[#0a0a0a] relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-6">
                About <span className="text-primary">Us</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Established in 2026, ACM Indoor Turf is Sri Lanka's premier indoor futsal facility. We are dedicated to providing a world-class sporting experience for players of all levels. From our FIFA-approved turf to our luxury amenities, every detail has been meticulously crafted to elevate your game.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Address</h4>
                    <p className="text-gray-400">ACM INDOOR TURF, 73/5 Isnapulla Road, Dharga Town</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://maps.app.goo.gl/RqcNVquE2nXXiKNc9" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-black transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
            
            <div className="lg:w-1/2 w-full h-[400px] rounded-3xl overflow-hidden glass p-2">
              <iframe
                src="https://maps.google.com/maps?q=ACM%20INDOOR%20TURF,%20Dharga%20Town&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
