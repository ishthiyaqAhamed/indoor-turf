export default function GalleryPage() {
  const images = [
    "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/314154/pexels-photo-314154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-outfit font-black text-white uppercase tracking-tighter mb-4">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Take a look at Sri Lanka's most luxurious futsal arena.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden glass aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={`ACM Turf Gallery Image ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
                <span className="text-white font-outfit font-bold tracking-widest uppercase border border-white/30 px-6 py-2 rounded-full backdrop-blur-md">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
