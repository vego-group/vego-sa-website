import { Variants } from "framer-motion";

export const cardVariants = {
  hidden: { opacity: 0, y: 64, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delayChildren: 0.18,
      staggerChildren: 0.14,
    },
  },
} satisfies Variants;

export const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
} satisfies Variants;
