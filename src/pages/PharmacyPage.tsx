import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Pill, Search, ShoppingCart, Upload, Star, Plus, Minus,
  Package, Clock, Shield, Truck, X
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Heart Health", "Diabetes"];

const medicines = [
  { name: "Paracetamol 500mg", category: "Pain Relief", price: 5.99, rating: 4.8, inStock: true, image: "💊", description: "Fast-acting pain relief tablets" },
  { name: "Amoxicillin 250mg", category: "Antibiotics", price: 12.99, rating: 4.7, inStock: true, image: "💉", description: "Broad-spectrum antibiotic capsules" },
  { name: "Vitamin D3 1000IU", category: "Vitamins", price: 8.49, rating: 4.9, inStock: true, image: "☀️", description: "Daily vitamin D supplement" },
  { name: "Aspirin 75mg", category: "Heart Health", price: 4.99, rating: 4.6, inStock: true, image: "❤️", description: "Low-dose aspirin for heart health" },
  { name: "Metformin 500mg", category: "Diabetes", price: 9.99, rating: 4.5, inStock: false, image: "🩺", description: "Blood sugar management tablets" },
  { name: "Vitamin C 1000mg", category: "Vitamins", price: 6.99, rating: 4.8, inStock: true, image: "🍊", description: "Immunity booster supplement" },
  { name: "Ibuprofen 400mg", category: "Pain Relief", price: 7.49, rating: 4.7, inStock: true, image: "💊", description: "Anti-inflammatory pain relief" },
  { name: "Omega-3 Fish Oil", category: "Heart Health", price: 14.99, rating: 4.9, inStock: true, image: "🐟", description: "Heart & brain health supplement" },
];

interface CartItem {
  name: string;
  price: number;
  qty: number;
}

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = medicines.filter(m =>
    (activeCategory === "All" || m.category === activeCategory) &&
    (searchQuery === "" || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (name: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name, price, qty: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0));
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Online <span className="text-primary text-glow">Pharmacy</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">Order medicines & upload prescriptions</p>
            </div>
            <div className="flex gap-2">
              <NeonButton variant="outline" size="sm">
                <Upload className="w-4 h-4" /> Upload Prescription
              </NeonButton>
              <NeonButton variant="primary" size="sm" onClick={() => setShowCart(!showCart)} className="relative">
                <ShoppingCart className="w-4 h-4" /> Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">{cartCount}</span>
                )}
              </NeonButton>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Truck, label: "Free Delivery", sub: "Orders above $25" },
              { icon: Shield, label: "Genuine Meds", sub: "100% certified" },
              { icon: Clock, label: "Fast Delivery", sub: "Within 2 hours" },
              { icon: Package, label: "Easy Returns", sub: "7-day policy" },
            ].map((b, i) => (
              <GlassCard key={i} className="p-3 sm:p-4 text-center" hover3D={false}>
                <b.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 text-primary" />
                <p className="text-xs sm:text-sm font-semibold">{b.label}</p>
                <p className="text-xs text-muted-foreground">{b.sub}</p>
              </GlassCard>
            ))}
          </motion.div>

          {/* Search & Categories */}
          <div className="mb-6">
            <div className="relative max-w-md w-full mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl glass-card bg-card border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeCategory === c ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((med, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    <GlassCard className="p-4" glowColor={med.inStock ? "green" : "purple"}>
                      <div className="text-4xl mb-3 text-center">{med.image}</div>
                      <h3 className="font-display font-semibold text-sm sm:text-base mb-1">{med.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{med.description}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{med.rating}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{med.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-lg text-primary">${med.price}</span>
                        {med.inStock ? (
                          <NeonButton variant="primary" size="sm" onClick={() => addToCart(med.name, med.price)}>
                            <Plus className="w-3.5 h-3.5" /> Add
                          </NeonButton>
                        ) : (
                          <span className="text-xs text-destructive font-medium px-2 py-1 rounded-full bg-destructive/10">Out of Stock</span>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart Sidebar (visible on lg or when toggled) */}
            {(showCart || cart.length > 0) && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-80 shrink-0">
                <GlassCard className="p-4 sm:p-5 sticky top-28" glowColor="cyan">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" /> Cart
                    </h3>
                    <button onClick={() => setShowCart(false)} className="lg:hidden text-muted-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {cart.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                        {cart.map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/30">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">${item.price} each</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => removeFromCart(item.name)} className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                              <button onClick={() => addToCart(item.name, item.price)} className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium">Total</span>
                          <span className="font-display font-bold text-lg text-primary">${total.toFixed(2)}</span>
                        </div>
                        <NeonButton variant="primary" size="sm" className="w-full">
                          Checkout • ${total.toFixed(2)}
                        </NeonButton>
                      </div>
                    </>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
