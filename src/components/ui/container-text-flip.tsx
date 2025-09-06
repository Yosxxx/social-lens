"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number; // ms
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState<number>(100);
  const textRef = useRef<HTMLSpanElement | null>(null);

  // Measure width with padding allowance
  const measure = () => {
    if (textRef.current) {
      // +30 px total padding (15px per side) – adjust as you like
      const next = Math.ceil(textRef.current.scrollWidth + 30);
      setWidth((w) => (w !== next ? next : w));
    }
  };

  // Initial, synchronous post-DOM-paint measure to reduce layout jump
  useLayoutEffect(() => {
    measure();
  }, []);

  // Re-measure when word changes
  useEffect(() => {
    // batch to the next frame to ensure DOM has updated text
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [currentWordIndex]);

  // Track size changes (fonts loading, responsive changes)
  useEffect(() => {
    if (!textRef.current || typeof ResizeObserver === "undefined") return;
    const obs = new ResizeObserver(() => measure());
    obs.observe(textRef.current);
    return () => obs.disconnect();
  }, []);

  // Rotate words
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentWordIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const current = words[currentWordIndex] ?? "";

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      initial={false}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg py-2 text-center text-4xl font-bold text-black dark:text-white",
        "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        "dark:[background:linear-gradient(to_bottom,#374151,#1f2937)]",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        className
      )}
      // key on the inner span instead of the container to avoid resetting width animation
    >
      <motion.span
        ref={textRef}
        className={cn("inline-block", textClassName)}
        transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
        layoutId={`word-div-${current}-${id}`}
        key={current}
      >
        {/* per-letter fade-in */}
        {current.split("").map((letter, i) => (
          <motion.span
            key={`${current}-${i}`}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: i * 0.02 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  );
}
