import { MapPin, Phone, Mail } from "lucide-react";

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
          
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-3xl overflow-hidden glass p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pro-pitch.png" alt="Pitch" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden glass p-1 translate-y-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bowling-machine.png" alt="Cricket" className="w-full h-full object-cover rounded-2xl" />
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
      </div>
    </div>
  );
}
