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
        <div class="m-12">
          <ThemeToggle themeStorageKey="theme" textSize="text-2xl" />
        </div>
      </body>
    </>
  );
};
