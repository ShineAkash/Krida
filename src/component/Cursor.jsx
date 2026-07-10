import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      setIsHidden(true);
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let rafId = null;

    // Smooth trailing ring animation
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnterWindow = () => setIsHidden(false);
    const handleMouseLeaveWindow = () => setIsHidden(true);

    const handleMouseOver = (e) => {
      const t = e.target;
      if (
        t?.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
        )
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const t = e.target;
      if (
        t?.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseenter", handleMouseEnterWindow);
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Inner dot - follows exactly */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: isClicking ? "6px" : isHovering ? "0px" : "8px",
          height: isClicking ? "6px" : isHovering ? "0px" : "8px",
          opacity: isHovering ? 0 : 1,
        }}
      />

      {/* Outer ring - trails behind with smooth delay */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: isClicking ? "28px" : isHovering ? "64px" : "40px",
          height: isClicking ? "28px" : isHovering ? "64px" : "40px",
          borderColor: isHovering
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0.6)",
          transform: isClicking ? "scale(0.85)" : "scale(1)",
        }}
      />
    </>
  );
};

export default Cursor;
