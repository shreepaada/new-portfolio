"use client";

import { WelcomeSection, AboutSection, ProjectShowcase, TechnologiesSection } from "app/sections";

export default function Page() {
	return (
		<div className="container-md">
			<WelcomeSection />
			<AboutSection />
			<ProjectShowcase />
			<TechnologiesSection />
		</div>
	);
}
