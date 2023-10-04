import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JavaBlog",
  description: "",
 // 我们假定你在使用如下多语言
 locales: {
  "/": {
    lang: "en-US",
  },
  "/zh/": {
    lang: "zh-CN",
  },
},


  theme,
  plugins: [
    searchProPlugin({
    
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
