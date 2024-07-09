import React, { useRef, useState, useEffect } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { HeadingDivider } from "components";

// Custom useInView hook
const useInView = (ref, options) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
};

// Example projects data
const projects = [
  {
    title: "Environmental Awareness System",
    description: "a webspage using next js ,and 3d models with spline which provides inforamtion about deforenstation and melting of icecaps",
    link: "https://github.com/shreepaada/environmental-awareness-system",
    image: "/1.png"
  },
  {
    title: "Portfolio page",
    description: "creating a next js portfolio page with java script",
    link: "https://github.com/shreepaada/new-portfolio",
    image: "/6.png"
  },
  {
    title: "Pneumonia detection",
    description: "pneumonia detection using X-Rays",
    link: "https://github.com/shreepaada/pneumonia",
    image: "/7.jpg"
  }
];

export function ProjectShowcase() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true });
  const isSectionInView = useInView(sectionRef, { once: true });
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
    darkModeMediaQuery.addEventListener('change', (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} id="projects" className="section">
        <HeadingDivider title="Projects" />
        <p
          ref={textRef}
          tabIndex="0"
          className="my-5 text-2xl"
          style={{
            transform: isTextInView ? "none" : "translateX(-200px)",
            opacity: isTextInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          The tech projects I have created:
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {projects.map((project, index) => (
            <m.div
              key={index}
              className={`flex flex-col md:flex-row gap-4 items-center ${index === 1 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full md:w-1/3 h-auto rounded-lg object-cover"
              />
              <div className={`p-5 rounded-lg flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} ${index === 1 ? 'md:mr-4' : 'md:ml-4'}`}>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>JS Next.js</p>
                <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={`text-base mt-3 inline-block ${theme === 'dark' ? 'text-yellow-300' : 'text-blue-500'}`}>
                  View Project &#8594;
                </a>
              </div>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
