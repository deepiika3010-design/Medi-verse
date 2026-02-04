import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        {/* 404 Text */}
        <motion.div
          className="font-display text-[120px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          404
        </motion.div>

        <h1 className="font-display text-2xl md:text-3xl font-bold mb-4 -mt-4 text-foreground">
          Page Not Found
        </h1>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Oops! The page you're looking for seems to have vanished into the medical void. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <NeonButton variant="primary" size="lg">
              <Home className="w-5 h-5" />
              Back to Home
            </NeonButton>
          </Link>
          <NeonButton variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </NeonButton>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
