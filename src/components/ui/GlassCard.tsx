import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
  glowColor?: "cyan" | "purple" | "red" | "green";
}

const glowColors = {
  cyan: "hover:shadow-[0_0_40px_rgba(0,212,255,0.3)]",
  purple: "hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]",
  red: "hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]",
  green: "hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]",
};

export function GlassCard({
  children,
  className,
  hover3D = true,
  glowColor = "cyan",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-card p-6",
        glowColors[glowColor],
        className
      )}
      whileHover={hover3D ? { 
        y: -8, 
        rotateX: 2,
        transition: { duration: 0.3, ease: "easeOut" }
      } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
