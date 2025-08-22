import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "AcGIS Pro从入门到吃土",
    icon: "/assets/icon/ArcGIS Pro.png",
    link: "/ArcGIS_Pro/",
    children: [
      { text: "ArcGIS Pro开发文档", 
        icon: "book-open",
        link: "https://pro.arcgis.com/zh-cn/pro-app/latest/get-started/get-started.htm" },
    ],
  },
  {
    text: "WebGIS全栈开发",
    icon: "/assets/icon/WebGIS-A.png",
    prefix: "/posts/",
    children: [
      {
        text: "Spring后端开发",
        icon: "mdi:server",
        prefix: "spring/",
        children: [
          { text: "依赖注入", icon: "pen-to-square", link: "1" },
          { text: "面向切面编程", icon: "mdi:aspect-ratio", link: "2" },
          { text: "Bean的管理", icon: "/assets/icon/bean.png", link: "3"},
          { text: "SpringBoot入门", icon: "/assets/icon/springboot.png",link: "4"},
          { text: "Spring Boot开发文档", 
            icon: "book-open", 
            link: "https://www.cainiaojc.com/springboot/springboot-tutorial.html" 
          },
        ],
      },
      {
        text: "Vue前端开发",
        icon: "mdi:web",
        prefix: "vue3/",
        children: [
          {
            text: "Vue简介",
            icon: "/assets/icon/Vue.png",
            link: "1",
          },
          {
            text: "何谓组件式开发",
            icon: "mdi:puzzle",
            link: "2",
          },
          "3",
          "4",
          { text: "Vue3开发文档", 
            icon: "book-open", 
            link: "https://cn.vuejs.org/guide/introduction.html" 
          },
        ],
      },
      { text: "Maven快速入门", icon: "/assets/icon/maven.png", link: "Maven" },
      { text: "TypeScript", icon: "/assets/icon/typescript.png", link: "TypeScript" },
      { text: "Geoserver", icon: "/assets/icon/GeoServer.png", link: "Geoserver" },
      { text: "SQL", icon: "mdi:database", link: "SQL" },
    ],
  },
  {
    text: "项目经历",
    icon: "book",
    link: "/projectAction/",
    prefix: "/projectAction/",
    children: [
      { text: "湖泊水华遥感数据分析系统", icon: "/assets/icon/遥感.png", link: "shygfx" },
      { text: "湖泊生态预警管理系统", icon: "/assets/icon/河流湖泊.png", link: "hpstyj" },
      ]
  },

  {
    text: "个人档案",
    icon: "newspaper",
    link: "/intro",
  },
]);