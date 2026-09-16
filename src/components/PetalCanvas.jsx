import React, { useEffect, useRef } from 'react';

export default function PetalCanvas({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const petalCount = Math.min(35, Math.floor(width / 35));
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 14 + 10,
      speedX: Math.random() * 1.5 - 0.5,
      speedY: Math.random() * 1.6 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.4 ? '#f43f5e' : Math.random() > 0.3 ? '#fb7185' : '#fda4af',
      alpha: Math.random() * 0.45 + 0.45
    }));

    // Draw single rose petal path
    const drawPetal = (x, y, size, rotation, flip, color, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(1, Math.cos(flip));
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size * 0.6, -size * 0.4, -size * 0.8, size * 0.8, 0, size);
      ctx.bezierCurveTo(size * 0.8, size * 0.8, size * 0.6, -size * 0.4, 0, 0);

      const grad = ctx.createLinearGradient(-size * 0.5, 0, size * 0.5, size);
      grad.addColorStop(0, color);
      grad.addColorStop(1, '#9f1239');
      ctx.fillStyle = grad;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(244, 63, 94, 0.3)';
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.x += p.speedX + Math.sin(p.rotation) * 0.7;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 50) {
          p.y = -40;
          p.x = Math.random() * width;
        }
        if (p.x > width + 50) p.x = -40;
        if (p.x < -50) p.x = width + 40;

        drawPetal(p.x, p.y, p.size, p.rotation, p.flip, p.color, p.alpha);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
