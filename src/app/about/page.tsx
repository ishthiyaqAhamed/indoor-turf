import { MapPin, Phone, Mail, Star, ExternalLink, Share2, MessageSquare } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        {/* About Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-6">
              About <span className="text-primary">Us</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Established in 2026, ACM Indoor Turf is Sri Lanka's premier indoor futsal facility. We are dedicated to providing a world-class sporting experience for players of all levels. From our FIFA-approved turf to our luxury amenities, every detail has been meticulously crafted to elevate your game.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you're looking for a casual game with friends, corporate tournaments, or professional training sessions, our facility is equipped to handle it all in a fully climate-controlled and beautifully designed environment.
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full flex justify-center items-center">
            <div className="w-full max-w-md aspect-square rounded-full overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)] flex items-center justify-center p-2 bg-gradient-to-br from-primary/30 to-black">
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.jpg" alt="ACM Indoor Logo" className="w-full h-full object-cover scale-[1.02]" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 pt-24 border-t border-white/5">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-10">
              Get in <span className="text-primary">Touch</span>
            </h2>
            
            <div className="space-y-8 mb-10 bg-white/5 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-start gap-6 group relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Address</h4>
                  <p className="text-gray-400 text-lg">ACM INDOOR TURF, 73/5 Isnapulla Road, Dharga Town</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="w-6 h-6 text-primary group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Phone</h4>
                  <p className="text-gray-400 text-lg">+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Mail className="w-6 h-6 text-primary group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Email</h4>
                  <p className="text-gray-400 text-lg">info@acmindoorturf.com</p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.app.goo.gl/RqcNVquE2nXXiKNc9" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-black px-10 py-4 rounded-full font-bold hover:bg-white transition-colors text-lg shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)]"
            >
              Open in Google Maps
            </a>
          </div>
          
          <div className="lg:w-1/2 w-full h-[600px] rounded-3xl overflow-hidden glass p-2 relative group">
            <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10" />
            <iframe
              src="https://maps.google.com/maps?q=ACM%20INDOOR%20TURF,%20Dharga%20Town&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1.5rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 relative z-0"
            ></iframe>
          </div>
        </div>
        {/* Rate and Review Section */}
        <div className="mt-24 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-outfit font-black text-white uppercase tracking-tighter mb-2">
                Rate & Review on <span className="text-primary">Google</span>
              </h2>
              <p className="text-gray-400">
                All reviews and ratings are submitted directly through Google Business Profile, ensuring 100% authentic, verified feedback.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors">
                <Share2 className="w-4 h-4" /> Share Link
              </button>
              <a href="https://maps.app.goo.gl/RqcNVquE2nXXiKNc9" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold transition-colors shadow-lg">
                <ExternalLink className="w-4 h-4" /> Write a Review
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left Box - Rating */}
            <div className="lg:col-span-4 bg-black/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-center">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-7xl font-outfit font-black text-white leading-none">5.0</span>
                <div className="pb-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />)}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Google Verified Rating</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mt-6 leading-relaxed">
                Rated 5.0 stars by players for our premium turf quality, excellent amenities, and dedicated customer support at ACM Indoor Turf, Dharga Town.
              </p>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400 shrink-0">
                  <Star className="w-3 h-3 fill-gray-400" /> 5 Stars
                </div>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FBBC05] w-full rounded-full" />
                </div>
                <span className="text-xs font-bold text-white shrink-0">100%</span>
              </div>
            </div>

            {/* Right Box - Instructions */}
            <div className="lg:col-span-8 flex flex-col">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">How to leave your review on Google</h3>
              <p className="text-gray-400 mb-8">
                Because Google requires user authentication for authentic ratings, your review is posted directly through your Google Account to the official ACM Indoor Turf profile.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { step: "1", title: "Click Button", desc: "Click 'Write a Review' to open our official listing." },
                  { step: "2", title: "Rate Stars", desc: "Select your star rating and write your turf experience." },
                  { step: "3", title: "Live on Google", desc: "Your review publishes immediately to Google Search & Maps." }
                ].map((s) => (
                  <div key={s.step} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4 text-sm">
                      {s.step}
                    </div>
                    <h4 className="text-white font-bold mb-2">{s.title}</h4>
                    <p className="text-sm text-gray-400">{s.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4285F4]/20 text-[#4285F4] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Share your Turf Experience</h4>
                    <p className="text-xs text-gray-400">Help others find the best indoor facility in Dharga Town.</p>
                  </div>
                </div>
                <a href="https://maps.app.goo.gl/RqcNVquE2nXXiKNc9" target="_blank" rel="noreferrer" className="w-full sm:w-auto shrink-0 bg-primary text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors text-center">
                  Post Review Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
