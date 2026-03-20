import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

// Main App container animation (fade-in logic). Section scroll-reveals are handled in App.jsx.
export default function AnimateUI({ children, className = "" }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return undefined;

    const animation = anime({
      targets: wrapperRef.current,
      opacity: [0, 1],
      duration: 1200,
      easing: "easeInOutSine"
    });

    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div ref={wrapperRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
