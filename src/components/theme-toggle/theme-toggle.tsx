import {
  component$,
  useSignal,
  useVisibleTask$,
  $,
  useStyles$,
} from "@builder.io/qwik";
import { ThemeScriptProps } from "./theme-script";
import { HiSunSolid, HiMoonSolid } from "@qwikest/icons/heroicons";
import styles from "./themeicon.css?inline";

export const THEME_MODES = { LIGHT: "light", DARK: "dark", AUTO: "auto" };

export type ThemeToggleProps = {
  textSize: string;
};

export const ThemeToggle = component$(
  ({ themeStorageKey, textSize }: ThemeScriptProps & ThemeToggleProps) => {
    const selectedIcon = useSignal(THEME_MODES.AUTO);
    useStyles$(styles);

    const handleThemeToggle$ = $(async () => {
      let dataTheme: string = "";
      const themeModeValue =
        localStorage.getItem(themeStorageKey) || THEME_MODES.AUTO;
      console.log("themeModeValue:", themeModeValue);
      if (themeModeValue !== undefined) {
        if (themeModeValue === THEME_MODES.AUTO) {
          dataTheme = THEME_MODES.DARK;
          selectedIcon.value = THEME_MODES.DARK;
        } else if (themeModeValue === THEME_MODES.DARK) {
          dataTheme = THEME_MODES.LIGHT;
          selectedIcon.value = THEME_MODES.LIGHT;
        } else if (themeModeValue === THEME_MODES.LIGHT) {
          selectedIcon.value = THEME_MODES.AUTO;
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            dataTheme = THEME_MODES.DARK;
          } else {
            dataTheme = THEME_MODES.LIGHT;
          }
        }
      }
      localStorage.setItem(themeStorageKey, selectedIcon.value);
      document.documentElement.setAttribute("icon-theme", selectedIcon.value);
      document.documentElement.setAttribute("data-theme", `${dataTheme}`);
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (selectedIcon.value === THEME_MODES.AUTO) {
            if (e.matches) {
              document.documentElement.setAttribute(
                "data-theme",
                `${THEME_MODES.DARK}`,
              );
            } else {
              document.documentElement.setAttribute(
                "data-theme",
                `${THEME_MODES.LIGHT}`,
              );
            }
          }
        });
    });

    return (
      <div>
        <div
          class={`toggle-button h-[1em] w-[1em] p-1 ${textSize}`}
          onClick$={handleThemeToggle$}
        >
          <div class="sun">
            <HiSunSolid />
          </div>
          <div class="moon">
            <HiMoonSolid />
          </div>
          <div class="auto">
            <AutoIcon />
          </div>
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
