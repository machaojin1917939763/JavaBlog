import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/blog/",
  {
    text: "个人博客",
    icon: "people",
    link:"http://120.48.18.228:8090/",
  },
  {
    text: "ChatGPT",
    icon: "engine",
    link:"http://120.48.18.228:3000/",
  },
  {
    text: "技术文档",
    icon: "launch",
    prefix: "/guide/",
    children: [
      {
        text: "安装文档",
        icon: "loop",
        prefix: "install/",
        children: [],
      },
      {
        text: "技术博客",
        icon: "result",
        prefix: "book/",
        children: [],
      },
    ],
  },
]);
