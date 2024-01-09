import { component$, useSignal, $, useStyles$, Signal } from "@builder.io/qwik";
import {
  THEME,
  ThemeScriptProps,
  ThemesType,
  ThemesWithAutoType,
  mediaQuerySubsHandler,
  setThemeDaisyUI,
  setThemeTailwind,
} from "./theme-script";
import { HiSunSolid, HiMoonSolid } from "@qwikest/icons/heroicons";
import styles from "./themeicon.css?inline";

export type ThemeToggleProps = {
  textSize: string;
  myClass?: string;
};

export const ThemeToggle = component$(
  ({ themeStorageKey, textSize, myClass }: ThemeScriptProps & ThemeToggleProps) => {
    const selectedIcon: Signal<ThemesWithAutoType> = useSignal(THEME.AUTO);
    useStyles$(styles);

    const ApplyTheme = $(
      (
        themeStorageKey: string,
        icon: ThemesWithAutoType,
        theme: ThemesType,
      ) => {
        // save theme in localstorage
        localStorage.setItem(themeStorageKey, icon);
        //daisyui
        document.documentElement.setAttribute("icon-theme", icon);
        setThemeDaisyUI(theme);
        //tailwind
        setThemeTailwind(theme);
        //mediaQuery Subscribtion handler
        mediaQuerySubsHandler(icon);
      },
    );

    const handleThemeToggle$ = $(async () => {
      let dataTheme: ThemesType = THEME.LIGHT;
      const themeModeValue =
        localStorage.getItem(themeStorageKey) || THEME.AUTO;
      // toggle logic on click
      if (themeModeValue === THEME.AUTO) {
        dataTheme = THEME.DARK;
        selectedIcon.value = THEME.DARK;
      } else if (themeModeValue === THEME.DARK) {
        dataTheme = THEME.LIGHT;
        selectedIcon.value = THEME.LIGHT;
      } else if (themeModeValue === THEME.LIGHT) {
        selectedIcon.value = THEME.AUTO;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          dataTheme = THEME.DARK;
        } else {
          dataTheme = THEME.LIGHT;
        }
      }
      ApplyTheme(themeStorageKey, selectedIcon.value, dataTheme);
    });

    return (
      <div
        class={`toggle-button h-[1em] w-[1em] p-1 ${textSize} ${myClass}`}
        onClick$={handleThemeToggle$}
      >
        <div class="sun">
          <HiSunSolid />
        </div>
        <div class="moon">
          <HiMoonSolid />
        </div>
        <div class="auto fill-current">
          <AutoIcon />
        </div>
      </div>
    );
  },
);

export const AutoIcon = component$(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em">
      <path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"></path>
    </svg>
  );
});
