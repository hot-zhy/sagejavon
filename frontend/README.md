# SageJavon Frontend

# ChatGLM Chat Interface

This project provides a Vue-based frontend for interacting with the ChatGLM API. It includes a structured component system, reusable hooks, and customizable layouts.

## Prerequisites

### 1. Add Your ChatGLM API Key

Before running the project, you need to add your API key in:

```
src/views/index.vue
```

### 2. Node.js

Make sure you have Node.js installed with version `^16 || ^18 || ^19`.

If you're using Node.js ≥ 14, you will need to install a [fetch polyfill](https://github.com/developit/unfetch#usage-as-a-polyfill).

We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage multiple Node.js versions.

Check your current version:

```
node -v
```

### 3. PNPM

If you don’t have `pnpm` installed:

```
npm install -g pnpm
```

------

## Install Dependencies

Run the following command in the project root to install dependencies:

```
pnpm install
```

------

## Project Directory Overview

### 📁 Main Folder Structure

- `api/`: Contains API request logic, usually based on Axios. Handles all interactions with backend services.
- `assets/`: Stores static resources such as images, fonts, and icons.
- `components/`: Contains reusable Vue components that can be shared across views.
- `hooks/`: Custom composition hooks for reusable logic and state handling.
- `icons/`: Stores icon resources, such as SVGs or icon fonts.
- `layouts/`: Layout-related components for structuring page templates.
- `locales/`: Files for internationalization (i18n). *(Not heavily used.)*
- `plugins/`: Vue plugin configuration files. *(Not heavily used.)*
- `router/`: Application route definitions and logic (all page routing is configured here).
- `store/`: Vuex store modules for managing global application state.
- `styles/`: Global stylesheets (CSS/SASS) and shared design variables.
- `typings/`: TypeScript definition files.
- `utils/`: Utility functions used throughout the app.
- `views/`: Page-level Vue components mapped to routes.

### 🔑 Entry Files

- `App.vue`: The root component and entry point of the application.
- `main.ts`: The initialization file for the Vue app.

------

## 📂 Detailed Structure of `src/views/`

The `src/views/` folder contains route-level components, organized by feature.

### Example: `src/views/chat/`

```
src/views/
├── chat/
│   ├── components/
│   │   ├── Header/
│   │   │   └── index.vue
│   │   ├── Message/
│   │   │   └── index.vue
│   │   └── index.ts
│   ├── hooks/
│   ├── layout/
│   └── index.vue
```

### Description:

- `chat/`: Main folder for the chat interface.
  - `components/`: Subcomponents used within the chat view.
    - `Header/`: Contains the header UI, implemented in `index.vue`.
    - `Message/`: Displays chat messages, implemented in `index.vue`.
    - `index.ts`: Serves as an export hub for all chat subcomponents.
  - `hooks/`: Custom logic hooks specific to chat behavior.
  - `layout/`: Layout templates for the chat page.
  - `index.vue`: The main chat page component.

------

## 📦 Purpose of `index.ts` in Components

The `index.ts` file inside `src/views/chat/components/` is an **entry point** that exports all internal components to simplify imports elsewhere in the project.

```
// src/views/chat/components/index.ts
export { default as Header } from './Header/index.vue';
export { default as Message } from './Message/index.vue';
```

This allows cleaner imports like:

```
import { Header, Message } from '@/views/chat/components';
```

Rather than importing each component with its full path, you can manage everything in one central file. This also makes refactoring easier — just update the `index.ts` if the structure changes.

------

Would you like me to help generate a `package.json` or add build instructions (`pnpm run dev`, etc.) as well?
