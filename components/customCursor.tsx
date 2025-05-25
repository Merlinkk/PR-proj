"use client";

import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const animationId = useRef<number>();
  const resetTimeoutId = useRef<number>();

  // Reset cursor to circular state
  const resetCursor = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    cursor.style.transform = `translate(${lastX.current - 12}px, ${lastY.current - 12}px) rotate(0deg) scaleX(1) scaleY(1)`;
  }, []);

  // Use requestAnimationFrame for smooth updates
  const updateCursor = useCallback((x: number, y: number) => {
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
    }

    // Clear existing reset timeout
    if (resetTimeoutId.current) {
      clearTimeout(resetTimeoutId.current);
    }

    animationId.current = requestAnimationFrame(() => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      // Calculate movement deltas
      const deltaX = x - lastX.current;
      const deltaY = y - lastY.current;

      // Only update if there's meaningful movement (reduces unnecessary updates)
      if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) return;

      // Calculate angle for rotation (in radians → degrees)
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Calculate speed (magnitude of delta)
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Stretch factor based on speed (optimized calculation)
      const stretch = Math.min(speed * 0.05, 0.5); // Cap the stretch to 0.5

      // Use transform for better performance (composite layer)
      cursor.style.transform = `translate(${x - 12}px, ${y - 12}px) rotate(${angle}deg) scaleX(${1 + stretch}) scaleY(${1 - stretch})`;

      lastX.current = x;
      lastY.current = y;

      // Set timeout to reset cursor when movement stops
      resetTimeoutId.current = window.setTimeout(resetCursor, 100);
    });
  }, [resetCursor]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY);
    };

    // Use passive listener for better performance
    window.addEventListener("mousemove", moveCursor, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      if (resetTimeoutId.current) {
        clearTimeout(resetTimeoutId.current);
      }
    };
  }, [updateCursor]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none"
      style={{
        zIndex: 9999,
        willChange: "transform", // Optimize for animations
        transform: "translate(-12px, -12px)", // Initial position
        transition: "transform 0.08s ease-out",
      }}
    />
  );
};

export default CustomCursor;