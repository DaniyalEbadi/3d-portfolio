"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { useScroll, useTransform, motion, useInView } from "motion/react";
import Image from "next/image";
import { type Experience, type TimelineProps } from "@/types/portfolio-types";

const TimelineItem: FC<{ item: Experience; index: number }> = ({
  item,
  index,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const inView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
      className="flex justify-start pt-10 md:pt-40 md:gap-10"
    >
      <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
        <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-[15px] bg-midnight">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
            className="w-4 h-4 p-2 border rounded-full bg-gradient-to-br from-coral to-lavender border-white/20 shadow-lg shadow-coral/30"
          />
        </div>
        <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:ps-20 md:text-4xl text-neutral-300">
          <h3 className="text-gradient">{item.date}</h3>
          <h3 className="text-2xl md:text-3xl text-white">{item.title}</h3>
          {item.job && (
            <h3 className="text-xl md:text-2xl text-neutral-500">{item.job}</h3>
          )}
        </div>
      </div>
      <div className="relative w-full ps-20 pe-4 md:ps-4">
        <div className="block mb-4 text-2xl font-bold text-start text-neutral-300 md:hidden">
          <h3 className="text-gradient text-base mb-1">{item.date}</h3>
          <h3 className="text-xl">{item.title}</h3>
          {item.job && (
            <h3 className="text-base text-neutral-500">{item.job}</h3>
          )}
        </div>
        <div className="space-y-3">
          {item.contents.map((content, contentIndex) => (
            <motion.p
              key={contentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.05 + 0.25 + contentIndex * 0.08,
              }}
              className="font-normal text-neutral-400 flex gap-3"
            >
              <span className="mt-2 h-1 w-1 rounded-full bg-coral flex-shrink-0" />
              <span>{content}</span>
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Timeline: FC<TimelineProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      id="experience"
      className="c-space section-spacing relative"
      ref={containerRef}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-aqua/10 blur-[140px]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-eyebrow"
      >
        رزومه
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="text-heading mt-3 max-w-3xl"
      >
        سوابق کاری و تحصیلی
      </motion.h2>

      <div className="mt-8 flex flex-col-reverse gap-8 md:mt-14 lg:flex-row lg:gap-10 xl:gap-14">
        <div ref={ref} className="relative min-w-0 flex-1 pb-20">
          {data.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
          <div
            style={{ height: `${height}px` }}
            className="absolute md:start-1 start-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-coral via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>

        <aside className="shrink-0 lg:w-72 xl:w-80">
          <div className="sticky top-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group relative w-44 sm:w-52 md:w-60 lg:w-full"
            >
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-coral/25 via-lavender/20 to-aqua/20 blur-2xl"
              />
              <figure className="glass gradient-border animate-float relative">
                <Image
                  src="/assets/portrait.webp"
                  alt="دانیال عبادی"
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/70 to-transparent p-4 pt-12">
                  <p className="text-sm font-bold text-white md:text-base">
                    دانیال عبادی
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-400 md:text-xs">
                    توسعه‌دهنده بک‌اند · پایتون و جنگو
                  </p>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </aside>
      </div>
    </section>
  );
};
