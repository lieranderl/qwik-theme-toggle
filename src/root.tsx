import { component$ } from "@builder.io/qwik";

import "./global.css";
import { ThemeScript } from "./components/theme-toggle/theme-script";
import { ThemeToggle } from "./components/theme-toggle/theme-toggle";

export default () => {
	return (
		<>
			<head>
				<title>Qwik Blank App</title>
				{/* Theme Script */}
				<ThemeScript
					themeStorageKey="theme" // name of the local storage theme key
					// themeQuery="theme" // (Optional) name of the query param to reflect theme in URL
				/>
			</head>
			<body>
				<div class="navbar sticky top-0 z-10 h-4 bg-opacity-50 backdrop-blur-sm">
					<div class="mx-3 me-auto">Test Theme Toggle Button</div>
					{/* Theme button */}
					<div class="me-3">
						<ThemeToggle
							themeStorageKey="theme" // name of the local storage theme key
							// themeQuery="theme" // (Optional) name of the query param to reflect theme in URL
							textSize="text-3xl"
							myClass={"hover:text-secondary"}
						/>
					</div>
				</div>

				<DaisyUIContent />
				<TailwindContent />
			</body>
		</>
	);
};

const DaisyUIContent = component$(() => {
	return (
		<div class="container mx-auto pt-2">
			<h1>DaisyUI</h1>
			<div class="stats shadow">
				<div class="stat">
					<div class="stat-figure text-primary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-8 w-8 stroke-current"
							aria-labelledby="svgTitle"
						>
							<title id="svgTitle">Brief description of the SVG</title>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</div>
					<div class="stat-title">Total Likes</div>
					<div class="stat-value text-primary">25.6K</div>
					<div class="stat-desc">21% more than last month</div>
				</div>

				<div class="stat">
					<div class="stat-figure text-secondary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-8 w-8 stroke-current"
							aria-labelledby="svgTitle"
						>
							<title id="svgTitle">Brief description of the SVG</title>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<div class="stat-title">Page Views</div>
					<div class="stat-value text-secondary">2.6M</div>
					<div class="stat-desc">21% more than last month</div>
				</div>

				<div class="stat">
					<div class="stat-value">86%</div>
					<div class="stat-title">Tasks done</div>
					<div class="stat-desc text-secondary">31 tasks remaining</div>
				</div>
			</div>
		</div>
	);
});

const TailwindContent = component$(() => {
	return (
		<div class="container mx-auto mt-4 pt-2">
			<h1>Pure Tailwind</h1>
			<div class="mt-4 w-96 rounded-lg bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800">
				<div>
					<span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
						<svg
							class="h-6 w-6 text-white dark:text-slate-800"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
							aria-labelledby="svgTitle"
						>
							<title id="svgTitle">Brief description of the SVG</title>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</span>
				</div>
				<h3 class="mt-5 text-base font-medium tracking-tight text-slate-900 dark:text-white">
					Writes Upside-Down
				</h3>
				<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
					The Zero Gravity Pen can be used to write in any orientation,
					including upside-down. It even works in outer space.
				</p>
			</div>
		</div>
	);
});
