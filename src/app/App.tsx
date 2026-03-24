import React from 'react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Instagram, Mail, Phone, X } from 'lucide-react';

const marumunaiFrames = [
  '/src/asserts/films/Marumunai/m-1.jpg',
  '/src/asserts/films/Marumunai/m-2.jpg',
  '/src/asserts/films/Marumunai/m-3.jpg',
  '/src/asserts/films/Marumunai/m-4.jpg',
  '/src/asserts/films/Marumunai/m-5.jpg',
  '/src/asserts/films/Marumunai/m-6.jpg',
  '/src/asserts/films/Marumunai/m-7.jpg',
  '/src/asserts/films/Marumunai/m-8.jpg',
  '/src/asserts/films/Marumunai/m-9.jpg',
  '/src/asserts/films/Marumunai/m-10.jpg'
];

const thodarFrames = [
  '/src/asserts/films/thodar/t-1.jpg',
  '/src/asserts/films/thodar/t-2.jpg',
  '/src/asserts/films/thodar/t-3.jpg',
  '/src/asserts/films/thodar/t-4.jpg',
  '/src/asserts/films/thodar/t-5.jpg',
  '/src/asserts/films/thodar/t-6.jpg',
  '/src/asserts/films/thodar/t-7.jpg',
  '/src/asserts/films/thodar/t-8.jpg',
  '/src/asserts/films/thodar/t-9.jpg',
  '/src/asserts/films/thodar/t-10.jpg',
  '/src/asserts/films/thodar/t-11.jpg',
  '/src/asserts/films/thodar/t-12.jpg'
];
const HERO_BG_URL = 'https://wolfcrow.com/wp-content/uploads/2019/02/kutch.jpg';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [lightbox, setLightbox] = useState<{ frames: string[]; index: number; title: string } | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const loaderStart = Date.now();
    const minVisibleMs = 1400;
    const maxWaitMs = 9000;
    const assetsToPreload = [...marumunaiFrames, ...thodarFrames, HERO_BG_URL];
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
        setLightbox(null);
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lightbox]);

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.03]);

  const films = [
    {
      id: 1,
      title: 'Marumunai',
      category: 'Short Film',
      frameCount: 10,
      frames: marumunaiFrames,
      image: marumunaiFrames[0],
    },
    {
      id: 2,
      title: 'Thodar',
      category: 'Short Film',
      frameCount: 12,
      frames: thodarFrames,
      image: thodarFrames[0],
    }
  ];

  const openLightbox = (film: typeof films[0]) => {
    setLightbox({ frames: film.frames, index: 0, title: film.title });
    setShowScrollHint(true);
    setTimeout(() => setShowScrollHint(false), 2800);
  };

  const closeLightbox = () => setLightbox(null);
  const lensRadius = 24;
  const lensCircumference = 2 * Math.PI * lensRadius;
  const progressOffset = lensCircumference - (loadProgress / 100) * lensCircumference;

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
            style={{ background: '#0a0a0a' }}
          >
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center px-6"
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute h-40 w-40 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(12px)' }}
                  animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <svg width="176" height="130" viewBox="0 0 176 130" fill="none" aria-label="Loading camera">
                  <motion.rect
                    x="24"
                    y="32"
                    width="128"
                    height="74"
                    rx="14"
                    stroke="white"
                    strokeWidth="2"
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.rect
                    x="42"
                    y="22"
                    width="42"
                    height="12"
                    rx="4"
                    fill="white"
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    cx="128"
                    cy="46"
                    r="4"
                    fill="white"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <circle cx="88" cy="69" r="25" stroke="white" strokeWidth="2" />
                  <motion.circle
                    cx="88"
                    cy="69"
                    r={lensRadius}
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="8 9"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '88px 69px' }}
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
                    animate={{ rotate: [0, 30, 60, 90, 120, 150, 180, 210], scale: [1, 0.72, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '88px 69px' }}
                  />
                </svg>
                <motion.p
                  className="absolute -bottom-10 uppercase"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '4px', color: '#f5f5f5' }}
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Loading {loadProgress}%
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
            className="fixed inset-0 z-[100] overflow-y-auto"
            style={{ background: '#080808' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sticky Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-6 lg:px-12 py-5"
              style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Left — title */}
              <div className="flex items-center gap-5">
                <div className="w-px h-4 bg-[#222]" />
                <div>
                  <p className="uppercase" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '9px', letterSpacing: '4px', color: '#444' }}>
                    Short Film
                  </p>
                  <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '18px', fontWeight: 300, color: '#fff', lineHeight: 1.1 }}>
                    {lightbox.title}
                  </p>
                </div>
              </div>

              {/* Right — frame count + close */}
              <div className="flex items-center gap-6">
                <p className="uppercase hidden lg:block" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '9px', letterSpacing: '3px', color: '#333' }}>
                  {lightbox.frames.length} Frames — Scroll to explore
                </p>
                <button
                  onClick={closeLightbox}
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
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Scanning progress line */}
                  <motion.div
                    style={{ height: 1, background: 'rgba(255,255,255,0.15)', position: 'relative', overflow: 'hidden' }}
                  >
                    <motion.div
                      style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '30%', background: 'rgba(255,255,255,0.7)' }}
                      animate={{ x: ['0vw', '340vw'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                  {/* Text row */}
                  <div
                    className="flex items-center justify-between px-6 lg:px-12 py-4"
                    style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(14px)' }}
                  >
                    <p className="uppercase" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '9px', letterSpacing: '5px', color: 'rgba(255,255,255,0.3)' }}>
                      {lightbox.frames.length} frames
                    </p>
                    <motion.p
                      className="uppercase"
                      style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '9px', letterSpacing: '5px', color: 'rgba(255,255,255,0.3)' }}
                      animate={{ opacity: [0.3, 0.9, 0.3] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
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
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={frame}
                    alt={`Frame ${i + 1}`}
                    className="w-full object-cover"
                    style={{ display: 'block', maxHeight: '85vh', objectFit: 'cover' }}
                  />
                  {/* Frame number overlay */}
                  <div
                    className="absolute bottom-0 left-0 px-4 py-3"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
                  >
                    <p className="uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)' }}>
                      {String(i + 1).padStart(2, '0')} / {String(lightbox.frames.length).padStart(2, '0')}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* End card */}
              <motion.div
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-px h-12 bg-[#222] mb-8" />
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 300, color: '#333' }}>
                  {lightbox.title}
                </p>
                <p className="uppercase mt-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '4px', color: '#2a2a2a' }}>
                  End of frames
                </p>
                <button
                  onClick={closeLightbox}
                  className="mt-10 uppercase flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '3px', color: '#fff' }}
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
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          animate={!isLoading ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${HERO_BG_URL}')`
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 40%, rgba(10,10,10,0.15) 100%)'
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
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              letterSpacing: '4px',
              color: '#555555'
            }}
          >
            DOP — Film
          </p>
        </motion.div>

        {/* Main hero content — bottom anchored big text */}
        <div className="relative h-full flex flex-col justify-end px-6 lg:px-[60px] pb-16 lg:pb-20">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 30, letterSpacing: '8px' }}
            animate={!isLoading ? { opacity: 1, y: 0, letterSpacing: '4px' } : {}}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase mb-4 lg:mb-6"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              color: '#888888'
            }}
          >
            Cinematographer
          </motion.p>

          {/* Giant name with solid/outline modern aesthetic */}
          <div className="relative overflow-hidden mb-[-5px] lg:mb-[-15px]">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={!isLoading ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 'clamp(44px, 7vw, 110px)',
                fontWeight: 400,
                lineHeight: 1,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              Mukilan
            </motion.h1>
          </div>

          <div className="relative overflow-hidden mb-8 lg:mb-12">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={!isLoading ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 'clamp(44px, 7vw, 110px)',
                fontWeight: 400,
                lineHeight: 1,
                color: '#ffffff',
                letterSpacing: '-0.02em',
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
                fontSize: '12px',
                color: '#666666',
                maxWidth: '260px',
                lineHeight: 1.7
              }}
            >
              Visual Storyteller &<br />Director of Photography
            </p>

            <div className="hidden lg:flex items-center gap-4">
              <div className="w-px h-10 bg-white opacity-20" />
              <p
                className="uppercase"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '3px',
                  color: '#888888'
                }}
              >
                scroll
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section className="px-6 lg:px-[120px] py-24 lg:py-40 relative overflow-hidden">
        {/* Large faint background text */}
        <div
          className="absolute right-0 top-1/2 pointer-events-none select-none hidden lg:block"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '260px',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            lineHeight: 1,
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.04em',
          }}
        >
          Work
        </div>

        {/* Scroll indicator - added for work section */}
        <div className="flex flex-col items-center gap-4 mb-24 lg:mb-32">
          <div className="w-px h-10 bg-white opacity-20" />
          <p
            className="uppercase"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '3px',
              color: '#888888'
            }}
          >
            scroll
          </p>
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
          <p className="uppercase" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '10px', letterSpacing: '5px', color: '#444' }}>
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
      <section className="px-6 lg:px-[120px] py-24 lg:py-40 relative overflow-hidden">

        {/* Large faint background text */}
        <div
          className="absolute right-0 top-1/2 pointer-events-none select-none hidden lg:block"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '260px',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            lineHeight: 1,
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.04em',
          }}
        >
          About
        </div>

        {/* Section label */}
        <motion.div
          className="flex items-center gap-6 mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#333]" />
          <p className="uppercase" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '10px', letterSpacing: '5px', color: '#444' }}>
            About
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0">

          {/* Left — Image with floating stat cards */}
          <div className="w-full lg:w-[45%] relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Main image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', maxWidth: '420px' }}>
                <img
                  src="https://images.unsplash.com/photo-1727528605123-142157a2c30c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZpbG1tYWtlciUyMHBob3RvZ3JhcGhlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzIyMDM3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mukilan"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.88)' }}
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)' }} />
              </div>


            </motion.div>
          </div>

          {/* Right — Text content */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center lg:pl-20">

            {/* Big quote-style intro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: 'clamp(32px, 3.5vw, 52px)',
                  fontWeight: 300,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  marginBottom: '32px',
                }}
              >
                Crafting frames that<br />
                <span style={{ color: '#555' }}>speak before words do.</span>
              </h2>
            </motion.div>

            {/* Thin divider */}
            <motion.div
              className="w-full h-px bg-[#1a1a1a] mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                lineHeight: '2',
                color: '#666666',
                marginBottom: '40px',
              }}
            >
              An aspiring cinematographer with a deep passion for visual storytelling. Guided by a love for light, composition, and the emotional impact of moving images, I aim to craft visuals that are not only beautiful but also meaningful—serving the story and resonating with the audience on a deeper level.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                lineHeight: '2',
                color: '#444444',
                marginBottom: '48px',
              }}
            >
              Each project is a chance to grow, explore new perspectives, and push creative boundaries. I believe in the collaborative spirit of filmmaking and am always eager to bring my vision, dedication, and energy to impactful and meaningful projects.
            </motion.p>

            {/* Skills / Tags row */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {['Cinematography', 'Lighting', 'Composition', 'Color Grading', 'Visual Narrative'].map((tag) => (
                <span
                  key={tag}
                  className="uppercase"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2.5px',
                    color: '#444',
                    border: '1px solid #1e1e1e',
                    padding: '6px 14px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>



          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 lg:px-[120px] py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2
            className="mb-16 lg:mb-20"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: 300,
              color: '#ffffff'
            }}
          >
            Let's Work
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-20">
            <ContactItem
              icon={<Instagram strokeWidth={1.5} size={20} />}
              label="Instagram"
              value="@iammukil_26"
              href="https://instagram.com/iammukil_26"
            />
            <ContactItem
              icon={<Mail strokeWidth={1.5} size={20} />}
              label="Email"
              value="mukilan2604@gmail.com"
              href="mailto:mukilan2604@gmail.com"
            />
            <ContactItem
              icon={<Phone strokeWidth={1.5} size={20} />}
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
            fontSize: '240px',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.03)',
            lineHeight: 1,
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.04em',
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
              fontSize: '11px',
              letterSpacing: '1px',
              color: '#555555'
            }}
          >
            © 2025 &nbsp;·&nbsp; Mukilan &nbsp;·&nbsp; <a href="https://rameshxt.pages.dev/" target="_blank" rel="noopener noreferrer" style={{ color: '#EF233C', cursor: 'pointer', transition: 'opacity 0.2s' }} className="hover:opacity-80">Dev by Ramesh XT</a>
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
      className="relative aspect-video overflow-hidden cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${film.image}')`,
          filter: isHovered ? 'brightness(0.45)' : 'brightness(0.65)'
        }}
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute bottom-0 left-0 p-8 lg:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="uppercase mb-2"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '11px',
            letterSpacing: '2px',
            color: '#aaaaaa'
          }}
        >
          {film.category} • {film.frameCount} frames
        </p>
        <h3
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '32px',
            fontWeight: 300,
            color: '#ffffff'
          }}
        >
          {film.title}
        </h3>
        <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '10px', letterSpacing: '3px', color: '#666', marginTop: '8px' }}>
          CLICK TO VIEW
        </p>
      </motion.div>
    </motion.div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="flex flex-col items-center gap-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-white opacity-60">
        {icon}
      </div>
      <p
        className="uppercase"
        style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '11px',
          letterSpacing: '2px',
          color: '#666666'
        }}
      >
        {label}
      </p>
      <p
        className="relative"
        style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '13px',
          color: '#ffffff'
        }}
      >
        {value}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-px bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: 'left' }}
        />
      </p>
    </a>
  );
}
