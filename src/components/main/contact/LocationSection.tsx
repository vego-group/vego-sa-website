"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function LocationSection() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Content */}
          <div className="grid md:grid-cols-2">
            {/* Location Info */}
            <div className="p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-primary">
                  أين تجدنا
                </h3>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  <span className="font-medium text-slate-800">العنوان:</span>{" "}
                  مجموعة فيجو، برج سعد الدور 12، شارع الملك فهد الفرعي، حي الملقا،
                  الرياض 13521، المملكة العربية السعودية
                </p>

                <p>
                  <span className="font-medium text-slate-800">رقم الهاتف:</span>{" "}
                  <a
                    href="tel:920014486"
                    className="font-medium text-primary transition-colors hover:text-emerald-600"
                  >
                    920014486
                  </a>
                </p>

                <p>
                  <span className="font-medium text-slate-800">
                    البريد الإلكتروني:
                  </span>{" "}
                  <a
                    href="mailto:info@vego.sa"
                    className="font-medium text-primary transition-colors hover:text-emerald-600"
                  >
                    info@vego.sa
                  </a>
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/f7SbBRdjzA5zbSVB6"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                احصل على الاتجاهات
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Map */}
            <div className="relative h-80 md:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.384237511246!2d46.69263971501215!3d24.769903684114865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03b9e3b1d4f7%3A0x5de7f8a2a1d4f7a6!2sVego%20Group!5e0!3m2!1sen!2ssa!4v1706490000000!5m2!1sen!2ssa"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
