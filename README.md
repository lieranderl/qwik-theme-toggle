# Qwik-Theme-Toggle Library ⚡️

The Qwik-Theme-Toggle Library is a lightweight, user-friendly JavaScript library developed as a [Qwik](https://qwik.builder.io/) component. It provides an efficient theme toggle button for web applications, enabling users to switch between light, dark, and auto modes, enhancing their browsing experience.

### Works with Tailwind CSS and DaisyUI.

Leveraging the power and flexibility of [Tailwind CSS](https://tailwindcss.com/) and its [DaisyUI](https://daisyui.com/) plugin, the library allows for a utility-first framework approach and usage of a robust UI toolkit to create aesthetically pleasing and responsive designs.

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik on GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)
- [Builder.io](https://www.builder.io/)

---

## Installation

[NPM package](https://www.npmjs.com/package/qwik-theme-toggle)

```bash
npm install qwik-theme-toggle
```

or if you use bun:

```bash
bun install qwik-theme-toggle
```

## Project Structure

Inside Qwik-Theme-Toggle project, you'll find the following directories and files:

```
└── src/
    ├── components/theme-toggle
    │              └── ...
    └── index.ts
```

- `src/components/theme-toggle`: This directory is a location for Qwik-Theme-Toggle components.

- `index.ts`: The entry point of your Qwik-Theme-Toggle library.

- `example/`: Contains an example showcasing the usage of Qwik-Theme-Toggle.

## Development

During development, Qwik-Theme-Toggle uses [Vite's development server](https://vitejs.dev/) with server-side rendering (SSR) capabilities provided by Qwik and [Bun](https://bun.sh/). Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager.

Start development:

```bash
bun install
```

```bash
bun start
```

## Production

For production, the Qwik-Theme-Toggle library should generate the production build in the `./lib` directory, along with TypeScript type definitions in `./lib-types`.

```bash
bun run build
```

## Example

Qwik-Theme-Toggle in action.

[Codesandbox](https://codesandbox.io/p/github/lieranderl/qwik-theme-toggle/main)

[![Qwik-Theme-Toggle Example Video](https://img.youtube.com/vi/51iWIiZFCQY/0.jpg)](https://www.youtube.com/watch?v=51iWIiZFCQY)

## Usage
Add `<ThemeScript />` into head

```html
 <head>
    //...
     <ThemeScript
        themeStorageKey="theme" // name of the local storage theme key
        themeQuery="theme"      // (Optional) name of the query param to reflect theme
      />
 </head>
```

Use toggle button in your code:
Set icon size and/or add your own class.

```html
<ThemeToggle
  themeStorageKey="theme"           // name of the local storage theme key
  themeQuery="theme"                // (Optional) name of the query param to reflect theme
  textSize="text-2xl"               // Size of the toggle button
  myClass={"hover:text-secondary"}  // Apply a custom class
/>
```

Install dependencies:

```bash
bun install
```

Run:

```bash
bun start
```
