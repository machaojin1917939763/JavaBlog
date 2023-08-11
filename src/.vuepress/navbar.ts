import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/blog/",
  {
    text: "个人博客",
    icon: "lightbulb",
    link:"http://120.48.18.228:8090/",
  },
  {
    text: "ChatGPT",
    icon: "lightbulb",
    link:"http://120.48.18.228:3000/",
  },
  {
    text: "技术文档",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "待更新",
        icon: "lightbulb",
        prefix: "bar/",
        children: [],
      },
      {
        text: "待更新",
        icon: "lightbulb",
        prefix: "foo/",
        children: [],
      },
    ],
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
