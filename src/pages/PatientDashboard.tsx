import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Video, Phone, MessageSquare, Ambulance, Pill, Dumbbell, 
  Calendar, User, Bell, Search, Settings, ChevronRight,
  Heart, Activity, Clock, Plus
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link } from "react-router-dom";

const quickActions = [
  { icon: Video, label: "Video Call", color: "cyan", description: "Start video consultation" },
  { icon: Phone, label: "Voice Call", color: "purple", description: "Quick voice consultation" },
  { icon: MessageSquare, label: "Chat", color: "cyan", description: "Message a doctor" },
  { icon: Ambulance, label: "Ambulance", color: "red", description: "Book emergency" },
  { icon: Pill, label: "Medicines", color: "green", description: "Order medicines" },
  { icon: Dumbbell, label: "Fitness", color: "purple", description: "Track fitness" },
];

const upcomingAppointments = [
  { doctor: "Dr. Sarah Wilson", specialty: "Cardiologist", time: "Today, 2:00 PM", avatar: "SW", type: "video" },
  { doctor: "Dr. Michael Chen", specialty: "General Physician", time: "Tomorrow, 10:00 AM", avatar: "MC", type: "in-person" },
];

const healthMetrics = [
  { label: "Heart Rate", value: "72", unit: "BPM", icon: Heart, trend: "+2%" },
  { label: "Steps Today", value: "8,432", unit: "steps", icon: Activity, trend: "+15%" },
  { label: "Sleep", value: "7.5", unit: "hours", icon: Clock, trend: "-5%" },
];

export default function PatientDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  Welcome back, <span className="text-primary text-glow">Alex</span>
                </h1>
                <p className="text-muted-foreground">Here's your health overview for today</p>
              </div>
              
              {/* Search */}
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search doctors, medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-card bg-card border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GlassCard 
                    className="cursor-pointer text-center p-4" 
                    glowColor={action.color as "cyan" | "purple" | "red" | "green"}
                  >
                    <div className={`
                      w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3
                      ${action.color === 'cyan' ? 'bg-cyan-500/20' : ''}
                      ${action.color === 'purple' ? 'bg-purple-500/20' : ''}
                      ${action.color === 'red' ? 'bg-red-500/20' : ''}
                      ${action.color === 'green' ? 'bg-green-500/20' : ''}
                    `}>
                      <action.icon className={`
                        w-6 h-6
                        ${action.color === 'cyan' ? 'text-cyan-500' : ''}
                        ${action.color === 'purple' ? 'text-purple-500' : ''}
                        ${action.color === 'red' ? 'text-red-500' : ''}
                        ${action.color === 'green' ? 'text-green-500' : ''}
                      `} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{action.label}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Health Metrics */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold">Health Metrics</h2>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {healthMetrics.map((metric, index) => (
                    <GlassCard key={index} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <metric.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className={`text-xs font-medium ${
                          metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-400'
                        }`}>
                          {metric.trend}
                        </span>
                      </div>
                      <div className="font-display text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </GlassCard>
                  ))}
                </div>
              </motion.section>

              {/* Emergency Banner */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20" glowColor="red">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg">Emergency Services</h3>
                        <p className="text-sm text-muted-foreground">24/7 instant access to medical help</p>
                      </div>
                    </div>
                    <Link to="/emergency">
                      <NeonButton variant="emergency">
                        <Phone className="w-4 h-4" />
                        Emergency Call
                      </NeonButton>
                    </Link>
                  </div>
                </GlassCard>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold">Appointments</h2>
                  <button className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingAppointments.map((apt, index) => (
                    <GlassCard key={index} className="p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-semibold text-primary-foreground">
                          {apt.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{apt.doctor}</h3>
                          <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-primary" />
                            <span className="text-xs text-primary">{apt.time}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.section>

              {/* Notifications */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-primary" />
                    <h2 className="font-display font-semibold">Notifications</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-2 h-2 mt-2 rounded-full bg-cyan-500" />
                      <div>
                        <p className="text-sm">Your prescription is ready for pickup</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm">Lab results available</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
