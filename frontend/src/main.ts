import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { setupI18n } from "./locales";
import { setupAssets, setupScrollbarStyle } from "./plugins";
import { setupStore } from "./store";
import { setupRouter, router } from "./router";
import "@/assets/icon-font/iconfont.css";
import "@/assets/icon-font/iconfont.css";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import i18n from "@/views/i18n.js";
import store from "@/views/store.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 预览组件以及样式
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

// Prism
import Prism from "prismjs";
// 代码高亮
import "prismjs/components/prism-json";
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});

async function bootstrap() {
  const app = createApp(App);
  app.use(VMdPreview);
  app.use(ElementPlus);
  app.use(VueViewer);
  app.use(store);
  await setupRouter(app);

  router.beforeEach((to, from, next) => {
    if (window._hmt) {
      window._hmt.push(["_trackPageview", "/#" + to.fullPath]);
    }
    next();
  });

  app.use(i18n);
  app.use(createPinia());

  setupAssets();

  setupScrollbarStyle();

  setupStore(app);

  setupI18n(app);

  app.mount("#app");
}

bootstrap();
