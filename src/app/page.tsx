"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Trophy, Shield, Zap, MapPin, Activity, Star, Users, Calendar, Check } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const [footballScore, setFootballScore] = useState({ home: 2, away: 1, min: 67 });
  const [cricketScore, setCricketScore] = useState({ runs: 215, wickets: 4, overs: 38.2 });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [liveReviews, setLiveReviews] = useState([
    { author_name: "Tariq A.", rating: 5, text: "The pitch quality is unmatched. Playing here feels like playing in a professional European stadium." },
    { author_name: "Rahul S.", rating: 5, text: "We host all our corporate leagues here. The amenities are fantastic and the staff is super professional." },
    { author_name: "Zayn M.", rating: 5, text: "The new bowling machine is a game changer for cricket practice. Highly recommend to any serious player." }
  ]);

  const galleryImages = [
    "/gallery-user-1.jpg",
    "/gallery-user-2.jpg",
    "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  useEffect(() => {
    // Fetch live Google Reviews
    fetch("/api/reviews")
      .then(res => res.json())
      .then(data => {
        if (data.reviews && data.reviews.length > 0) {
          setLiveReviews(data.reviews);
        }
      })
      .catch(err => console.error("Failed to fetch reviews:", err));

    const timer = setInterval(() => {
      setFootballScore(prev => ({
        ...prev,
        min: prev.min < 90 ? prev.min + 1 : prev.min,
        home: Math.random() > 0.92 ? prev.home + 1 : prev.home,
        away: Math.random() > 0.95 ? prev.away + 1 : prev.away,
      }));
      setCricketScore(prev => ({
        ...prev,
        overs: parseFloat(((Math.round(prev.overs * 10) % 10) === 5 ? Math.floor(prev.overs) + 1 : prev.overs + 0.1).toFixed(1)),
        runs: prev.runs + Math.floor(Math.random() * 5),
        wickets: Math.random() > 0.92 && prev.wickets < 10 ? prev.wickets + 1 : prev.wickets
      }));
    }, 6000);
    
    const galleryTimer = setInterval(() => {
      setGalleryIndex(prev => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(galleryTimer);
    };
  }, [galleryImages.length]);

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
            {/* Slow-mo Soccer Ball Hero Video */}
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          {/* Overlays for contrast and luxury feel */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black z-10" />
        </motion.div>

        <motion.div 
          style={{ opacity, y }}
          className="container mx-auto px-6 relative z-20 h-full w-full flex flex-col justify-end pb-20 md:pb-0 md:justify-center md:items-center text-left md:text-center mt-0 md:mt-20"
        >
          {/* Unified Layout */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-start md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-8"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] md:text-sm font-bold md:font-medium tracking-widest uppercase text-gray-200 md:text-gray-300">Open 24/7</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-outfit font-black text-white uppercase tracking-tighter leading-[0.9] md:leading-[0.85] mb-3 md:mb-6 drop-shadow-2xl"
            >
              Play Like <br />
              <span className="text-primary md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-primary md:to-[#059669]">Champions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xs sm:text-sm md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-10 font-light"
            >
              Sri Lanka's most luxurious, professional-grade indoor futsal arena designed for the ultimate sporting experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-3 md:gap-6 w-full sm:w-auto"
            >
              <Link
                href="/booking"
                className="flex-1 md:flex-none flex justify-center items-center gap-2 md:gap-3 rounded-xl md:rounded-full bg-primary md:bg-white px-4 py-3.5 md:px-10 md:py-4 font-bold text-black transition-all hover:bg-white md:hover:bg-gray-100 md:hover:scale-105"
              >
                <span>Book Pitch</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              
              <a
                href="https://www.google.com/maps/place/ACM+INDOOR+TURF"
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none flex justify-center items-center gap-2 md:gap-3 rounded-xl md:rounded-full bg-transparent md:bg-white/5 border border-white/20 px-4 py-3.5 md:px-10 md:py-4 font-bold text-white md:backdrop-blur-md transition-all hover:bg-white/10"
              >
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <span>Directions</span>
              </a>
            </motion.div>
          </div>
        </motion.div>



      </section>

      {/* Features Section */}
      <section id="facilities" className="py-16 md:py-32 bg-[#050505] relative z-10 overflow-hidden">
        <div className="container mx-auto px-0 md:px-12">
          <div className="text-left md:text-center max-w-3xl mx-auto mb-8 md:mb-24 px-6 md:px-0">
            <h2 className="text-3xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-2 md:mb-4">
              World Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FFF3B0]">Facilities</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">Every detail crafted for an elite football experience.</p>
          </div>

          <div className="flex flex-col gap-4 px-6 md:grid md:grid-cols-3 md:gap-8 md:px-0">
            {[
              {
                icon: <Activity className="w-6 h-6 md:w-10 md:h-10 text-primary md:text-accent" />,
                title: "Pro Cricket Nets",
                desc: "Fully enclosed, high-tension netting equipped with an automated smart bowling machine capable of 150km/h."
              },
              {
                icon: <Zap className="w-6 h-6 md:w-10 md:h-10 text-primary" />,
                title: "Pro Lighting",
                desc: "Shadowless LED sports lighting system illuminating the pitch perfectly for night games and recordings."
              },
              {
                icon: <Shield className="w-6 h-6 md:w-10 md:h-10 text-primary md:text-blue-400" />,
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
                className="bg-[#0A0A0A] md:bg-white/5 md:glass-card p-6 md:p-10 rounded-2xl md:rounded-3xl group hover:-translate-y-2 transition-transform duration-500 border border-white/5 flex flex-row md:flex-col items-start gap-4 md:gap-0"
              >
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/5 md:bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shrink-0 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-4 font-outfit tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-xs md:text-base leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser Section */}
      <section className="py-16 md:py-24 bg-black relative z-10 border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-2 md:mb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FFF3B0]">Experience</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-lg max-w-xl">
                Take a look at the elite atmosphere and high-intensity action at ACM Indoor Turf.
              </p>
            </div>
            <Link 
              href="/gallery"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors uppercase tracking-widest text-sm"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-4 px-6 md:grid md:grid-cols-4 md:gap-4 md:px-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-[2rem] md:rounded-3xl overflow-hidden relative group h-[300px] md:h-auto md:aspect-square"
            >
              <img src="/pro-pitch.png" alt="Pro Pitch" className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 md:p-8">
                <h4 className="text-white font-bold text-xl md:text-2xl">Pro Futsal League</h4>
              </div>
            </motion.div>
            
            <div className="flex gap-4 md:contents">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex-1 md:flex-none rounded-[2rem] md:rounded-3xl overflow-hidden relative group h-[150px] md:h-auto md:aspect-square"
              >
                <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Action" className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex-1 md:flex-none rounded-[2rem] md:rounded-3xl overflow-hidden relative group bg-gray-900 h-[150px] md:h-auto md:aspect-square"
              >
                <img src="/bowling-machine.png" alt="Bowling Machine" className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 rounded-[2rem] md:rounded-3xl overflow-hidden relative group bg-black h-[200px] md:h-auto md:aspect-[2/1]"
            >
              <motion.img 
                key={galleryIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                src={galleryImages[galleryIndex]} 
                alt="Turf Gallery" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex gap-2">
                {galleryImages.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === galleryIndex ? 'bg-primary' : 'bg-white/30'}`} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-black relative z-10 border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-0 md:px-12">
          <div className="text-left md:text-center max-w-3xl mx-auto mb-8 md:mb-16 px-6 md:px-0">
            <h2 className="text-3xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-4">
              Simple <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">Transparent rates for world-class facilities. No hidden fees.</p>
          </div>

          <div className="flex flex-col gap-4 px-6 md:grid md:grid-cols-2 md:gap-8 max-w-4xl mx-auto md:px-0">
            {/* Pro Futsal Pitch */}
            <div className="bg-[#0A0A0A] md:bg-white/5 md:glass-card rounded-[2rem] p-6 md:p-12 relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500" />
              
              <h3 className="text-xl md:text-2xl font-bold text-white font-outfit uppercase tracking-wide mb-1 md:mb-2 relative z-10">Pro Futsal Pitch</h3>
              <p className="text-gray-400 text-xs md:text-base mb-4 md:mb-6 relative z-10">Perfect for 5-a-side matches, training, and tournaments.</p>
              
              <div className="flex items-baseline gap-2 mb-6 md:mb-8 relative z-10">
                <span className="text-3xl md:text-5xl font-black text-primary md:text-white">Rs. 4,500</span>
                <span className="text-gray-400 font-bold text-sm md:text-base">/ hr</span>
              </div>
              
              <ul className="space-y-2 md:space-y-4 mb-6 md:mb-10 relative z-10">
                {[
                  "Professional shock-pad underlay",
                  "High-intensity LED floodlights",
                  "Washroom facilities",
                  "Free bibs and premium match ball"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 md:w-4 md:h-4 text-primary" />
                    </div>
                    <span className="text-gray-300 text-xs md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/booking" className="block w-full py-3.5 md:py-4 rounded-xl bg-primary text-black font-bold text-sm md:text-base text-center hover:bg-white transition-colors relative z-10 shadow-[0_10px_30px_rgba(16,185,129,0.1)] group-hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)]">
                Book Pitch
              </Link>
            </div>

            {/* Bowling Machine Pitch */}
            <div className="bg-[#0A0A0A] md:bg-white/5 md:glass-card rounded-[2rem] p-6 md:p-12 relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4285F4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#4285F4]/20 transition-colors duration-500" />
              
              <h3 className="text-xl md:text-2xl font-bold text-white font-outfit uppercase tracking-wide mb-1 md:mb-2 relative z-10">Bowling Machine Pitch</h3>
              <p className="text-gray-400 text-xs md:text-base mb-4 md:mb-6 relative z-10">Advanced indoor cricket practice with automated delivery.</p>
              
              <div className="flex items-baseline gap-2 mb-6 md:mb-8 relative z-10">
                <span className="text-3xl md:text-5xl font-black text-[#4285F4] md:text-white">Rs. 3,500</span>
                <span className="text-gray-400 font-bold text-sm md:text-base">/ hr</span>
              </div>
              
              <ul className="space-y-2 md:space-y-4 mb-6 md:mb-10 relative z-10">
                {[
                  "Fully automated bowling machine",
                  "Adjustable speed and spin settings",
                  "Professional cricket practice net",
                  "Washroom facilities",
                  "Ideal for individual or duo practice"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#4285F4]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 md:w-4 h-4 text-[#4285F4]" />
                    </div>
                    <span className="text-gray-300 text-xs md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/booking" className="block w-full py-3.5 md:py-4 rounded-xl bg-transparent border border-[#4285F4] text-[#4285F4] font-bold text-sm md:text-base text-center hover:bg-[#4285F4] hover:text-white transition-colors relative z-10">
                Book Pitch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-0 md:px-12">
          <div className="text-left md:text-center max-w-3xl mx-auto mb-8 md:mb-16 px-6 md:px-0">
            <h2 className="text-3xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-2 md:mb-4">
              Player <span className="text-primary">Reviews</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">Hear what the champions say about our facilities.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 md:grid md:grid-cols-3 md:gap-8 md:px-0 md:pb-0 hide-scrollbar">
            {liveReviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 border border-white/10 p-8 md:p-8 rounded-3xl relative min-w-[85vw] md:min-w-0 snap-center shrink-0 flex flex-col justify-between"
              >
                <div className="flex text-primary mb-4">
                  {[...Array(review.rating || 5)].map((_, j) => <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-primary" />)}
                </div>
                <p className="text-gray-300 text-sm md:text-base italic mb-6">"{review.text}"</p>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base">{review.author_name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">Google Review</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Unique Feature: Live Match Status & Hall of Fame */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Live Status Widget */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-1 rounded-3xl bg-gradient-to-br from-primary/30 to-black overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/10 animate-pulse" />
              <div className="bg-[#050505] rounded-[22px] p-6 md:p-10 relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="relative flex h-3 w-3 md:h-4 md:w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-red-500"></span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest">Live Action</h3>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  {/* Football Live Score */}
                  <div className="flex justify-between items-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500">
                        <Users className="text-blue-400 w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <p className="text-white text-sm md:text-base font-bold">Real Madrid vs Barcelona</p>
                        <p className="text-[10px] md:text-xs text-gray-400">El Clásico - La Liga</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-bold text-xl md:text-2xl">{footballScore.home} - {footballScore.away}</span>
                      <p className="text-[10px] md:text-xs text-red-400 animate-pulse">{footballScore.min}' MIN</p>
                    </div>
                  </div>

                  {/* Cricket Live Score */}
                  <div className="flex justify-between items-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-900/50 flex items-center justify-center border border-green-500">
                        <Activity className="text-green-400 w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <p className="text-white text-sm md:text-base font-bold">India vs Australia</p>
                        <p className="text-[10px] md:text-xs text-gray-400">ICC World Cup - Final</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold text-lg md:text-xl">{cricketScore.runs}/{cricketScore.wickets}</span>
                      <p className="text-[10px] md:text-xs text-primary">Overs: {cricketScore.overs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Sports Screening */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold text-xs md:text-sm mb-4">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-accent" />
                  <span>Sports Lounge</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-4">
                  Catch the <span className="text-primary">Action Live</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-lg">
                  Don't miss a second of the game. Our premium sports lounge features massive 4K screens broadcasting all major international football and cricket tournaments. Relax with your squad after a tough match.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-1 relative z-10">3</h4>
                  <p className="text-[10px] md:text-sm text-gray-400 uppercase tracking-widest relative z-10">Massive 4K Screens</p>
                </div>
                <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-1 relative z-10">24/7</h4>
                  <p className="text-[10px] md:text-sm text-gray-400 uppercase tracking-widest relative z-10">Global Broadcasts</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Persistent Floating Booking Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50 md:bottom-10 md:right-10"
      >
        <Link 
          href="/booking"
          className="group flex items-center justify-center gap-3 bg-primary text-black font-bold px-6 py-4 md:px-8 md:py-4 rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.4)] hover:shadow-[0_10px_50px_rgba(16,185,129,0.7)] hover:-translate-y-1 transition-all duration-300"
        >
          <Calendar className="w-5 h-5 group-hover:animate-bounce" />
          <span className="text-lg hidden sm:block">Book Pitch</span>
          <span className="sm:hidden">Book</span>
        </Link>
      </motion.div>

    </div>
  );
}
