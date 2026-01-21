"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  imageVariants,
  overlayVariants,
  titleVariants,
  descriptionVariants,
} from "@/data";
import { cardData } from "@/data";

function WhyVegoSection() {
  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          Why VEGO Group?
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Because we innovate the future of electric mobility with solutions
          that combine technology, design, and sustainability to make every
          journey smarter, cleaner, and more efficient.
        </p>

        <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
          {cardData.map((card) => (
            <motion.article
              key={card.title}
              className="group relative min-h-65 overflow-hidden rounded-3xl"
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              <motion.div
                className="absolute inset-0"
                variants={imageVariants}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-primary"
                variants={overlayVariants}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
                <motion.h3
                  className="text-lg font-semibold sm:text-xl"
                  variants={titleVariants}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  className="text-sm leading-relaxed text-white/90"
                  variants={descriptionVariants}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {card.description}
                </motion.p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyVegoSection;
