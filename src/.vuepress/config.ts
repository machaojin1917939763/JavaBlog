import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/machaojin1917939763/",

  lang: "zh-CN",
  title: "JavaBlog",
  description: "",



  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
