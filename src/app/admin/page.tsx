"use client";

import { useState } from "react";
import { Calendar, Users, DollarSign, Activity, CheckCircle, XCircle, Clock, Edit, Trash2, Plus, Image as ImageIcon, Upload } from "lucide-react";

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock Data
  const stats = [
    { label: "Total Bookings", value: "124", change: "+12%", icon: Calendar, color: "text-blue-400" },
    { label: "Active Players", value: "850", change: "+5%", icon: Users, color: "text-purple-400" },
    { label: "Monthly Revenue", value: "Rs. 245K", change: "+18%", icon: DollarSign, color: "text-green-400" },
    { label: "Pitch Utilization", value: "86%", change: "+2%", icon: Activity, color: "text-orange-400" },
  ];

  const bookings = [
    { id: "B-1042", user: "Tariq Ahamed", pitch: "Pro Futsal Pitch", date: "Oct 12, 2026", time: "18:00 - 19:00", status: "Confirmed", amount: "Rs. 4,500" },
    { id: "B-1043", user: "Dharga FC", pitch: "Pro Futsal Pitch", date: "Oct 12, 2026", time: "19:00 - 21:00", status: "Pending", amount: "Rs. 9,000" },
    { id: "B-1044", user: "Zayn M.", pitch: "Bowling Machine Pitch", date: "Oct 13, 2026", time: "10:00 - 12:00", status: "Confirmed", amount: "Rs. 7,000" },
    { id: "B-1045", user: "Corporate League", pitch: "Pro Futsal Pitch", date: "Oct 13, 2026", time: "17:00 - 20:00", status: "Cancelled", amount: "Rs. 13,500" },
  ];

  const [billboardOffers, setBillboardOffers] = useState([
    { id: 1, title: "Happy Children's Day!", desc: "50% off for all players under 16 today. Use code KIDS50 at checkout.", status: "Active" },
    { id: 2, title: "Weekend Madness", desc: "Book 2 hours on the Pro Pitch this weekend and get 30 mins free.", status: "Active" },
    { id: 3, title: "Corporate Leagues", desc: "Special packages available for monthly corporate bookings.", status: "Inactive" },
  ]);

  const [galleryImages, setGalleryImages] = useState([
    { id: 1, src: "/gallery-user-1.jpg" },
    { id: 2, src: "/gallery-user-2.jpg" },
    { id: 3, src: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 4, src: "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-outfit font-black text-white uppercase tracking-tighter">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-2">Manage bookings, view analytics, and control turf operations.</p>
          </div>
          
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === "dashboard" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("bookings")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === "bookings" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
            >
              Bookings
            </button>
            <button 
              onClick={() => setActiveTab("billboard")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === "billboard" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
            >
              Billboard
            </button>
            <button 
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === "gallery" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
            >
              Gallery
            </button>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-primary">{stat.change}</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-black text-white font-outfit">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings Table */}
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white font-outfit">Recent Bookings</h3>
                <button className="text-primary font-bold text-sm hover:text-white transition-colors">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest pl-8">Booking ID</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">User</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Pitch</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date & Time</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center pr-8">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings.map((booking, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 pl-8 font-mono text-sm text-gray-300">{booking.id}</td>
                        <td className="p-4 font-bold text-white">{booking.user}</td>
                        <td className="p-4 text-gray-300">{booking.pitch}</td>
                        <td className="p-4">
                          <div className="text-gray-300">{booking.date}</div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {booking.time}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-primary">{booking.amount}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4 pr-8">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black transition-colors" title="Approve">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black transition-colors" title="Cancel">
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "billboard" && (
          <div className="glass-card rounded-3xl overflow-hidden p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white font-outfit">Manage Billboard Offers</h3>
              <button className="flex items-center gap-2 bg-primary text-black font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" /> Add Offer
              </button>
            </div>
            
            <div className="space-y-4">
              {billboardOffers.map((offer) => (
                <div key={offer.id} className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-white">{offer.title}</h4>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${offer.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {offer.status}
                      </span>
                    </div>
                    <p className="text-gray-400">{offer.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="glass-card rounded-3xl overflow-hidden p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white font-outfit mb-2">Gallery Manager</h3>
                <p className="text-sm text-gray-400">Upload new images to the public gallery.</p>
              </div>
              <button className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 transition-all">
                <Upload className="w-5 h-5" /> Upload Image
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-40" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-2 bg-red-500 text-white font-bold px-4 py-2 rounded-full hover:bg-red-600 transition-colors shadow-lg">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Empty state / Add new button */}
              <button className="aspect-square rounded-2xl border-2 border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-4 text-gray-500 hover:text-primary">
                <ImageIcon className="w-10 h-10" />
                <span className="font-bold">Add New Photo</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
