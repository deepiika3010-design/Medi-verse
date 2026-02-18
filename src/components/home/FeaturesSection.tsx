import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Video,
  Phone,
  MessageSquare,
  Ambulance,
  Pill,
  Brain,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Heart,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const highlights = [
  { icon: Clock, title: "24/7 Care", desc: "Round-the-clock access to medical professionals. No waiting rooms.", color: "cyan" },
  { icon: Shield, title: "Expert Doctors", desc: "10,000+ certified specialists with verified credentials and reviews.", color: "purple" },
  { icon: Heart, title: "Secure Records", desc: "Military-grade encryption protects your health data and privacy.", color: "green" },
];

const features = [
  {
    icon: Video,
    title: "Video Consultations",
    description: "Face-to-face doctor visits from anywhere. HD quality with screen sharing and secure recording.",
    link: "/appointments",
    color: "cyan" as const,
  },
  {
    icon: Phone,
    title: "Voice Calls",
    description: "Quick voice consultations when you're on the go. Crystal clear audio with instant connection.",
    link: "/appointments",
    color: "purple" as const,
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Instant messaging with healthcare professionals. Share images & files in real-time.",
    link: "/appointments",
    color: "cyan" as const,
  },
  {
    icon: Ambulance,
    title: "Ambulance Booking",
    description: "One-tap emergency booking with live GPS tracking. Fastest response in the industry.",
    link: "/emergency",
    color: "red" as const,
  },
  {
    icon: Pill,
    title: "Medicine Delivery",
    description: "Upload prescriptions, get medicines delivered in 2 hours. Genuine & certified products.",
    link: "/pharmacy",
    color: "green" as const,
  },
  {
    icon: Brain,
    title: "AI Symptom Checker",
    description: "Describe symptoms and get an AI-powered diagnosis with specialist recommendations.",
    link: "/symptom-checker",
    color: "purple" as const,
  },
];

const iconColor = (color: string) => ({
  cyan: { bg: "bg-cyan-500/20", text: "text-cyan-500" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-500" },
  red: { bg: "bg-destructive/20", text: "text-destructive" },
  green: { bg: "bg-green-500/20", text: "text-green-500" },
}[color] ?? { bg: "bg-muted/20", text: "text-muted-foreground" });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* --- Highlights Row (24/7 Care, Expert Doctors, Secure Records) --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {highlights.map((h, i) => {
            const colors = iconColor(h.color);
            return (
              <GlassCard key={i} className="p-6 flex items-start gap-4" glowColor={h.color as "cyan" | "purple" | "green"}>
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${colors.bg}`}>
                  <h.icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </GlassCard>
            );
          })}
        </motion.div>

        {/* --- Section Header --- */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full glass-card">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need for
            <span className="block bg-gradient-to-r from-cyan-500 to-blue-400 bg-clip-text text-transparent">
              Complete Healthcare
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From emergency services to daily wellness tracking, MediVerse provides 
            a comprehensive suite of healthcare tools at your fingertips.
          </p>
        </motion.div>

        {/* --- Features Grid --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const colors = iconColor(feature.color);
            return (
              <motion.div key={index} variants={itemVariants}>
                <Link to={feature.link}>
                  <GlassCard className="h-full group cursor-pointer p-6" glowColor={feature.color}>
                    <div className="flex flex-col h-full">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${colors.bg} transition-transform group-hover:scale-110`}>
                        <feature.icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-1">{feature.description}</p>
                      <div className="flex items-center gap-2 mt-4 text-primary font-medium">
                        <span className="text-sm">Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- Medical Banner Image Strip --- */}
        <motion.div
          className="mt-20 rounded-3xl overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="h-48 sm:h-64 bg-cover bg-center relative"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1400&h=400&fit=crop&q=80)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/20" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Advanced Medical Technology
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-4">
                  State-of-the-art diagnostic tools and telemedicine infrastructure.
                </p>
                <Link to="/services">
                  <button className="flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all">
                    Explore All Services <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
