import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, MapPin, Phone, MessageSquare, Calendar, ChevronDown, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link } from "react-router-dom";

const allDoctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    hospital: "City Heart Hospital",
    rating: 4.9,
    reviews: 328,
    available: true,
    experience: "12 years",
    fee: "$80",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    tags: ["Heart Disease", "Hypertension", "ECG"],
  },
  {
    name: "Dr. Michael Chen",
    specialty: "General Physician",
    hospital: "Central Medical Center",
    rating: 4.8,
    reviews: 512,
    available: true,
    experience: "8 years",
    fee: "$50",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    tags: ["General Care", "Diabetes", "Thyroid"],
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Neurologist",
    hospital: "NeuroHealth Institute",
    rating: 4.7,
    reviews: 245,
    available: false,
    experience: "15 years",
    fee: "$120",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
    tags: ["Migraine", "Epilepsy", "Brain MRI"],
  },
  {
    name: "Dr. James Thompson",
    specialty: "Orthopedic Surgeon",
    hospital: "Bone & Joint Center",
    rating: 4.9,
    reviews: 189,
    available: true,
    experience: "20 years",
    fee: "$150",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    tags: ["Joint Pain", "Fractures", "Sports Injury"],
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    hospital: "Children's Care Hospital",
    rating: 4.8,
    reviews: 421,
    available: true,
    experience: "10 years",
    fee: "$60",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face",
    tags: ["Child Care", "Vaccination", "Growth"],
  },
  {
    name: "Dr. Robert Kim",
    specialty: "Dermatologist",
    hospital: "Skin Health Clinic",
    rating: 4.6,
    reviews: 156,
    available: false,
    experience: "7 years",
    fee: "$90",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
    tags: ["Acne", "Eczema", "Skin Cancer"],
  },
  {
    name: "Dr. Amanda Foster",
    specialty: "Psychiatrist",
    hospital: "MindWell Institute",
    rating: 4.9,
    reviews: 302,
    available: true,
    experience: "14 years",
    fee: "$110",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    tags: ["Anxiety", "Depression", "Therapy"],
  },
  {
    name: "Dr. Carlos Mendez",
    specialty: "Cardiologist",
    hospital: "HeartCare Clinic",
    rating: 4.7,
    reviews: 198,
    available: true,
    experience: "16 years",
    fee: "$95",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
    tags: ["Arrhythmia", "Cholesterol", "Stent"],
  },
  {
    name: "Dr. Lisa Park",
    specialty: "Gynecologist",
    hospital: "Women's Health Center",
    rating: 4.8,
    reviews: 267,
    available: true,
    experience: "11 years",
    fee: "$85",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop&crop=face",
    tags: ["Prenatal Care", "PCOS", "Fertility"],
  },
];

const specialties = ["All", "Cardiologist", "General Physician", "Neurologist", "Orthopedic Surgeon", "Pediatrician", "Dermatologist", "Psychiatrist", "Gynecologist"];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "fee">("rating");

  const filtered = useMemo(() => {
    let docs = allDoctors.filter(d => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.hospital.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchSpecialty = selectedSpecialty === "All" || d.specialty === selectedSpecialty;
      const matchAvailable = !showAvailableOnly || d.available;
      return matchSearch && matchSpecialty && matchAvailable;
    });

    if (sortBy === "rating") docs = docs.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") docs = docs.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === "fee") docs = docs.sort((a, b) => parseInt(a.fee.slice(1)) - parseInt(b.fee.slice(1)));

    return docs;
  }, [search, selectedSpecialty, showAvailableOnly, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-28 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full glass-card">
              <span className="status-online" />
              <span className="text-sm font-medium">Expert Doctors Available Now</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Find Your <span className="text-primary text-glow">Perfect Doctor</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Browse our network of 10,000+ certified doctors. Filter by specialty, availability, and rating.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, specialty, condition..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-card border-0 bg-muted/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Specialty Filter */}
              <div className="flex flex-wrap gap-2 flex-1">
                {specialties.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSpecialty(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                      selectedSpecialty === s
                        ? "bg-primary/20 text-primary border-primary/40"
                        : "bg-muted/20 border-border text-muted-foreground hover:bg-muted/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    showAvailableOnly
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-muted/20 border-border text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  Available Only
                </button>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-muted/20 border border-border text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="rating">Sort: Rating</option>
                  <option value="reviews">Sort: Reviews</option>
                  <option value="fee">Sort: Fee</option>
                </select>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Showing <span className="text-primary font-medium">{filtered.length}</span> doctors
              {selectedSpecialty !== "All" && <> in <span className="text-primary font-medium">{selectedSpecialty}</span></>}
            </p>
          </motion.div>

          {/* Doctors Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <NeonButton variant="outline" onClick={() => { setSearch(""); setSelectedSpecialty("All"); setShowAvailableOnly(false); }}>
                Clear Filters
              </NeonButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((doctor, index) => (
                <motion.div
                  key={doctor.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard className="p-5 h-full" glowColor={doctor.available ? "cyan" : "purple"}>
                    {/* Top Row */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/30"
                          loading="lazy"
                        />
                        <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${doctor.available ? "bg-green-500" : "bg-amber-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-base truncate">{doctor.name}</h3>
                        <p className="text-primary text-sm font-medium">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{doctor.hospital}</span>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(doctor.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                            ))}
                          </div>
                          <span className="text-xs font-medium">{doctor.rating}</span>
                          <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs bg-muted/40 text-muted-foreground">
                        {doctor.experience} exp
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs bg-primary/10 text-primary font-semibold">
                        {doctor.fee}/visit
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${doctor.available ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {doctor.available ? "● Available" : "● Busy"}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {doctor.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-muted/30 text-muted-foreground border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link to="/book-appointment" className="flex-1">
                        <NeonButton variant="primary" size="sm" className="w-full">
                          <Calendar className="w-3.5 h-3.5" />
                          Book
                        </NeonButton>
                      </Link>
                      <NeonButton
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open("tel:+18001234567")}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </NeonButton>
                      <Link to="/appointments" className="flex-1">
                        <NeonButton variant="ghost" size="sm" className="w-full">
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat
                        </NeonButton>
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
