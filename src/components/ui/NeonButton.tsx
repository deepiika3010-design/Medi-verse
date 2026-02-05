import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface NeonButtonProps {
  variant?: "primary" | "secondary" | "emergency" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variants = {
  primary: "bg-gradient-to-r from-cyan-500 to-purple-500 text-primary-foreground shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6)]",
  secondary: "bg-gradient-to-r from-purple-500 to-purple-600 text-secondary-foreground shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)]",
  emergency: "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)]",
  outline: "bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
  md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
  lg: "px-5 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
};

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, onClick, type = "button" }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "relative rounded-xl font-semibold overflow-hidden transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={!disabled ? { scale: 1.02, y: -2 } : undefined}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.button>
    );
  }
);

NeonButton.displayName = "NeonButton";
