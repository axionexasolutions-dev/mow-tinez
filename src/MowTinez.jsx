import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: "🌿",
    title: "Lawn Service",
    desc: "Professional mowing, edging, and clean-up to keep your lawn looking its absolute best season after season.",
  },
  {
    icon: "🪵",
    title: "Mulching",
    desc: "Premium mulch installation that retains moisture, suppresses weeds, and gives your beds a polished finish.",
  },
  {
    icon: "✂️",
    title: "Trimming",
    desc: "Precise hedge and shrub trimming for clean lines and a well-manicured look that impresses every neighbor.",
  },
  {
    icon: "🌳",
    title: "Shrub Removal",
    desc: "Safe and efficient removal of unwanted shrubs and overgrowth, leaving your yard clean and ready to transform.",
  },
];

const REVIEWS = [
  {
    name: "Maria G.",
    stars: 5,
    text: "Absolutely transformed my backyard! The team was professional, fast, and left no mess behind. Highly recommend!",
  },
  {
    name: "James R.",
    stars: 5,
    text: "Best lawn service in Abilene. They show up on time every time. My grass has never looked so healthy.",
  },
  {
    name: "Linda S.",
    stars: 5,
    text: "Called for a free quote and they came out same day. Pricing is fair and the quality is outstanding.",
  },
  {
    name: "Carlos M.",
    stars: 4,
    text: "Great mulching job, my flower beds look incredible now. Will definitely be a repeat customer!",
  },
];

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#f59e0b" : "#d1d5db", fontSize: "1rem" }}>★</span>
      ))}
    </div>
  );
}

