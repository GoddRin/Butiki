import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, Flower2, Heart, Sparkles, Compass } from 'lucide-react';
import { audio } from '../utils/audioSynth';

export default function Navbar({ petalsActive, setPetalsActive }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(audio.tracks[0].title);
  const [volume, setVolume] = useState(0.4);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = () => {
    const active = audio.toggle();
    setIsPlaying(active);
    audio.playSparkle();
  };

  const handleNextTrack = () => {
    const next = audio.nextTrack();
    setCurrentTrack(next.title);
    if (!isPlaying) {
      audio.start();
      setIsPlaying(true);
    }
    audio.playSparkle();
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    audio.setVolume(v);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        padding: scrolled ? '0.6rem 1.5rem' : '1.1rem 2rem',
        background: scrolled ? 'rgba(7, 9, 19, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Brand / Couple Monogram */}
        <a
          href="#top"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(244, 63, 94, 0.4)'
            }}
          >
            <Heart size={18} fill="#ffffff" color="#ffffff" className="animate-heartbeat" />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.02em',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Kuya <span style={{ color: '#fb7185' }}>&</span> Chimp
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  background: 'rgba(244, 63, 94, 0.2)',
                  color: '#fda4af',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600
                }}
              >
                18 Mos
              </span>
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: '#94a3b8',
                fontFamily: "'Caveat', cursive"
              }}
            >
              Marc Harrold & Ross Ann • March 22, 2025
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.4rem'
          }}
          className="desktop-nav"
        >
          {[
            { href: '#flowers', label: '🌹 Grand Flowers' },
            { href: '#memories', label: '📸 Polaroids' },
            { href: '#blueprint', label: '📐 Engr. Ross Ann' },
            { href: '#letter', label: '✉️ Kuya’s Letter' },
            { href: '#coupons', label: '🎟️ Coupons' }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                padding: '4px 8px',
                borderRadius: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fb7185';
                e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Music Player & Petal Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            padding: '4px 10px',
            borderRadius: '9999px',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Petals Toggle */}
          <button
            onClick={() => {
              setPetalsActive(!petalsActive);
              audio.playSparkle();
            }}
            title={petalsActive ? 'Pause falling petals' : 'Enable falling petals'}
            style={{
              background: petalsActive ? 'rgba(244, 63, 94, 0.25)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: petalsActive ? '#fda4af' : '#64748b',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <Flower2 size={16} />
          </button>

          {/* Music Play/Pause */}
          <button
            onClick={handleToggleMusic}
            title={isPlaying ? 'Pause romantic melody' : 'Play romantic melody'}
            style={{
              background: isPlaying
                ? 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              padding: '7px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isPlaying ? '0 0 12px rgba(244, 63, 94, 0.5)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '1px' }} />}
          </button>

          {/* Next Track */}
          <button
            onClick={handleNextTrack}
            title="Next Song"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: '5px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SkipForward size={14} />
          </button>

          {/* Track Info & Equalizer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '140px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: isPlaying ? '#fecdd3' : '#94a3b8',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              {currentTrack}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                height: '8px'
              }}
            >
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  style={{
                    width: '2px',
                    height: isPlaying ? `${Math.sin(bar * 1.5) * 4 + 6}px` : '2px',
                    backgroundColor: isPlaying ? '#fbbf24' : '#475569',
                    borderRadius: '1px',
                    transition: 'height 0.2s ease'
                  }}
                />
              ))}
              <span style={{ fontSize: '0.55rem', color: '#64748b', marginLeft: '3px' }}>
                {isPlaying ? 'Live Audio' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => {
                const nextV = volume === 0 ? 0.4 : 0;
                setVolume(nextV);
                audio.setVolume(nextV);
              }}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
            >
              {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: '45px',
                accentColor: '#f43f5e',
                cursor: 'pointer',
                height: '3px'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
