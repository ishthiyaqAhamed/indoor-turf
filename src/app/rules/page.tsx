import { ShieldCheck, AlertTriangle, Clock, Info } from "lucide-react";

export default function RulesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-outfit font-black text-white uppercase tracking-tighter mb-4">
            Rules & <span className="text-primary">Regulations</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Please read these rules carefully before playing at ACM Indoor Turf to ensure a safe and enjoyable experience for everyone.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Rules */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              General Pitch Rules
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-white">Footwear:</strong> Strictly non-marking indoor shoes, turf shoes, or soft-ground trainers only. Metal studs and blades are strictly prohibited as they damage the turf.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-white">Food & Drink:</strong> No food, chewing gum, or sugary drinks allowed on the playing surface. Only water in sealed bottles is permitted.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-white">Smoking:</strong> ACM Indoor Turf is a strictly no-smoking and no-vaping facility, both on the pitch and in the spectator areas.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-white">Respect:</strong> Aggressive behavior, swearing, and abuse towards staff or other players will not be tolerated and may result in a ban.</span>
              </li>
            </ul>
          </section>

          {/* Booking & Timings */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-8 h-8 text-accent" />
              Bookings & Timings
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span><strong className="text-white">Punctuality:</strong> Please arrive at least 10 minutes prior to your scheduled booking time to ensure you get your full playtime.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span><strong className="text-white">Time Limits:</strong> You must vacate the pitch immediately when your time is up to allow the next group to start on time.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span><strong className="text-white">Cancellations:</strong> Any cancellations or rescheduling must be done at least 24 hours in advance to avoid a penalty fee.</span>
              </li>
            </ul>
          </section>

          {/* Liability */}
          <section className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              Liability & Safety
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span><strong className="text-white">Injuries:</strong> Players participate at their own risk. ACM Indoor Turf is not liable for any injuries sustained during play.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span><strong className="text-white">Belongings:</strong> We are not responsible for any lost, stolen, or damaged personal belongings. Please use the lockers provided.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
