"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { HeadingDivider } from "components";
import { TimeLine } from "./TimeLine";

export function AboutSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />
				<div className="pt-10 pb-16 max-w-5xl flex flex-col gap-3">
					<div
						tabIndex="0"
						ref={ref}
						className="text-xl font-light leading-relaxed"
						style={{
							transform: isInView ? "none" : "translateX(-200px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
						}}
					>
						<p>
						Hello, I am Shreepaada M C, a dedicated third-year Computer Science Engineering student at Dayananda Sagar University, 
						specializing in frontend web development. 
						</p>
						<p>
						My academic journey is marked by a fervent passion for leveraging technology to create innovative solutions that address real-world challenges. 
						With a foundation built on projects such as an automated Smart Water Pump Drip Irrigation System aimed at enhancing agricultural water efficiency, and a deep learning model
						for the accurate detection of pneumonia from chest X-rays, my work embodies my commitment to contributing positively to society.
						</p>
						<p>My technical toolkit is diverse, encompassing full-stack web development with the MERN stack, alongside proficiency in languages such as C, C++, Java, and Python.
						   Additionally, my skills extend to Embedded C, Arduino, Machine Learning, and Database Management, equipping me to tackle a wide array of technological challenges.</p>
						<p className="my-3.5">
							I enjoy learning technologies that interest me, which is why I dedicated a significant
							amount of time to working with WordPress.
						</p>
						<p>
						I am constantly seeking opportunities to collaborate with dynamic teams, where I can bring my fresh perspectives, share my knowledge, and learn from others.
						 As I continue to explore the vast field of computer science, I am excited about the possibilities of making a lasting impact through innovation and teamwork.
						</p>
						
					</div>
				</div>

				<TimeLine />
			</section>
		</LazyMotion>
	);
}
