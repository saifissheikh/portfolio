"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  tags: string[];
  featured: boolean;
}

// Bento grid layout patterns for different project counts
const getGridClass = (index: number, total: number): string => {
  // Pattern for varying sizes - creates visual interest
  const patterns: Record<number, string[]> = {
    5: [
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-2", // Tall
      "col-span-1 row-span-1", // Small
    ],
    6: [
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-2", // Tall
      "col-span-1 row-span-1", // Small
    ],
    7: [
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-2", // Tall
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
      "col-span-2 row-span-1", // Wide
    ],
    8: [
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-2", // Tall
      "col-span-1 row-span-1", // Small
      "col-span-2 row-span-1", // Wide
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
    ],
  };

  // Default pattern for any count
  const defaultPatterns = [
    "col-span-2 row-span-2", // 0 - Large
    "col-span-1 row-span-1", // 1 - Small
    "col-span-1 row-span-1", // 2 - Small
    "col-span-1 row-span-2", // 3 - Tall
    "col-span-1 row-span-1", // 4 - Small
    "col-span-1 row-span-1", // 5 - Small
    "col-span-2 row-span-1", // 6 - Wide
    "col-span-1 row-span-1", // 7 - Small
    "col-span-1 row-span-2", // 8 - Tall
    "col-span-1 row-span-1", // 9 - Small
    "col-span-2 row-span-1", // 10 - Wide
    "col-span-1 row-span-1", // 11 - Small
  ];

  if (patterns[total]) {
    return patterns[total][index] || "col-span-1 row-span-1";
  }

  return defaultPatterns[index % defaultPatterns.length];
};

function ProjectTile({
  project,
  index,
  total,
  isVisible,
}: {
  project: Project;
  index: number;
  total: number;
  isVisible: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const gridClass = getGridClass(index, total);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${gridClass}
        relative block overflow-hidden rounded-2xl
        cursor-pointer group
        transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`
              object-cover transition-transform duration-500 ease-out
              ${isHovered ? "scale-110" : "scale-100"}
            `}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${(index * 40) % 360}, 70%, 20%), 
                hsl(${(index * 40 + 60) % 360}, 70%, 10%)
              )`,
            }}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Gradient Overlay - stronger at bottom for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Content - positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        {/* Text container with subtle backdrop for extra readability on light images */}
        <div className="relative">
          <h3
            className={`
              text-white font-bold transition-all duration-300 drop-shadow-lg
              ${gridClass.includes("col-span-2") ? "text-xl sm:text-2xl" : "text-sm sm:text-base"}
            `}
          >
            {project.title}
          </h3>

          {/* Description - only on larger tiles and hover */}
          {gridClass.includes("row-span-2") && (
            <p
              className={`
                text-white/80 text-sm mt-2 line-clamp-2 drop-shadow-md
                transition-all duration-300
                ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              {project.description}
            </p>
          )}

          {/* View indicator on hover */}
          <div
            className={`
              flex items-center gap-1 text-white/90 text-xs mt-2 font-medium
              transition-all duration-300
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
          >
            <span>View Project</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-white text-black text-xs font-semibold rounded-full">
          Featured
        </div>
      )}
    </a>
  );
}

export default function Projects() {
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

  const projects = projectsData.projects;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on any project to see it live
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          style={{ gridAutoRows: "minmax(120px, 1fr)" }}
        >
          {projects.map((project, index) => (
            <ProjectTile
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
