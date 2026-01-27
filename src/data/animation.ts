export const overlayVariants = {
  rest: { opacity: 0.35 },
  hover: { opacity: 0.7 },
};
export const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.2 },
};

export const titleVariants = {
  rest: { opacity: 1, y: 0 },
  hover: { opacity: 0, y: -12 },
};

export const descriptionVariants = {
  rest: { opacity: 0, y: 12 },
  hover: { opacity: 1, y: 0 },
};

export const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.18, ease: "easeOut", duration: 0.6 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
