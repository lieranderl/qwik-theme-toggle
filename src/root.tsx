import { ThemeScript } from "./components/theme-toggle/theme-script";
import { ThemeToggle } from "./components/theme-toggle/theme-toggle";

import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
        <ThemeScript themeStorageKey="theme" />
      </head>
      <body>
        <div class="drawer  ">
          <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex flex-col">
            <div class="navbar sticky top-0 z-10 h-4 bg-opacity-50 backdrop-blur-sm">
              <div class="flex-none md:hidden">
                <label
                  for="my-drawer-3"
                  aria-label="open sidebar"
                  class="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div class="mx-6">Test</div>
              <div class="hidden flex-none md:block"></div>
              <ThemeToggle themeStorageKey="theme" textSize="text-2xl" />
            </div>
            <div class="container mx-auto pt-2">
              <div class="stats shadow">
                <div class="stat">
                  <div class="stat-figure text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
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
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
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
          </div>
          <div class="drawer-side z-20">
            <label
              for="my-drawer-3"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
          </div>
        </div>
      </body>
    </>
  );
};
