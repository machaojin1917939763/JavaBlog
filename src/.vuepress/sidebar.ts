import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Java面经",
      icon: "laptop-code",
      prefix: "blog/",
      link: "blog/",
      collapsible:true,
      children: "structure",
    },
    {
      text: "面试真题",
      icon: "book",
      prefix: "interview/",
      collapsible:true,
      children: "structure",
    },
    {
      text: "力扣代码",
      icon: "book",
      prefix: "code/",
      collapsible:true,
      children: "structure",
    },
    {
      text: "技术文档",
      icon: "book",
      prefix: "guide/",
      collapsible:true,
      children: "structure",
    },
  ],
});
