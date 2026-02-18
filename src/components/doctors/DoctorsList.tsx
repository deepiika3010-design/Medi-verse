import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { DoctorCard } from "./DoctorCard";
import { NeonButton } from "@/components/ui/NeonButton";

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    hospital: "City Heart Hospital",
    rating: 4.9,
    reviews: 328,
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "General Physician",
    hospital: "Central Medical Center",
    rating: 4.8,
    reviews: 512,
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Neurologist",
    hospital: "NeuroHealth Institute",
    rating: 4.7,
    reviews: 245,
    available: false,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. James Thompson",
    specialty: "Orthopedic Surgeon",
    hospital: "Bone & Joint Center",
    rating: 4.9,
    reviews: 189,
    available: true,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    hospital: "Children's Care Hospital",
    rating: 4.8,
    reviews: 421,
    available: true,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Robert Kim",
    specialty: "Dermatologist",
    hospital: "Skin Health Clinic",
    rating: 4.6,
    reviews: 156,
    available: false,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
  },
];

export function DoctorsList() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4"
        >
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Our <span className="text-primary text-glow">Expert Doctors</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Connect with certified healthcare professionals available 24/7
            </p>
          </div>
          <Link to="/doctors">
            <NeonButton variant="outline" size="sm">
              <Users className="w-4 h-4" />
              View All Doctors
              <ArrowRight className="w-4 h-4" />
            </NeonButton>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/doctors">
            <NeonButton variant="primary">
              Browse All 10,000+ Doctors
              <ArrowRight className="w-4 h-4" />
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
