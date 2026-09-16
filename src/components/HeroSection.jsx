import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Sparkles, Clock, Compass, Stars, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audioSynth';

export default function HeroSection() {
  const [timeTogether, setTimeTogether] = useState({
    days: 550,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [countdownTo22, setCountdownTo22] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [loveClicks, setLoveClicks] = useState(0);
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    // Official start date: March 22, 2025 00:00:00
    const startDate = new Date('2025-03-22T00:00:00');
    // Target next monthsary: September 22, 2026 00:00:00
    const targetMonthsary = new Date('2026-09-22T00:00:00');

    const updateTimers = () => {
      const now = new Date();

      // Time together
      const diffSinceStart = Math.max(0, now - startDate);
      const daysTogether = Math.floor(diffSinceStart / (1000 * 60 * 60 * 24));
      const hoursTogether = Math.floor((diffSinceStart / (1000 * 60 * 60)) % 24);
      const minutesTogether = Math.floor((diffSinceStart / (1000 * 60)) % 60);
      const secondsTogether = Math.floor((diffSinceStart / 1000) % 60);

      setTimeTogether({
        days: daysTogether,
        hours: hoursTogether,
        minutes: minutesTogether,
        seconds: secondsTogether
      });

      // Countdown to Sept 22
      const diffToTarget = targetMonthsary - now;
      if (diffToTarget > 0) {
        setCountdownTo22({
          days: Math.floor(diffToTarget / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffToTarget / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffToTarget / (1000 * 60)) % 60),
          seconds: Math.floor((diffToTarget / 1000) % 60)
        });
      } else {
        setCountdownTo22({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHeartBurst = (e) => {
    setLoveClicks((prev) => prev + 1);
    setBursting(true);
    setTimeout(() => setBursting(false), 600);

    audio.playHeartPop();

    // Trigger romantic confetti hearts
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#fda4af'],
      shapes: ['circle'],
      scalar: 1.2
    });
  };

  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 1.5rem 4rem 1.5rem',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* Background Ambient Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.18) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Top Sweet Pill Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            backdropFilter: 'blur(10px)',
            marginBottom: '1.4rem'
          }}
        >
          <Sparkles size={16} color="#fbbf24" />
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#fecdd3',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            September 22, 2026 • 18th Monthsary Special
          </span>
          <Heart size={14} fill="#f43f5e" color="#f43f5e" />
        </div>

        {/* Main Title */}
        <h1
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.2rem',
            textShadow: '0 4px 30px rgba(244, 63, 94, 0.3)'
          }}
        >
          Under The September Stars
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            color: '#cbd5e1',
            maxWidth: '680px',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}
        >
          A grand monthsary gift handcrafted by Kuya Marc for his dearest <strong style={{ color: '#fda4af', fontStyle: 'normal' }}>Ross Ann Mora</strong>,
          my Chimp, my Butiki, and my forever Labidabsss.
        </p>

        {/* The 550 Days of Love Milestone Card */}
        <div
          className="glass-panel-glow"
          style={{
            width: '100%',
            maxWidth: '820px',
            padding: '2rem 1.5rem',
            marginBottom: '2.5rem',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.2rem',
              color: '#fbbf24'
            }}
          >
            <Calendar size={18} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              Exact Milestone: March 22, 2025 → September 22, 2026
            </span>
          </div>

          <div
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #fda4af 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '0.4rem',
              letterSpacing: '-0.02em'
            }}
          >
            {timeTogether.days} DAYS
          </div>

          <div
            style={{
              fontSize: '1rem',
              color: '#fda4af',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              marginBottom: '1.6rem'
            }}
          >
            "Exactly 550 days simula nang naging tayo — ikaw at ikaw lang ang mamahalin ni Kuya hanggang pagtanda."
          </div>

          {/* Detailed Counter Grid (Hours, Minutes, Seconds) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.8rem',
              maxWidth: '450px',
              margin: '0 auto 1.5rem auto'
            }}
          >
            {[
              { val: String(timeTogether.hours).padStart(2, '0'), label: 'Hours' },
              { val: String(timeTogether.minutes).padStart(2, '0'), label: 'Minutes' },
              { val: String(timeTogether.seconds).padStart(2, '0'), label: 'Seconds' }
            ].map((unit, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '0.6rem 0.4rem'
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}
                >
                  {unit.val}
                </div>
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Countdown to September 22, 2026 */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '8px 16px',
              borderRadius: '12px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: '#bae6fd',
              fontSize: '0.82rem',
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            <Clock size={15} color="#38bdf8" />
            <span>Countdown to 18th Monthsary Midnight:</span>
            <strong style={{ color: '#ffffff' }}>
              {countdownTo22.days}d {countdownTo22.hours}h {countdownTo22.minutes}m {countdownTo22.seconds}s
            </strong>
          </div>
        </div>

        {/* Interactive Love Button & Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          {/* Receive Kuya's Hugs & Love */}
          <button
            onClick={handleHeartBurst}
            className="btn-romantic"
            style={{
              padding: '12px 28px',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              transform: bursting ? 'scale(1.08)' : 'scale(1)'
            }}
          >
            <Heart size={18} fill="#ffffff" color="#ffffff" className="animate-heartbeat" />
            <span>Receive Kuya's Hugs & Love</span>
            <span
              style={{
                fontSize: '0.78rem',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '2px 8px',
                borderRadius: '12px'
              }}
            >
              {loveClicks} ❤️
            </span>
          </button>

          {/* Jump to Grand Flowers */}
          <a
            href="#flowers"
            className="btn-gold"
            style={{
              padding: '12px 26px',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <span>Visit The Grand Flowers</span>
            <Stars size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
