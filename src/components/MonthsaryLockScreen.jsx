import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Sparkles, Heart, Clock, Key, Eye, EyeOff, Calendar, HelpCircle, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audioSynth';

export default function MonthsaryLockScreen({ onUnlock, isPreviewMode, onTogglePreview }) {
  // Target: September 22, 2026 at 00:00:00 (12:00 AM Midnight)
  const targetDate = new Date('2026-09-22T00:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false
  });

  const [simulatedOffset, setSimulatedOffset] = useState(0);
  const [tapLoveCount, setTapLoveCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [activeClue, setActiveClue] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);
  const userManuallyPaused = useRef(false);

  // Sneak peek clues for Chimp
  const teaserClues = [
    {
      id: 1,
      icon: '🌹',
      title: 'A Garden That Never Wilts',
      hint: 'May isang grande at enchanted na bulaklak sa loob na inalagaan ng 550 days ng pagmamahal ni Kuya na hinding-hindi malalanta...'
    },
    {
      id: 2,
      icon: '📐',
      title: 'The Engineer’s Certified Blueprint',
      hint: 'May certified structural analysis at graduation celebration para sa pinakamagandang graduating engineer ngayong November 2026!'
    },
    {
      id: 3,
      icon: '🥩',
      title: 'Our 3 Treasured Polaroids',
      hint: 'Nakatago rito ang paborito nating samgyup date, roadtrip pout, at ang ngiting nagpapabilis ng tibok ng puso ni Kuya araw-araw...'
    },
    {
      id: 4,
      icon: '✉️',
      title: 'The Crimson Wax-Sealed Letter',
      hint: 'Isang liham na selyado ng golden wax seal na naglalaman ng eksaktong salita at pangako ni Kuya para sa kanyang Butiki hanggang pagtanda...'
    }
  ];

  useEffect(() => {
    // Song: [Oh My Venus OST] Kim Tae Woo & Ben - Darling U
    const audioObj = new Audio('/audio/darling_u.mp3');
    audioObj.loop = true;
    audioObj.preload = 'auto';
    audioObj.volume = 0.8;
    audioRef.current = audioObj;

    // Attempt autoplay if permitted by browser
    audioObj.play()
      .then(() => {
        setMusicPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked until first user interaction
        setMusicPlaying(false);
      });

    // Auto-start on first user gesture anywhere on screen unless user explicitly paused
    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused && !userManuallyPaused.current) {
        audioRef.current.play()
          .then(() => setMusicPlaying(true))
          .catch(() => {});
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      audioObj.pause();
      audioObj.src = '';
    };
  }, []);

  useEffect(() => {
    const checkCountdown = () => {
      const now = new Date(Date.now() + simulatedOffset);
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true });
        if (!isPreviewMode) {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          audio.playSparkle();
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#f43f5e', '#fb7185', '#fbbf24', '#38bdf8', '#c084fc']
          });
          setTimeout(() => {
            onUnlock();
          }, 1200);
        }
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isUnlocked: false });
      }
    };

    checkCountdown();
    const timer = setInterval(checkCountdown, 1000);
    return () => clearInterval(timer);
  }, [simulatedOffset, isPreviewMode, onUnlock]);

  const handleLoveTap = (e) => {
    audio.playHeartPop();
    setTapLoveCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 20,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#f43f5e', '#fbbf24', '#fda4af']
    });
  };

  const handleToggleMusic = (e) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      userManuallyPaused.current = true;
      setMusicPlaying(false);
    } else {
      userManuallyPaused.current = false;
      audioRef.current.play()
        .then(() => {
          setMusicPlaying(true);
          audio.playSparkle();
        })
        .catch((err) => {
          console.warn('Audio play prevented:', err);
        });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === 'Harrold123') {
      setIsAdminAuthenticated(true);
      setPasswordError(false);
      audio.playSparkle();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#fbbf24', '#f59e0b', '#38bdf8']
      });
    } else {
      setPasswordError(true);
      audio.playHeartPop();
    }
  };

  const handleSimulateMidnight = () => {
    audio.playSparkle();
    // Set time to 4 seconds before midnight of September 22, 2026
    const fourSecBefore = targetDate.getTime() - Date.now() - 4000;
    setSimulatedOffset(fourSecBefore);
    setShowAdminModal(false);
  };

  const handleResetLock = () => {
    audio.playSparkle();
    setSimulatedOffset(0);
    onTogglePreview(false);
    setShowAdminModal(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        position: 'relative',
        zIndex: 20,
        textAlign: 'center'
      }}
    >
      <div
        className="glass-panel-glow"
        style={{
          maxWidth: '840px',
          width: '100%',
          padding: 'clamp(2rem, 5vw, 3.8rem)',
          borderRadius: '28px',
          background: 'radial-gradient(circle at 50% 20%, rgba(30, 27, 75, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
          border: '2px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7), 0 0 50px rgba(244, 63, 94, 0.25)',
          position: 'relative'
        }}
      >
        {/* Glowing Celestial Padlock Icon */}
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 0 35px rgba(244, 63, 94, 0.7)',
            animation: 'pulseGlow 2.5s infinite'
          }}
        >
          <Lock size={44} color="#ffffff" />
        </div>

        {/* Top Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.4rem',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '9999px',
            marginBottom: '1.4rem',
            color: '#fde047',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}
        >
          <Calendar size={15} color="#fbbf24" />
          <span>Opens on September 22, 2026 @ 12:00 AM Midnight</span>
        </div>

        {/* Main Heading */}
        <h1
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}
        >
          A Special Monthsary Surprise for Chimp 🐒💖
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#cbd5e1',
            maxWidth: '650px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}
        >
          Handcrafted with all of Kuya Marc's devotion for his favorite 4th-Year Engineering student,{' '}
          <strong style={{ color: '#fda4af' }}>Ross Ann Mora</strong>. All contents are sealed tight in this vault and will
          automatically burst open the very second our 18th Monthsary arrives!
        </p>

        {/* Live Countdown Display Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            maxWidth: '640px',
            margin: '0 auto 2.5rem auto'
          }}
        >
          {[
            { label: 'Days', val: timeLeft.days, color: '#f43f5e' },
            { label: 'Hours', val: timeLeft.hours, color: '#fbbf24' },
            { label: 'Minutes', val: timeLeft.minutes, color: '#38bdf8' },
            { label: 'Seconds', val: timeLeft.seconds, color: '#4ade80' }
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '1.2rem 0.6rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.02)'
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                  fontWeight: 800,
                  color: item.color,
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                  textShadow: `0 0 20px ${item.color}66`
                }}
              >
                {String(item.val).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Sneak Peek Clues (What to expect inside) */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: '#fbbf24',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            <HelpCircle size={16} />
            <span>Sneak Peek: What did Kuya prepare inside? (Click a clue)</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '0.8rem',
              maxWidth: '640px',
              margin: '0 auto'
            }}
          >
            {teaserClues.map((clue) => {
              const isSelected = activeClue?.id === clue.id;
              return (
                <button
                  key={clue.id}
                  onClick={() => {
                    audio.playHeartPop();
                    setActiveClue(isSelected ? null : clue);
                  }}
                  className="glass-card-interactive"
                  style={{
                    padding: '0.9rem 0.5rem',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    borderColor: isSelected ? '#f43f5e' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{clue.icon}</div>
                  <div style={{ fontSize: '0.72rem', color: isSelected ? '#ffffff' : '#cbd5e1', fontWeight: 600 }}>
                    {clue.title}
                  </div>
                </button>
              );
            })}
          </div>

          {activeClue && (
            <div
              style={{
                marginTop: '1rem',
                padding: '1.1rem 1.4rem',
                borderRadius: '14px',
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                color: '#fecdd3',
                fontSize: '0.95rem',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                maxWidth: '640px',
                margin: '1rem auto 0 auto'
              }}
            >
              "{activeClue.hint}"
            </div>
          )}
        </div>

        {/* Interactive Waiting Actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}
        >
          {/* Send Lambing */}
          <button
            onClick={handleLoveTap}
            className="btn-romantic"
            style={{
              padding: '12px 26px',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Heart size={18} fill="#ffffff" color="#ffffff" className="animate-heartbeat" />
            <span>Send Lambing to Kuya ({tapLoveCount} ❤️)</span>
          </button>

          {/* Music Toggle - Kim Tae Woo & Ben: Darling U (Oh My Venus OST) */}
          <button
            onClick={handleToggleMusic}
            style={{
              background: musicPlaying
                ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.28) 0%, rgba(245, 158, 11, 0.22) 100%)'
                : 'rgba(255, 255, 255, 0.08)',
              border: musicPlaying ? '1px solid rgba(244, 63, 94, 0.55)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              padding: '12px 24px',
              color: musicPlaying ? '#fecdd3' : '#cbd5e1',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: musicPlaying ? '0 0 25px rgba(244, 63, 94, 0.35)' : 'none'
            }}
          >
            {musicPlaying ? (
              <>
                <Volume2 size={18} color="#fb7185" className="animate-pulse" />
                <span style={{ fontWeight: 600 }}>Playing: Darling U (김태우 & 벤) 🎶</span>
              </>
            ) : (
              <>
                <VolumeX size={18} color="#94a3b8" />
                <span>Play "Darling U" (Oh My Venus OST) 🎵</span>
              </>
            )}
          </button>
        </div>

        {/* Now Playing Banner */}
        {musicPlaying && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.3rem',
              borderRadius: '9999px',
              background: 'rgba(244, 63, 94, 0.14)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#fda4af',
              fontSize: '0.82rem',
              marginBottom: '1.6rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              animation: 'fadeIn 0.5s ease'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🎧</span>
            <span>Now Playing: <strong style={{ color: '#ffffff' }}>김태우 & 벤 — Darling U</strong> (Oh My Venus OST 💕)</span>
          </div>
        )}

        <p style={{ fontSize: '0.95rem', color: '#fda4af', fontStyle: 'italic', fontFamily: "'Caveat', cursive" }}>
          "Counting every single heartbeat until September 22... I love you so much, my Chimp!" — Kuya Marc 💻💖
        </p>

        {/* Discreet Kuya Admin / Preview Key */}
        <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.2rem' }}>
          <button
            onClick={() => {
              setShowAdminModal(true);
              setIsAdminAuthenticated(false);
              setEnteredPassword('');
              setPasswordError(false);
              setShowPasswordText(false);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fbbf24')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            <Key size={14} />
            <span>Kuya's Secret Testing & Preview Key 🔑</span>
          </button>
        </div>
      </div>

      {/* ADMIN / KUYA PREVIEW MODAL */}
      {showAdminModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 100
          }}
        >
          {!isAdminAuthenticated ? (
            /* PASSWORD CHALLENGE GATE */
            <div
              className="glass-panel"
              style={{
                maxWidth: '430px',
                width: '100%',
                padding: '2.2rem 2rem',
                borderRadius: '24px',
                background: '#0b1120',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                textAlign: 'center',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(245, 158, 11, 0.18)'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(244, 63, 94, 0.1) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.2rem auto',
                  color: '#fbbf24',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
                }}
              >
                <Key size={26} />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                Kuya's Private Access 🔐
              </h3>

              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.6rem', lineHeight: 1.5 }}>
                This preview key is password protected so only <strong style={{ color: '#fbbf24' }}>Marc Harrold</strong> can access testing and preview controls.
              </p>

              <form onSubmit={handlePasswordSubmit}>
                <div style={{ position: 'relative', marginBottom: '1.2rem' }}>
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    value={enteredPassword}
                    onChange={(e) => {
                      setEnteredPassword(e.target.value);
                      if (passwordError) setPasswordError(false);
                    }}
                    placeholder="Enter Kuya's password..."
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '12px 44px 12px 16px',
                      borderRadius: '12px',
                      background: '#1e293b',
                      border: passwordError ? '1.5px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={showPasswordText ? 'Hide password' : 'Show password'}
                  >
                    {showPasswordText ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {passwordError && (
                  <div
                    style={{
                      color: '#f43f5e',
                      fontSize: '0.82rem',
                      marginBottom: '1.2rem',
                      background: 'rgba(244, 63, 94, 0.12)',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>⛔</span>
                    <span><strong>Access Denied:</strong> Incorrect password. Only Kuya can unlock this!</span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    type="submit"
                    className="btn-romantic"
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Unlock size={16} />
                    <span>Unlock Key</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminModal(false);
                      setEnteredPassword('');
                      setPasswordError(false);
                    }}
                    style={{
                      padding: '12px 18px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED KUYA CONTROL PANEL */
            <div
              className="glass-panel"
              style={{
                maxWidth: '460px',
                width: '100%',
                padding: '2rem',
                borderRadius: '24px',
                background: '#0b1120',
                border: '1px solid rgba(74, 222, 128, 0.5)',
                textAlign: 'left',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(74, 222, 128, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={24} color="#4ade80" />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      Kuya Marc Harrold
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 600 }}>
                      ● Authenticated Access Granted
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAdminAuthenticated(false);
                    setEnteredPassword('');
                  }}
                  style={{
                    background: 'rgba(244, 63, 94, 0.15)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    color: '#fda4af',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Lock Key 🔒
                </button>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Use this panel to test the midnight countdown simulation, unlock the website for previewing, or lock it back up for Chimp!
              </p>

              {/* Quick Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.pause();
                    }
                    onTogglePreview(true);
                    onUnlock();
                    setShowAdminModal(false);
                  }}
                  className="btn-romantic"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Unlock size={16} />
                  <span>Bypass & Preview Full Website Now</span>
                </button>

                <button
                  onClick={handleSimulateMidnight}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    color: '#bae6fd',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Clock size={16} />
                  <span>Simulate 4 Seconds Before Midnight ⏳</span>
                </button>

                <button
                  onClick={handleResetLock}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Lock size={16} />
                  <span>Re-lock Vault (Normal Sept 22 Target)</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setShowAdminModal(false);
                  setIsAdminAuthenticated(false);
                  setEnteredPassword('');
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '6px'
                }}
              >
                Close Panel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
