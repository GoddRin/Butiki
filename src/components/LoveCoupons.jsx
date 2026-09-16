import React, { useState } from 'react';
import { Ticket, Sparkles, Check, Heart, Coffee, UtensilsCrossed, Crown, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audioSynth';

export default function LoveCoupons() {
  const [redeemed, setRedeemed] = useState({});

  const coupons = [
    {
      id: 'samgyup',
      icon: <UtensilsCrossed size={22} color="#fbbf24" />,
      title: 'Unlimited Samgyup Date Pass 🥩',
      desc: 'Valid whenever Chimp craves Korean BBQ. Kuya will grill all the meats and wrap them for you!',
      badge: 'NO EXPIRATION',
      color: 'rgba(245, 158, 11, 0.25)',
      border: 'rgba(245, 158, 11, 0.4)'
    },
    {
      id: 'thesis-hug',
      icon: <Heart size={22} color="#f43f5e" />,
      title: 'Emergency Thesis Stress Hug 🫂',
      desc: 'Whenever engineering formulas or thesis defense get too heavy. Instant warm embrace to recharge your heart.',
      badge: 'UNLIMITED USE',
      color: 'rgba(244, 63, 94, 0.25)',
      border: 'rgba(244, 63, 94, 0.4)'
    },
    {
      id: 'argument-win',
      icon: <Crown size={22} color="#c084fc" />,
      title: 'Automatic "Chimp Is Right" Pass 👑',
      desc: 'Play this coupon during any tampuhan. Kuya instantly admits defeat and buys treats (even though you are always right anyway!).',
      badge: 'VIP PERK',
      color: 'rgba(192, 132, 252, 0.25)',
      border: 'rgba(192, 132, 252, 0.4)'
    },
    {
      id: 'boba-coffee',
      icon: <Coffee size={22} color="#38bdf8" />,
      title: 'Late-Night Boba & Coffee Fuel 🧋',
      desc: 'Kuya delivers your favorite sweet drink or coffee directly to keep you energized for final semester requirements.',
      badge: 'INSTANT DELIVERY',
      color: 'rgba(56, 189, 248, 0.25)',
      border: 'rgba(56, 189, 248, 0.4)'
    }
  ];

  const handleRedeem = (e, id) => {
    audio.playSparkle();
    setRedeemed((prev) => ({
      ...prev,
      [id]: true
    }));

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#fbbf24', '#f43f5e', '#38bdf8', '#c084fc']
    });
  };

  return (
    <section
      id="coupons"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '1200px',
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
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem'
          }}
        >
          <Ticket size={16} />
          <span>Stress-Relief & Love Vouchers</span>
        </div>

        <h2
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '0.8rem'
          }}
        >
          Love Vouchers For My Busy Chimp
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Special perks guaranteed by Kuya Marc Harrold for his favorite 4th-year engineer. Click to redeem anytime!
        </p>
      </div>

      {/* Coupons Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {coupons.map((c) => {
          const isClaimed = !!redeemed[c.id];
          return (
            <div
              key={c.id}
              className="glass-panel"
              style={{
                background: isClaimed ? 'rgba(15, 23, 42, 0.9)' : 'rgba(26, 32, 54, 0.65)',
                border: `1px dashed ${c.border}`,
                borderRadius: '18px',
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isClaimed ? '0 0 25px rgba(34, 197, 94, 0.2)' : '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              {/* Ticket Cutout Circles */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-12px',
                  transform: 'translateY(-50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#070913',
                  borderRight: `1px solid ${c.border}`
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-12px',
                  transform: 'translateY(-50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#070913',
                  borderLeft: `1px solid ${c.border}`
                }}
              />

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: c.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {c.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {c.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.6rem'
                  }}
                >
                  {c.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                    marginBottom: '1.4rem'
                  }}
                >
                  {c.desc}
                </p>
              </div>

              <button
                onClick={(e) => handleRedeem(e, c.id)}
                disabled={isClaimed}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: isClaimed ? 'default' : 'pointer',
                  background: isClaimed
                    ? 'rgba(34, 197, 94, 0.2)'
                    : 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
                  color: isClaimed ? '#86efac' : '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s'
                }}
              >
                {isClaimed ? (
                  <>
                    <Check size={16} />
                    <span>Redeemed & Acknowledged by Kuya!</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Redeem Voucher</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