export default function MowTinez() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", background: "#f0faf0", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .nav-link-hover { position: relative; }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #16a34a;
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after { width: 100%; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(22,163,74,0.15); }
      `}</style>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.4s ease",
          padding: "0 1.5rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => scrollTo("#home")}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, #16a34a, #4ade80)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.4rem", boxShadow: "0 2px 10px rgba(22,163,74,0.3)"
            }}>🌿</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.1rem", color: scrolled ? "#15803d" : "#fff", lineHeight: 1.1, textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.3)" }}>MOW-TINEZ</div>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: scrolled ? "#6b7280" : "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Landscaping Co.</div>
            </div>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="nav-link-hover"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                  fontSize: "0.88rem", letterSpacing: "0.03em",
                  color: scrolled ? "#374151" : "rgba(255,255,255,0.92)",
                  padding: "4px 0",
                  textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >{l.label}</button>
            ))}
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#contact")}
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                color: "#fff", border: "none", borderRadius: "50px",
                padding: "9px 22px", fontWeight: 800, fontSize: "0.85rem",
                cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.35)",
                fontFamily: "'Nunito', sans-serif",
              }}
            >Free Quote</motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px" }}
            className="mobile-menu-btn"
          >
            <div style={{ width: 24, height: 2, background: scrolled ? "#374151" : "#fff", margin: "5px 0", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <div style={{ width: 24, height: 2, background: scrolled ? "#374151" : "#fff", margin: "5px 0", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 24, height: 2, background: scrolled ? "#374151" : "#fff", margin: "5px 0", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ background: "#fff", overflow: "hidden", borderTop: "1px solid #e5e7eb" }}
            >
              <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {NAV_LINKS.map((l) => (
                  <button key={l.label} onClick={() => scrollTo(l.href)}
                    style={{ background: "none", border: "none", textAlign: "left", padding: "0.4rem 0", fontWeight: 700, fontSize: "1rem", color: "#374151", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}
                  >{l.label}</button>
                ))}
                <button onClick={() => scrollTo("#contact")}
                  style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: "50px", padding: "12px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}
                >Get a Free Quote</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, position: "absolute", inset: 0 }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
          }} />
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)" }} />
          {/* Grass pattern */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, rgba(21,128,61,0.4), transparent)" }} />
        </motion.div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto", padding: "100px 1.5rem 60px", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "50px", padding: "6px 16px", marginBottom: "1.5rem" }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Est. 2025 · Abilene, TX</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#fff", lineHeight: 1.08, marginBottom: "1.2rem" }}
            >
              Your Lawn,<br />
              <span style={{ color: "#4ade80" }}>Our Pride.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.7, marginBottom: "2.2rem", maxWidth: 520 }}
            >
              Whether it's a one-time job or routine maintenance, we bring quality, care, and curb appeal to every yard in Abilene.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(74,222,128,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#contact")}
                style={{
                  background: "linear-gradient(135deg, #4ade80, #16a34a)",
                  color: "#052e16", border: "none", borderRadius: "50px",
                  padding: "15px 34px", fontWeight: 900, fontSize: "1rem",
                  cursor: "pointer", fontFamily: "'Nunito', sans-serif",
                  boxShadow: "0 4px 20px rgba(74,222,128,0.3)",
                }}
              >📞 Get Free Quote</motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#services")}
                style={{
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
                  color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50px",
                  padding: "15px 34px", fontWeight: 800, fontSize: "1rem",
                  cursor: "pointer", fontFamily: "'Nunito', sans-serif",
                }}
              >Our Services ↓</motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ display: "flex", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}
            >
              {[["4+", "5★ Reviews"], ["2025", "Est. Year"], ["100%", "Satisfaction"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.8rem", color: "#4ade80" }}>{num}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em" }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
        >
          <div style={{ width: 28, height: 44, border: "2px solid rgba(255,255,255,0.4)", borderRadius: 14, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, borderRadius: 2, background: "rgba(255,255,255,0.6)" }} />
          </div>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 1.5rem", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ display: "inline-block", background: "#dcfce7", color: "#15803d", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1rem" }}>What We Do</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#052e16" }}>Our Services</h2>
              <p style={{ color: "#6b7280", marginTop: "0.8rem", fontSize: "1.05rem", maxWidth: 480, margin: "0.8rem auto 0" }}>Professional landscaping solutions designed to transform every outdoor space.</p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.12}>
                <div className="card-hover" style={{
                  background: "linear-gradient(145deg, #f0fdf4, #dcfce7)",
                  borderRadius: "20px", padding: "2rem",
                  border: "1px solid #bbf7d0", cursor: "default"
                }}>
                  <div style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.25rem", color: "#052e16", marginBottom: "0.6rem" }}>{s.title}</h3>
                  <p style={{ color: "#4b7060", lineHeight: 1.65, fontSize: "0.92rem" }}>{s.desc}</p>
                  <div style={{ marginTop: "1.2rem", display: "inline-flex", alignItems: "center", gap: 6, color: "#16a34a", fontWeight: 800, fontSize: "0.82rem" }}>
                    Learn more <span>→</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 1.5rem", background: "linear-gradient(135deg, #052e16 0%, #14532d 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeIn direction="right">
              <div>
                <div style={{ display: "inline-block", background: "rgba(74,222,128,0.15)", color: "#4ade80", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1rem", border: "1px solid rgba(74,222,128,0.3)" }}>About Us</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 2.8rem)", color: "#fff", marginBottom: "1.2rem", lineHeight: 1.15 }}>
                  Passion for <span style={{ color: "#4ade80" }}>Green Spaces</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "1.4rem" }}>
                  Founded in 2025, Mow-tinez Landscaping Co. was built on a simple belief: every yard deserves professional attention and genuine care. Based in Abilene, TX, we're your local lawn experts committed to delivering exceptional results.
                </p>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "1rem" }}>
                  From routine maintenance to full yard transformations, our team brings skill, reliability, and a personal touch to every job. We treat your property like it's our own.
                </p>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
                  {[["Local", "Abilene Based"], ["Licensed", "Insured & Trusted"], ["Free", "No-Cost Quotes"]].map(([bold, sub]) => (
                    <div key={bold} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80", fontSize: "1rem" }}>✓</div>
                      <div>
                        <div style={{ color: "#4ade80", fontWeight: 800, fontSize: "0.9rem" }}>{bold}</div>
                        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { emoji: "🏡", label: "Residential", sub: "Home yards" },
                  { emoji: "🏢", label: "Commercial", sub: "Business lots" },
                  { emoji: "🌱", label: "Seasonal", sub: "All year care" },
                  { emoji: "⭐", label: "5-Star", sub: "Rated service" },
                ].map((card) => (
                  <motion.div
                    key={card.label}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      background: "rgba(255,255,255,0.06)", borderRadius: "16px",
                      padding: "1.5rem 1.2rem", textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{card.emoji}</div>
                    <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem" }}>{card.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginTop: 2 }}>{card.sub}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── GALLERY / WHY US ── */}
      <section id="gallery" style={{ padding: "100px 1.5rem", background: "#f0fdf4" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ display: "inline-block", background: "#dcfce7", color: "#15803d", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1rem" }}>Why Choose Us</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#052e16" }}>We Go the Extra Mile</h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "📋", title: "Free Estimates", desc: "No obligation quotes — we come to you and assess exactly what your lawn needs." },
              { icon: "⏰", title: "Reliable & On-Time", desc: "We respect your schedule. Punctual arrivals and consistent service, every visit." },
              { icon: "💰", title: "Competitive Pricing", desc: "Premium service without the premium price tag. Fair rates for every budget." },
              { icon: "🌍", title: "Eco-Conscious", desc: "We care about your lawn AND the environment, using responsible practices." },
              { icon: "📱", title: "Easy to Reach", desc: "Call, text, or WhatsApp us anytime. We're always just a message away." },
              { icon: "🤝", title: "Local & Trusted", desc: "Proud Abilene locals who care about our community and the yards we serve." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="card-hover" style={{
                  background: "#fff", borderRadius: "18px", padding: "1.8rem",
                  border: "1px solid #d1fae5", display: "flex", gap: "1rem", alignItems: "flex-start"
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: "12px", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#052e16", marginBottom: "0.4rem" }}>{item.title}</h3>
                    <p style={{ color: "#4b7060", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ padding: "100px 1.5rem", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ display: "inline-block", background: "#dcfce7", color: "#15803d", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1rem" }}>Testimonials</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#052e16" }}>What Our Clients Say</h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.1}>
                <div className="card-hover" style={{
                  background: "linear-gradient(145deg, #f0fdf4, #fff)",
                  borderRadius: "20px", padding: "1.8rem",
                  border: "1px solid #bbf7d0",
                }}>
                  <StarRating count={r.stars} />
                  <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.92rem", margin: "1rem 0" }}>"{r.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "0.9rem" }}>{r.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#052e16" }}>{r.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Verified Customer</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 1.5rem", background: "linear-gradient(135deg, #052e16 0%, #14532d 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(74,222,128,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(22,163,74,0.08) 0%, transparent 50%)" }} />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <FadeIn>
            <div style={{ display: "inline-block", background: "rgba(74,222,128,0.15)", color: "#4ade80", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1rem", border: "1px solid rgba(74,222,128,0.3)" }}>Get In Touch</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#fff", marginBottom: "1rem" }}>
              Ready for a <span style={{ color: "#4ade80" }}>Beautiful Lawn?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 3rem" }}>
              Contact us today for a FREE, no-obligation quote. We serve all areas in Abilene, TX and surrounding communities.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", marginBottom: "3rem" }}>
              {[
                { icon: "📞", label: "Call / Text", value: "+1 (325) 338-9600", href: "tel:+13253389600" },
                { icon: "💬", label: "WhatsApp", value: "+1 (325) 338-9600", href: "https://wa.me/13253389600" },
                { icon: "✉️", label: "Email", value: "mowlandscaping.co@gmail.com", href: "mailto:mowlandscaping.co@gmail.com" },
                { icon: "📍", label: "Location", value: "Abilene, TX 79602", href: "#" },
              ].map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.1)" }}
                  style={{
                    background: "rgba(255,255,255,0.07)", borderRadius: "16px",
                    padding: "1.5rem 1.2rem", textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.12)", display: "block",
                    transition: "background 0.25s",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{c.icon}</div>
                  <div style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{c.label}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", wordBreak: "break-word" }}>{c.value}</div>
                </motion.a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <motion.a
              href="tel:+13253389600"
              whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(74,222,128,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "linear-gradient(135deg, #4ade80, #16a34a)",
                color: "#052e16", borderRadius: "50px",
                padding: "16px 40px", fontWeight: 900, fontSize: "1.05rem",
                textDecoration: "none", fontFamily: "'Nunito', sans-serif",
                boxShadow: "0 4px 20px rgba(74,222,128,0.25)",
              }}
            >
              📞 Call Now for a Free Quote
            </motion.a>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#020d06", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: "1rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#16a34a,#4ade80)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🌿</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1rem", color: "#4ade80" }}>MOW-TINEZ Landscaping Co.</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
              >{l.label}</button>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
            © 2025 Mow-tinez Landscaping Co. · Abilene, TX · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}