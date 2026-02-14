import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, Video, Phone, MessageSquare, 
  MapPin, Star, ChevronRight, Plus, Filter, Search
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link } from "react-router-dom";

const specialties = ["All", "Cardiology", "Dermatology", "General", "Neurology", "Orthopedics", "Pediatrics"];

const availableDoctors = [
  { name: "Dr. Sarah Wilson", specialty: "Cardiologist", rating: 4.9, reviews: 234, nextSlot: "Today, 3:00 PM", fee: "$50", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Michael Chen", specialty: "General Physician", rating: 4.8, reviews: 189, nextSlot: "Today, 4:30 PM", fee: "$35", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Emily Park", specialty: "Dermatologist", rating: 4.7, reviews: 156, nextSlot: "Tomorrow, 10:00 AM", fee: "$60", image: "https://images.unsplash.com/photo-1594824476967-48c8b964d31f?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. James Miller", specialty: "Neurologist", rating: 4.9, reviews: 312, nextSlot: "Tomorrow, 11:30 AM", fee: "$75", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Priya Sharma", specialty: "Pediatrician", rating: 4.8, reviews: 198, nextSlot: "Today, 5:00 PM", fee: "$40", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Robert Kim", specialty: "Orthopedic", rating: 4.6, reviews: 145, nextSlot: "Tomorrow, 2:00 PM", fee: "$55", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face" },
];

const myAppointments = [
  { doctor: "Dr. Sarah Wilson", specialty: "Cardiologist", date: "Today", time: "2:00 PM", type: "video", status: "upcoming" },
  { doctor: "Dr. Michael Chen", specialty: "General Physician", date: "Tomorrow", time: "10:00 AM", type: "in-person", status: "confirmed" },
  { doctor: "Dr. Emily Park", specialty: "Dermatologist", date: "Feb 18", time: "3:30 PM", type: "chat", status: "pending" },
];

export default function AppointmentsPage() {
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"book" | "my">("book");

  const filteredDoctors = availableDoctors.filter(d => 
    (activeSpecialty === "All" || d.specialty.toLowerCase().includes(activeSpecialty.toLowerCase())) &&
    (searchQuery === "" || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="text-primary text-glow">Appointments</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">Book and manage your doctor appointments</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <NeonButton variant={activeTab === "book" ? "primary" : "ghost"} size="sm" onClick={() => setActiveTab("book")}>
              <Calendar className="w-4 h-4" /> Book New
            </NeonButton>
            <NeonButton variant={activeTab === "my" ? "primary" : "ghost"} size="sm" onClick={() => setActiveTab("my")}>
              <Clock className="w-4 h-4" /> My Appointments
            </NeonButton>
          </div>

          {activeTab === "book" ? (
            <>
              {/* Search & Filter */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
                <div className="relative max-w-md w-full mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search doctors or specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl glass-card bg-card border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialties.map(s => (
                    <button
                      key={s}
                      onClick={() => setActiveSpecialty(s)}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                        activeSpecialty === s
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Doctors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDoctors.map((doctor, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <GlassCard className="p-4 sm:p-5" glowColor="cyan">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={doctor.image} alt={doctor.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-primary/30" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-sm sm:text-base truncate">{doctor.name}</h3>
                          <p className="text-primary text-xs sm:text-sm">{doctor.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-medium">{doctor.rating}</span>
                            <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                          </div>
                        </div>
                        <span className="text-primary font-display font-bold text-sm sm:text-base">{doctor.fee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                        <Clock className="w-3.5 h-3.5 text-green-500" />
                        <span>Next: <span className="text-green-400 font-medium">{doctor.nextSlot}</span></span>
                      </div>
                      <div className="flex gap-2">
                        <NeonButton variant="primary" size="sm" className="flex-1">
                          <Video className="w-3.5 h-3.5" /> Video
                        </NeonButton>
                        <NeonButton variant="outline" size="sm" className="flex-1" onClick={() => window.open("tel:+18001234567")}>
                          <Phone className="w-3.5 h-3.5" /> Call
                        </NeonButton>
                        <NeonButton variant="ghost" size="sm" className="flex-1">
                          <MessageSquare className="w-3.5 h-3.5" /> Chat
                        </NeonButton>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {myAppointments.map((apt, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <GlassCard className="p-4 sm:p-5" glowColor={apt.status === "upcoming" ? "cyan" : "purple"}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-semibold text-primary-foreground text-sm">
                          {apt.doctor.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">{apt.doctor}</h3>
                          <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{apt.date}</p>
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <Clock className="w-3 h-3" /> {apt.time}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          apt.status === "upcoming" ? "bg-cyan-500/20 text-cyan-400" :
                          apt.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                          "bg-amber-500/20 text-amber-400"
                        }`}>
                          {apt.status}
                        </span>
                        <NeonButton variant="primary" size="sm">
                          {apt.type === "video" ? <Video className="w-4 h-4" /> : apt.type === "chat" ? <MessageSquare className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                          <span className="hidden sm:inline">Join</span>
                        </NeonButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
