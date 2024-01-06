export type ThemeScriptProps = {
  themeStorageKey: string;
};
export const ThemeScript = ({ themeStorageKey }: ThemeScriptProps) => {
  const themeScript = `
      document.firstElementChild
          .setAttribute('data-theme',
              localStorage.getItem('${themeStorageKey}') ??
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          );
      document.firstElementChild
          .setAttribute('icon-theme',
              localStorage.getItem('${themeStorageKey}') || "auto");`;
  return <script dangerouslySetInnerHTML={themeScript} />;
};
