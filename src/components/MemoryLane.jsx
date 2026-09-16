import React, { useState } from 'react';
import { Camera, Heart, RotateCw, Sparkles, Pin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audioSynth';

export default function MemoryLane() {
  const [flippedCards, setFlippedCards] = useState({});
  const [photoHearts, setPhotoHearts] = useState({ 1: 0, 2: 0, 3: 0 });

  const memories = [
    {
      id: 1,
      image: '/photos/photo_samgyup.jpg',
      title: 'Samgyup Date Night 🥩',
      date: 'Our Delicious Dates',
      location: 'Korean BBQ Date with Chimp',
      tilt: '-2deg',
      tapeColor: 'rgba(244, 63, 94, 0.45)',
      quote: 'Busog lusog kasama si Chimp! Walang tatalo sa ngiti mo kahit amoy usok na tayo.',
      diary:
        'Every meal is 1000x sweeter kapag ikaw ang kaharap ko. Kahit gaano tayo kabusog, busog din ang puso ko sa bawat kwento at tawa mo. Ang sarap mong ipagluto at alagaan aking Butiki. More samgyup dates with you forever!'
    },
    {
      id: 2,
      image: '/photos/photo_roadtrip.jpg',
      title: 'Sunny Roadtrip & Cute Pout ☀️',
      date: 'Travels & Adventures',
      location: 'Blessed Sanctuary Roadtrip',
      tilt: '2deg',
      tapeColor: 'rgba(245, 158, 11, 0.45)',
      quote: 'Thumbs up kay Kuya, cute pout kay Chimp. Kahit saan mapadpad basta ikaw ang kasama!',
      diary:
        'Basta magkasama tayo, kahit anong biyahe nagiging adventure of a lifetime. Ang cute cute ng pout mo dito! Kahit saan tayo dalhin ng tadhana, hawak-kamay tayong maglalakbay hanggang pagtanda.'
    },
    {
      id: 3,
      image: '/photos/photo_selfie.png',
      title: 'My Prettiest Chimp & Sweetest Smile 🥰',
      date: 'Everyday Kilig With You',
      location: 'Closest to My Heart',
      tilt: '-1.5deg',
      tapeColor: 'rgba(56, 189, 248, 0.45)',
      quote: 'Ang ngiting pumapawi sa lahat ng pagod ko. Ikaw at ikaw lang, my Labidabsss.',
      diary:
        'Eto yung mukha at ngiti mo na hinding-hindi ko pagsasawaang titigan araw-araw habangbuhay. 550 days na kitang kasama pero araw-araw parin akong nahuhulog sa’yo na parang Day 1. Ikaw ang pinakamagandang regalo na dumating sa buhay ni Kuya. Kahit kailan, ikaw at ikaw lang ang mamahalin ko.'
    }
  ];

  const handleFlip = (id) => {
    audio.playHeartPop();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleHeartPhoto = (e, id) => {
    e.stopPropagation();
    audio.playSparkle();
    setPhotoHearts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 20,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24']
    });
  };

  return (
    <section
      id="memories"
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
          <Camera size={16} />
          <span>Kuya’s Favorite Polaroids of Us</span>
        </div>

        <h2
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '0.8rem'
          }}
        >
          Moments With You Frozen in Starlight
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
          I treasure every single photo of us, my Chimp. Click any polaroid to flip it and read the diary note I wrote for you on the back!
        </p>
      </div>

      {/* 3 Polaroids Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'stretch'
        }}
      >
        {memories.map((m) => {
          const isFlipped = !!flippedCards[m.id];
          return (
            <div
              key={m.id}
              className="polaroid-wrapper"
              style={{
                position: 'relative',
                height: '510px',
                cursor: 'pointer',
                transform: `rotate(${m.tilt})`
              }}
              onClick={() => handleFlip(m.id)}
            >
              {/* INNER 3D FLIPPER CONTAINER */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* FRONT FACE (Photo) */}
                <div
                  className="polaroid-face"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'rotateY(0deg)',
                    padding: '16px 16px 20px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: isFlipped ? 1 : 2
                  }}
                >
                  {/* Washi Tape Header */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100px',
                      height: '24px',
                      background: m.tapeColor,
                      backdropFilter: 'blur(4px)',
                      border: '1px dashed rgba(255,255,255,0.4)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                      zIndex: 10
                    }}
                  />

                  {/* Photo Frame */}
                  <div
                    style={{
                      width: '100%',
                      height: '330px',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      backgroundColor: '#0f172a',
                      position: 'relative',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)'
                    }}
                  >
                    <img
                      src={m.image}
                      alt={m.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    {/* Heart Counter Stamp */}
                    <button
                      onClick={(e) => handleHeartPhoto(e, m.id)}
                      title="Add love to this memory"
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '5px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <Heart size={14} fill="#f43f5e" color="#f43f5e" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f43f5e' }}>
                        {photoHearts[m.id]}
                      </span>
                    </button>
                  </div>

                  {/* Handwritten Caption */}
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1.2
                      }}
                    >
                      {m.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: '1.08rem',
                        color: '#475569',
                        marginTop: '3px'
                      }}
                    >
                      "{m.quote}"
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '10px',
                        fontSize: '0.78rem',
                        color: '#b91c1c',
                        fontWeight: 600,
                        background: 'rgba(244, 63, 94, 0.08)',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(244, 63, 94, 0.2)'
                      }}
                    >
                      <RotateCw size={13} />
                      <span>Click to read Kuya's note for you ↩️</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE (Handwritten Diary Note) */}
                <div
                  className="polaroid-face"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'rotateY(180deg)',
                    padding: '2.2rem 1.8rem',
                    background: '#fefce8', // Aged ivory parchment tone
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: isFlipped ? 2 : 1
                  }}
                >
                  <div>
                    {/* Header Stamp */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px dashed #ca8a04',
                        paddingBottom: '0.6rem',
                        marginBottom: '1.2rem'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.75rem',
                          color: '#854d0e',
                          fontWeight: 700
                        }}
                      >
                        KUYA'S DIARY • {m.date}
                      </span>
                      <span style={{ fontSize: '0.9rem' }}>💌</span>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: '1.38rem',
                        color: '#1c1917',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line'
                      }}
                    >
                      "{m.diary}"
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px dashed #ca8a04',
                      paddingTop: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: '1.35rem',
                        color: '#b91c1c',
                        fontWeight: 700
                      }}
                    >
                      Always yours, Kuya Marc
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: '#854d0e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontWeight: 600,
                        background: 'rgba(202, 138, 4, 0.1)',
                        padding: '3px 10px',
                        borderRadius: '9999px'
                      }}
                    >
                      <RotateCw size={12} />
                      <span>Flip back ↪️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
