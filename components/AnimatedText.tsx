"use client";

import { motion } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

const AnimatedText = ({ text, className, delay = 0 }: AnimatedTextProps) => {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.035,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index.toString()}`}
          className="inline-block"
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: {
              y: "0%",
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: [0.19, 1, 0.22, 1] as const,
              },
            },
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;

