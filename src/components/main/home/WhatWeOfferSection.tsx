"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Slides } from "@/data";

function WhatWeOfferSection() {
  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          What We Offer
        </h2>

        <div className="relative mt-12 w-full">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            loop
            pagination={{ clickable: true }}
            className="offer-swiper overflow-hidden rounded-3xl"
          >
            {Slides.map((slide) => (
              <SwiperSlide key={slide.title}>
                <div className="relative min-h-80 md:min-h-105">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 960px, (min-width: 768px) 90vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/40 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10 text-left text-white">
                    <h3 className="text-2xl font-semibold sm:text-3xl">
                      {slide.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .offer-swiper .swiper-pagination {
          bottom: 18px;
        }
        .offer-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          border: 1px solid rgba(15, 23, 42, 0.25);
          opacity: 1;
        }
        .offer-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 999px;
          background: #0d9f6d;
          border-color: #0d9f6d;
          box-shadow: 0 6px 12px rgba(15, 23, 42, 0.2);
        }
      `}</style>
    </section>
  );
}

export default WhatWeOfferSection;
