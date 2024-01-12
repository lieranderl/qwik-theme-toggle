import { useOnDocument, $, component$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

export type ThemesType = "light" | "dark";
export type ThemeAutoType = "auto";
export type ThemesWithAutoType = ThemesType | ThemeAutoType;
export const THEME: {
  LIGHT: ThemesType;
  DARK: ThemesType;
  AUTO: ThemeAutoType;
} = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
};

export const setThemeTailwind = (theme: ThemesType) => {
  if (theme === THEME.DARK) {
    document.documentElement.classList.remove(`${THEME.LIGHT}`);
    document.documentElement.classList.add(`${THEME.DARK}`);
  }
  if (theme === THEME.LIGHT) {
    document.documentElement.classList.remove(`${THEME.DARK}`);
    document.documentElement.classList.add(`${THEME.LIGHT}`);
  }
};

export const setThemeDaisyUI = (theme: ThemesType) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const mediaQueryList = isBrowser
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : null;

export const colorSchemeChangeHandler = (e: MediaQueryListEvent) => {
  if (e.matches) {
    setThemeDaisyUI(THEME.DARK);
    setThemeTailwind(THEME.DARK);
  } else {
    setThemeDaisyUI(THEME.LIGHT);
    setThemeTailwind(THEME.LIGHT);
  }
};

export const mediaQuerySubsHandler = (theme: ThemesWithAutoType) => {
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
        function isThemeModesWithAuto(
          theme: string,
        ): theme is ThemesWithAutoType {
          return (
            theme === THEME.LIGHT ||
            theme === THEME.DARK ||
            theme === THEME.AUTO
          );
        }
        if (themePref && isThemeModesWithAuto(themePref)) {
          mediaQuerySubsHandler(themePref);
        }
      }),
    );
    const themeScript = `
      let themePref = localStorage.getItem('${themeStorageKey}');
      if (!themePref) {
        localStorage.setItem('${themeStorageKey}', '${THEME.AUTO}');
        themePref = '${THEME.AUTO}';
      }
      const attrTheme = themePref && themePref=== '${THEME.AUTO}' ? (window.matchMedia('(prefers-color-scheme: ${THEME.DARK})').matches ? '${THEME.DARK}' : '${THEME.LIGHT}') : themePref;
      document.documentElement.setAttribute('data-theme', attrTheme);
      document.documentElement.setAttribute('icon-theme', themePref || '${THEME.AUTO}');
      document.documentElement.classList.add(attrTheme);`;
    return <script dangerouslySetInnerHTML={themeScript} />;
  },
);
