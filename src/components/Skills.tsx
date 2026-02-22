"use client";

import { useEffect, useRef, useState } from "react";
import skillsData from "@/data/skills.json";

interface Skill {
  name: string;
  icon: string;
  color: string;
}

// Custom SVG icons for AI companies not in devicon
const CustomIcons: Record<
  string,
  React.FC<{ className?: string; color?: string }>
> = {
  openai: ({ className, color }) => (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  anthropic: ({ className, color }) => (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M17.304 3.541h-3.672l6.696 16.918h3.672l-6.696-16.918zM6.696 3.541L0 20.459h3.672l1.344-3.541h6.86l1.345 3.541h3.672L10.196 3.541H6.696zm.672 10.459l2.132-5.605 2.132 5.605H7.368z" />
    </svg>
  ),
};

function SkillBubble({
  skill,
  index,
  isVisible,
}: {
  skill: Skill;
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate semi-random but consistent positions for scattered effect
  const offsetX = index % 3 === 0 ? -8 : index % 3 === 1 ? 8 : 0;
  const offsetY = index % 2 === 0 ? -4 : 4;

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
      style={{
        transitionDelay: `${index * 40}ms`,
        transform: isVisible
          ? `translate(${offsetX}px, ${offsetY}px)`
          : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative
          w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
          flex items-center justify-center
          rounded-full
          bg-card border-2
          transition-all duration-300 ease-out
          cursor-pointer
          ${isHovered ? "scale-150 z-50" : "hover:scale-110 z-10"}
        `}
        style={{
          borderColor: skill.color,
          boxShadow: isHovered
            ? `0 0 40px ${skill.color}60, 0 0 80px ${skill.color}30, inset 0 0 20px ${skill.color}20`
            : `0 0 15px ${skill.color}20`,
          background: isHovered
            ? `radial-gradient(circle at center, ${skill.color}15, transparent 70%)`
            : undefined,
        }}
      >
        {(() => {
          const CustomIcon = CustomIcons[skill.icon];
          if (CustomIcon) {
            return (
              <CustomIcon
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 transition-all duration-300"
                color={skill.color}
              />
            );
          }
          return (
            <i
              className={`devicon-${skill.icon}-plain text-xl sm:text-2xl md:text-3xl transition-all duration-300`}
              style={{ color: skill.color }}
            />
          );
        })()}
      </div>

      {/* Tooltip - positioned above with high z-index */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 -top-12
          px-3 py-1.5 rounded-lg
          bg-foreground text-background
          text-xs sm:text-sm font-medium whitespace-nowrap
          transition-all duration-200 z-[100]
          pointer-events-none
          ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
        style={{
          boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {skill.name}
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-foreground rotate-45" />
      </div>
    </div>
  );
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30 overflow-visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Bubble Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 md:gap-6 px-4 py-8">
          {skillsData.skills.map((skill, index) => (
            <SkillBubble
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
