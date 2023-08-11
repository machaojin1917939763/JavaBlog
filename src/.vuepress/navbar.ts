import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/blog/",
  {
    text: "技术文档",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "PDF",
        icon: "lightbulb",
        prefix: "bar/",
        children: [],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: [],
      },
    ],
  },
  {
    text: "个人博客",
    icon: "lightbulb",
    link:"http://120.48.18.228:8090/",
    children: [],
  },
  {
    text: "ChatGPT",
    icon: "lightbulb",
    link:"http://120.48.18.228:3000/",
    children: [],
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
