// src/components/CustomCursor.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // tous les éléments cliquables
      if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
        setHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="cursor"
        initial={{ opacity: 0 }}
        animate={{
          x: position.x - (hovered ? 20 : 10),
          y: position.y - (hovered ? 20 : 10),
          width: hovered ? 40 : 20,
          height: hovered ? 40 : 20,
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="fixed pointer-events-none rounded-full bg-primary/50 backdrop-blur-sm border-2 border-white/30 z-50"
      />
    </AnimatePresence>
  );
}
