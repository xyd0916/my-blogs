import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({


  lang: "zh-CN",
  title: "带着黄昏出逃",
  description: "带着黄昏出逃 的博客演示",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
