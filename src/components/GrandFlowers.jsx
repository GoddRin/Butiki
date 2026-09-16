import React, { useState, useRef } from 'react';
import { Sparkles, Droplets, Heart, Flower2, Wind, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audioSynth';
import BouquetInteractiveCanvas from './BouquetInteractiveCanvas';

export default function GrandFlowers() {
  const [essence, setEssence] = useState('crimson'); // crimson, sapphire, gold, lavender
  const [waterCount, setWaterCount] = useState(0); // starts at 0 per user request
  const [fairyLightsOn, setFairyLightsOn] = useState(true);
  const [activeSecret, setActiveSecret] = useState(null);
  const [isWatering, setIsWatering] = useState(false);
  const [isBreeze, setIsBreeze] = useState(false);
  const [floatingWhisper, setFloatingWhisper] = useState(null);

  // 3D Parallax tilt state for the bouquet
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bouquetCardRef = useRef(null);

  // Palettes per essence
  const palettes = {
    crimson: {
      name: 'Royal Velvet Crimson',
      p1: '#f43f5e',
      p2: '#e11d48',
      p3: '#be123c',
      glow: 'rgba(244, 63, 94, 0.65)',
      filterGlow: 'drop-shadow(0 0 35px rgba(244, 63, 94, 0.5))',
      accent: '#fda4af'
    },
    sapphire: {
      name: 'September Sapphire',
      p1: '#38bdf8',
      p2: '#0284c7',
      p3: '#1e40af',
      glow: 'rgba(56, 189, 248, 0.65)',
      filterGlow: 'drop-shadow(0 0 35px rgba(56, 189, 248, 0.5))',
      accent: '#bae6fd'
    },
    gold: {
      name: 'Champagne Starlight',
      p1: '#fde047',
      p2: '#f59e0b',
      p3: '#d97706',
      glow: 'rgba(245, 158, 11, 0.65)',
      filterGlow: 'drop-shadow(0 0 35px rgba(245, 158, 11, 0.5))',
      accent: '#fef08a'
    },
    lavender: {
      name: 'Ethereal Lavender',
      p1: '#e879f9',
      p2: '#c084fc',
      p3: '#9333ea',
      glow: 'rgba(192, 132, 252, 0.65)',
      filterGlow: 'drop-shadow(0 0 35px rgba(192, 132, 252, 0.5))',
      accent: '#f5d0fe'
    }
  };

  const pal = palettes[essence];

  // 10 Interactive Petals of Endearment
  const petalsOfLove = [
    { id: 1, title: 'From Ading & Kuya', text: 'Parang kailan lang nung una tayong nagkakahiyaan at Ading & Kuya pa ang tawagan natin. Ngayon ikaw na ang buhay at mundo ko.' },
    { id: 2, title: 'Your Radiant Smile', text: 'Yung mga ngiti at lambing mo na laging nagpapagaan ng araw ni Kuya. Kahit gaano ako kapagod, isang ngiti mo lang buo na agad ang araw ko.' },
    { id: 3, title: '550 Days of Holding Hands', text: '550 days of choosing you through every tampuhan, tawanan, lambingan, at pangarap.' },
    { id: 4, title: 'Proud of Future Engr. Ross Ann', text: 'Seeing you work hard for your engineering degree this November makes me the proudest boyfriend in the universe!' },
    { id: 5, title: 'Samgyup Date Champion', text: 'Busog lusog kasama ka. Walang katumbas ang saya kapag nilulutuan kita ng paborito mong karne at nakikita kitang masaya.' },
    { id: 6, title: 'Safe Harbor', text: 'Sa bawat pagsubok, lungkot, at saya—pangako na hinding-hindi ako aalis sa tabi mo aking Butiki.' },
    { id: 7, title: 'Sana Habaan Mo Pa Pasensya Mo', text: 'Hehe alam ko makulit si Kuya minsan, but my love for you grows bigger and deeper every sunrise.' },
    { id: 8, title: 'My Peace & Everything', text: 'Lagi mong pakatandaan na I always love you as my Girlfriend, my ading, and my everything.' },
    { id: 9, title: 'The Endearments', text: 'Chimp, Butiki, My labidabsss' },
    { id: 10, title: 'Hanggang Pagtanda', text: 'To more Monthsaries, Christmases, Birthdays, and our future life together na magkasama tayo!' }
  ];

  const bouquetWhispers = [
    '🌹 99 Ecuadorian Roses for my Chimp!',
    '✨ Smells like fresh morning dew and sweet roses',
    '💖 Plucked with love by Kuya Marc',
    '🥰 550 Days of blooming romance',
    '🌸 Walang kupas ang ganda mo aking Butiki!',
    '👑 Handcrafted with infinite devotion'
  ];

  const handleMouseMove = (e) => {
    if (!bouquetCardRef.current) return;
    const rect = bouquetCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / 18;
    const tiltY = (centerX - x) / 18;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleBouquetClick = (e) => {
    audio.playHeartPop();

    // Random whisper popup
    const randomWhisper = bouquetWhispers[Math.floor(Math.random() * bouquetWhispers.length)];
    setFloatingWhisper(randomWhisper);
    setTimeout(() => setFloatingWhisper(null), 2500);

    const rect = bouquetCardRef.current.getBoundingClientRect();
    confetti({
      particleCount: 22,
      spread: 60,
      origin: {
        x: (e.clientX || rect.left + rect.width / 2) / window.innerWidth,
        y: (e.clientY || rect.top + rect.height / 2) / window.innerHeight
      },
      colors: [pal.p1, pal.accent, '#fbbf24', '#ffffff']
    });
  };

  const handleWater = (e) => {
    setIsWatering(true);
    setWaterCount((c) => c + 1);
    audio.playWaterDrop();

    setTimeout(() => setIsWatering(false), 2000);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: [pal.p1, pal.accent, '#38bdf8', '#ffffff'],
      ticks: 90
    });
  };

  const handleBreeze = () => {
    setIsBreeze(true);
    audio.playSparkle();

    confetti({
      particleCount: 45,
      spread: 120,
      angle: 60,
      origin: { x: 0.2, y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24']
    });

    setTimeout(() => setIsBreeze(false), 3000);
  };

  const handleBloomGlory = (e) => {
    audio.playSparkle();

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 90,
      spread: 120,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: [pal.p1, pal.p2, pal.p3, '#fbbf24', '#ffffff', '#fda4af']
    });
  };

  const handleToggleFairyLights = () => {
    audio.playSparkle();
    setFairyLightsOn(!fairyLightsOn);
  };

  const handlePetalClick = (p) => {
    setActiveSecret(p);
    audio.playHeartPop();
  };

  return (
    <section
      id="flowers"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '1260px',
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
          <Flower2 size={16} />
          <span>Interactive Luxury Floral Showcase</span>
        </div>

        <h2
          className="font-serif-romantic text-gradient-rose-gold"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '0.8rem'
          }}
        >
          A Luxury Grand Bouquet for My Dearest Ross Ann
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          An animated, interactive arrangement of 99 velvety crimson Ecuadorian roses, baby's breath, and glowing fairy lights.
          Move your cursor over the bouquet or tap the roses to interact with them!
        </p>
      </div>

      {/* Main Showcase Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}
      >
        {/* Left: The Interactive Luxury Grand Bouquet Showcase */}
        <div
          className="glass-panel-glow"
          style={{
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 30%, rgba(30, 27, 75, 0.85) 0%, rgba(15, 23, 42, 0.98) 100%)',
            border: `1.5px solid ${pal.glow}`,
            boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 45px ${pal.glow}`
          }}
        >
          {/* Ambient Glow Aura Behind Bouquet */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${pal.glow} 0%, transparent 70%)`,
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: fairyLightsOn ? 1 : 0.45,
              transition: 'opacity 0.5s ease'
            }}
          />

          {/* Interactive 3D Parallax Bouquet Frame with Floating Motion */}
          <div
            ref={bouquetCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleBouquetClick}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              aspectRatio: '1/1',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), inset 0 0 25px rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(245, 158, 11, 0.4)',
              zIndex: 2,
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
              cursor: 'pointer'
            }}
          >
            {/* The Luxury Bouquet Base Image */}
            <img
              src="/photos/luxury_grand_bouquet.jpg"
              alt="Luxury Grand Bouquet for Ross Ann Mora"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: fairyLightsOn ? 'brightness(1.06) contrast(1.04)' : 'brightness(0.96)',
                transform: isBreeze ? 'scale(1.04) rotate(0.8deg)' : 'scale(1)',
                transition: 'transform 0.8s ease'
              }}
            />

            {/* Interactive Canvas Overlay (Fairy Lights, Floating Emitter Petals, Dew Drops & Click Ripples) */}
            <BouquetInteractiveCanvas
              fairyLightsOn={fairyLightsOn}
              isMisting={isWatering}
              isBreeze={isBreeze}
            />

            {/* Floating Touch Love Whisper Tag */}
            {floatingWhisper && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(7, 9, 19, 0.92)',
                  border: '1px solid #fbbf24',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  color: '#fef08a',
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                  zIndex: 20,
                  animation: 'pulseGlow 1s ease-in-out'
                }}
              >
                {floatingWhisper}
              </div>
            )}

            {/* Top Luxury Tag Badge */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: 'rgba(7, 9, 19, 0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(245, 158, 11, 0.5)',
                borderRadius: '9999px',
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fef08a',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <Sparkles size={12} color="#fbbf24" />
              <span>Interactive • Tap Roses to Pluck 🌹</span>
            </div>

            {/* Fairy Lights Status Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                background: fairyLightsOn ? 'rgba(245, 158, 11, 0.28)' : 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                border: fairyLightsOn ? '1px solid #fbbf24' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '9999px',
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: fairyLightsOn ? '#fef08a' : '#94a3b8',
                fontSize: '0.72rem',
                fontWeight: 600,
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <Lightbulb size={12} color={fairyLightsOn ? '#fbbf24' : '#94a3b8'} />
              <span>{fairyLightsOn ? 'Fairy Lights: TWINKLING ✨' : 'Fairy Lights: OFF'}</span>
            </div>
          </div>

          {/* Golden Engraved Plaque */}
          <div
            style={{
              marginTop: '1.6rem',
              padding: '1rem 1.4rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.15) 100%)',
              border: '1.5px solid rgba(245, 158, 11, 0.5)',
              textAlign: 'center',
              width: '100%',
              maxWidth: '380px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#fef08a',
                letterSpacing: '0.05em',
                marginBottom: '3px'
              }}
            >
              FOR MY CHIMP, ROSS ANN MORA
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: '#fed7aa',
                fontFamily: "'Caveat', cursive",
                lineHeight: 1.3
              }}
            >
              "Handcrafted with endless devotion by your Kuya Marc Harrold. 99 roses for 550 days of love and a lifetime ahead."
            </div>
          </div>

          {/* Interactive Bouquet Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              justifyContent: 'center',
              marginTop: '1.4rem'
            }}
          >
            {/* Mist & Water with Love */}
            <button
              onClick={handleWater}
              className="glass-card-interactive"
              style={{
                padding: '8px 14px',
                borderRadius: '9999px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#bae6fd',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <Droplets size={14} color="#38bdf8" />
              <span>Mist Bouquet ({waterCount} 💧)</span>
            </button>

            {/* Toggle Fairy Lights */}
            <button
              onClick={handleToggleFairyLights}
              className="glass-card-interactive"
              style={{
                padding: '8px 14px',
                borderRadius: '9999px',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: fairyLightsOn ? '#fef08a' : '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <Lightbulb size={14} color={fairyLightsOn ? '#fbbf24' : '#94a3b8'} />
              <span>{fairyLightsOn ? 'Dim Fairy Lights' : 'Twinkle Lights ✨'}</span>
            </button>

            {/* Gentle Breeze */}
            <button
              onClick={handleBreeze}
              className="glass-card-interactive"
              style={{
                padding: '8px 14px',
                borderRadius: '9999px',
                border: '1px solid rgba(192, 132, 252, 0.4)',
                color: '#f5d0fe',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <Wind size={14} color="#c084fc" />
              <span>Floral Breeze 🍃</span>
            </button>

            {/* Bloom in Full Glory */}
            <button
              onClick={handleBloomGlory}
              className="glass-card-interactive"
              style={{
                padding: '8px 14px',
                borderRadius: '9999px',
                border: `1px solid ${pal.p1}`,
                color: pal.accent,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <Flower2 size={14} color={pal.p1} />
              <span>Bloom in Full Glory 🌸</span>
            </button>
          </div>

          {/* Floral Essence Shift */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.2rem'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Aura Essence:</span>
            {Object.keys(palettes).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setEssence(key);
                  audio.playSparkle();
                }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: palettes[key].p1,
                  border: essence === key ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  boxShadow: essence === key ? `0 0 10px ${palettes[key].p1}` : 'none',
                  transform: essence === key ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.2s'
                }}
                title={palettes[key].name}
              />
            ))}
          </div>
        </div>

        {/* Right: 10 Interactive Petals of Endearment */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.2rem'
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.2rem'
                }}
              >
                10 Petals of Endearment
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Click any petal to read Kuya’s whispered notes for Ross Ann.
              </p>
            </div>
            <Heart size={22} fill={pal.p1} color={pal.p1} className="animate-pulse-glow" />
          </div>

          {/* Petals Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}
          >
            {petalsOfLove.map((petal, index) => {
              const isSelected = activeSecret?.id === petal.id;
              return (
                <button
                  key={petal.id}
                  onClick={() => handlePetalClick(petal)}
                  className="glass-card-interactive"
                  style={{
                    padding: '0.9rem 0.6rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(244, 63, 94, 0.25)' : 'rgba(18, 24, 43, 0.6)',
                    borderColor: isSelected ? pal.p1 : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isSelected ? `0 0 18px ${pal.glow}` : 'none',
                    transform: isSelected ? 'translateY(-4px) scale(1.05)' : 'none'
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.4rem',
                      marginBottom: '0.3rem',
                      filter: isSelected ? `drop-shadow(0 0 8px ${pal.p1})` : 'none'
                    }}
                  >
                    🌸
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      lineHeight: 1.2
                    }}
                  >
                    Petal #{index + 1}
                  </div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: pal.accent,
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {petal.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Petal Secret Display Box */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              border: `1px solid ${pal.p2}`,
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(15, 23, 42, 0.85) 100%)',
              minHeight: '130px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: '20px'
            }}
          >
            {activeSecret ? (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.6rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      color: '#fbbf24',
                      textTransform: 'uppercase',
                      fontWeight: 700
                    }}
                  >
                    Petal #{activeSecret.id} • {activeSecret.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#fda4af' }}>With All My Heart</span>
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.1rem',
                    color: '#ffffff',
                    lineHeight: 1.6,
                    fontStyle: 'italic'
                  }}
                >
                  "{activeSecret.text}"
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                ✨ Click any of the 10 petals above to read Kuya’s whispered notes for Ross Ann...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
