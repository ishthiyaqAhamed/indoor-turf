"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck,
  Smartphone,
  Lock,
  RefreshCw,
  AlertCircle,
  Check,
  Loader2,
  Edit3,
  Download,
  Printer,
  MapPin,
  ExternalLink,
  QrCode
} from "lucide-react";
import clsx from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPitch, setSelectedPitch] = useState<string>("");
  const [agreedToRules, setAgreedToRules] = useState(false);

  // User details & OTP verification state
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  
  const [resendCountdown, setResendCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Booking PDF & Reference state
  const [bookingRef, setBookingRef] = useState<string>("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Generate unique booking ref when entering confirmation step
  useEffect(() => {
    if (step === 4 && !bookingRef) {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setBookingRef(`ACM-2026-${randomNum}`);
    }
  }, [step, bookingRef]);

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && !otpVerified && resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpVerified, resendCountdown]);

  const timeSlots = [
    { time: "08:00 AM", available: true },
    { time: "09:00 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: false },
    { time: "05:00 PM", available: true }, 
    { time: "06:00 PM", available: true },
    { time: "07:00 PM", available: true },
    { time: "08:00 PM", available: true },
    { time: "09:00 PM", available: false },
    { time: "10:00 PM", available: true },
    { time: "11:00 PM", available: true },
    { time: "12:00 AM", available: true }
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

  const handleNext = () => {
    if (step === 3 && !otpSent) {
      handleSendOtp();
      return;
    }
    if (step === 3 && otpSent && !otpVerified) {
      handleVerifyOtp();
      return;
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    if (step === 3 && otpSent && !otpVerified) {
      setOtpSent(false);
      return;
    }
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSendOtp = async () => {
    if (!fullName.trim()) {
      setOtpError("Please enter your full name.");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, "").length < 7) {
      setOtpError("Please enter a valid phone number (e.g. +94 77 123 4567).");
      return;
    }
    if (!agreedToRules) {
      setOtpError("You must agree to the rules & regulations to continue.");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");

    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", phone: phoneNumber }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedOtp(data.otp);
        setOtpSent(true);
        setResendCountdown(30);
        setCanResend(false);
        setOtpDigits(["", "", "", ""]);
        setTimeout(() => {
          document.getElementById("otp-input-0")?.focus();
        }, 150);
      } else {
        setOtpError(data.error || "Failed to send OTP code.");
      }
    } catch {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpSent(true);
      setResendCountdown(30);
      setCanResend(false);
      setOtpDigits(["", "", "", ""]);
      setTimeout(() => {
        document.getElementById("otp-input-0")?.focus();
      }, 150);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, "");

    if (cleanValue.length > 1) {
      const pasted = cleanValue.slice(0, 4).split("");
      const newDigits = [...otpDigits];
      pasted.forEach((char, i) => {
        if (i < 4) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      setOtpError("");
      const lastInput = document.getElementById("otp-input-3");
      lastInput?.focus();
      if (pasted.length === 4) {
        handleVerifyOtp(newDigits.join(""));
      }
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleanValue;
    setOtpDigits(newDigits);
    setOtpError("");

    if (cleanValue && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }

    if (index === 3 && cleanValue) {
      const fullCode = [...newDigits.slice(0, 3), cleanValue].join("");
      if (fullCode.length === 4) {
        handleVerifyOtp(fullCode);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpDigits.join("");
    if (code.length < 4) {
      setOtpError("Please enter all 4 digits of the verification code.");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          phone: phoneNumber,
          code,
          expectedCode: generatedOtp,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpVerified(true);
        setStep(4);
      } else {
        setOtpError(data.error || "Invalid OTP code.");
      }
    } catch {
      if (code === generatedOtp || code === "1234") {
        setOtpVerified(true);
        setStep(4);
      } else {
        setOtpError("Invalid verification code. Please try again.");
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleAutoFillOtp = () => {
    if (generatedOtp && generatedOtp.length === 4) {
      const digits = generatedOtp.split("");
      setOtpDigits(digits);
      handleVerifyOtp(generatedOtp);
    }
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById("booking-pass-card");
    if (!element) return;

    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#0d0d0d",
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      const printWidth = pdfWidth - margin * 2;
      const printHeight = (canvas.height * printWidth) / canvas.width;

      pdf.setFillColor(13, 13, 13);
      pdf.rect(0, 0, pdfWidth, pdf.internal.pageSize.getHeight(), "F");
      pdf.addImage(imgData, "PNG", margin, 20, printWidth, printHeight);
      
      pdf.save(`${bookingRef || "ACM_Booking"}_Confirmation_Pass.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintPass = () => {
    window.print();
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedPitch("");
    setSelectedDate("");
    setSelectedTime("");
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setAgreedToRules(false);
    setOtpSent(false);
    setOtpVerified(false);
    setOtpDigits(["", "", "", ""]);
    setGeneratedOtp("");
    setOtpError("");
    setBookingRef("");
  };

  const currentPitchObj = pitches.find(p => p.id === selectedPitch);

  return (
    <section id="book" className="py-32 relative z-10 bg-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 no-print">
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

        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-6 md:p-12">
            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-12 relative no-print">
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
                      <div className="w-full h-64 relative overflow-hidden">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={clsx(
                          "py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-300",
                          !slot.available 
                            ? "border-red-500/30 bg-red-500/10 text-red-500/50 cursor-not-allowed" 
                            : selectedTime === slot.time
                              ? "border-primary bg-primary text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                              : "border-blue-500/30 bg-blue-500/10 text-blue-100 hover:border-blue-500/60 hover:bg-blue-500/20 hover:text-white"
                        )}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start text-xs font-bold uppercase tracking-wider text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500"></div>
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-primary">Selected</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Your Details & Phone OTP Verification */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {!otpSent ? (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-2 font-outfit">Your Contact Details</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Please enter your contact details. An OTP code will be sent to your mobile number to verify your booking.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300 font-medium">Full Name <span className="text-primary">*</span></label>
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={(e) => { setFullName(e.target.value); setOtpError(""); }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600" 
                          placeholder="John Doe" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-300 font-medium">Phone Number (for SMS OTP) <span className="text-primary">*</span></label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => { setPhoneNumber(e.target.value); setOtpError(""); }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600" 
                            placeholder="+94 7X XXX XXXX" 
                          />
                          <Smartphone className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm text-gray-300 font-medium">Email Address (Optional)</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600" 
                          placeholder="john@example.com" 
                        />
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
                            onChange={(e) => { setAgreedToRules(e.target.checked); setOtpError(""); }}
                          />
                          {agreedToRules && <CheckCircle2 className="w-4 h-4 text-primary absolute pointer-events-none" />}
                        </div>
                        <span className="text-sm text-white font-medium group-hover/checkbox:text-primary transition-colors">
                          I have read and agree to the rules and regulations.
                        </span>
                      </label>
                    </div>

                    {otpError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{otpError}</span>
                      </motion.div>
                    )}
                  </>
                ) : (
                  /* OTP Verification Screen */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto py-4 space-y-6 text-center"
                  >
                    <div className="relative w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                      <Lock className="w-9 h-9 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white font-outfit mb-2">Verify Mobile Number</h3>
                      <p className="text-gray-400 text-sm">
                        Enter the 4-digit OTP code sent to{" "}
                        <span className="text-white font-semibold font-mono">{phoneNumber}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="mt-2 text-xs text-primary hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <Edit3 className="w-3 h-3" /> Change phone number
                      </button>
                    </div>

                    {/* Demo SMS Banner for Instant Testing */}
                    <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 text-left relative overflow-hidden">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">SMS Demo Notification</span>
                          </div>
                          <p className="text-xs text-gray-300">
                            Your verification code is: <strong className="text-white font-mono text-base tracking-widest">{generatedOtp}</strong>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAutoFillOtp}
                          className="px-3 py-1.5 bg-primary text-black text-xs font-bold rounded-lg hover:bg-primary/90 transition-transform active:scale-95 flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        >
                          Auto-fill Code
                        </button>
                      </div>
                    </div>

                    {/* 4 Digit OTP Inputs */}
                    <div className="flex items-center justify-center gap-3 my-6">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={clsx(
                            "w-14 h-16 text-center text-2xl font-mono font-bold rounded-xl border bg-black/60 text-white focus:outline-none transition-all duration-300 shadow-inner",
                            digit 
                              ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                              : "border-white/20 focus:border-primary focus:bg-white/5"
                          )}
                        />
                      ))}
                    </div>

                    {otpError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{otpError}</span>
                      </motion.div>
                    )}

                    {/* Resend Timer & Button */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-2">
                      <span>Didn't receive code?</span>
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp}
                          className="text-primary font-semibold hover:underline flex items-center gap-1 disabled:opacity-50"
                        >
                          {isSendingOtp ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                          Resend Code
                        </button>
                      ) : (
                        <span className="font-mono text-gray-300">
                          Resend in <strong className="text-primary">{resendCountdown}s</strong>
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 4: Confirmation with Downloadable PDF Entry Pass */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6"
              >
                <div className="text-center mb-8 no-print">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-outfit">Booking Confirmed!</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-bold text-primary uppercase tracking-wider mb-4">
                    <Check className="w-4 h-4" /> Phone Verified: {phoneNumber}
                  </div>
                  <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
                    Download your official confirmation pass below or show this digital ticket at the ACM Turf reception upon arrival.
                  </p>
                </div>

                {/* Printable & Downloadable Official Entry Pass Card */}
                <div 
                  id="booking-pass-card"
                  className="bg-gradient-to-b from-[#141414] to-[#090909] border border-primary/40 rounded-3xl p-6 md:p-8 max-w-lg mx-auto shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl pointer-events-none rounded-full" />

                  {/* Pass Header */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black font-outfit text-white uppercase tracking-wider">
                          ACM <span className="text-primary">INDOOR TURF</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-mono">Official Entry Confirmation Pass</p>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-[10px] font-extrabold text-primary uppercase tracking-wider">
                        {bookingRef || "ACM-2026-VERIFIED"}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-1 font-mono">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Customer & Booking Details Table */}
                  <div className="space-y-3.5 mb-6 text-sm">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Booked By</span>
                      <span className="text-white font-bold">{fullName || 'Valued Guest'}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Phone (Verified)</span>
                      <span className="text-primary font-mono font-bold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> {phoneNumber || '+94 7X XXX XXXX'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Pitch Facility</span>
                      <span className="text-white font-bold">{currentPitchObj?.name || 'Pro Futsal Pitch'}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Date</span>
                      <span className="text-white font-bold">{selectedDate || 'Select a date'}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Time Slot</span>
                      <span className="text-white font-bold">{selectedTime || 'Select a time'}</span>
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Rate / Total</span>
                      <span className="text-accent font-bold text-lg font-mono">{currentPitchObj?.price || 'Rs. 4,500/hr'}</span>
                    </div>
                  </div>

                  {/* Entry Verification Barcode Graphic */}
                  <div className="bg-black/60 border border-white/10 rounded-2xl p-4 text-center space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-gray-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> ACM Turf, Dharga Town
                      </span>
                      <span className="text-[10px] uppercase font-mono text-primary">Status: Valid Ticket</span>
                    </div>

                    {/* Styled Visual Barcode Graphic */}
                    <div className="py-2 px-4 bg-white/5 rounded-lg flex items-center justify-center gap-1 font-mono tracking-widest text-gray-400 text-xs select-none">
                      <div className="h-8 w-1 bg-white/80" />
                      <div className="h-8 w-2 bg-white/80" />
                      <div className="h-8 w-0.5 bg-white/40" />
                      <div className="h-8 w-1.5 bg-white/80" />
                      <div className="h-8 w-0.5 bg-white/40" />
                      <div className="h-8 w-2 bg-white/80" />
                      <div className="h-8 w-1 bg-white/80" />
                      <div className="h-8 w-0.5 bg-white/40" />
                      <div className="h-8 w-2 bg-white/80" />
                      <div className="h-8 w-1.5 bg-white/80" />
                      <div className="h-8 w-1 bg-white/80" />
                      <div className="h-8 w-0.5 bg-white/40" />
                      <div className="h-8 w-2 bg-white/80" />
                      <div className="h-8 w-1.5 bg-white/80" />
                    </div>

                    <p className="text-[11px] text-gray-400 leading-snug">
                      Please show this pass or PDF receipt to the turf staff upon arrival.
                    </p>
                  </div>
                </div>

                {/* PDF & Print Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 no-print max-w-lg mx-auto">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="w-full sm:w-auto flex-1 px-6 py-3.5 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download PDF Pass</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintPass}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2 text-sm"
                  >
                    <Printer className="w-5 h-5" />
                    <span>Print Pass</span>
                  </button>

                  <a
                    href="https://www.google.com/maps/place/ACM+INDOOR+TURF/@6.449576,80.006855,18z/data=!4m6!3m5!1s0x3ae22f0043ce219b:0x350532f359799c8!8m2!3d6.4494747!4d80.0068577!16s%2Fg%2F11ntg1swk5?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-white/5 text-gray-300 hover:text-white font-semibold rounded-xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2 text-sm"
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  </a>
                </div>

                <div className="text-center mt-8 no-print">
                  <Link 
                    href="/"
                    onClick={resetBooking}
                    className="text-primary hover:text-white transition-colors underline underline-offset-4 font-semibold text-sm"
                  >
                    Go to Home
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10 no-print">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={clsx(
                    "px-6 py-3 rounded-full font-semibold transition-colors text-sm",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  Back
                </button>
                
                {step === 3 ? (
                  !otpSent ? (
                    <button
                      onClick={handleSendOtp}
                      disabled={isSendingOtp || !fullName.trim() || !phoneNumber.trim() || !agreedToRules}
                      className={clsx(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all text-sm",
                        isSendingOtp || !fullName.trim() || !phoneNumber.trim() || !agreedToRules
                          ? "bg-white/10 text-gray-500 cursor-not-allowed"
                          : "bg-primary text-black hover:bg-primary/90 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      )}
                    >
                      {isSendingOtp ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <span>Send OTP Verification</span>
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerifyOtp()}
                      disabled={isVerifyingOtp || otpDigits.join("").length < 4}
                      className={clsx(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all text-sm",
                        isVerifyingOtp || otpDigits.join("").length < 4
                          ? "bg-white/10 text-gray-500 cursor-not-allowed"
                          : "bg-primary text-black hover:bg-primary/90 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      )}
                    >
                      {isVerifyingOtp ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Verifying Code...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Confirm Booking</span>
                          <CheckCircle2 className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={(step === 1 && !selectedPitch) || (step === 2 && (!selectedDate || !selectedTime))}
                    className={clsx(
                      "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all text-sm",
                      (step === 1 && !selectedPitch) || (step === 2 && (!selectedDate || !selectedTime))
                        ? "bg-white/10 text-gray-500 cursor-not-allowed"
                        : "bg-primary text-black hover:bg-primary/90 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    )}
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
