import React from 'react';
import { Heart, ArrowUp, Stars } from 'lucide-react';
import { audio } from '../utils/audioSynth';

export default function Footer() {
  const scrollToTop = () => {
    audio.playSparkle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(7, 9, 19, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '4rem 1.5rem 2.5rem 1.5rem',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem'
        }}
      >
        {/* Monogram Ring */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(244, 63, 94, 0.4)'
          }}
        >
          <Heart size={26} fill="#ffffff" color="#ffffff" className="animate-heartbeat" />
        </div>

        <div
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: '1.75rem',
            fontWeight: 800
          }}
        >
          Marc Harrold Salva & Ross Ann Mora
        </div>

        <div
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1.35rem',
            color: '#fda4af',
            lineHeight: 1.5,
            maxWidth: '540px'
          }}
        >
          "Ikaw at ikaw lang ang gusto kong makasama hanggang pagtanda. Happy 1 Year and 6 Months, my Chimp!"
        </div>

        <div
          style={{
            fontSize: '0.8rem',
            color: '#64748b',
            fontFamily: "'JetBrains Mono', monospace"
          }}
        >
          MARCH 22, 2025 • EXACTLY 550 DAYS • SEPTEMBER 22, 2026
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          style={{
            marginTop: '1.5rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            padding: '8px 20px',
            color: '#cbd5e1',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fb7185';
            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#cbd5e1';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          }}
        >
          <ArrowUp size={14} />
          <span>Back to Top</span>
        </button>

        <div
          style={{
            fontSize: '0.72rem',
            color: '#475569',
            marginTop: '1.5rem'
          }}
        >
          Crafted with love by Kuya Marc for his one and only Chimp / Butiki 🌹
        </div>
      </div>
    </footer>
  );
}
