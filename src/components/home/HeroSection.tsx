import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Stethoscope, Heart, Shield, Zap } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import heroImage from "@/assets/hero-medical-bg.jpg";

const floatingIcons = [
  { icon: Heart, delay: 0, x: -150, y: -100 },
  { icon: Shield, delay: 0.2, x: 180, y: -80 },
  { icon: Stethoscope, delay: 0.4, x: -180, y: 120 },
  { icon: Zap, delay: 0.6, x: 150, y: 100 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-4">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      {/* Animated Orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl"
        style={{ right: "10%", top: "20%" }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Medical Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:flex items-center justify-center w-16 h-16 glass-card !rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            delay: item.delay,
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-card"
            whileHover={{ scale: 1.05 }}
          >
            <span className="status-online" />
            <span className="text-sm font-medium">24/7 Healthcare Access</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">The Future of</span>
            <span className="block bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
              Healthcare
            </span>
            <span className="block text-foreground">Is Here</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with doctors, book ambulances, order medicines, and track your health — 
            all from one futuristic platform designed for your wellbeing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/emergency">
              <NeonButton variant="emergency" size="lg">
                <Phone className="w-5 h-5" />
                Emergency Call
              </NeonButton>
            </Link>
            <Link to="/book-appointment">
              <NeonButton variant="primary" size="lg">
                <Stethoscope className="w-5 h-5" />
                Start Consultation
              </NeonButton>
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {[
              { value: "10K+", label: "Active Doctors" },
              { value: "50K+", label: "Happy Patients" },
              { value: "24/7", label: "Support" },
              { value: "<5min", label: "Response Time" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-4 text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary text-glow">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
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
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
