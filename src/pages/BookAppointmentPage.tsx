import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Stethoscope, User, FileText, CheckCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const doctors = [
  "Dr. Sarah Wilson - Cardiologist",
  "Dr. Michael Chen - General Physician",
  "Dr. Emily Park - Dermatologist",
  "Dr. James Miller - Neurologist",
  "Dr. Priya Sharma - Pediatrician",
  "Dr. Robert Kim - Orthopedic",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const appointmentSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().regex(/^[+]?[\d\s()-]{7,20}$/, "Invalid phone number"),
  doctor: z.string().min(1, "Please select a doctor"),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  problem: z.string().trim().min(5, "Please describe your problem").max(500),
  type: z.enum(["video", "in-person", "phone"]),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;

export default function BookAppointmentPage() {
  const [form, setForm] = useState<Partial<AppointmentForm>>({ type: "video" });
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof AppointmentForm, value: string | Date) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = appointmentSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AppointmentForm, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof AppointmentForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    toast({ title: "Appointment Booked!", description: `Your appointment with ${form.doctor?.split(" - ")[0]} has been confirmed.` });
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
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Appointment Confirmed!</h2>
                <div className="text-left max-w-sm mx-auto space-y-2 mb-6">
                  <p className="text-sm"><span className="text-muted-foreground">Doctor:</span> <span className="font-medium">{form.doctor}</span></p>
                  <p className="text-sm"><span className="text-muted-foreground">Date:</span> <span className="font-medium">{form.date ? format(form.date, "PPP") : ""}</span></p>
                  <p className="text-sm"><span className="text-muted-foreground">Time:</span> <span className="font-medium">{form.time}</span></p>
                  <p className="text-sm"><span className="text-muted-foreground">Type:</span> <span className="font-medium capitalize">{form.type}</span></p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/appointments">
                    <NeonButton variant="primary">
                      <Calendar className="w-4 h-4" /> View Appointments
                    </NeonButton>
                  </Link>
                  <NeonButton variant="outline" onClick={() => { setSubmitted(false); setForm({ type: "video" }); }}>
                    Book Another
                  </NeonButton>
                </div>
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
      <main className="pt-24 sm:pt-28 pb-12 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Link to="/appointments" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Appointments
            </Link>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Book an <span className="text-primary text-glow">Appointment</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">Fill in the details to schedule your consultation</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="p-5 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Patient Info */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" /> Patient Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={form.name || ""}
                        onChange={e => handleChange("name", e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={form.email || ""}
                        onChange={e => handleChange("email", e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        value={form.phone || ""}
                        onChange={e => handleChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Doctor Selection */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4" /> Select Doctor
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {doctors.map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleChange("doctor", d)}
                        className={`p-3 rounded-xl text-sm text-left transition-all border ${
                          form.doctor === d
                            ? "bg-primary/20 text-primary border-primary/30"
                            : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {errors.doctor && <p className="text-xs text-destructive mt-1">{errors.doctor}</p>}
                </div>

                {/* Date & Time */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date & Time
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Date *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm text-left",
                              !form.date && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="w-4 h-4" />
                            {form.date ? format(form.date, "PPP") : "Pick a date"}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarPicker
                            mode="single"
                            selected={form.date}
                            onSelect={(d) => d && handleChange("date", d)}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Consultation Type</label>
                      <div className="flex gap-2">
                        {(["video", "in-person", "phone"] as const).map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleChange("type", t)}
                            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium capitalize transition-all border ${
                              form.type === t
                                ? "bg-primary/20 text-primary border-primary/30"
                                : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Time Slot *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleChange("time", t)}
                          className={`py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                            form.time === t
                              ? "bg-primary/20 text-primary border-primary/30"
                              : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Problem Description
                  </h3>
                  <textarea
                    value={form.problem || ""}
                    onChange={e => handleChange("problem", e.target.value)}
                    placeholder="Describe your symptoms or reason for visit..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                  />
                  {errors.problem && <p className="text-xs text-destructive mt-1">{errors.problem}</p>}
                </div>

                <NeonButton variant="primary" type="submit" className="w-full">
                  <Stethoscope className="w-4 h-4" /> Confirm Appointment
                </NeonButton>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
