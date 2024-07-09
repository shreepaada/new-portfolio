"use client";
import { useEffect, useRef, useState } from "react";

export function TimeLine({ data }) {
	const colorMode = "dark"; // Placeholder for color mode support
	const [, setActiveItem] = useState(0);
	const carouselRef = useRef(null);

	const scroll = (node, left) => {
		node.scrollTo({ left, behavior: "smooth" });
	};

	const handleClick = (e, i) => {
		e.preventDefault();
		if (carouselRef.current) {
			const scrollLeft = Math.floor(
				carouselRef.current.scrollWidth * 0.7 * (i / data.length)
			);
			scroll(carouselRef.current, scrollLeft);
		}
	};

	const handleScroll = () => {
		if (carouselRef.current) {
			const index = Math.round(
				(carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth * 0.7)) * data.length
			);
			setActiveItem(index);
		}
	};

	useEffect(() => {
		const handleResize = () => {
			if (carouselRef.current) {
				scroll(carouselRef.current, 0);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// If data is not available, the component simply doesn't render anything.
	if (!data) {
		return null; // Or, you can return an empty fragment <> </>
	}

	return (
		<ul
			ref={carouselRef}
			onScroll={handleScroll}
			className="flex flex-row flex-nowrap gap-5 justify-between overflow-x-auto snap-x cursor-pointer hide-scroll-bar"
		>
			{data.map((item, index) => (
				<li
					id={`carousel__item-${index}`}
					key={index}
					className="flex flex-col gap-3 snap-start w-[calc((100%/2)-30px)] sm:w-1/3 md:w-1/6"
					onClick={(e) => handleClick(e, index)}
				>
					<h3
						tabIndex="0"
						aria-label={"What do I do in " + item.year}
						className="flex items-center gap-4 text-2xl font-bold"
					>
						{`${item.year}`}
						{/* SVG and other elements here as needed */}
					</h3>
					<p className="tracking-wide" tabIndex="0">
						{item.text}
					</p>
				</li>
			))}
		</ul>
	);
}
