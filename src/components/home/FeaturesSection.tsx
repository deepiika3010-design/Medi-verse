import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Video, 
  Phone, 
  MessageSquare, 
  Ambulance, 
  Pill, 
  Dumbbell,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    icon: Video,
    title: "Video Consultations",
    description: "Face-to-face doctor visits from anywhere. HD quality with screen sharing.",
    link: "/patient",
    color: "cyan" as const,
  },
  {
    icon: Phone,
    title: "Voice Calls",
    description: "Quick voice consultations when you're on the go. Crystal clear audio.",
    link: "/patient",
    color: "purple" as const,
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Instant messaging with healthcare professionals. Share images & files.",
    link: "/patient",
    color: "cyan" as const,
  },
  {
    icon: Ambulance,
    title: "Ambulance Booking",
    description: "One-tap emergency booking with live GPS tracking. Fastest response.",
    link: "/emergency",
    color: "red" as const,
  },
  {
    icon: Pill,
    title: "Medicine Delivery",
    description: "Upload prescriptions, get medicines delivered. Genuine & certified.",
    link: "/patient",
    color: "green" as const,
  },
  {
    icon: Dumbbell,
    title: "Fitness Tracker",
    description: "AI-powered diet plans & workout routines. Track your progress daily.",
    link: "/patient",
    color: "purple" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
            <span className="block bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Complete Healthcare
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From emergency services to daily wellness tracking, MediVerse provides 
            a comprehensive suite of healthcare tools at your fingertips.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to={feature.link}>
                <GlassCard 
                  className="h-full group cursor-pointer"
                  glowColor={feature.color}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mb-4
                      ${feature.color === 'cyan' ? 'bg-cyan-500/20' : ''}
                      ${feature.color === 'purple' ? 'bg-purple-500/20' : ''}
                      ${feature.color === 'red' ? 'bg-destructive/20' : ''}
                      ${feature.color === 'green' ? 'bg-green-500/20' : ''}
                    `}>
                      <feature.icon className={`
                        w-7 h-7
                        ${feature.color === 'cyan' ? 'text-cyan-500' : ''}
                        ${feature.color === 'purple' ? 'text-purple-500' : ''}
                        ${feature.color === 'red' ? 'text-destructive' : ''}
                        ${feature.color === 'green' ? 'text-green-500' : ''}
                      `} />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1">
                      {feature.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 mt-4 text-primary font-medium">
                      <span className="text-sm">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
