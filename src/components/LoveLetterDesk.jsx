import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Send, Stamp, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audioSynth';

export default function LoveLetterDesk() {
  const [isOpen, setIsOpen] = useState(false);
  const [kissCount, setKissCount] = useState(0);
  const [kissSent, setKissSent] = useState(false);

  const handleOpenLetter = () => {
    audio.playSealCrack();
    setIsOpen(true);

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#fbbf24', '#ffffff']
    });
  };

  const handleCloseLetter = () => {
    audio.playSparkle();
    setIsOpen(false);
  };

  const handleSendKiss = (e) => {
    setKissCount((k) => k + 1);
    setKissSent(true);
    audio.playHeartPop();

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#f43f5e', '#fb7185', '#fda4af'],
      shapes: ['circle']
    });

    setTimeout(() => setKissSent(false), 1200);
  };

  return (
    <section
      id="letter"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '960px',
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
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fda4af',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem'
          }}
        >
          <Mail size={16} />
          <span>Kuya's Handwritten Monthsary Letter</span>
        </div>

        <h2
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '0.8rem'
          }}
        >
          A Letter From Marc Harrold's Heart
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          {isOpen
            ? 'Written with utmost sincerity for my Labidabs & Butiki.'
            : 'Sealed with golden crimson wax. Break the seal to unveil Kuya’s letter for Ross Ann.'}
        </p>
      </div>

      {/* Love Desk Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!isOpen ? (
          /* CLOSED WAX-SEALED ENVELOPE */
          <div
            onClick={handleOpenLetter}
            className="glass-card-interactive"
            style={{
              width: '100%',
              maxWidth: '560px',
              height: '340px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: '2px solid rgba(245, 158, 11, 0.3)',
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(244, 63, 94, 0.2)',
              overflow: 'hidden'
            }}
          >
            {/* Envelope Flap Lines */}
            <svg
              viewBox="0 0 560 340"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            >
              {/* Flap fold triangles */}
              <polygon points="0,0 280,180 560,0" fill="rgba(30, 41, 59, 0.85)" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" />
              <line x1="0" y1="340" x2="280" y2="180" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="1" />
              <line x1="560" y1="340" x2="280" y2="180" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="1" />
            </svg>

            {/* Recipient calligraphy */}
            <div
              style={{
                position: 'absolute',
                top: '55px',
                textAlign: 'center',
                zIndex: 2
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  color: '#fbbf24',
                  textTransform: 'uppercase'
                }}
              >
                STRICTLY CONFIDENTIAL • FOR HER EYES ONLY
              </div>
              <div
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '2rem',
                  color: '#ffffff',
                  fontWeight: 700,
                  marginTop: '4px'
                }}
              >
                To My Dearest Ross Ann Mora (Chimp)
              </div>
            </div>

            {/* The Crimson Golden Wax Seal */}
            <div
              className="wax-seal"
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '2px solid rgba(254, 240, 138, 0.5)',
                transition: 'transform 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#fef08a',
                  letterSpacing: '1px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                }}
              >
                M & R
              </div>
              <div
                style={{
                  fontSize: '0.62rem',
                  color: '#fecdd3',
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                550 DAYS
              </div>
            </div>

            {/* Bottom prompt */}
            <div
              style={{
                position: 'absolute',
                bottom: '30px',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#fecdd3',
                fontSize: '0.88rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              <Sparkles size={16} color="#fbbf24" />
              <span>Click the wax seal to open Kuya's letter</span>
            </div>
          </div>
        ) : (
          /* UNFOLDED VINTAGE PARCHMENT LETTER */
          <div
            style={{
              width: '100%',
              maxWidth: '780px',
              background: '#fefce8', // warm authentic ivory parchment
              color: '#1c1917',
              borderRadius: '16px',
              padding: 'clamp(2rem, 5vw, 3.8rem)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(244, 63, 94, 0.3)',
              border: '2px solid #ca8a04',
              position: 'relative',
              animation: 'floatSlow 8s ease-in-out infinite'
            }}
          >
            {/* Vintage Postmark Stamp Top Right */}
            <div
              style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                border: '2px dashed #b91c1c',
                borderRadius: '8px',
                padding: '6px 12px',
                textAlign: 'center',
                transform: 'rotate(6deg)',
                color: '#b91c1c'
              }}
            >
              <div style={{ fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                PHILIPPINES • 550 DAYS
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>MARCH 22, 2025</div>
              <div style={{ fontSize: '0.65rem' }}>OFFICIAL RECORD</div>
            </div>

            {/* Letter Salutation */}
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#991b1b',
                marginBottom: '1.6rem'
              }}
            >
              My labidabs/Butiki,
            </div>

            {/* Letter Body (Marc Harrold's Exact Heartfelt Filipino-English Message) */}
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.45rem',
                lineHeight: 1.7,
                color: '#292524',
                whiteSpace: 'pre-line',
                marginBottom: '2rem'
              }}
            >
              {`It's been exactly 550 days simula nang naging tayo. sa iba mahaba at matagal na ang mga ganoong taon, sa iba naman ay maiksi pa yon. one thing's for sure, ikaw at ikaw lang ang gusto kong makasama hanggang pagtanda. parang kailan lang nung una tayong nagkakilala, nagkakahiyaan pa tayo sa umpisa. those were the days na ading at kuya pa ang turingan natin sa isa't isa hanggang sa ngayon kuya parin tawag mo sakin. haha.

Kung may Hihilingin man ako every monthsary natin ay yun ay Sana, sa bawat away, pagsubok, saya, ligaya, at lungkot na pagdaraanan natin ay nandito tayo sa isa't isa, magkasama sa lahat. Sana ay habaan mo pa pasensya mo sakin my labidabss. lagi mong pakatandaan na I always love you as my Girlfriend and my everything. Happy 1 year and 6 months my chimppp! to more Monthsaries, Christmas, Birthdays to come na magkasama tayo. I love you so so so much <3!`}
            </div>

            {/* Letter Sign-off */}
            <div
              style={{
                borderTop: '1px dashed #ca8a04',
                paddingTop: '1.4rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#78716c' }}>
                  Yours truly,
                </div>
                <div
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: '2.4rem',
                    fontWeight: 700,
                    color: '#b91c1c'
                  }}
                >
                  Kuya
                </div>
                <div style={{ fontSize: '0.75rem', color: '#a8a29e', fontFamily: "'JetBrains Mono', monospace" }}>
                  Marc Harrold Salva • For Ross Ann Mora
                </div>
              </div>

              {/* Action Buttons: Close / Re-seal */}
              <button
                onClick={handleCloseLetter}
                style={{
                  background: 'none',
                  border: '1px solid #ca8a04',
                  borderRadius: '9999px',
                  padding: '6px 16px',
                  fontSize: '0.8rem',
                  color: '#854d0e',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              >
                Re-seal envelope ✉️
              </button>
            </div>

            {/* Secret P.S. Sticky Note on the Letter */}
            <div
              style={{
                marginTop: '2rem',
                background: '#fef08a',
                border: '1px solid #facc15',
                borderRadius: '8px',
                padding: '1.2rem',
                boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
                transform: 'rotate(-1deg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.1rem' }}>📌</span>
                <strong style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#854d0e' }}>
                  Kuya’s Secret Post-Script:
                </strong>
              </div>
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.25rem',
                  color: '#451a03',
                  lineHeight: 1.4,
                  marginBottom: '0.8rem'
                }}
              >
                "Every time na stressed ka sa engineering, nami-miss mo ako, o kailangan mo ng lambing, click the button below to send me a virtual kiss!"
              </p>

              <button
                onClick={handleSendKiss}
                style={{
                  background: '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
                  transition: 'all 0.2s'
                }}
              >
                <Heart size={16} fill="#ffffff" />
                <span>{kissSent ? 'Kiss Sent to Kuya! 💋' : 'Send Virtual Kiss to Kuya'}</span>
                <span
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '0.75rem'
                  }}
                >
                  {kissCount}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
