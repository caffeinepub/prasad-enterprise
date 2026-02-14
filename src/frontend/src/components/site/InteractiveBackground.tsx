import { useEffect, useRef } from 'react';

interface HardwarePart {
  x: number;
  y: number;
  z: number; // depth for parallax
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  type: 'bolt' | 'nut' | 'screw' | 'washer';
  size: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0-1
  const animationRef = useRef<number | undefined>(undefined);
  const partsRef = useRef<HardwarePart[]>([]);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParts();
    };

    const initializeParts = () => {
      const partCount = Math.min(25, Math.floor((canvas.width * canvas.height) / 40000));
      partsRef.current = [];

      const types: Array<'bolt' | 'nut' | 'screw' | 'washer'> = ['bolt', 'nut', 'screw', 'washer'];

      for (let i = 0; i < partCount; i++) {
        partsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 0.6 + 0.2, // 0.2 to 0.8 depth
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: types[Math.floor(Math.random() * types.length)],
          size: Math.random() * 20 + 15,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX / window.innerWidth,
          y: e.touches[0].clientY / window.innerHeight,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Draw functions for each hardware type
    const drawBolt = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, isDark: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const baseColor = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(71, 85, 105, 0.2)';
      const highlightColor = isDark ? 'rgba(203, 213, 225, 0.35)' : 'rgba(100, 116, 139, 0.3)';
      const shadowColor = isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(30, 41, 59, 0.25)';

      // Bolt head (hexagon)
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = Math.cos(angle) * size * 0.4;
        const py = Math.sin(angle) * size * 0.4;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Gradient for 3D effect
      const gradient = ctx.createLinearGradient(-size * 0.3, -size * 0.3, size * 0.3, size * 0.3);
      gradient.addColorStop(0, highlightColor);
      gradient.addColorStop(0.5, baseColor);
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Bolt shaft
      ctx.fillStyle = baseColor;
      ctx.fillRect(-size * 0.15, 0, size * 0.3, size * 0.6);

      // Thread lines
      ctx.strokeStyle = shadowColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-size * 0.15, size * 0.15 * (i + 1));
        ctx.lineTo(size * 0.15, size * 0.15 * (i + 1));
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawNut = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, isDark: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const baseColor = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(71, 85, 105, 0.2)';
      const highlightColor = isDark ? 'rgba(203, 213, 225, 0.35)' : 'rgba(100, 116, 139, 0.3)';
      const shadowColor = isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(30, 41, 59, 0.25)';

      // Outer hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = Math.cos(angle) * size * 0.5;
        const py = Math.sin(angle) * size * 0.5;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.5);
      gradient.addColorStop(0, highlightColor);
      gradient.addColorStop(0.6, baseColor);
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner hole
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = shadowColor;
      ctx.fill();

      ctx.restore();
    };

    const drawScrew = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, isDark: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const baseColor = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(71, 85, 105, 0.2)';
      const highlightColor = isDark ? 'rgba(203, 213, 225, 0.35)' : 'rgba(100, 116, 139, 0.3)';
      const shadowColor = isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(30, 41, 59, 0.25)';

      // Screw head (flat with slot)
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(-size * 0.1, -size * 0.1, 0, 0, 0, size * 0.4);
      gradient.addColorStop(0, highlightColor);
      gradient.addColorStop(0.7, baseColor);
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Slot
      ctx.strokeStyle = shadowColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.3, 0);
      ctx.lineTo(size * 0.3, 0);
      ctx.stroke();

      // Shaft
      ctx.fillStyle = baseColor;
      ctx.fillRect(-size * 0.12, size * 0.3, size * 0.24, size * 0.5);

      // Threads
      ctx.strokeStyle = shadowColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(-size * 0.12, size * 0.4 + i * size * 0.1);
        ctx.lineTo(size * 0.12, size * 0.4 + i * size * 0.1);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawWasher = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, isDark: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const baseColor = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(71, 85, 105, 0.2)';
      const highlightColor = isDark ? 'rgba(203, 213, 225, 0.35)' : 'rgba(100, 116, 139, 0.3)';
      const shadowColor = isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(30, 41, 59, 0.25)';

      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(-size * 0.15, -size * 0.15, 0, 0, 0, size * 0.5);
      gradient.addColorStop(0, highlightColor);
      gradient.addColorStop(0.5, baseColor);
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner hole
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = shadowColor;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Detect theme
      const isDark = document.documentElement.classList.contains('dark');

      // Parallax offset based on mouse position (subtle)
      const parallaxX = (mouseRef.current.x - 0.5) * 30;
      const parallaxY = (mouseRef.current.y - 0.5) * 30;

      partsRef.current.forEach((part) => {
        // Apply parallax based on depth
        const px = part.x + parallaxX * part.z;
        const py = part.y + parallaxY * part.z;

        // Update position (gentle drift) if motion is allowed
        if (!prefersReducedMotion.current) {
          part.x += part.vx;
          part.y += part.vy;
          part.rotation += part.rotationSpeed;

          // Subtle rotation influence from mouse
          const dx = mouseRef.current.x * canvas.width - part.x;
          const dy = mouseRef.current.y * canvas.height - part.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            part.rotationSpeed += (dx / dist) * 0.0001;
          }
          part.rotationSpeed *= 0.98; // damping

          // Wrap around
          if (part.x < -50) part.x = canvas.width + 50;
          if (part.x > canvas.width + 50) part.x = -50;
          if (part.y < -50) part.y = canvas.height + 50;
          if (part.y > canvas.height + 50) part.y = -50;
        }

        // Scale by depth for pseudo-3D
        const scale = 0.5 + part.z * 0.5;
        const scaledSize = part.size * scale;

        // Draw the part
        switch (part.type) {
          case 'bolt':
            drawBolt(ctx, px, py, scaledSize, part.rotation, isDark);
            break;
          case 'nut':
            drawNut(ctx, px, py, scaledSize, part.rotation, isDark);
            break;
          case 'screw':
            drawScrew(ctx, px, py, scaledSize, part.rotation, isDark);
            break;
          case 'washer':
            drawWasher(ctx, px, py, scaledSize, part.rotation, isDark);
            break;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
