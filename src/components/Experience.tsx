"use client";

import { useEffect, useRef, useState } from "react";
import experienceData from "@/data/experience.json";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  current: boolean;
}

function HexagonIcon({ isCurrent }: { isCurrent: boolean }) {
  return (
    <svg
      width="40"
      height="46"
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${isCurrent ? "scale-110" : ""}`}
    >
      <path
        d="M20 0L38.6603 11V35L20 46L1.33975 35V11L20 0Z"
        fill={isCurrent ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
    </svg>
  );
}

function ExperienceCard({
  experience,
  index,
  isVisible,
  isAbove,
}: {
  experience: Experience;
  index: number;
  isVisible: boolean;
  isAbove: boolean;
}) {
  return (
    <div
      className={`
        absolute
        ${isAbove ? "bottom-full mb-4" : "top-full mt-4"}
        left-1/2 -translate-x-1/2
        w-48 sm:w-56
        transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : `opacity-0 ${isAbove ? "translate-y-4" : "-translate-y-4"}`}
      `}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Connector line */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 w-px bg-border
          ${isAbove ? "top-full h-4" : "bottom-full h-4"}
        `}
      />

      {/* Card */}
      <div
        className={`
          p-4 rounded-lg border
          transition-all duration-300
          ${
            experience.current
              ? "bg-foreground text-background border-foreground"
              : "bg-card border-border hover:border-foreground/30"
          }
        `}
      >
        <h3
          className={`text-base sm:text-lg font-bold text-center ${
            experience.current ? "text-background" : "text-foreground"
          }`}
        >
          {experience.company}
        </h3>
        <p
          className={`text-sm text-center mt-1 ${
            experience.current ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {experience.period}
        </p>
      </div>
    </div>
  );
}

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = experienceData.experiences;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            My Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal Line */}
          <div
            className={`
              absolute top-1/2 -translate-y-1/2 h-px bg-border
              transition-all duration-1000 ease-out
              ${isVisible ? "w-full" : "w-0"}
            `}
          />

          {/* Experience Points */}
          <div className="relative flex justify-between items-center py-32">
            {experiences.map((exp, index) => {
              const isAbove = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className="relative flex flex-col items-center"
                >
                  {/* Card */}
                  <ExperienceCard
                    experience={exp}
                    index={index}
                    isVisible={isVisible}
                    isAbove={isAbove}
                  />

                  {/* Hexagon */}
                  <div
                    className={`
                      relative z-10 transition-all duration-500
                      ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                    `}
                    style={{ transitionDelay: `${index * 200 + 300}ms` }}
                  >
                    <HexagonIcon isCurrent={exp.current} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout (stacked) */}
        <div className="md:hidden space-y-6 mt-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`
                flex items-start gap-4 transition-all duration-700
                ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Timeline dot */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`
                    w-4 h-4 rounded-full border-2
                    ${exp.current ? "bg-foreground border-foreground" : "bg-background border-muted-foreground"}
                  `}
                />
                {index < experiences.length - 1 && (
                  <div className="w-px h-full min-h-[80px] bg-border absolute top-4" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <h3 className="text-lg font-bold text-foreground">
                  {exp.company}
                </h3>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="text-sm text-muted-foreground mt-2">{exp.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
