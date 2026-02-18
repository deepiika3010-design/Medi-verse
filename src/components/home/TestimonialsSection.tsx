import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "MediVerse completely changed how I manage my health. Booking appointments is so easy and the video consultations saved me hours of travel time!",
    highlight: "Saved hours of travel",
  },
  {
    name: "David Martinez",
    role: "Chronic Care Patient",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "As someone who visits the doctor monthly, MediVerse's dashboard keeps all my records in one place. The symptom checker is incredibly accurate.",
    highlight: "All records in one place",
  },
  {
    name: "Emily Chen",
    role: "Mother of Three",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Getting pediatric consultations at 2AM when my baby had a fever was a lifesaver. The emergency services are incredibly responsive.",
    highlight: "24/7 emergency care",
  },
  {
    name: "Robert Thompson",
    role: "Senior Patient",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "I was skeptical about online medicine delivery but MediVerse made it seamless. Prescription upload and delivery within 2 hours – incredible!",
    highlight: "Medicine in 2 hours",
  },
  {
    name: "Priya Kapoor",
    role: "Healthcare Worker",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Even as a nurse, I use MediVerse for my personal health needs. The doctor quality is exceptional and the interface is beautifully intuitive.",
    highlight: "Exceptional doctor quality",
  },
  {
    name: "James Williams",
    role: "Fitness Enthusiast",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The fitness tracker integration with my health data is phenomenal. My doctor can now see my vitals and activity in real-time during consultations.",
    highlight: "Real-time health data",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function TestimonialsSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full glass-card">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Patient Stories</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by
            <span className="block bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              50,000+ Patients
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from real patients who transformed their healthcare experience with MediVerse.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="p-6 h-full flex flex-col" glowColor="cyan">
                {/* Quote Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Highlight Badge */}
                <div className="inline-flex mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    ✓ {t.highlight}
                  </span>
                </div>

                {/* Text */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: "4.9/5", label: "Average Rating", icon: "⭐" },
            { value: "50K+", label: "Happy Patients", icon: "❤️" },
            { value: "98%", label: "Would Recommend", icon: "👍" },
            { value: "<5min", label: "Avg Response Time", icon: "⚡" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-5 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-2xl font-bold text-primary text-glow">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
