import { defineUserConfig } from "vuepress";
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'
import { getDirname, path } from "vuepress/utils";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({

  
  lang: "zh-CN",
  title: "带着黄昏出逃",
  description: "带着黄昏出逃 的博客演示",

  theme,
 
  // 和 PWA 一起启用
  // shouldPrefetch: false,

  alias: {
    "@PostList": path.resolve(__dirname, "components/PostList.vue"),
    "@PostCard": path.resolve(__dirname, "components/PostCard.vue"),
    "@SearchablePostList": path.resolve(__dirname, "components/SearchablePostList.vue"),

  },
});
