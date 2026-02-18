import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, CheckCircle, Building2, Navigation } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().regex(/^[+]?[\d\s()-]{7,20}$/, "Invalid phone number").optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message too long"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Phone, label: "Phone", value: "1-800-MEDIVERSE", href: "tel:18001234567", color: "cyan" },
  { icon: Mail, label: "Email", value: "support@mediverse.com", href: "mailto:support@mediverse.com", color: "purple" },
  { icon: MapPin, label: "Address", value: "123 Health Street, Medical City, MC 10001", href: "#", color: "green" },
  { icon: Clock, label: "Hours", value: "24/7 Emergency | Mon-Fri 8AM-8PM", href: "#", color: "cyan" },
];

const offices = [
  { city: "New York", address: "123 Health Street, Manhattan, NY 10001", phone: "+1 (212) 555-0100" },
  { city: "Los Angeles", address: "456 Medical Ave, Beverly Hills, CA 90210", phone: "+1 (310) 555-0200" },
  { city: "Chicago", address: "789 Care Blvd, Downtown, IL 60601", phone: "+1 (312) 555-0300" },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 sm:pt-28 pb-12 px-3 sm:px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <GlassCard className="p-8 sm:p-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Message Sent!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. Our team will respond within 24 hours.
                </p>
                <NeonButton variant="primary" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}>
                  <MessageSquare className="w-4 h-4" /> Send Another Message
                </NeonButton>
              </GlassCard>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-28 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Get in <span className="text-primary text-glow">Touch</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Have questions? We're here to help 24/7. Reach out and our team will respond promptly.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="pb-16 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10"
          >
            {contactInfo.map((info, i) => (
              <a key={i} href={info.href}>
                <GlassCard className="p-4 text-center h-full group cursor-pointer" glowColor={info.color as "cyan" | "purple" | "green"}>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{info.label}</p>
                  <p className="text-xs sm:text-sm font-medium">{info.value}</p>
                </GlassCard>
              </a>
            ))}
          </motion.div>

          {/* Form + Map Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <GlassCard className="p-5 sm:p-8 h-full">
                <h2 className="font-display text-xl font-semibold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => handleChange("name", e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Phone (optional)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Subject *</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={e => handleChange("subject", e.target.value)}
                        placeholder="How can we help?"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      />
                      {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={e => handleChange("message", e.target.value)}
                      placeholder="Tell us more about your question or concern..."
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none transition-all"
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>
                  <NeonButton variant="primary" type="submit" className="w-full sm:w-auto">
                    <Send className="w-4 h-4" /> Send Message
                  </NeonButton>
                </form>
              </GlassCard>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <GlassCard className="h-full p-5 sm:p-6 flex flex-col">
                <h2 className="font-display text-xl font-semibold mb-4">Our Locations</h2>

                {/* Map Placeholder */}
                <div className="relative rounded-2xl overflow-hidden mb-5 flex-shrink-0">
                  <div
                    className="h-48 sm:h-56 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop&q=80)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                          <Navigation className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">MediVerse HQ</p>
                        <p className="text-xs text-muted-foreground">Medical City, MC 10001</p>
                      </div>
                    </div>
                    {/* Decorative pins */}
                    <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                  </div>
                </div>

                {/* Office List */}
                <div className="space-y-3 flex-1">
                  {offices.map((office, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border border-border hover:border-primary/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{office.city}</div>
                        <div className="text-xs text-muted-foreground">{office.address}</div>
                        <a href={`tel:${office.phone}`} className="text-xs text-primary hover:underline">{office.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Hospital Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-3xl overflow-hidden"
          >
            <div
              className="h-40 sm:h-52 bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1400&h=400&fit=crop&q=80)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8 sm:px-12">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
                    World-Class Medical Facilities
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Our network spans 500+ hospitals and clinics worldwide with cutting-edge equipment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
