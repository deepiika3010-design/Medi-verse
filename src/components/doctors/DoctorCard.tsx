import { motion } from "framer-motion";
import { Star, Video, Phone, MessageSquare, MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

interface DoctorCardProps {
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  available: boolean;
  image: string;
}

export function DoctorCard({ name, specialty, hospital, rating, reviews, available, image }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-4 sm:p-6 relative overflow-hidden" glowColor={available ? "cyan" : "purple"}>
        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          available 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
        }`}>
          {available ? '● Available' : '● Busy'}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Doctor Image */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-primary/30">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-primary-foreground fill-current" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display font-semibold text-lg">{name}</h3>
            <p className="text-primary text-sm font-medium">{specialty}</p>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground text-xs mt-1">
              <MapPin className="w-3 h-3" />
              {hospital}
            </div>
            
            {/* Rating */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <NeonButton variant="primary" size="sm" className="flex-1 min-w-[80px]">
            <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Video</span>
          </NeonButton>
          <NeonButton variant="outline" size="sm" className="flex-1 min-w-[80px]" onClick={() => window.open("tel:+18001234567")}>
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Call</span>
          </NeonButton>
          <NeonButton variant="ghost" size="sm" className="flex-1 min-w-[80px]">
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Chat</span>
          </NeonButton>
        </div>
      </GlassCard>
    </motion.div>
  );
}
