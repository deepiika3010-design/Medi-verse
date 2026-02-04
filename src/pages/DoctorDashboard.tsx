import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Video, Phone, MessageSquare, Users, Calendar, Clock,
  Search, Bell, ChevronRight, UserCheck, AlertCircle,
  FileText, TrendingUp, Star
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

const stats = [
  { label: "Patients Today", value: "12", icon: Users, trend: "+3" },
  { label: "Consultations", value: "48", icon: Video, trend: "+12%" },
  { label: "Pending Reviews", value: "5", icon: FileText, trend: "-2" },
  { label: "Rating", value: "4.9", icon: Star, trend: "+0.1" },
];

const upcomingPatients = [
  { name: "John Smith", age: 45, issue: "Follow-up checkup", time: "2:00 PM", type: "video", urgent: false },
  { name: "Emily Davis", age: 32, issue: "Chest pain review", time: "2:30 PM", type: "video", urgent: true },
  { name: "Robert Wilson", age: 58, issue: "Blood pressure consultation", time: "3:00 PM", type: "voice", urgent: false },
  { name: "Maria Garcia", age: 28, issue: "Prescription renewal", time: "3:30 PM", type: "chat", urgent: false },
];

const recentPatients = [
  { name: "Alice Johnson", lastVisit: "2 days ago", condition: "Diabetes Management", avatar: "AJ" },
  { name: "David Brown", lastVisit: "1 week ago", condition: "Hypertension", avatar: "DB" },
];

export default function DoctorDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

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
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-display font-bold text-2xl text-primary-foreground">
                  SW
                </div>
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold">
                    Dr. Sarah Wilson
                  </h1>
                  <p className="text-muted-foreground">Cardiologist • MD, FACC</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Availability Toggle */}
                <GlassCard className="p-3 flex items-center gap-3">
                  <span className="text-sm font-medium">Status:</span>
                  <button
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isAvailable 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    {isAvailable ? 'Available' : 'Busy'}
                  </button>
                </GlassCard>
                
                <button className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-primary/20 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-green-500">{stat.trend}</span>
                </div>
                <div className="font-display text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Schedule */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold">Today's Schedule</h2>
                  <NeonButton variant="outline" size="sm">
                    <Calendar className="w-4 h-4" />
                    View Calendar
                  </NeonButton>
                </div>
                
                <div className="space-y-3">
                  {upcomingPatients.map((patient, index) => (
                    <GlassCard 
                      key={index} 
                      className={`p-4 cursor-pointer ${patient.urgent ? 'border-red-500/30' : ''}`}
                      glowColor={patient.urgent ? "red" : "cyan"}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center font-semibold text-primary-foreground">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{patient.name}</h3>
                              {patient.urgent && (
                                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{patient.issue} • Age {patient.age}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-primary">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{patient.time}</span>
                            </div>
                            <span className="text-xs text-muted-foreground capitalize">{patient.type} call</span>
                          </div>
                          
                          <NeonButton variant="primary" size="sm">
                            {patient.type === 'video' && <Video className="w-4 h-4" />}
                            {patient.type === 'voice' && <Phone className="w-4 h-4" />}
                            {patient.type === 'chat' && <MessageSquare className="w-4 h-4" />}
                            Start
                          </NeonButton>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.section>

              {/* Quick Stats Chart Placeholder */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-xl font-semibold">Weekly Overview</h2>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="h-40 flex items-end justify-between gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                          className="w-full bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t-lg"
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.random() * 80 + 20}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Video, label: "Start Call" },
                    { icon: FileText, label: "Write Rx" },
                    { icon: Users, label: "Patients" },
                    { icon: Calendar, label: "Schedule" },
                  ].map((action, index) => (
                    <GlassCard key={index} className="p-4 text-center cursor-pointer">
                      <action.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </GlassCard>
                  ))}
                </div>
              </motion.section>

              {/* Recent Patients */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold">Recent Patients</h2>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {recentPatients.map((patient, index) => (
                    <GlassCard key={index} className="p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-semibold text-sm text-primary-foreground">
                          {patient.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{patient.name}</h3>
                          <p className="text-xs text-muted-foreground">{patient.condition}</p>
                          <p className="text-xs text-primary">{patient.lastVisit}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.section>

              {/* Emergency Alerts */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlassCard className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20" glowColor="red">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h2 className="font-display font-semibold">Emergency Queue</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    2 patients waiting for emergency consultation
                  </p>
                  <NeonButton variant="emergency" size="sm" className="w-full">
                    View Emergency Queue
                  </NeonButton>
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
