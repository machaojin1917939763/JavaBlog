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
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
