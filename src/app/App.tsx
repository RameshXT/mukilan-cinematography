import React from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Instagram, Mail, Phone, X, ArrowUpRight } from "lucide-react";

// Marumunai frames
import m1 from "../assets/films/Marumunai/m-1.jpg";
import m2 from "../assets/films/Marumunai/m-2.jpg";
import m3 from "../assets/films/Marumunai/m-3.jpg";
import m4 from "../assets/films/Marumunai/m-4.jpg";
import m5 from "../assets/films/Marumunai/m-5.jpg";
import m6 from "../assets/films/Marumunai/m-6.jpg";
import m7 from "../assets/films/Marumunai/m-7.jpg";
import m8 from "../assets/films/Marumunai/m-8.jpg";
import m9 from "../assets/films/Marumunai/m-9.jpg";
import m10 from "../assets/films/Marumunai/m-10.jpg";

// Thodar frames
import t1 from "../assets/films/thodar/t-1.jpg";
import t2 from "../assets/films/thodar/t-2.jpg";
import t3 from "../assets/films/thodar/t-3.jpg";
import t4 from "../assets/films/thodar/t-4.jpg";
import t5 from "../assets/films/thodar/t-5.jpg";
import t6 from "../assets/films/thodar/t-6.jpg";
import t7 from "../assets/films/thodar/t-7.jpg";
import t8 from "../assets/films/thodar/t-8.jpg";
import t9 from "../assets/films/thodar/t-9.jpg";
import t10 from "../assets/films/thodar/t-10.jpg";
import t11 from "../assets/films/thodar/t-11.jpg";
import t12 from "../assets/films/thodar/t-12.jpg";

// Grammy frames
import g1 from "../assets/films/grammy/G-1.png";
import g2 from "../assets/films/grammy/G-2.png";
import g3 from "../assets/films/grammy/G-3.png";
import g4 from "../assets/films/grammy/G-4.png";
import g5 from "../assets/films/grammy/G-5.png";
import g6 from "../assets/films/grammy/G-6.png";
import g7 from "../assets/films/grammy/G-7.png";
import g8 from "../assets/films/grammy/G-8.png";
import g9 from "../assets/films/grammy/G-9.png";
import g10 from "../assets/films/grammy/G-10.png";

// Navins frames
import n1 from "../assets/films/navins/N-1.png";
import n2 from "../assets/films/navins/N-2.png";
import n3 from "../assets/films/navins/N-3.png";
import n4 from "../assets/films/navins/N-4.png";
import n5 from "../assets/films/navins/N-5.png";
import n6 from "../assets/films/navins/N-6.png";
import n7 from "../assets/films/navins/N-7.png";
import n8 from "../assets/films/navins/N-8.png";

const marumunaiFrames = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];

const thodarFrames = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12];

const grammyFrames = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10];

const navinsFrames = [n1, n2, n3, n4, n5, n6, n7, n8];

