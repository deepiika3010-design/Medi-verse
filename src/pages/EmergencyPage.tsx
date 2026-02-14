import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, Video, MessageSquare, Ambulance, MapPin, 
  Clock, Heart, AlertTriangle, Navigation, User,
  Shield, Activity
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link } from "react-router-dom";

const emergencyOptions = [
  { 
    icon: Phone, 
    title: "Voice Call", 
    description: "Connect instantly with available doctor",
    action: "Call Now",
    color: "cyan"
  },
  { 
    icon: Video, 
    title: "Video Call", 
    description: "Face-to-face emergency consultation",
    action: "Start Video",
    color: "purple"
  },
  { 
    icon: MessageSquare, 
    title: "Live Chat", 
    description: "Text-based emergency support",
    action: "Start Chat",
    color: "cyan"
  },
];

const availableDoctors = [
  { name: "Dr. James Miller", specialty: "Emergency Medicine", rating: 4.9, wait: "< 1 min", avatar: "JM" },
  { name: "Dr. Lisa Park", specialty: "General Physician", rating: 4.8, wait: "2 min", avatar: "LP" },
  { name: "Dr. Ahmed Hassan", specialty: "Cardiologist", rating: 4.9, wait: "3 min", avatar: "AH" },
];

export default function EmergencyPage() {
  const [ambulanceBooked, setAmbulanceBooked] = useState(false);
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Emergency Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-red-500/20 border border-red-500/30">
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-sm font-medium text-red-400">Emergency Services Active 24/7</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Emergency <span className="text-red-500">Medical</span> Assistance
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get immediate help. Our emergency response team is available around the clock.
            </p>
          </motion.div>

          {/* Emergency Hotline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <GlassCard className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20 text-center" glowColor="red">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Emergency Hotline</p>
                    <p className="font-display text-3xl font-bold text-red-400">1-800-MEDI-911</p>
                  </div>
                </div>
                <NeonButton variant="emergency" size="lg" onClick={() => window.open("tel:18009119111")}>
                  <Phone className="w-5 h-5" />
                  Call Emergency
                </NeonButton>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Connect Options */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-display text-xl font-semibold mb-4 text-center">Quick Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyOptions.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GlassCard className="p-6 text-center cursor-pointer h-full" glowColor={option.color as "cyan" | "purple"}>
                    <div className={`
                      w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4
                      ${option.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-purple-500/20'}
                    `}>
                      <option.icon className={`
                        w-8 h-8
                        ${option.color === 'cyan' ? 'text-cyan-500' : 'text-purple-500'}
                      `} />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                    <NeonButton variant="primary" size="sm" className="w-full">
                      {option.action}
                    </NeonButton>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Ambulance Booking */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <GlassCard className="p-6" glowColor="red">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Ambulance className="w-8 h-8 text-red-500" />
                    <h2 className="font-display text-2xl font-bold">Ambulance Booking</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    One-tap ambulance booking with live GPS tracking. Average response time: 4 minutes.
                  </p>
                  
                  {!ambulanceBooked ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Using your current location</span>
                      </div>
                      <NeonButton 
                        variant="emergency" 
                        onClick={() => setAmbulanceBooked(true)}
                      >
                        <Navigation className="w-4 h-4" />
                        Book Ambulance Now
                      </NeonButton>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-semibold text-green-400">Ambulance Dispatched!</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Estimated arrival: <span className="text-primary font-semibold">4 minutes</span>
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>Tracking in real-time...</span>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Map Placeholder */}
                <div className="w-full lg:w-64 h-40 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-border flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Live Location</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Available Doctors */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-display text-xl font-semibold mb-4">Available Doctors Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableDoctors.map((doctor, index) => (
                <GlassCard key={index} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-semibold text-primary-foreground">
                      {doctor.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{doctor.wait}</span>
                    </div>
                  </div>
                  <NeonButton variant="primary" size="sm" className="w-full">
                    <Video className="w-4 h-4" />
                    Connect Now
                  </NeonButton>
                </GlassCard>
              ))}
            </div>
          </motion.section>

          {/* Safety Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="font-display text-lg font-semibold">While You Wait</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Stay calm and try to control your breathing",
                  "Keep emergency contacts readily available",
                  "Note any symptoms or changes to report",
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
