import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Stethoscope, Heart, Shield, Zap, ArrowRight, Users, Clock, Award } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";

const floatingIcons = [
  { icon: Heart, delay: 0, x: -200, y: -80 },
  { icon: Shield, delay: 0.2, x: 200, y: -60 },
  { icon: Stethoscope, delay: 0.4, x: -220, y: 100 },
  { icon: Zap, delay: 0.6, x: 180, y: 120 },
];

const stats = [
  { value: "10K+", label: "Expert Doctors", icon: Users },
  { value: "50K+", label: "Happy Patients", icon: Heart },
  { value: "24/7", label: "Support", icon: Clock },
  { value: "<5min", label: "Response", icon: Zap },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 px-4">
      {/* Medical Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop&q=80)`,
          opacity: 0.08,
        }}
      />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(186 100% 50% / 0.12) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 70% 60% / 0.12) 0%, transparent 70%)",
          right: "5%",
          top: "15%",
        }}
        animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Medical Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:flex items-center justify-center w-16 h-16 glass-card !rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            delay: item.delay + 0.5,
            y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            left: `calc(50% + ${item.x}px)`,
            top: `calc(50% + ${item.y}px)`,
          }}
        >
          <item.icon className="w-8 h-8 text-primary" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card"
            whileHover={{ scale: 1.05 }}
          >
            <span className="status-online" />
            <span className="text-sm font-medium text-foreground">24/7 Healthcare Access — Always Here For You</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">The Future of</span>
            <span className="block bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Healthcare
            </span>
            <span className="block text-foreground">Is Here</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect with world-class doctors, book appointments instantly, order medicines, 
            and manage your health — all in one beautiful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link to="/book-appointment">
              <NeonButton variant="primary" size="lg">
                <Stethoscope className="w-5 h-5" />
                Book Appointment
                <ArrowRight className="w-4 h-4 ml-1" />
              </NeonButton>
            </Link>
            <Link to="/emergency">
              <NeonButton variant="emergency" size="lg">
                <Phone className="w-5 h-5" />
                Emergency Call
              </NeonButton>
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14 text-sm text-muted-foreground">
            <Link to="/doctors" className="hover:text-primary transition-colors flex items-center gap-1">
              <Users className="w-4 h-4" /> Browse Doctors
            </Link>
            <span className="text-border">•</span>
            <Link to="/services" className="hover:text-primary transition-colors flex items-center gap-1">
              <Award className="w-4 h-4" /> Our Services
            </Link>
            <span className="text-border">•</span>
            <Link to="/symptom-checker" className="hover:text-primary transition-colors flex items-center gap-1">
              <Zap className="w-4 h-4" /> Symptom Checker
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-4 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="font-display text-2xl md:text-3xl font-bold text-primary text-glow">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-2.5 bg-primary rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