const HERO_BG_URL = "https://wolfcrow.com/wp-content/uploads/2019/02/kutch.jpg";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let timer: number;
    if (displayProgress < loadProgress) {
      timer = window.setInterval(() => {
        setDisplayProgress((prev) => {
          if (prev >= loadProgress) {
            window.clearInterval(timer);
            return loadProgress;
          }
          return prev + 1;
        });
      }, 14);
    }
    return () => window.clearInterval(timer);
  }, [loadProgress, displayProgress]);

  const [lightbox, setLightbox] = useState<{
    frames: string[];
    index: number;
    title: string;
    category: string;
    videoUrl?: string;
    credits?: string[];
  } | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loaderStart = Date.now();
    const minVisibleMs = 1400;
    const maxWaitMs = 9000;
    const assetsToPreload = [
      navinsFrames[0],
      marumunaiFrames[0],
      thodarFrames[0],
      grammyFrames[0],
      HERO_BG_URL,
    ];
    const totalAssets = assetsToPreload.length;
    let loadedAssets = 0;
    let completed = false;
    let isMounted = true;
    let finishTimeoutId: number | null = null;

    const finishLoader = () => {
      if (completed || !isMounted) return;
      completed = true;
      setLoadProgress(100);
      const elapsed = Date.now() - loaderStart;
      const remaining = Math.max(minVisibleMs - elapsed, 0);

      finishTimeoutId = window.setTimeout(() => {
        if (!isMounted) return;
        setIsLoading(false);
      }, remaining);
    };

    const markAssetLoaded = () => {
      if (completed || !isMounted) return;
      loadedAssets += 1;
      const progress = Math.round((loadedAssets / totalAssets) * 100);
      setLoadProgress(progress);
      if (loadedAssets >= totalAssets) finishLoader();
    };

    assetsToPreload.forEach((src) => {
      const image = new Image();
      let settled = false;
      const resolve = () => {
        if (settled) return;
        settled = true;
        markAssetLoaded();
      };
      image.onload = resolve;
      image.onerror = resolve;
      image.src = src;
      if (image.complete) resolve();
    });

    const hardTimeout = window.setTimeout(finishLoader, maxWaitMs);

    return () => {
      isMounted = false;
      window.clearTimeout(hardTimeout);
      if (finishTimeoutId) window.clearTimeout(finishTimeoutId);
    };
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) window.history.back();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (lightbox) {
        setLightbox(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [lightbox]);

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.03]);

  const films = [
    {
      id: 4,
      title: "Navin's Ad",
      category: "Ads",
      frameCount: 8,
      frames: navinsFrames,
      image: navinsFrames[0],
      videoUrl: "https://www.youtube.com/embed/xRfQoAuYGHw",
      credits: [
        "Director: Vinoth Nathan",
        "DOP: Vishal",
        "Associate: Deepak R Ravichandran, Aswin Rajagopal",
        "Assistant Cinematographer: Mukilan, Lokesh",
      ],
    },
    {
      id: 3,
      title: "Grammy Savor Puttu Ad",
      category: "Ads",
      frameCount: 10,
      frames: grammyFrames,
      image: grammyFrames[0],
      videoUrl: "https://www.youtube.com/embed/vXmQokYXrG0",
      credits: [
        "Director: Praveen Leonard",
        "DOP: Vishal",
        "Assistant Cinematographer: Mukilan, Lokesh",
      ],
    },
    {
      id: 2,
      title: "Thodar",
      category: "Short Film",
      frameCount: 12,
      frames: thodarFrames,
      image: thodarFrames[0],
    },
    {
      id: 1,
      title: "Marumunai",
      category: "Short Film",
      frameCount: 10,
      frames: marumunaiFrames,
      image: marumunaiFrames[0],
    },
  ];

  const openLightbox = (film: (typeof films)[0]) => {
    window.history.pushState({ lightbox: true }, "");
    setLightbox({
      frames: film.frames,
      index: 0,
      title: film.title,
      category: film.category,
      videoUrl: (film as any).videoUrl,
      credits: (film as any).credits,
    });
    setShowScrollHint(true);
    setTimeout(() => setShowScrollHint(false), 2800);
  };

  const closeLightbox = () => {
    if (lightbox) window.history.back();
  };
  const lensRadius = 24;
  const lensCircumference = 2 * Math.PI * lensRadius;
  const progressOffset =
    lensCircumference - (displayProgress / 100) * lensCircumference;

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "#0a0a0a" }}
          >
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center px-6"
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute h-40 w-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
                    filter: "blur(12px)",
                  }}
                  animate={{
                    scale: [0.95, 1.08, 0.95],
                    opacity: [0.35, 0.65, 0.35],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <svg
                  width="176"
                  height="130"
                  viewBox="0 0 176 130"
                  fill="none"
                  aria-label="Loading camera"
                >
                  <motion.rect
                    x="24"
                    y="32"
                    width="128"
                    height="74"
                    rx="14"
                    stroke="white"
                    strokeWidth="2"
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.rect
                    x="42"
                    y="22"
                    width="42"
                    height="12"
                    rx="4"
                    fill="white"
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.circle
                    cx="128"
                    cy="46"
                    r="4"
                    fill="white"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <circle
                    cx="88"
                    cy="69"
                    r="25"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="88"
                    cy="69"
                    r={lensRadius}
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="8 9"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "88px 69px" }}
                  />
                  <circle
                    cx="88"
                    cy="69"
                    r={lensRadius}
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="3"
                    strokeDasharray={lensCircumference}
                    strokeDashoffset={progressOffset}
                    transform="rotate(-90 88 69)"
                  />
                  <motion.polygon
                    points="88,60 96,65 96,73 88,78 80,73 80,65"
                    fill="white"
                    animate={{
                      rotate: [0, 30, 60, 90, 120, 150, 180, 210],
                      scale: [1, 0.72, 1],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "88px 69px" }}
                  />
                </svg>
                <motion.p
                  className="absolute -bottom-10 uppercase"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "4px",
                    color: "#f5f5f5",
                  }}
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Loading {displayProgress}%
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Frame Viewer */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto select-none"
            style={{
              background: "#080808",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sticky Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-6 lg:px-12 py-5"
              style={{
                background: "rgba(8,8,8,0.95)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Left — title */}
              <div className="flex items-center gap-5">
                <div className="w-px h-4 bg-[#222]" />
                <div>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "9px",
                      letterSpacing: "4px",
                      color: "#444",
                    }}
                  >
                    {lightbox.category}
                  </p>
                  <p
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "#fff",
                      lineHeight: 1.1,
                    }}
                  >
                    {lightbox.title}
                  </p>
                </div>
              </div>

              {/* Right — frame count + close */}
              <div className="flex items-center gap-6">
                <p
                  className="uppercase hidden lg:block"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: "9px",
                    letterSpacing: "3px",
                    color: "#333",
                  }}
                >
                  {lightbox.frames.length} Frames — Scroll to explore
                </p>
                <button
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="flex items-center gap-2 text-white opacity-40 hover:opacity-100 transition-opacity"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Scroll hint — minimal bottom toast */}
            <AnimatePresence>
              {showScrollHint && (
                <motion.div
                  className="fixed bottom-0 left-0 right-0 z-[115] pointer-events-none"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Scanning progress line */}
                  <motion.div
                    style={{
                      height: 1,
                      background: "rgba(255,255,255,0.15)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "30%",
                        background: "rgba(255,255,255,0.7)",
                      }}
                      animate={{ x: ["0vw", "340vw"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                  {/* Text row */}
                  <div
                    className="flex items-center justify-between px-6 lg:px-12 py-4"
                    style={{
                      background: "rgba(8,8,8,0.92)",
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    <p
                      className="uppercase"
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "10px",
                        letterSpacing: "5px",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 500,
                      }}
                    >
                      {lightbox.frames.length} frames
                    </p>
                    <motion.p
                      className="uppercase"
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "10px",
                        letterSpacing: "5px",
                        color: "#ffffff",
                        fontWeight: 600,
                      }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ↓ Scroll
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* All frames stacked vertically */}
            <div className="px-6 lg:px-24 py-16 flex flex-col gap-3 lg:gap-4">
              {lightbox.frames.map((frame, i) => (
                <motion.div
                  key={i}
                  className="relative w-full overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={frame}
                    alt={`Frame ${i + 1}`}
                    className="w-full object-cover"
                    style={{
                      display: "block",
                      maxHeight: "85vh",
                      objectFit: "cover",
                    }}
                  />
                  {/* Frame number overlay */}
                  <div
                    className="absolute bottom-0 left-0 px-4 py-3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  >
                    <p
                      className="uppercase"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "9px",
                        letterSpacing: "3px",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(lightbox.frames.length).padStart(2, "0")}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Video Section */}
              {lightbox.videoUrl && (
                <motion.div
                  className="w-full mt-12 mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative pt-[56.25%] w-full overflow-hidden bg-[#111] border border-white/5 ring-1 ring-white/5">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={lightbox.videoUrl}
                      title={`${lightbox.title} Video Player`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p
                      className="uppercase"
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "9px",
                        letterSpacing: "4px",
                        color: "#444",
                      }}
                    >
                      Watch full video
                    </p>
                    <div className="flex-1 h-px bg-[#222] mx-6" />
                    <ArrowUpRight size={14} className="text-[#333]" />
                  </div>
                </motion.div>
              )}

              {/* End card / Footer Section */}
              <motion.div
                className="flex flex-col items-center justify-center py-12 pb-16 border-t border-white/[0.05] mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                {/* Visual Header */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background:
                        "linear-gradient(to bottom, #ffffff, transparent)",
                      marginBottom: "20px",
                    }}
                  />
                  <h2
                    className="uppercase text-center px-4"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "clamp(18px, 5vw, 22px)",
                      fontWeight: 300,
                      letterSpacing: "clamp(6px, 3vw, 14px)",
                      color: "#ffffff",
                      lineHeight: "1.4",
                    }}
                  >
                    {lightbox.title}
                  </h2>
                </div>

                {/* Credits Section - Responsive Editorial Layout */}
                {lightbox.credits && (
                  <div className="flex flex-col gap-6 md:gap-4 w-full px-6 mb-8 items-center">
                    {lightbox.credits.map((line, i) => {
                      const parts = line.split(":");
                      return (
                        <div 
                          key={i} 
                          className="flex flex-col md:grid md:grid-cols-2 gap-1 md:gap-x-12 w-full max-w-[500px]"
                        >
                          <span 
                            className="uppercase text-center md:text-right"
                            style={{ 
                              fontFamily: '"Montserrat", sans-serif', 
                              fontSize: "9px", 
                              letterSpacing: "3px", 
                              color: "rgba(255,255,255,0.2)",
                              fontWeight: 400
                            }}
                          >
                            {parts[0]}
                          </span>
                          <span 
                            className="text-center md:text-left"
                            style={{ 
                              fontFamily: '"Inter", sans-serif', 
                              fontSize: "12px", 
                              color: "#ffffff",
                              letterSpacing: "0.04em",
                              fontWeight: 300
                            }}
                          >
                            {parts[1] || ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Final End Signature */}
                <div className="flex flex-col items-center gap-6">
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      backgroundColor: "rgba(255,255,255,0.25)",
                    }}
                  />
                  <p
                    className="uppercase whitespace-nowrap"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "9px",
                      letterSpacing: "2px",
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 400,
                    }}
                  >
                    End of frames
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  aria-label="Close lightbox at bottom"
                  className="mt-4 uppercase flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px",
                    letterSpacing: "3px",
                    color: "#fff",
                  }}
                >
                  <X size={12} strokeWidth={1.5} /> Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale }}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          animate={
            !isLoading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${HERO_BG_URL}')`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 40%, rgba(10,10,10,0.15) 100%)",
            }}
          />
        </motion.div>

        {/* Top right label */}
        <motion.div
          className="absolute top-10 right-6 lg:right-[60px] z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={!isLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              letterSpacing: "4px",
              color: "#555555",
            }}
          >
            DOP — Film
          </p>
        </motion.div>

        {/* Main hero content — bottom anchored big text */}
        <div className="relative h-full flex flex-col justify-end px-6 lg:px-[60px] pb-16 lg:pb-20">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 30, letterSpacing: "8px" }}
            animate={
              !isLoading ? { opacity: 1, y: 0, letterSpacing: "4px" } : {}
            }
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase mb-4 lg:mb-6"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "11px",
              fontWeight: 400,
              color: "#888888",
            }}
          >
            Cinematographer
          </motion.p>

          {/* Giant name with solid/outline modern aesthetic */}
          <div className="relative overflow-hidden mb-[-5px] lg:mb-[-15px]">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={!isLoading ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "clamp(44px, 7vw, 110px)",
                fontWeight: 400,
                lineHeight: 1,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Mukilan
            </motion.h1>
          </div>

          <div className="relative overflow-hidden mb-8 lg:mb-12">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={!isLoading ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 1.4,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "clamp(44px, 7vw, 110px)",
                fontWeight: 400,
                lineHeight: 1,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Vaithiyanathan
            </motion.h1>
          </div>

          {/* Bottom row */}
          <motion.div
            className="flex items-end justify-between mt-8 lg:mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <p
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "12px",
                color: "#666666",
                maxWidth: "260px",
                lineHeight: 1.7,
              }}
            >
              Visual Storyteller &<br />
              Director of Photography
            </p>

            <div className="hidden lg:flex items-center gap-4">
              <div className="w-px h-10 bg-white opacity-20" />
              <p
                className="uppercase"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "3px",
                  color: "#888888",
                }}
              >
                scroll
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section className="px-6 lg:px-[120px] py-16 lg:py-24 relative overflow-hidden">
        {/* Large faint background text */}
        <div
          className="absolute right-0 top-1/2 pointer-events-none select-none hidden lg:block"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "260px",
            fontWeight: 300,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            lineHeight: 1,
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            letterSpacing: "-0.04em",
          }}
        >
          Work
        </div>

        {/* Section label */}
        <motion.div
          className="flex items-center gap-6 mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#333]" />
          <p
            className="uppercase"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "10px",
              letterSpacing: "5px",
              color: "#444",
            }}
          >
            Work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
          {films.map((film, index) => (
            <FilmCard
              key={film.id}
              film={film}
              index={index}
              onClick={() => openLightbox(film)}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 lg:px-[120px] pb-28 pt-16 lg:pb-40 lg:pt-24 relative overflow-hidden bg-[#0a0a0a]">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-6 mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#333]" />
          <p
            className="uppercase"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "10px",
              letterSpacing: "5px",
              color: "#444",
            }}
          >
            About
          </p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 max-w-[1400px] mx-auto items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] max-w-[520px] mx-auto lg:mx-0 overflow-hidden group cursor-pointer"
            style={{ willChange: "transform" }}
          >
            <img
              src="https://images.unsplash.com/photo-1727528605123-142157a2c30c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZpbG1tYWtlciUyMHBob3RvZ3JhcGhlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzIyMDM3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Mukilan"
              className="w-full h-full object-cover"
              style={{
                filter: "grayscale(100%) brightness(0.7) contrast(1)",
                transition:
                  "filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  "grayscale(100%) brightness(0.95) contrast(1.25)";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter =
                  "grayscale(100%) brightness(0.7) contrast(1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <div className="absolute inset-[12px] border border-white/[0.06] group-hover:border-white/15 transition-colors duration-1000 pointer-events-none" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Headline */}
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 300,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                marginBottom: "40px",
              }}
            >
              Crafting Visual
              <br />
              Stories
            </h2>

            {/* Body text */}
            <p
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "14px",
                lineHeight: 2,
                color: "#aaa",
                marginBottom: "24px",
                maxWidth: "480px",
              }}
            >
              An aspiring cinematographer with a deep passion for visual
              storytelling. Guided by a love for light, composition, and the
              emotional impact of moving images, I aim to craft visuals that are
              not only beautiful but also meaningful — serving the story and
              resonating with the audience on a deeper level.
            </p>

            <p
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "14px",
                lineHeight: 2,
                color: "#888",
                marginBottom: "40px",
                maxWidth: "480px",
              }}
            >
              Each project is a chance to grow, explore new perspectives, and
              push creative boundaries. I believe in the collaborative spirit of
              filmmaking and am always eager to bring my vision, dedication, and
              energy to impactful and meaningful projects.
            </p>

            {/* Divider + Quote */}
            <div className="w-16 h-px bg-[#262626] mb-6" />
            <p
              className="uppercase mb-12"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "10px",
                letterSpacing: "4px",
                color: "#555",
              }}
            >
              Speak before{" "}
              <span style={{ color: "#fff", fontWeight: 500 }}>words</span> do.
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-3" style={{ maxWidth: "480px" }}>
              {[
                "Cinematography",
                "Lighting",
                "Color Grading",
                "Composition",
                "Visual Narrative",
              ].map((tag) => (
                <span
                  key={tag}
                  className="uppercase"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: "9px",
                    letterSpacing: "2px",
                    color: "#777",
                    border: "1px solid #252525",
                    padding: "8px 16px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#555";
                    e.currentTarget.style.color = "#ccc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#252525";
                    e.currentTarget.style.color = "#777";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 lg:px-[120px] py-16 lg:py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center max-w-2xl"
        >
          {/* Subtle line */}
          <div className="w-px h-16 bg-[#333] mb-8" />

          <h2
            className="mb-6"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            Let's work together.
          </h2>

          <p
            className="mb-16"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "13px",
              color: "#777",
              lineHeight: 1.8,
              maxWidth: "400px",
            }}
          >
            Open for commissions, collaborations, and conversations about visual
            storytelling.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            <ContactItem
              icon={<Instagram strokeWidth={1} size={18} />}
              label="Instagram"
              value="@iammukil_26"
              href="https://instagram.com/iammukil_26"
            />
            <ContactItem
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H6v4h3Z" />
                  <path d="M6 16h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H6v3Z" />
                  <path d="M14 12v1a2 2 0 1 0 4 0v-1" />
                  <path d="M14 12h4" />
                  <path d="M14 8h4" />
                  <path d="M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z" />
                </svg>
              }
              label="Behance"
              value="mukilanv"
              href="https://www.behance.net/mukilanv"
            />
            <ContactItem
              icon={<Mail strokeWidth={1} size={18} />}
              label="Email"
              value="mukilan2604@gmail.com"
              href="mailto:mukilan2604@gmail.com"
            />
            <ContactItem
              icon={<Phone strokeWidth={1} size={18} />}
              label="Phone"
              value="+91 95009 95740"
              href="tel:+919500995740"
            />
          </div>
        </motion.div>
      </section>

      {/* Footer / Copyright Section */}
      <footer className="px-6 lg:px-[120px] py-16 pb-20 relative overflow-hidden text-center">
        {/* Large faint background text */}
        <div
          className="absolute right-0 top-1/2 pointer-events-none select-none hidden lg:block"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "240px",
            fontWeight: 300,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            lineHeight: 1,
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            letterSpacing: "-0.04em",
          }}
        >
          Mukilan
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <p
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "11px",
              letterSpacing: "1px",
              color: "#555555",
            }}
          >
            © 2025
            {new Date().getFullYear() > 2025
              ? ` - ${new Date().getFullYear()}`
              : ""}{" "}
            &nbsp;·&nbsp; Mukilan &nbsp;·&nbsp; Designed and developed by{" "}
            <a
              href="https://rameshxt.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#EF233C",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              className="hover:opacity-80"
            >
              Ramesh XT
            </a>
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

