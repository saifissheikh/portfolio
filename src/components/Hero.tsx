import Image from "next/image";
import bioData from "@/data/bio.json";

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Top Section - Profile Picture + Intro */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-12">
          {/* Profile Picture */}
          <div className="relative animate-fade-in-up opacity-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-foreground/10 animate-pulse" />
              <div className="absolute -inset-2 rounded-full border border-foreground/5" />
              <div className="absolute -inset-4 rounded-full border border-foreground/5 opacity-50" />

              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt={bioData.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  priority
                />
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse" />
            </div>
          </div>

          {/* Intro Text */}
          <div className="text-center lg:text-left flex-1">
            {/* Greeting */}
            <p className="text-muted-foreground text-sm sm:text-base mb-2 animate-fade-in-up opacity-0 animation-delay-100">
              Hello, I&apos;m
            </p>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 animate-fade-in-up opacity-0 animation-delay-200">
              {bioData.name}
            </h1>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-4 animate-fade-in-up opacity-0 animation-delay-300">
              {bioData.title}
            </h2>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-6 animate-fade-in-up opacity-0 animation-delay-400">
              {bioData.tagline}
            </p>

            {/* Location */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm text-secondary-foreground animate-fade-in-up opacity-0 animation-delay-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Dubai, United Arab Emirates
            </div>
          </div>
        </div>

        {/* About Text */}
        <div className="max-w-3xl mx-auto mb-10 text-center animate-fade-in-up opacity-0 animation-delay-500">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {bioData.about}
          </p>
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in opacity-0 animation-delay-500">
          {bioData.expertise.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-card text-card-foreground text-sm rounded-lg border border-border hover:border-foreground/20 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 animation-delay-500">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 border border-border rounded-full font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-muted-foreground"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
