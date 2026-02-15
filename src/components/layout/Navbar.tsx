import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity, Phone, User, Stethoscope, LogOut, Calendar, Pill, Brain } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/pharmacy", label: "Pharmacy", icon: Pill },
  { href: "/symptom-checker", label: "Symptoms", icon: Brain },
  { href: "/emergency", label: "Emergency", icon: Phone },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-2 sm:mx-4 mt-2 sm:mt-4">
        <div className="glass-card !rounded-xl sm:!rounded-2xl px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg sm:rounded-xl opacity-80" />
                <Activity className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </motion.div>
              <span className="font-display text-lg sm:text-xl font-bold text-glow hidden xs:block">
                MediVerse
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative font-medium transition-colors flex items-center gap-2 text-sm lg:text-base",
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
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <NeonButton variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </NeonButton>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <NeonButton variant="outline" size="sm">
                      <User className="w-4 h-4" />
                      Login
                    </NeonButton>
                  </Link>
                  <Link to="/book-appointment">
                    <NeonButton size="sm">
                      <Stethoscope className="w-4 h-4" />
                      Get Started
                    </NeonButton>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
            className="md:hidden mx-2 sm:mx-4 mt-2"
          >
            <div className="glass-card !rounded-xl sm:!rounded-2xl p-3 sm:p-4 space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block py-2 px-3 sm:px-4 rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base",
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 sm:pt-4 border-t border-border space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{user.email}</span>
                    </div>
                    <NeonButton variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </NeonButton>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <NeonButton variant="outline" size="sm" className="w-full">
                        Login
                      </NeonButton>
                    </Link>
                    <Link to="/book-appointment" onClick={() => setIsOpen(false)}>
                      <NeonButton size="sm" className="w-full">
                        Get Started
                      </NeonButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
