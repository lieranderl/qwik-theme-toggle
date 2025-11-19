import { $, component$, useOnDocument } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

export const ICON_MODE = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
} as const;

export type ThemeConfig = {
  LIGHT: string; // CSS theme name (e.g., latte)
  DARK: string;  // CSS theme name (e.g., dracula)
};

export function createThemeConfig(light = "light", dark = "dark") {
  return { LIGHT: light, DARK: dark } satisfies ThemeConfig;
}

const mediaQueryList = isBrowser
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : null;

let mediaChangeHandler: ((e: MediaQueryListEvent) => void) | null = null;

export const subscribeAutoMode = (THEME: ThemeConfig) => {
  if (!mediaQueryList) return;

  unsubscribeAutoMode();

  mediaChangeHandler = (e) => {
    const cssTheme = e.matches ? THEME.DARK : THEME.LIGHT;

    document.documentElement.classList.remove(THEME.LIGHT, THEME.DARK);
    document.documentElement.classList.add(cssTheme);
    document.documentElement.setAttribute("data-theme", cssTheme);
  };

  mediaQueryList.addEventListener("change", mediaChangeHandler);
};

export const unsubscribeAutoMode = () => {
  if (mediaChangeHandler && mediaQueryList) {
    mediaQueryList.removeEventListener("change", mediaChangeHandler);
    mediaChangeHandler = null;
  }
};

export type ThemeScriptProps = {
  themeStorageKey: string;
  themeQuery?: string;
  lightTheme?: string;
  darkTheme?: string;
};

export const ThemeScript = component$(
  ({ themeStorageKey, themeQuery, lightTheme, darkTheme }: ThemeScriptProps) => {
    const THEME = createThemeConfig(lightTheme, darkTheme);

    useOnDocument(
      "DOMContentLoaded",
      $(() => {
        const stored = localStorage.getItem(themeStorageKey) ?? "auto";
        if (stored === "auto") subscribeAutoMode(THEME);
      })
    );

    const script = `
      const key = "${themeStorageKey}";
      const qpKey = "${themeQuery}";
      const params = new URLSearchParams(location.search);

      let theme = localStorage.getItem(key);

      if (!theme) {
        theme = "auto";
        localStorage.setItem(key, theme);
      }

      // Read from URL if provided
      if (qpKey && qpKey !== "undefined") {
        const qpVal = params.get(qpKey);
        if (qpVal) {
          theme = qpVal;
          localStorage.setItem(key, theme);
        }
      }

      // Resolve actual CSS theme
      let cssTheme;
      if (theme === "auto") {
        cssTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "${THEME.DARK}"
          : "${THEME.LIGHT}";
      } else {
        cssTheme = theme; // latte or dracula
      }

      // Clean old classes and set new one
      document.documentElement.classList.remove("${THEME.LIGHT}", "${THEME.DARK}");
      document.documentElement.classList.add(cssTheme);
      document.documentElement.setAttribute("data-theme", cssTheme);

      // Icon-mode: always light/dark/auto
      let iconMode =
        theme === "auto"
          ? "auto"
          : cssTheme === "${THEME.LIGHT}"
            ? "light"
            : "dark";

      document.documentElement.setAttribute("icon-theme", iconMode);

      // Sync URL
      if (qpKey && qpKey !== "undefined") {
        params.set(qpKey, theme);
        history.replaceState({}, "", location.pathname + "?" + params.toString());
      }
    `;

    return <script dangerouslySetInnerHTML={script} />;
  }
);
