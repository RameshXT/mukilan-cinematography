import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const films = [
  {
    id: 1,
    title: 'Midnight Runner',
    category: 'Short Film',
    year: '2025',
    duration: '18 min',
    coverImage: 'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmElMjBvcGVyYXRvcnxlbnwxfHx8fDE3NzIyMDM3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    frames: [
      'https://images.unsplash.com/photo-1675421835790-09337cd6a883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBuaWdodCUyMHVyYmFuJTIwc3RyZWV0JTIwbmVvbnxlbnwxfHx8fDE3NzIyMDQ2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1742045016113-6fc7b65f26fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwZHJhbWF0aWMlMjBzaGFkb3dzJTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NzIyMDQ2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1560406146-78f8cb5e0fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMG1pbmltYWwlMjBnZW9tZXRyaWN8ZW58MXx8fHwxNzcyMjA0NjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmElMjBvcGVyYXRvcnxlbnwxfHx8fDE3NzIyMDM3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  },
  {
    id: 2,
    title: 'Shadows & Light',
    category: 'Documentary',
    year: '2024',
    duration: '42 min',
    coverImage: 'https://images.unsplash.com/photo-1576948609669-c0031da41350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwc2V0JTIwY2luZW1hdG9ncmFwaHklMjBsaWdodGluZ3xlbnwxfHx8fDE3NzIyMDM3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    frames: [
      'https://images.unsplash.com/photo-1756201409420-00f93939f9d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjBtb29keSUyMGF0bW9zcGhlcmljfGVufDF8fHx8MTc3MjIwNDY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1762160767084-fb4fb425a0c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHBvcnRyYWl0JTIwbGlnaHRpbmclMjBzdHVkaW98ZW58MXx8fHwxNzcyMjA0NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1658848797025-5f990cdad3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBzdW5zZXQlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3MjIwNDY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1576948609669-c0031da41350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwc2V0JTIwY2luZW1hdG9ncmFwaHklMjBsaWdodGluZ3xlbnwxfHx8fDE3NzIyMDM3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<typeof films[0] | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openFilmGallery = (film: typeof films[0]) => {
    setSelectedFilm(film);
    setCurrentFrameIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeFilmGallery = () => {
    setSelectedFilm(null);
    document.body.style.overflow = 'unset';
  };

  const nextFrame = () => {
    if (selectedFilm) {
      setCurrentFrameIndex((prev) => (prev + 1) % selectedFilm.frames.length);
    }
  };

  const prevFrame = () => {
    if (selectedFilm) {
      setCurrentFrameIndex((prev) => 
        prev === 0 ? selectedFilm.frames.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFilm) return;
      if (e.key === 'Escape') closeFilmGallery();
      if (e.key === 'ArrowRight') nextFrame();
      if (e.key === 'ArrowLeft') prevFrame();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFilm, currentFrameIndex]);

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-[120px] relative">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 lg:space-y-12"
          >
            {/* Tag */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span 
                  className="inline-block px-4 py-2 border border-white/10"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#666666'
                  }}
                >
                  Cinematographer
                </span>
              </motion.div>
            </div>

            {/* Name */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(56px, 10vw, 140px)',
                  fontWeight: 500,
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}
              >
                Alex
                <br />
                Morrison
              </motion.h1>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-0 max-w-5xl"
            >
              <p 
                className="max-w-md"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#888888',
                  fontWeight: 300
                }}
              >
                Crafting visual narratives through light, shadow, and motion.
                Specializing in cinematic storytelling that transcends the frame.
              </p>

              <div className="flex items-center gap-6">
                <div className="h-px w-12 bg-white/20" />
                <span 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#666666',
                    letterSpacing: '1px'
                  }}
                >
                  Scroll to explore
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Minimal nav indicator */}
        <motion.div 
          className="absolute top-8 lg:top-12 right-6 lg:right-[120px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span 
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#444444'
            }}
          >
            Portfolio
          </span>
        </motion.div>
      </section>

      {/* Work Section */}
      <section className="px-6 lg:px-[120px] py-32 lg:py-40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 lg:mb-32"
          >
            <h2 
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#ffffff'
              }}
            >
              Selected Works
            </h2>
            <div className="h-px w-24 bg-white/20 mt-6" />
          </motion.div>

          <div className="space-y-6 lg:space-y-8">
            {films.map((film, index) => (
              <FilmCard 
                key={film.id} 
                film={film} 
                index={index}
                onClick={() => openFilmGallery(film)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 lg:px-[120px] py-32 lg:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column - Stats & Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-16"
            >
              <div>
                <h2 
                  className="mb-16"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(36px, 5vw, 56px)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: '#ffffff',
                    lineHeight: 1.2
                  }}
                >
                  About
                  <br />
                  the Craft
                </h2>

                <div className="space-y-12">
                  <div>
                    <div 
                      className="mb-3"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '72px',
                        fontWeight: 500,
                        color: '#ffffff',
                        lineHeight: 1
                      }}
                    >
                      10+
                    </div>
                    <p 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: '#666666'
                      }}
                    >
                      Years of Experience
                    </p>
                  </div>

                  <div>
                    <div 
                      className="mb-3"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '72px',
                        fontWeight: 500,
                        color: '#ffffff',
                        lineHeight: 1
                      }}
                    >
                      45+
                    </div>
                    <p 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: '#666666'
                      }}
                    >
                      Projects Completed
                    </p>
                  </div>

                  <div>
                    <div 
                      className="mb-3"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '72px',
                        fontWeight: 500,
                        color: '#ffffff',
                        lineHeight: 1
                      }}
                    >
                      12
                    </div>
                    <p 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: '#666666'
                      }}
                    >
                      Film Festivals
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Philosophy & Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 space-y-12"
            >
              {/* Quote */}
              <div className="border-l-2 border-white/20 pl-8 lg:pl-12">
                <p 
                  className="mb-8"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    color: '#ffffff'
                  }}
                >
                  "Every frame is a moment frozen in time, a deliberate choice between light and shadow, truth and poetry."
                </p>
              </div>

              {/* Bio Text */}
              <div className="space-y-6">
                <p 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    lineHeight: '1.9',
                    color: '#aaaaaa',
                    fontWeight: 300
                  }}
                >
                  My journey in cinematography began over a decade ago, driven by an obsession with how light shapes emotion. From intimate character studies to sweeping landscapes, I approach each project as a unique visual language waiting to be discovered.
                </p>

                <p 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    lineHeight: '1.9',
                    color: '#aaaaaa',
                    fontWeight: 300
                  }}
                >
                  I've had the privilege of collaborating with visionary directors and brands across narrative films, documentaries, and commercial work. My technical foundation is rooted in classical composition, but my approach remains experimental—always seeking that perfect collision of precision and spontaneity.
                </p>

                <p 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    lineHeight: '1.9',
                    color: '#aaaaaa',
                    fontWeight: 300
                  }}
                >
                  Based between New York and Los Angeles, I'm currently accepting select projects for 2026.
                </p>
              </div>

              {/* Image */}
              <motion.div 
                className="mt-12 aspect-[4/5] lg:aspect-[3/4] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1727528605123-142157a2c30c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZpbG1tYWtlciUyMHBob3RvZ3JhcGhlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzIyMDM3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 lg:px-[120px] py-32 lg:py-40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 
              className="mb-8"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#ffffff'
              }}
            >
              Let's Create
              <br />
              Together
            </h2>

            <p 
              className="mb-20 lg:mb-24"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#888888',
                fontWeight: 300
              }}
            >
              Available for collaborations, commissions, and creative partnerships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24">
              <ContactLink 
                label="Instagram"
                value="@alexmorrison"
                href="https://instagram.com"
              />
              <ContactLink 
                label="Email"
                value="contact@alexmorrison.film"
                href="mailto:contact@alexmorrison.film"
              />
              <ContactLink 
                label="Phone"
                value="+1 555 0123"
                href="tel:+15550123"
              />
            </div>

            <div className="space-y-6">
              <div className="h-px w-full bg-white/10" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    color: '#444444'
                  }}
                >
                  © 2026 Alex Morrison. All Rights Reserved.
                </p>
                <p 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    color: '#444444'
                  }}
                >
                  New York / Los Angeles
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Film Gallery Lightbox */}
      <AnimatePresence>
        {selectedFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeFilmGallery}
          >
            <button
              onClick={closeFilmGallery}
              className="absolute top-6 right-6 lg:top-12 lg:right-12 text-white/60 hover:text-white transition-colors z-10"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <div className="absolute top-6 left-6 lg:top-12 lg:left-12 z-10">
              <h3 
                className="mb-2"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 500,
                  color: '#ffffff'
                }}
              >
                {selectedFilm.title}
              </h3>
              <p 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#888888'
                }}
              >
                {selectedFilm.category} • {selectedFilm.year}
              </p>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <p 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  color: '#666666'
                }}
              >
                {currentFrameIndex + 1} / {selectedFilm.frames.length}
              </p>
            </div>

            <div className="w-full h-full flex items-center justify-center px-6 lg:px-24" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={prevFrame}
                className="absolute left-6 lg:left-12 text-white/40 hover:text-white transition-colors"
              >
                <ChevronLeft size={48} strokeWidth={1.5} />
              </button>

              <motion.div
                key={currentFrameIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl w-full aspect-video"
              >
                <img 
                  src={selectedFilm.frames[currentFrameIndex]}
                  alt={`Frame ${currentFrameIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <button
                onClick={nextFrame}
                className="absolute right-6 lg:right-12 text-white/40 hover:text-white transition-colors"
              >
                <ChevronRight size={48} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FilmCardProps {
  film: typeof films[0];
  index: number;
  onClick: () => void;
}

function FilmCard({ film, index, onClick }: FilmCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center border-b border-white/10 py-8 lg:py-12 hover:border-white/20 transition-colors duration-500">
        {/* Image */}
        <div className="lg:col-span-5 aspect-video overflow-hidden">
          <motion.img 
            src={film.coverImage}
            alt={film.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) contrast(1.1)' }}
            whileHover={{ scale: 1.05, filter: 'brightness(0.9) contrast(1.1)' }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Info */}
        <div className="lg:col-span-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h3 
              className="mb-3"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#ffffff'
              }}
            >
              {film.title}
            </h3>
            <div className="flex items-center gap-4">
              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#666666'
                }}
              >
                {film.category}
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  color: '#666666'
                }}
              >
                {film.year}
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  color: '#666666'
                }}
              >
                {film.duration}
              </span>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#888888'
              }}
            >
              View Frames
            </span>
            <ChevronRight size={20} className="text-white/40" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

interface ContactLinkProps {
  label: string;
  value: string;
  href: string;
}

function ContactLink({ label, value, href }: ContactLinkProps) {
  return (
    <motion.a
      href={href}
      className="group block"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <p 
        className="mb-3"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#666666'
        }}
      >
        {label}
      </p>
      <p 
        className="relative inline-block"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: '#ffffff',
          fontWeight: 400
        }}
      >
        {value}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
      </p>
    </motion.a>
  );
}
