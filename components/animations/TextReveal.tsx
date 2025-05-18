"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
}

export function TextReveal({ 
  text, 
  className = "", 
  once = true, 
  delay = 0,
  duration = 0.05
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  
  // Split the text into words
  const words = text.split(" ");

  // Animation for each word
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };
  
  // Animation for each character
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={`${className} inline-block`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block mr-[0.25em] whitespace-nowrap">
          {Array.from(word).map((char, index) => (
            <motion.span
              key={index}
              variants={child}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.p>
  );
}