import React, { useEffect, useRef } from 'react';

export default function BouquetInteractiveCanvas({
  fairyLightsOn = true,
  isMisting = false,
  isBreeze = false
}) {
  const canvasRef = useRef(null);
  const clickRipplesRef = useRef([]);
  const waterDropletsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 380);
    let height = (canvas.height = canvas.parentElement.clientHeight || 380);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 380;
      height = canvas.height = canvas.parentElement.clientHeight || 380;
    };
    window.addEventListener('resize', handleResize);

    // 28 Twinkling Fairy Light positions distributed across the rose heads (center upper region)
    const fairyLights = [
      { x: 0.35, y: 0.22, phase: 0, speed: 0.04, size: 3.5, color: '#fef08a' },
      { x: 0.48, y: 0.18, phase: 1.2, speed: 0.035, size: 4, color: '#fbbf24' },
      { x: 0.62, y: 0.24, phase: 2.1, speed: 0.045, size: 3.5, color: '#fde047' },
      { x: 0.28, y: 0.32, phase: 0.8, speed: 0.03, size: 3.5, color: '#fef08a' },
      { x: 0.42, y: 0.28, phase: 3.2, speed: 0.04, size: 4.5, color: '#fbbf24' },
      { x: 0.56, y: 0.31, phase: 1.7, speed: 0.035, size: 4, color: '#fef08a' },
      { x: 0.70, y: 0.34, phase: 2.5, speed: 0.05, size: 3.5, color: '#fde047' },
      { x: 0.33, y: 0.42, phase: 0.4, speed: 0.038, size: 4, color: '#fbbf24' },
      { x: 0.48, y: 0.39, phase: 4.1, speed: 0.042, size: 5, color: '#fef08a' },
      { x: 0.64, y: 0.44, phase: 1.9, speed: 0.032, size: 4, color: '#fbbf24' },
      { x: 0.22, y: 0.45, phase: 2.8, speed: 0.048, size: 3, color: '#fde047' },
      { x: 0.40, y: 0.48, phase: 0.9, speed: 0.036, size: 4.5, color: '#fef08a' },
      { x: 0.54, y: 0.47, phase: 3.6, speed: 0.044, size: 4, color: '#fbbf24' },
      { x: 0.74, y: 0.46, phase: 1.5, speed: 0.05, size: 3.5, color: '#fde047' },
      { x: 0.48, y: 0.55, phase: 2.2, speed: 0.038, size: 4.5, color: '#fef08a' },
      { x: 0.36, y: 0.56, phase: 0.6, speed: 0.04, size: 3.5, color: '#fbbf24' },
      { x: 0.60, y: 0.54, phase: 3.0, speed: 0.035, size: 4, color: '#fde047' }
    ];

    // Gently floating stardust & floating rose petals around the bouquet
    const bouquetPetals = Array.from({ length: 14 }, () => ({
      x: width * 0.5 + (Math.random() - 0.5) * width * 0.6,
      y: height * 0.4 + (Math.random() - 0.5) * height * 0.4,
      size: Math.random() * 8 + 6,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 0.8 + 0.3), // float upwards gently
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      color: Math.random() > 0.4 ? '#f43f5e' : '#fda4af',
      alpha: Math.random() * 0.6 + 0.3
    }));

    // Floating golden fireflies / pollen
    const pollen = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.8 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Fairy Lights across the roses
      if (fairyLightsOn) {
        fairyLights.forEach((light) => {
          light.phase += light.speed;
          const brightness = Math.abs(Math.sin(light.phase));
          const lx = light.x * width;
          const ly = light.y * height;

          // Outer Glow
          const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, light.size * 3.5);
          grad.addColorStop(0, `rgba(254, 240, 138, ${brightness * 0.85})`);
          grad.addColorStop(0.5, `rgba(245, 158, 11, ${brightness * 0.4})`);
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(lx, ly, light.size * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Intense Core
          ctx.beginPath();
          ctx.arc(lx, ly, light.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#fef08a';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 2. Draw Golden Pollen / Fireflies
      pollen.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#fbbf24';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#f59e0b';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw Floating Rose Petals floating out from the bouquet
      bouquetPetals.forEach((petal) => {
        petal.x += petal.vx + (isBreeze ? 2.5 : 0);
        petal.y += petal.vy;
        petal.rotation += petal.rotSpeed;

        // Reset if float out of bounds
        if (petal.y < -20 || petal.x < -20 || petal.x > width + 20) {
          petal.y = height * 0.6 + Math.random() * 40;
          petal.x = width * 0.5 + (Math.random() - 0.5) * width * 0.5;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.globalAlpha = petal.alpha;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-petal.size * 0.5, -petal.size * 0.4, -petal.size * 0.7, petal.size * 0.7, 0, petal.size);
        ctx.bezierCurveTo(petal.size * 0.7, petal.size * 0.7, petal.size * 0.5, -petal.size * 0.4, 0, 0);
        ctx.fillStyle = petal.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
        ctx.fill();

        ctx.restore();
      });

      // 4. Draw Click Ripples & Sparkle bursts
      for (let i = clickRipplesRef.current.length - 1; i >= 0; i--) {
        const rip = clickRipplesRef.current[i];
        rip.radius += 2.5;
        rip.alpha -= 0.035;

        if (rip.alpha <= 0) {
          clickRipplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(254, 240, 138, ${rip.alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f43f5e';
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner heart pulse
        ctx.fillStyle = `rgba(244, 63, 94, ${rip.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Draw Misting Water Droplets (when misting is triggered)
      for (let i = waterDropletsRef.current.length - 1; i >= 0; i--) {
        const drop = waterDropletsRef.current[i];
        drop.y += drop.speedY;
        drop.alpha -= 0.015;

        if (drop.alpha <= 0 || drop.y > height) {
          waterDropletsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = drop.alpha;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glistening droplet highlight
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(drop.x - drop.radius * 0.3, drop.y - drop.radius * 0.3, drop.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [fairyLightsOn, isBreeze]);

  // When isMisting changes to true, spawn droplets
  useEffect(() => {
    if (isMisting && canvasRef.current) {
      const w = canvasRef.current.width || 380;
      const h = canvasRef.current.height || 380;
      for (let i = 0; i < 22; i++) {
        waterDropletsRef.current.push({
          x: w * 0.2 + Math.random() * w * 0.6,
          y: h * 0.15 + Math.random() * h * 0.5,
          radius: Math.random() * 3.5 + 2,
          speedY: Math.random() * 0.9 + 0.4,
          alpha: 1
        });
      }
    }
  }, [isMisting]);

  // Handle click on canvas
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    clickRipplesRef.current.push({
      x,
      y,
      radius: 5,
      alpha: 1
    });
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        cursor: 'pointer'
      }}
      title="Click on the roses to pluck a love ripple & make fairy lights sparkle! ✨"
    />
  );
}
