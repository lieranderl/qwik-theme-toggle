import { useOnDocument, $, component$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

export type ThemeNameType = "light" | "dark";

export const THEME_MODES = { LIGHT: "light", DARK: "dark", AUTO: "auto" };

export const setThemeTailwind = (theme: ThemeNameType) => {
  if (theme === "dark") {
    document.documentElement.classList.remove(`${THEME_MODES.LIGHT}`);
    document.documentElement.classList.add(`${THEME_MODES.DARK}`);
  }
  if (theme === "light") {
    document.documentElement.classList.remove(`${THEME_MODES.DARK}`);
    document.documentElement.classList.add(`${THEME_MODES.LIGHT}`);
  }
};

export const setThemeDaisyUI = (theme: ThemeNameType) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const mediaQueryList = isBrowser
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : null;

export const colorSchemeChangeHandler = (e: MediaQueryListEvent) => {
  if (e.matches) {
    setThemeDaisyUI(THEME_MODES.DARK as ThemeNameType);
    setThemeTailwind(THEME_MODES.DARK as ThemeNameType);
  } else {
    setThemeDaisyUI(THEME_MODES.LIGHT as ThemeNameType);
    setThemeTailwind(THEME_MODES.LIGHT as ThemeNameType);
  }
};

export const mediaQuerySubsHandler = (theme: ThemeNameType & "auto") => {
  if (mediaQueryList) {
    if (theme === "auto") {
      mediaQueryList.addEventListener("change", colorSchemeChangeHandler);
    } else {
      mediaQueryList.removeEventListener("change", colorSchemeChangeHandler);
    }
  }
};

export type ThemeScriptProps = {
  themeStorageKey: string;
};
export const ThemeScript = component$(
  ({ themeStorageKey }: ThemeScriptProps) => {
    useOnDocument(
      "DOMContentLoaded",
      $(() => {
        const themePref = localStorage.getItem(themeStorageKey);
        if (themePref) {
          mediaQuerySubsHandler(themePref as ThemeNameType & "auto");
        }
      }),
    );
    const themeScript = `
      const themePref = localStorage.getItem('${themeStorageKey}')
      document.documentElement
          .setAttribute('data-theme',
          themePref ??
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          );
      document.documentElement
          .setAttribute('icon-theme',
          themePref || "auto");
      document.documentElement
              .classList.add((themePref && themePref!="auto") ? themePref :
              window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');`;
    return <script dangerouslySetInnerHTML={themeScript} />;
  },
);
