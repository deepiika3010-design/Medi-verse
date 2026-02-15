import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Video, Phone, MessageSquare, Ambulance, Pill, Dumbbell,
  Brain, Calendar, Shield, Heart, ArrowRight, Sparkles
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

const services = [
  { icon: Video, title: "Video Consultations", description: "Face-to-face doctor visits from anywhere with HD quality, screen sharing, and secure recording.", link: "/appointments", color: "cyan" as const },
  { icon: Phone, title: "Voice Calls", description: "Quick voice consultations when you're on the go. Crystal clear audio with instant connection.", link: "/appointments", color: "purple" as const },
  { icon: MessageSquare, title: "Live Chat", description: "Instant messaging with healthcare professionals. Share images, files, and get real-time responses.", link: "/appointments", color: "cyan" as const },
  { icon: Ambulance, title: "Ambulance Booking", description: "One-tap emergency booking with live GPS tracking and fastest response times in the industry.", link: "/emergency", color: "red" as const },
  { icon: Pill, title: "Online Pharmacy", description: "Upload prescriptions, order medicines, and get them delivered within 2 hours. 100% genuine products.", link: "/pharmacy", color: "green" as const },
  { icon: Dumbbell, title: "Fitness Tracker", description: "AI-powered diet plans, workout routines, and daily progress tracking for optimal health.", link: "/patient", color: "purple" as const },
  { icon: Brain, title: "AI Symptom Checker", description: "Describe your symptoms and get an AI-powered preliminary assessment with doctor recommendations.", link: "/symptom-checker", color: "cyan" as const },
  { icon: Calendar, title: "Appointment Scheduling", description: "Book appointments with top doctors, manage your schedule, and receive reminders.", link: "/book-appointment", color: "purple" as const },
  { icon: Shield, title: "Health Records", description: "Secure digital health records accessible anytime. Share with your doctors securely.", link: "/patient", color: "green" as const },
  { icon: Heart, title: "Emergency Services", description: "24/7 emergency medical services with instant doctor connection and ambulance dispatch.", link: "/emergency", color: "red" as const },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full glass-card">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Our Services</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Complete <span className="text-primary text-glow">Healthcare</span> Solutions
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              From emergency services to daily wellness tracking, everything you need for complete healthcare.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Link to={service.link}>
                  <GlassCard className="h-full group cursor-pointer p-5 sm:p-6" glowColor={service.color}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      service.color === "cyan" ? "bg-cyan-500/20" :
                      service.color === "purple" ? "bg-purple-500/20" :
                      service.color === "red" ? "bg-destructive/20" :
                      "bg-green-500/20"
                    }`}>
                      <service.icon className={`w-6 h-6 ${
                        service.color === "cyan" ? "text-cyan-500" :
                        service.color === "purple" ? "text-purple-500" :
                        service.color === "red" ? "text-destructive" :
                        "text-green-500"
                      }`} />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 text-center">
            <GlassCard className="p-8 sm:p-10 max-w-2xl mx-auto" hover3D={false}>
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-3">Need Help Choosing?</h2>
              <p className="text-muted-foreground text-sm mb-6">Our team is here to help you find the right service for your needs.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact">
                  <NeonButton variant="primary">
                    <MessageSquare className="w-4 h-4" /> Contact Us
                  </NeonButton>
                </Link>
                <Link to="/symptom-checker">
                  <NeonButton variant="outline">
                    <Brain className="w-4 h-4" /> Check Symptoms
                  </NeonButton>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
