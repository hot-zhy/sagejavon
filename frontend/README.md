## 前置要求

在src/views/index.vue中添加你的chatGLM api key

### Node

`node` 需要 `^16 || ^18 || ^19` 版本（`node >= 14` 需要安装 [fetch polyfill](https://github.com/developit/unfetch#usage-as-a-polyfill)），使用 [nvm](https://github.com/nvm-sh/nvm) 可管理本地多个 `node` 版本

```shell
node -v
```

### PNPM
如果你没有安装过 `pnpm`
```shell
npm install pnpm -g
```


## 安装依赖


＃ 目录结构解释

## 目录和文件说明

- `api/`：存放与后端交互的接口请求相关文件，一般用于封装 Axios 请求。
- `assets/`：存放项目中使用的静态资源文件，如图片、字体等。
- `components/`：存放项目中的公共组件，这些组件可以在不同的视图中复用。
- `hooks/`：存放自定义的钩子函数，用于抽离和复用逻辑。
- `icons/`：存放项目中使用的图标文件，可以是 SVG 图标或其他图标资源。
- `layouts/`：存放布局相关的组件，一般用于定义页面的整体布局结构。
- `locales/`：存放国际化相关的文件，一般用于存放不同语言的翻译文件。(不咋用)
- `plugins/`：存放插件相关文件，一般用于引入和配置 Vue 插件。(不咋用)
- `router/`：存放路由配置文件，用于定义项目的路由规则。(页面路由切换都在这里写)
- `store/`：存放 Vuex 状态管理相关文件，用于集中管理应用的状态。
- `styles/`：存放全局样式文件和变量，通常包含全局 CSS、SASS 文件等。
- `typings/`：存放 TypeScript 类型声明文件，用于定义项目中使用的类型。
- `utils/`：存放工具函数，包含一些通用的辅助函数。
- `views/`：存放视图组件，对应路由的各个页面组件。(主要是这个下面的，对应着各个页面和组件)
- `App.vue`：根组件，是整个应用的入口组件。
- `main.ts`：入口文件，负责初始化 Vue 实例并挂载应用

# `src/views/` 目录结构

`src/views/` 目录存放的是视图组件，具体的目录结构如下：

```python
src/views/
├── chat/
│ ├── components/
│ │ ├── Header/
│ │ │ └── index.vue
│ │ ├── Message/
│ │ │ └── index.vue
│ │ └── index.ts
│ ├── hooks/
│ ├── layout/
│ └── index.vue
```

## 目录说明

- `src/views/chat/`：存放与聊天视图相关的组件和文件。
  - `components/`：存放聊天视图的子组件。
    - `Header/`：存放头部组件，`index.vue` 是头部组件的具体实现。
    - `Message/`：存放消息组件，`index.vue` 是消息组件的具体实现。
    - `index.ts`：组件的入口文件，用于统一导出所有子组件。
  - `hooks/`：存放与聊天视图相关的自定义钩子函数。
  - `layout/`：存放与聊天视图相关的布局组件。
  - `index.vue`：聊天视图的主组件文件。

## `index.ts` 的作用

`index.ts` 文件是 `src/views/chat/components/` 目录下的入口文件，主要作用是集中导出该目录下的所有组件，以便在其他地方引入时更加方便和统一。

```typescript
// src/views/chat/components/index.ts

export { default as Header } from './Header/index.vue';
export { default as Message } from './Message/index.vue';
```
通过这个文件，可以在其他文件中统一引入 Header 和 Message 组件，而不需要分别去指定具体的路径。这有助于简化导入路径，并且当组件结构发生变化时，只需要修改这个入口文件即可。

// 其他文件中的导入示例
```typescript
import { Header, Message } from '@/views/chat/components';
```

我们在写components时都统一这样写


