import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, Shield, Clock, HeartPulse } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-destructive/20 border border-destructive/30">
              <HeartPulse className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Emergency Services Available 24/7</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Need Immediate
              <span className="block text-destructive">Medical Assistance?</span>
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Don't wait in emergencies. Connect instantly with available doctors, 
              book an ambulance, or access critical medical services with one click.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Clock, text: "Average response under 5 minutes" },
                { icon: Shield, text: "Verified medical professionals" },
                { icon: Phone, text: "24/7 emergency hotline" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-muted-foreground">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/emergency">
                <NeonButton variant="emergency" size="lg">
                  <Phone className="w-5 h-5" />
                  Emergency Call Now
                </NeonButton>
              </Link>
              <Link to="/book-appointment">
                <NeonButton variant="outline" size="lg">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </NeonButton>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
