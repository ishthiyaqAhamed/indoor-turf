"use client";

import BookingSystem from "@/components/BookingSystem";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const offers = [
  {
    id: 1,
    tag: "Limited Time Offer",
    title: "Weekend",
    highlight: "Madness!",
    description: "Book any pitch for 3 hours and get the 4th hour absolutely FREE! Perfect for tournaments and extended practice sessions.",
    image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gradient: "from-[#0a2e1f]/90 via-black/80 to-[#1a1a1a]/90"
  },
  {
    id: 2,
    tag: "Tournament Special",
    title: "Corporate",
    highlight: "Leagues",
    description: "Host your next corporate tournament with us. Special bulk booking discounts and professional catering available.",
    image: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gradient: "from-blue-950/90 via-black/80 to-black/90"
  },
  {
    id: 3,
    tag: "Member Exclusive",
    title: "Monthly",
    highlight: "Passes",
    description: "Get unlimited off-peak access with our new Monthly Pro Pass. Elevate your game every single day.",
    image: "https://images.pexels.com/photos/314154/pexels-photo-314154.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gradient: "from-purple-950/90 via-black/80 to-black/90"
  }
];

export default function BookingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % offers.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? offers.length - 1 : prev - 1));

  return (
    <div className="pt-32 min-h-screen bg-black">
      {/* Promotional Billboard Slider */}
      <div className="container mx-auto px-6 md:px-12 mb-8">
        <div className="relative rounded-3xl overflow-hidden glass border border-white/10 h-[400px] md:h-[350px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url(${offers[currentSlide].image})` }}
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${offers[currentSlide].gradient}`} />

              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
                <div className="max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm mb-4 tracking-widest uppercase backdrop-blur-md shadow-xl">
                    <span>{offers[currentSlide].tag}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-outfit font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg">
                    {offers[currentSlide].title} <span className="text-primary">{offers[currentSlide].highlight}</span>
                  </h2>
                  <p className="text-gray-200 text-lg md:text-xl font-light drop-shadow-md">
                    {offers[currentSlide].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-4 z-20">
            <div className="flex gap-2 mr-4">
              {offers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50 w-2.5"
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-black transition-all backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-black transition-all backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Component */}
      <div className="-mt-4">
        <BookingSystem />
      </div>
    </div>
  );
}