interface FilmCardProps {
  film: {
    id: number;
    title: string;
    category: string;
    frameCount: number;
    frames: string[];
    image: string;
  };
  index: number;
  onClick: () => void;
}

function FilmCard({ film, index, onClick }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative aspect-video overflow-hidden cursor-pointer group select-none"
      style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${film.image}')`,
        }}
        animate={{
          scale: isHovered ? 1.04 : 1,
          filter: isHovered ? "brightness(0.35)" : "brightness(1)",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute top-0 right-0 p-0 lg:p-8 pointer-events-none"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            padding: "6px 16px",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            whiteSpace: "nowrap",
          }}
        >
          <h3
            className="text-right uppercase"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "clamp(10px, 3vw, 13px)",
              letterSpacing: "2.5px",
              color: "#ffffff",
              fontWeight: 400,
            }}
          >
            {film.title}
          </h3>
        </div>
      </motion.div>

      {/* Hover Info: Original bottom left design, fades in on hover */}
      <motion.div
        className="absolute bottom-0 left-0 p-8 lg:p-12 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.4 }}
      >
        <p
          className="uppercase mb-2"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#aaaaaa",
          }}
        >
          {film.category} • {film.frameCount} frames
        </p>
        <h3
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "32px",
            fontWeight: 300,
            color: "#ffffff",
          }}
        >
          {film.title}
        </h3>
        <p
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#666",
            marginTop: "8px",
          }}
        >
          CLICK TO VIEW
        </p>
      </motion.div>
    </motion.div>
  );
}

interface ContactItemProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-2 group-hover:opacity-100 transition-opacity duration-300">
        {icon && (
          <div className="text-[#888] group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        )}
        <span
          className="uppercase"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#555",
          }}
        >
          {label}
        </span>
      </div>
      <span
        className="relative"
        style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: "14px",
          fontWeight: 300,
          color: "#ccc",
          transition: "color 0.3s ease",
        }}
      >
        <span className={isHovered ? "text-white" : ""}>{value}</span>
        <motion.span
          className="absolute -bottom-1 left-0 w-full h-[1px] bg-white opacity-40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center" }}
        />
      </span>
    </a>
  );
}
