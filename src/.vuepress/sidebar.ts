import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "AcGIS Pro从入门到吃土",
      icon: "laptop-code",
      prefix: "ArcGIS_Pro/",
      link: "ArcGIS_Pro/",
      children: "structure",
    },
    {
      text: "WebGIS全栈开发",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "项目实战",
      icon: "book",
      prefix: "projectAction/",
      children: "structure",
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
  ],
});
