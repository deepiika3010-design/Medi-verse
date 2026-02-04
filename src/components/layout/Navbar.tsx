import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity, Phone, User, Stethoscope } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/patient", label: "Patient Portal" },
  { href: "/doctor", label: "Doctor Portal" },
  { href: "/emergency", label: "Emergency", icon: Phone },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <div className="glass-card !rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                className="relative w-10 h-10 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-80" />
                <Activity className="relative z-10 w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="font-display text-xl font-bold text-glow hidden sm:block">
                MediVerse
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative font-medium transition-colors flex items-center gap-2",
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <NeonButton variant="outline" size="sm">
                <User className="w-4 h-4" />
                Login
              </NeonButton>
              <NeonButton size="sm">
                <Stethoscope className="w-4 h-4" />
                Get Started
              </NeonButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="glass-card !rounded-2xl p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block py-2 px-4 rounded-lg transition-colors flex items-center gap-2",
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <NeonButton variant="outline" size="sm" className="w-full">
                  Login
                </NeonButton>
                <NeonButton size="sm" className="w-full">
                  Get Started
                </NeonButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
