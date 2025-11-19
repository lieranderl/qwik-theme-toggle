import {
  $, component$, useSignal, useStyles$, useOnDocument
} from "@builder.io/qwik";

import {
  createThemeConfig,
  subscribeAutoMode,
  unsubscribeAutoMode,
} from "./theme-script";

import type { ThemeScriptProps } from "./theme-script";

import { HiMoonSolid, HiSunSolid } from "@qwikest/icons/heroicons";
import styles from "./themeicon.css?inline";

export const ThemeToggle = component$(
  ({
    themeStorageKey,
    themeQuery,
    textSize,
    myClass,
    lightTheme,
    darkTheme,
  }: ThemeScriptProps & { textSize: string; myClass?: string }) => {

    const THEME = createThemeConfig(lightTheme, darkTheme);
    const modeSignal = useSignal<string>("auto");

    useStyles$(styles);

    // Restore stored theme before toggle renders
    useOnDocument(
      "DOMContentLoaded",
      $(() => {
        const stored = localStorage.getItem(themeStorageKey) ?? "auto";
        modeSignal.value = stored;
      })
    );

    const applyTheme = $((mode: string) => {
      localStorage.setItem(themeStorageKey, mode);

      unsubscribeAutoMode();

      let cssTheme = mode;
      if (mode === "auto") {
        cssTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? THEME.DARK
          : THEME.LIGHT;

        subscribeAutoMode(THEME);
      }

      // Reset and apply ONE single class
      document.documentElement.classList.remove(THEME.LIGHT, THEME.DARK);
      document.documentElement.classList.add(cssTheme);
      document.documentElement.setAttribute("data-theme", cssTheme);

      // Icon mode must be only light/dark/auto
      let iconMode =
        mode === "auto"
          ? "auto"
          : cssTheme === THEME.LIGHT
            ? "light"
            : "dark";

      document.documentElement.setAttribute("icon-theme", iconMode);

      if (themeQuery && themeQuery !== "undefined") {
        const params = new URLSearchParams(location.search);
        params.set(themeQuery, mode); // mode = css theme name
        history.replaceState({}, "", location.pathname + "?" + params.toString());
      }
    });

    const toggle = $(() => {
      const current = modeSignal.value;

      let next =
        current === THEME.LIGHT ? THEME.DARK :
        current === THEME.DARK  ? "auto" :
                                  THEME.LIGHT;

      modeSignal.value = next;
      applyTheme(next);
    });

    return (
      <div
        class={`toggle-button ${textSize} ${myClass ?? ""}`}
        onClick$={toggle}
      >
        <div class="sun"><HiSunSolid /></div>
        <div class="moon"><HiMoonSolid /></div>
        <div class="auto"><AutoIcon /></div>
      </div>
    );
  }
);

const AutoIcon = component$(() => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
    <path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z" />
  </svg>
));
