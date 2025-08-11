import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "AcGIS Pro从入门到吃土",
    icon: "/assets/icon/ArcGIS Pro.png",
    link: "/ArcGIS_Pro/",
  },
  {
    text: "WebGIS全栈开发",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Spring后端开发",
        icon: "pen-to-square",
        prefix: "spring/",
        children: [
          { text: "依赖注入", icon: "pen-to-square", link: "1" },
          { text: "面向切面编程", icon: "pen-to-square", link: "2" },
          "3",
          "4",
          { text: "Spring Boot", 
            icon: "pen-to-square", 
            link: "https://www.cainiaojc.com/springboot/springboot-tutorial.html" 
          },
        ],
      },
      {
        text: "Vue前端开发",
        icon: "pen-to-square",
        prefix: "vue3/",
        children: [
          {
            text: "路由",
            icon: "icon-park-outline:link",
            link: "1",
          },
          {
            text: "何谓组件式开发",
            icon: "pen-to-square",
            link: "2",
          },
          "3",
          "4",
          { text: "Vue3", 
            icon: "pen-to-square", 
            link: "https://cn.vuejs.org/guide/introduction.html" 
          },
        ],
      },
      { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
  },
  {
    text: "项目经历",
    icon: "book",
    link: "/projectAction/",
    prefix: "/projectAction/",
    children: [
      { text: "湖泊水华遥感数据分析系统", icon: "/assets/icon/遥感.png", link: "shygfx" },
      ]
  },

  {
    text: "个人档案",
    icon: "newspaper",
    link: "/intro",
  },
]);
