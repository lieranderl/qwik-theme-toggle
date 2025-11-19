# Qwik-Theme-Toggle

**Qwik-Theme-Toggle** is a lightweight, zero‑flicker, SSR‑safe theme toggler built as a [Qwik](https://qwik.builder.io/) component.

It supports:

- Custom CSS themes (e.g., `latte`, `dracula`)
- Auto mode with OS preference detection
- DaisyUI & Tailwind compatibility
- Icon modes (`light`, `dark`, `auto`)
- URL query param sync (optional)
- LocalStorage persistence
- SSR hydration consistency

---

## Installation

```bash
npm install qwik-theme-toggle
# or
bun install qwik-theme-toggle
```

---

## Usage

### 1. Add ThemeScript inside `<head>`

```tsx
<ThemeScript
  themeStorageKey="theme"
  themeQuery="theme"     // optional
  lightTheme="latte"     // optional, default: 'light'
  darkTheme="dracula"    // optional, default: 'dark'
/>
```

### 2. Add ThemeToggle anywhere in your UI

```tsx
<ThemeToggle
  themeStorageKey="theme"
  themeQuery="theme"               // optional
  lightTheme="latte"               // optional, default: 'light'
  darkTheme="dracula"              // optional, default: 'dark'
  textSize="text-3xl"
  myClass="hover:text-secondary"
/>
```

---

## How it works

### LocalStorage stores CSS theme:

```
latte | dracula | auto
```

### HTML is always consistent:

```
<html
  class="latte"
  data-theme="latte"
  icon-theme="light"
/>
```

`icon-theme` is **always**:

```
light | dark | auto
```

Auto mode resolves OS preference:

```
auto → latte (light OS)
auto → dracula (dark OS)
```

---

## Project Structure

```
src/
 ├── components/theme-toggle/
 └── index.ts
example/
```

---

## Development

```bash
bun install
bun start
```

## Production Build

```bash
bun run build
```

Outputs:

- `lib/` — compiled library
- `lib-types/` — TypeScript definitions

---

## Live Demo

Codesandbox: https://codesandbox.io/p/github/lieranderl/qwik-theme-toggle/main  
Video demo: https://www.youtube.com/watch?v=51iWIiZFCQY
