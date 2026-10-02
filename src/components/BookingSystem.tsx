"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";
import clsx from "clsx";

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPitch, setSelectedPitch] = useState<string>("");
  const [agreedToRules, setAgreedToRules] = useState(false);

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM",
    "11:00 PM", "12:00 AM"
  ];

  const pitches = [
    { 
      id: "pro", 
      name: "Pro Futsal Pitch", 
      size: "Futsal (5v5)", 
      price: "Rs. 4,500/hr",
      image: "/pro-pitch.png",
      description: "FIFA approved astroturf with shock pads. Perfect for competitive 5-a-side matches."
    },
    { 
      id: "bowling", 
      name: "Bowling Machine Pitch", 
      size: "Cricket Practice", 
      price: "Rs. 3,500/hr",
      image: "/bowling-machine.png",
      description: "Professional indoor cricket net equipped with a fully automated bowling machine."
    }
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <section id="book" className="py-32 relative z-10 bg-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-outfit font-black text-white uppercase tracking-tighter mb-4">
              Secure Your <span className="text-primary">Pitch</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Experience the ultimate futsal facility. Book your preferred time slot online instantly.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-6 md:p-10">
            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
              
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s}
                  className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors duration-300",
                    step >= s ? "bg-primary text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "bg-[#111] text-gray-500 border border-white/10"
                  )}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>

            {/* Step 1: Select Pitch */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6 font-outfit">Select Pitch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pitches.map((pitch) => (
                    <button
                      key={pitch.id}
                      onClick={() => setSelectedPitch(pitch.id)}
                      className={clsx(
                        "rounded-2xl border text-left transition-all duration-300 group overflow-hidden flex flex-col",
                        selectedPitch === pitch.id
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.02]"
                          : "border-white/10 bg-white/5 hover:border-white/30 hover:scale-[1.01]"
                      )}
                    >
                      <div className="w-full h-48 relative overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={pitch.image} 
                          alt={pitch.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h4 className="text-xl font-bold text-white mb-1">{pitch.name}</h4>
                          <p className="text-accent font-bold font-mono text-sm">{pitch.price}</p>
                        </div>
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                          <Users className="w-4 h-4" />
                          <span>{pitch.size}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {pitch.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 font-outfit">Select Date</h3>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full md:w-auto bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
                  />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 font-outfit">Select Time</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={clsx(
                          "py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-300",
                          selectedTime === time
                            ? "border-primary bg-primary text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Your Details */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6 font-outfit">Your Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Phone Number</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="+94 7X XXX XXXX" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-gray-400">Email Address (Optional)</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Rules & Regulations
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-2 mb-6 list-disc list-inside">
                    <li>Strictly non-marking indoor shoes or turf shoes only. No metal studs.</li>
                    <li>No food, chewing gum, or smoking allowed on the pitch.</li>
                    <li>Please arrive at least 10 minutes prior to your booking time.</li>
                    <li>Cancellations must be made at least 24 hours in advance.</li>
                  </ul>
                  <label className="flex items-center gap-3 cursor-pointer group/checkbox">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded border border-white/30 bg-white/5 group-hover/checkbox:border-primary transition-colors">
                      <input 
                        type="checkbox" 
                        className="opacity-0 absolute w-full h-full cursor-pointer z-10"
                        checked={agreedToRules}
                        onChange={(e) => setAgreedToRules(e.target.checked)}
                      />
                      {agreedToRules && <CheckCircle2 className="w-4 h-4 text-primary absolute pointer-events-none" />}
                    </div>
                    <span className="text-sm text-white font-medium group-hover/checkbox:text-primary transition-colors">
                      I have read and agree to the rules and regulations.
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-outfit">Booking Confirmed!</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Your turf booking has been successfully secured. We have sent an SMS with the booking reference to your phone.
                </p>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-sm mx-auto text-left space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-400 text-sm">Pitch</span>
                    <span className="text-white font-bold">{pitches.find(p => p.id === selectedPitch)?.name || 'Pitch A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-400 text-sm">Date</span>
                    <span className="text-white font-bold">{selectedDate || 'Select a date'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-400 text-sm">Time</span>
                    <span className="text-white font-bold">{selectedTime || 'Select a time'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400 text-sm">Total Amount</span>
                    <span className="text-accent font-bold text-xl">{pitches.find(p => p.id === selectedPitch)?.price || 'Rs. 4,500/hr'}</span>
                  </div>
                </div>

                <button 
                  onClick={() => { setStep(1); setSelectedPitch(""); setSelectedDate(""); setSelectedTime(""); }}
                  className="text-primary hover:text-white transition-colors underline underline-offset-4"
                >
                  Book Another Session
                </button>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={clsx(
                    "px-6 py-3 rounded-full font-semibold transition-colors",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  Back
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={(step === 1 && !selectedPitch) || (step === 2 && (!selectedDate || !selectedTime)) || (step === 3 && !agreedToRules)}
                  className={clsx(
                    "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all",
                    (step === 1 && !selectedPitch) || (step === 2 && (!selectedDate || !selectedTime)) || (step === 3 && !agreedToRules)
                      ? "bg-white/10 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-black hover:bg-primary/90 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  )}
                >
                  {step === 3 ? "Confirm Booking" : "Continue"}
                  {step < 3 && <ChevronRight className="w-5 h-5" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
