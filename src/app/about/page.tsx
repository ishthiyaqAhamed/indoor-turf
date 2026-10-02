import { MapPin, Phone, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-white uppercase tracking-tighter mb-6">
              About <span className="text-primary">Us</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Established in 2026, ACM Indoor Turf is Sri Lanka's premier indoor futsal facility. We are dedicated to providing a world-class sporting experience for players of all levels. From our FIFA-approved turf to our luxury amenities, every detail has been meticulously crafted to elevate your game.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Whether you're looking for a casual game with friends, corporate tournaments, or professional training sessions, our facility is equipped to handle it all in a fully climate-controlled and beautifully designed environment.
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

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Phone</h4>
                  <p className="text-gray-400">+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                  <p className="text-gray-400">info@acmindoorturf.com</p>
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
          
          <div className="lg:w-1/2 w-full h-[500px] rounded-3xl overflow-hidden glass p-2">
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
    </div>
  );
}
