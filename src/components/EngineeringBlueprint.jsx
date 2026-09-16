import React, { useState } from 'react';
import { Compass, Award, ShieldCheck, Zap, HardHat, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audioSynth';

export default function EngineeringBlueprint() {
  const [cheered, setCheered] = useState(false);
  const [cheerCount, setCheerCount] = useState(2026);

  const handleLaunchCheer = (e) => {
    setCheered(true);
    setCheerCount((c) => c + 1);
    audio.playSparkle();

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#38bdf8', '#fbbf24', '#f43f5e', '#ffffff'],
      shapes: ['star', 'circle']
    });

    setTimeout(() => setCheered(false), 800);
  };

  return (
    <section
      id="blueprint"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
        zIndex: 10
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '4px 14px',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem'
          }}
        >
          <Compass size={16} />
          <span>Special Twist: Graduating Engineer Tribute</span>
        </div>

        <h2
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '0.8rem'
          }}
        >
          The Structural Blueprint of Our Love
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Dedicated to 4th-year engineering student{' '}
          <strong style={{ color: '#38bdf8' }}>Ross Ann Mora</strong>, who will be graduating this November 2026.
          Calculated to withstand any load, earthquake, or life challenge.
        </p>
      </div>

      {/* Blueprint Container */}
      <div
        className="glass-panel bg-blueprint-grid"
        style={{
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(56, 189, 248, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* CAD Corner Crosshairs */}
        <div style={{ position: 'absolute', top: '15px', left: '15px', color: 'rgba(56, 189, 248, 0.5)', fontFamily: 'monospace', fontSize: '0.7rem' }}>
          + [SEC-09: 2026-N]
        </div>
        <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'rgba(56, 189, 248, 0.5)', fontFamily: 'monospace', fontSize: '0.7rem' }}>
          DWG NO. LOVE-550-DAYS +
        </div>

        {/* Technical Header Block */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            borderBottom: '1px solid rgba(56, 189, 248, 0.25)',
            paddingBottom: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8'
              }}
            >
              <GraduationCap size={28} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.78rem',
                  color: '#fbbf24',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Engineering Project Specification
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}
              >
                Engr. Ross Ann Mora, B.S. Engineering
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Class of November 2026 • Marc Harrold's Forever Pride
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '8px 16px',
              borderRadius: '12px',
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#86efac',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.85rem'
            }}
          >
            <CheckCircle2 size={16} />
            <span>STATUS: 100% GRADUATING & LOVED</span>
          </div>
        </div>

        {/* 4 Technical Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.2rem',
            marginBottom: '2.5rem'
          }}
        >
          {[
            {
              icon: <ShieldCheck size={20} color="#38bdf8" />,
              label: 'Factor of Safety (FS)',
              value: 'FS = ∞',
              sub: 'Engineered beyond theoretical limits. Immune to all external drama.'
            },
            {
              icon: <Zap size={20} color="#fbbf24" />,
              label: 'Tensile & Shear Capacity',
              value: '550 Days Unbroken',
              sub: 'Zero cracks, zero plastic fatigue. Rebounds with tighter hugs.'
            },
            {
              icon: <HardHat size={20} color="#f43f5e" />,
              label: 'Foundation Integrity',
              value: 'Bedrock Level Trust',
              sub: 'Reinforced with late-night study calls, boba, and Kuya’s cooking.'
            },
            {
              icon: <Award size={20} color="#c084fc" />,
              label: 'Service Life Span',
              value: 'Hanggang Pagtanda',
              sub: 'Warranty: Valid indefinitely through all future monthsaries & beyond.'
            }
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(56, 189, 248, 0.18)',
                borderRadius: '16px',
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {card.icon}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color: '#94a3b8',
                    textTransform: 'uppercase'
                  }}
                >
                  {card.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}
              >
                {card.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Kuya's Cheer Box & Graduation Cannon */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(15, 23, 42, 0.8) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '18px',
            padding: '1.8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.5rem',
              color: '#bae6fd',
              maxWidth: '750px',
              lineHeight: 1.5
            }}
          >
            "To my graduating engineer, Chimp: Matatapos na ang puyat sa designs, calculations, at thesis!
            Ngayong darating na November 2026, luluhod ang buong mundo sa galing mo.
            Lagi mong tatandaan na si Kuya ang number one fan mo, kahapon, ngayon, at hanggang sa board exam at tagumpay mo!"
          </div>

          <button
            onClick={handleLaunchCheer}
            className="btn-gold"
            style={{
              padding: '12px 28px',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              transform: cheered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
          >
            <Sparkles size={16} />
            <span>Launch Graduation Confetti for Engr. Ross Ann! 🎓</span>
            <span
              style={{
                fontSize: '0.78rem',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '2px 8px',
                borderRadius: '10px'
              }}
            >
              {cheerCount} Cheers
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
