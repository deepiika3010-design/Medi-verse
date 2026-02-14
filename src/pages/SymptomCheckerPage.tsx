import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, Search, AlertTriangle, CheckCircle, 
  ChevronRight, ArrowRight, RotateCcw, Stethoscope,
  Heart, Thermometer, Activity
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link } from "react-router-dom";

const commonSymptoms = [
  "Headache", "Fever", "Cough", "Fatigue", "Chest Pain",
  "Shortness of Breath", "Nausea", "Dizziness", "Back Pain",
  "Sore Throat", "Runny Nose", "Joint Pain", "Stomach Ache",
  "Muscle Pain", "Skin Rash", "Insomnia",
];

const severityLevels = [
  { label: "Mild", color: "text-green-400 bg-green-500/20 border-green-500/30", description: "Manageable, not affecting daily activities" },
  { label: "Moderate", color: "text-amber-400 bg-amber-500/20 border-amber-500/30", description: "Noticeable discomfort, some daily impact" },
  { label: "Severe", color: "text-red-400 bg-red-500/20 border-red-500/30", description: "Significant pain or concern, seek medical help" },
];

interface Result {
  condition: string;
  probability: string;
  severity: string;
  recommendation: string;
}

const mockResults: Record<string, Result[]> = {
  default: [
    { condition: "Common Cold", probability: "High", severity: "Mild", recommendation: "Rest, hydration, and over-the-counter medication. Consult a doctor if symptoms persist beyond 7 days." },
    { condition: "Seasonal Allergies", probability: "Medium", severity: "Mild", recommendation: "Antihistamines may help. Avoid known allergens. Consider allergy testing." },
    { condition: "Stress-related", probability: "Low", severity: "Moderate", recommendation: "Practice relaxation techniques. Consider consulting with a healthcare provider for persistent symptoms." },
  ],
};

export default function SymptomCheckerPage() {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("");
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleAnalyze = () => {
    setShowResults(true);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setSeverity("");
    setDuration("");
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-12 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full glass-card">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Analysis</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Symptom <span className="text-primary text-glow">Checker</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Describe your symptoms and get an AI-powered preliminary assessment. This is not a substitute for professional medical advice.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
            {["Symptoms", "Severity", "Duration", "Results"].map((label, i) => (
              <div key={i} className="flex items-center gap-1 sm:gap-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  step > i + 1 ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                  step === i + 1 ? "bg-primary/20 text-primary border border-primary/30" :
                  "bg-muted/50 text-muted-foreground"
                }`}>
                  {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-xs sm:text-sm hidden sm:inline">{label}</span>
                {i < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <GlassCard className="p-5 sm:p-8">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-4">Select your symptoms</h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {commonSymptoms.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleSymptom(s)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                          selectedSymptoms.includes(s)
                            ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{selectedSymptoms.length} selected</p>
                    <NeonButton variant="primary" size="sm" onClick={() => setStep(2)} disabled={selectedSymptoms.length === 0}>
                      Next <ArrowRight className="w-4 h-4" />
                    </NeonButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <GlassCard className="p-5 sm:p-8">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-4">How severe are your symptoms?</h2>
                  <div className="grid gap-3 mb-6">
                    {severityLevels.map(s => (
                      <button
                        key={s.label}
                        onClick={() => setSeverity(s.label)}
                        className={`p-4 rounded-xl text-left transition-all border ${
                          severity === s.label ? s.color : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        <p className="font-semibold text-sm sm:text-base">{s.label}</p>
                        <p className="text-xs sm:text-sm opacity-80">{s.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <NeonButton variant="ghost" size="sm" onClick={() => setStep(1)}>Back</NeonButton>
                    <NeonButton variant="primary" size="sm" onClick={() => setStep(3)} disabled={!severity}>
                      Next <ArrowRight className="w-4 h-4" />
                    </NeonButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <GlassCard className="p-5 sm:p-8">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-4">How long have you had these symptoms?</h2>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {["Less than a day", "1-3 days", "3-7 days", "More than a week"].map(d => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`p-3 sm:p-4 rounded-xl text-sm font-medium transition-all border ${
                          duration === d ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <NeonButton variant="ghost" size="sm" onClick={() => setStep(2)}>Back</NeonButton>
                    <NeonButton variant="primary" size="sm" onClick={handleAnalyze} disabled={!duration}>
                      <Brain className="w-4 h-4" /> Analyze
                    </NeonButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {/* Summary */}
                <GlassCard className="p-4 sm:p-5 mb-6" hover3D={false}>
                  <div className="flex flex-wrap gap-2 items-center text-sm">
                    <span className="text-muted-foreground">Symptoms:</span>
                    {selectedSymptoms.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{s}</span>
                    ))}
                    <span className="text-muted-foreground ml-2">•</span>
                    <span className="text-muted-foreground">{severity} severity</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{duration}</span>
                  </div>
                </GlassCard>

                {/* Results */}
                <div className="space-y-4 mb-6">
                  {mockResults.default.map((result, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }}>
                      <GlassCard className="p-4 sm:p-6" glowColor={result.probability === "High" ? "cyan" : result.probability === "Medium" ? "purple" : "green"}>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-display font-semibold text-base sm:text-lg">{result.condition}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                result.probability === "High" ? "bg-cyan-500/20 text-cyan-400" :
                                result.probability === "Medium" ? "bg-amber-500/20 text-amber-400" :
                                "bg-green-500/20 text-green-400"
                              }`}>
                                {result.probability} probability
                              </span>
                              <span className="text-xs text-muted-foreground">{result.severity} severity</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                {/* Disclaimer & Actions */}
                <GlassCard className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/5 to-amber-500/10 border-amber-500/20" hover3D={false}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-400 mb-1">Important Disclaimer</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        This is an AI-based preliminary assessment and should not replace professional medical diagnosis. Please consult a healthcare provider for accurate diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link to="/appointments" className="flex-1">
                    <NeonButton variant="primary" size="sm" className="w-full">
                      <Stethoscope className="w-4 h-4" /> Book a Doctor
                    </NeonButton>
                  </Link>
                  <NeonButton variant="outline" size="sm" onClick={reset} className="flex-1">
                    <RotateCcw className="w-4 h-4" /> Check Again
                  </NeonButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
