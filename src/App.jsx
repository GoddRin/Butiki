import React, { useState, useEffect } from 'react';
import StarCanvas from './components/StarCanvas';
import PetalCanvas from './components/PetalCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GrandFlowers from './components/GrandFlowers';
import MemoryLane from './components/MemoryLane';
import EngineeringBlueprint from './components/EngineeringBlueprint';
import LoveLetterDesk from './components/LoveLetterDesk';
import LoveCoupons from './components/LoveCoupons';
import Footer from './components/Footer';
import MonthsaryLockScreen from './components/MonthsaryLockScreen';
import { Lock, Eye, Sparkles } from 'lucide-react';

export default function App() {
  const [petalsActive, setPetalsActive] = useState(true);

  // Target: September 22, 2026 00:00:00
  const targetDate = new Date('2026-09-22T00:00:00').getTime();

  // Check if current real-time is >= targetDate
  const isPastMidnight = Date.now() >= targetDate;

  // Track if user has unlocked or is in preview mode
  const [isUnlocked, setIsUnlocked] = useState(isPastMidnight);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // If real time has passed targetDate, automatically unlock
    if (Date.now() >= targetDate) {
      setIsUnlocked(true);
    }
  }, [targetDate]);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleTogglePreview = (val) => {
    setIsPreviewMode(val);
    setIsUnlocked(val);
  };

  const handleRelock = () => {
    setIsPreviewMode(false);
    setIsUnlocked(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#070913', overflowX: 'hidden' }}>
      {/* Dynamic Celestial & Petal Backgrounds */}
      <StarCanvas />
      <PetalCanvas active={petalsActive} />

      {!isUnlocked ? (
        /* LOCKED VAULT SCREEN (Until Sept 22, 2026 12:00 AM Midnight) */
        <MonthsaryLockScreen
          onUnlock={handleUnlock}
          isPreviewMode={isPreviewMode}
          onTogglePreview={handleTogglePreview}
        />
      ) : (
        /* UNLOCKED FULL MONTHSARY SYSTEM */
        <>
          {/* Kuya Preview Floating Badge (Allows re-locking back to test lock screen) */}
          {isPreviewMode && (
            <div
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 100,
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(245, 158, 11, 0.5)',
                borderRadius: '9999px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 600 }}>
                <Eye size={14} />
                <span>Kuya Preview Mode</span>
              </div>
              <button
                onClick={handleRelock}
                style={{
                  background: 'rgba(244, 63, 94, 0.2)',
                  border: '1px solid rgba(244, 63, 94, 0.4)',
                  color: '#fda4af',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Lock size={12} />
                <span>Re-lock for Chimp</span>
              </button>
            </div>
          )}

          {/* Floating Navigation & Music Control */}
          <Navbar petalsActive={petalsActive} setPetalsActive={setPetalsActive} />

          {/* Main Sections */}
          <main style={{ position: 'relative', zIndex: 10 }}>
            <HeroSection />
            <GrandFlowers />
            <MemoryLane />
            <EngineeringBlueprint />
            <LoveLetterDesk />
            <LoveCoupons />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
