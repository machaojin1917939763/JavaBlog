import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/blog/",
  {
    text: "个人博客",
    link:"http://120.48.18.228:8090/",
  },
  {
    text: "ChatGPT",
    link:"http://120.48.18.228:8888/chat/share?shareId=u5keipyegqs6aspkmwfcntlu",
  },
  {
    text: "技术文档",
    prefix: "/guide/",
    children: [
      {
        text: "安装文档",
        prefix: "install/",
        children: [],
      },
      {
        text: "技术博客",
        prefix: "book/",
        children: [],
      },
    ],
  },
]);
