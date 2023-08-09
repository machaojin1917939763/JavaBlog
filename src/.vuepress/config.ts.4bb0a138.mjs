// src/.vuepress/config.ts
import { defineUserConfig } from "vuepress";

// src/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// src/.vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";
var navbar_default = navbar([
  "/",
  "/blog/",
  {
    text: "\u6280\u672F\u6587\u6863",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "PDF",
        icon: "lightbulb",
        prefix: "bar/",
        children: []
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: []
      }
    ]
  }
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);

// src/.vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";
var sidebar_default = sidebar({
  "/": [
    "",
    {
      text: "Java\u9762\u7ECF",
      icon: "laptop-code",
      prefix: "blog/",
      link: "blog/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "\u6280\u672F\u6587\u6863",
      icon: "book",
      prefix: "guide/",
      collapsible: true,
      children: "structure"
    }
  ]
});

// src/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://machaojin.cn",
  author: {
    name: "Mr.Chaojin",
    url: "https://machaojin.cn",
    email: "ma@machaojin.cn"
  },
  fullscreen: true,
  // iconAssets: "fontawesome-with-brands",
  // iconAssets: "fontawesome",
  // // 你想要的 URL
  // iconAssets: "/base/my/font-icon/resource.js",
  // 上述内容的数组
  // iconAssets: [
  //   "/base/my/font-icon/resource.js",
  //   "https://example/my/fonr-icon/resouce.css",
  //   "fontawesome",
  // ],
  iconPrefix: "",
  print: true,
  logo: "/navicon/jeeweixin.ico",
  repo: "machaojin1917939763/JavaBlog",
  docsDir: "src",
  headerDepth: 3,
  // navbar
  navbar: navbar_default,
  // sidebar
  sidebar: sidebar_default,
  footer: "",
  // sidebar:"structure",
  pageInfo: [
    "Author",
    "Category",
    "Date",
    "Original",
    "PageView",
    "ReadingTime",
    "Word",
    "Tag"
  ],
  displayFooter: true,
  encrypt: {
    config: {
      "/blog/encrypt.html": ["1234"]
    }
  },
  // page meta
  metaLocales: {
    editLink: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
  },
  plugins: {
    // You should generate and use your own comment service
    components: {},
    copyCode: {},
    feed: {},
    seo: {},
    comment: {
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69"
    },
    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"]
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true
    }
  }
});

// src/.vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { componentsPlugin } from "vuepress-plugin-components";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
import { seoPlugin } from "vuepress-plugin-seo2";
import { removeHtmlExtensionPlugin } from "vuepress-plugin-remove-html-extension";
import { feedPlugin } from "vuepress-plugin-feed2";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
import { commentPlugin } from "vuepress-plugin-comment2";
import { iconifyPlugin } from "vuepress-plugin-iconify";
var config_default = defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "JavaBlog",
  description: "",
  theme: theme_default,
  plugins: [
    iconifyPlugin(),
    commentPlugin({
      // 插件选项
      repo: "machaojin1917939763/machaojin1917939763.github.io",
      repoId: "R_kgDOKFJsOg",
      category: "Announcements",
      categoryId: "DIC_kwDOKFJsOs4CYe_S"
    }),
    externalLinkIconPlugin({
      // 配置项
    }),
    googleAnalyticsPlugin({
      // 配置项
      id: ""
    }),
    feedPlugin({
      // 插件选项
      hostname: "https://machaojin.cn"
    }),
    seoPlugin({
      // 你的选项
      hostname: "https://machaojin.cn"
    }),
    removeHtmlExtensionPlugin(),
    backToTopPlugin(),
    copyCodePlugin({
      // 插件选项
    }),
    componentsPlugin({
      // 插件选项
    }),
    docsearchPlugin({
      appId: "<APP_ID>",
      apiKey: "<API_KEY>",
      indexName: "<INDEX_NAME>",
      locales: {
        "/": {
          placeholder: "\u641C\u7D22\u6587\u6863",
          translations: {
            button: {
              buttonText: "\u641C\u7D22\u6587\u6863"
            }
          }
        }
      }
    }),
    readingTimePlugin({
      // 你的选项
    }),
    autoCatalogPlugin({
      //插件选项
    })
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOi9WU0NvZGVQcm9qZWN0L3Z1ZXByZXNzL0Jsb2cvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVlNDb2RlUHJvamVjdFxcXFx2dWVwcmVzc1xcXFxCbG9nXFxcXHNyY1xcXFwudnVlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9WU0NvZGVQcm9qZWN0L3Z1ZXByZXNzL0Jsb2cvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSBcInZ1ZXByZXNzXCI7XG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcbmltcG9ydCB7IGF1dG9DYXRhbG9nUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1hdXRvLWNhdGFsb2dcIjtcbmltcG9ydCB7IHJlYWRpbmdUaW1lUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1yZWFkaW5nLXRpbWUyXCI7XG5pbXBvcnQgeyBkb2NzZWFyY2hQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWRvY3NlYXJjaCdcbmltcG9ydCB7IGNvbXBvbmVudHNQbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7IGNvcHlDb2RlUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1jb3B5LWNvZGUyXCI7XG5pbXBvcnQgeyBiYWNrVG9Ub3BQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWJhY2stdG8tdG9wJ1xuaW1wb3J0IHsgc2VvUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1zZW8yXCI7XG5pbXBvcnQgeyByZW1vdmVIdG1sRXh0ZW5zaW9uUGx1Z2luIH0gZnJvbSAndnVlcHJlc3MtcGx1Z2luLXJlbW92ZS1odG1sLWV4dGVuc2lvbidcbmltcG9ydCB7IGZlZWRQbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLWZlZWQyXCI7XG5pbXBvcnQgeyBnb29nbGVBbmFseXRpY3NQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWdvb2dsZS1hbmFseXRpY3MnXG5pbXBvcnQgeyBleHRlcm5hbExpbmtJY29uUGx1Z2luIH0gZnJvbSBcIkB2dWVwcmVzcy9wbHVnaW4tZXh0ZXJuYWwtbGluay1pY29uXCI7XG5pbXBvcnQgeyBjb21tZW50UGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1jb21tZW50MlwiO1xuaW1wb3J0IHsgaWNvbmlmeVBsdWdpbiB9IGZyb20gJ3Z1ZXByZXNzLXBsdWdpbi1pY29uaWZ5J1xuXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xuICBiYXNlOiBcIi9cIixcblxuICBsYW5nOiBcInpoLUNOXCIsXG4gIHRpdGxlOiBcIkphdmFCbG9nXCIsXG4gIGRlc2NyaXB0aW9uOiBcIlwiLFxuXG4gIHRoZW1lLFxuICBwbHVnaW5zOiBbXG4gICAgaWNvbmlmeVBsdWdpbigpLFxuICAgIGNvbW1lbnRQbHVnaW4oe1xuICAgICAgLy8gXHU2M0QyXHU0RUY2XHU5MDA5XHU5ODc5XG4gICAgICByZXBvOiBcIm1hY2hhb2ppbjE5MTc5Mzk3NjMvbWFjaGFvamluMTkxNzkzOTc2My5naXRodWIuaW9cIixcbiAgICAgIHJlcG9JZDogXCJSX2tnRE9LRkpzT2dcIixcbiAgICAgIGNhdGVnb3J5OiBcIkFubm91bmNlbWVudHNcIixcbiAgICAgY2F0ZWdvcnlJZDogXCJESUNfa3dET0tGSnNPczRDWWVfU1wiLFxuICAgIH0pLFxuICAgIGV4dGVybmFsTGlua0ljb25QbHVnaW4oe1xuICAgICAgLy8gXHU5MTREXHU3RjZFXHU5ODc5XG4gICAgfSksXG4gICAgZ29vZ2xlQW5hbHl0aWNzUGx1Z2luKHtcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTg3OVxuICAgICAgaWQ6XCJcIlxuICAgIH0pLFxuICAgIGZlZWRQbHVnaW4oe1xuICAgICAgLy8gXHU2M0QyXHU0RUY2XHU5MDA5XHU5ODc5XG4gICAgICBob3N0bmFtZTpcImh0dHBzOi8vbWFjaGFvamluLmNuXCJcbiAgICB9KSxcbiAgICBzZW9QbHVnaW4oe1xuICAgICAgLy8gXHU0RjYwXHU3Njg0XHU5MDA5XHU5ODc5XG4gICAgaG9zdG5hbWU6XCJodHRwczovL21hY2hhb2ppbi5jblwiXG4gICAgfSksXG4gICAgcmVtb3ZlSHRtbEV4dGVuc2lvblBsdWdpbigpLFxuICAgIGJhY2tUb1RvcFBsdWdpbigpLFxuICAgIGNvcHlDb2RlUGx1Z2luKHtcbiAgICAgIC8vIFx1NjNEMlx1NEVGNlx1OTAwOVx1OTg3OVxuICAgIH0pLFxuICAgIGNvbXBvbmVudHNQbHVnaW4oe1xuICAgICAgLy8gXHU2M0QyXHU0RUY2XHU5MDA5XHU5ODc5XG4gICAgfSksXG4gICAgZG9jc2VhcmNoUGx1Z2luKHtcbiAgICAgIGFwcElkOiAnPEFQUF9JRD4nLFxuICAgICAgYXBpS2V5OiAnPEFQSV9LRVk+JyxcbiAgICAgIGluZGV4TmFtZTogJzxJTkRFWF9OQU1FPicsXG4gICAgICBsb2NhbGVzOiB7XG4gICAgICAgICcvJzoge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgICBidXR0b25UZXh0OiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcmVhZGluZ1RpbWVQbHVnaW4oe1xuICAgICAgLy8gXHU0RjYwXHU3Njg0XHU5MDA5XHU5ODc5XG4gICAgfSksXG4gICAgYXV0b0NhdGFsb2dQbHVnaW4oe1xuICAgICAgLy9cdTYzRDJcdTRFRjZcdTkwMDlcdTk4NzlcbiAgICB9KSxcbiAgXSxcblxuICAvLyBFbmFibGUgaXQgd2l0aCBwd2FcbiAgLy8gc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L1ZTQ29kZVByb2plY3QvdnVlcHJlc3MvQmxvZy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWU0NvZGVQcm9qZWN0XFxcXHZ1ZXByZXNzXFxcXEJsb2dcXFxcc3JjXFxcXC52dWVwcmVzc1xcXFx0aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVlNDb2RlUHJvamVjdC92dWVwcmVzcy9CbG9nL3NyYy8udnVlcHJlc3MvdGhlbWUudHNcIjtpbXBvcnQgeyBob3BlVGhlbWUgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuaW1wb3J0IG5hdmJhciBmcm9tIFwiLi9uYXZiYXIuanNcIjtcbmltcG9ydCBzaWRlYmFyIGZyb20gXCIuL3NpZGViYXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgaG9wZVRoZW1lKHtcbiAgaG9zdG5hbWU6IFwiaHR0cHM6Ly9tYWNoYW9qaW4uY25cIixcblxuICBhdXRob3I6IHtcbiAgICBuYW1lOiBcIk1yLkNoYW9qaW5cIixcbiAgICB1cmw6IFwiaHR0cHM6Ly9tYWNoYW9qaW4uY25cIixcbiAgICBlbWFpbDpcIm1hQG1hY2hhb2ppbi5jblwiXG4gIH0sXG4gIGZ1bGxzY3JlZW46dHJ1ZSxcblxuICAvLyBpY29uQXNzZXRzOiBcImZvbnRhd2Vzb21lLXdpdGgtYnJhbmRzXCIsXG4gIC8vIGljb25Bc3NldHM6IFwiZm9udGF3ZXNvbWVcIixcbiAgLy8gLy8gXHU0RjYwXHU2MEYzXHU4OTgxXHU3Njg0IFVSTFxuICAvLyBpY29uQXNzZXRzOiBcIi9iYXNlL215L2ZvbnQtaWNvbi9yZXNvdXJjZS5qc1wiLFxuXG4gIC8vIFx1NEUwQVx1OEZGMFx1NTE4NVx1NUJCOVx1NzY4NFx1NjU3MFx1N0VDNFxuICAvLyBpY29uQXNzZXRzOiBbXG4gIC8vICAgXCIvYmFzZS9teS9mb250LWljb24vcmVzb3VyY2UuanNcIixcbiAgLy8gICBcImh0dHBzOi8vZXhhbXBsZS9teS9mb25yLWljb24vcmVzb3VjZS5jc3NcIixcbiAgLy8gICBcImZvbnRhd2Vzb21lXCIsXG4gIC8vIF0sXG4gIGljb25QcmVmaXg6XCJcIixcbiAgcHJpbnQ6dHJ1ZSxcbiAgbG9nbzogXCIvbmF2aWNvbi9qZWV3ZWl4aW4uaWNvXCIsXG5cbiAgcmVwbzogXCJtYWNoYW9qaW4xOTE3OTM5NzYzL0phdmFCbG9nXCIsXG5cbiAgZG9jc0RpcjogXCJzcmNcIixcbiAgaGVhZGVyRGVwdGg6MyxcbiAgXG5cbiAgLy8gbmF2YmFyXG4gIG5hdmJhcixcblxuICAvLyBzaWRlYmFyXG4gIHNpZGViYXIsXG5cbiAgZm9vdGVyOiBcIlwiLFxuICAvLyBzaWRlYmFyOlwic3RydWN0dXJlXCIsXG4gIHBhZ2VJbmZvOltcbiAgICBcIkF1dGhvclwiLFxuICAgIFwiQ2F0ZWdvcnlcIixcbiAgICBcIkRhdGVcIixcbiAgICBcIk9yaWdpbmFsXCIsXG4gICAgXCJQYWdlVmlld1wiLFxuICAgIFwiUmVhZGluZ1RpbWVcIixcbiAgICBcIldvcmRcIixcbiAgICBcIlRhZ1wiXG4gIF0sXG5cbiAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICBlbmNyeXB0OiB7XG4gICAgY29uZmlnOiB7XG4gICAgICBcIi9ibG9nL2VuY3J5cHQuaHRtbFwiOiBbXCIxMjM0XCJdLFxuICAgIH0sXG4gIH0sXG5cbiAgLy8gcGFnZSBtZXRhXG4gIG1ldGFMb2NhbGVzOiB7XG4gICAgZWRpdExpbms6IFwiXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzVcIixcbiAgfSxcblxuICBwbHVnaW5zOiB7XG4gICAgLy8gWW91IHNob3VsZCBnZW5lcmF0ZSBhbmQgdXNlIHlvdXIgb3duIGNvbW1lbnQgc2VydmljZVxuICAgIGNvbXBvbmVudHM6e1xuICAgICAgXG4gICAgfSxcbiAgICBjb3B5Q29kZTp7fSxcbiAgICBmZWVkOnt9LFxuICAgIHNlbzp7fSxcbiAgICBjb21tZW50OiB7XG4gICAgICBwcm92aWRlcjogXCJHaXNjdXNcIixcbiAgICAgIHJlcG86IFwidnVlcHJlc3MtdGhlbWUtaG9wZS9naXNjdXMtZGlzY3Vzc2lvbnNcIixcbiAgICAgIHJlcG9JZDogXCJSX2tnRE9HX1B0MkFcIixcbiAgICAgIGNhdGVnb3J5OiBcIkFubm91bmNlbWVudHNcIixcbiAgICAgIGNhdGVnb3J5SWQ6IFwiRElDX2t3RE9HX1B0Mk00Q09ENjlcIixcbiAgICB9LFxuXG4gICAgLy8gQWxsIGZlYXR1cmVzIGFyZSBlbmFibGVkIGZvciBkZW1vLCBvbmx5IHByZXNlcnZlIGZlYXR1cmVzIHlvdSBuZWVkIGhlcmVcbiAgICBtZEVuaGFuY2U6IHtcbiAgICAgIGFsaWduOiB0cnVlLFxuICAgICAgYXR0cnM6IHRydWUsXG4gICAgICBjaGFydDogdHJ1ZSxcbiAgICAgIGNvZGV0YWJzOiB0cnVlLFxuICAgICAgZGVtbzogdHJ1ZSxcbiAgICAgIGVjaGFydHM6IHRydWUsXG4gICAgICBmaWd1cmU6IHRydWUsXG4gICAgICBmbG93Y2hhcnQ6IHRydWUsXG4gICAgICBnZm06IHRydWUsXG4gICAgICBpbWdMYXp5bG9hZDogdHJ1ZSxcbiAgICAgIGltZ1NpemU6IHRydWUsXG4gICAgICBpbmNsdWRlOiB0cnVlLFxuICAgICAga2F0ZXg6IHRydWUsXG4gICAgICBtYXJrOiB0cnVlLFxuICAgICAgbWVybWFpZDogdHJ1ZSxcbiAgICAgIHBsYXlncm91bmQ6IHtcbiAgICAgICAgcHJlc2V0czogW1widHNcIiwgXCJ2dWVcIl0sXG4gICAgICB9LFxuICAgICAgcHJlc2VudGF0aW9uOiBbXCJoaWdobGlnaHRcIiwgXCJtYXRoXCIsIFwic2VhcmNoXCIsIFwibm90ZXNcIiwgXCJ6b29tXCJdLFxuICAgICAgc3R5bGl6ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1lbmRlZFwiLFxuICAgICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGlwXCIgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzdWI6IHRydWUsXG4gICAgICBzdXA6IHRydWUsXG4gICAgICB0YWJzOiB0cnVlLFxuICAgICAgdlByZTogdHJ1ZSxcbiAgICAgIHZ1ZVBsYXlncm91bmQ6IHRydWUsXG4gICAgICBcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L1ZTQ29kZVByb2plY3QvdnVlcHJlc3MvQmxvZy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWU0NvZGVQcm9qZWN0XFxcXHZ1ZXByZXNzXFxcXEJsb2dcXFxcc3JjXFxcXC52dWVwcmVzc1xcXFxuYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1ZTQ29kZVByb2plY3QvdnVlcHJlc3MvQmxvZy9zcmMvLnZ1ZXByZXNzL25hdmJhci50c1wiO2ltcG9ydCB7IG5hdmJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdmJhcihbXG4gIFwiL1wiLFxuICBcIi9ibG9nL1wiLFxuICB7XG4gICAgdGV4dDogXCJcdTYyODBcdTY3MkZcdTY1ODdcdTY4NjNcIixcbiAgICBpY29uOiBcImxpZ2h0YnVsYlwiLFxuICAgIHByZWZpeDogXCIvZ3VpZGUvXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJQREZcIixcbiAgICAgICAgaWNvbjogXCJsaWdodGJ1bGJcIixcbiAgICAgICAgcHJlZml4OiBcImJhci9cIixcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJGb29cIixcbiAgICAgICAgaWNvbjogXCJsaWdodGJ1bGJcIixcbiAgICAgICAgcHJlZml4OiBcImZvby9cIixcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICAvLyB7XG4gIC8vICAgdGV4dDogXCJWMiBcdTY1ODdcdTY4NjNcIixcbiAgLy8gICBpY29uOiBcImJvb2tcIixcbiAgLy8gICBsaW5rOiBcImh0dHBzOi8vdGhlbWUtaG9wZS52dWVqcy5wcmVzcy96aC9cIixcbiAgLy8gfSxcbl0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOi9WU0NvZGVQcm9qZWN0L3Z1ZXByZXNzL0Jsb2cvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVlNDb2RlUHJvamVjdFxcXFx2dWVwcmVzc1xcXFxCbG9nXFxcXHNyY1xcXFwudnVlcHJlc3NcXFxcc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVlNDb2RlUHJvamVjdC92dWVwcmVzcy9CbG9nL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBzaWRlYmFyKHtcbiAgXG4gIFwiL1wiOiBbXG4gICAgXCJcIixcbiAgICB7XG4gICAgICB0ZXh0OiBcIkphdmFcdTk3NjJcdTdFQ0ZcIixcbiAgICAgIGljb246IFwibGFwdG9wLWNvZGVcIixcbiAgICAgIHByZWZpeDogXCJibG9nL1wiLFxuICAgICAgbGluazogXCJibG9nL1wiLFxuICAgICAgY29sbGFwc2libGU6dHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJcdTYyODBcdTY3MkZcdTY1ODdcdTY4NjNcIixcbiAgICAgIGljb246IFwiYm9va1wiLFxuICAgICAgcHJlZml4OiBcImd1aWRlL1wiLFxuICAgICAgY29sbGFwc2libGU6dHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyx3QkFBd0I7OztBQ0FuQyxTQUFTLGlCQUFpQjs7O0FDQXhCLFNBQVMsY0FBYztBQUUxVSxJQUFPLGlCQUFRLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsVUFBVSxDQUFDO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1B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Q0Y7QUFDRixDQUFDOzs7QUQzSEQsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxzQkFBc0I7QUFDL0IsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxpQ0FBaUM7QUFDMUMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyw2QkFBNkI7QUFDdEMsU0FBUyw4QkFBOEI7QUFDdkMsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxxQkFBcUI7QUFHOUIsSUFBTyxpQkFBUSxpQkFBaUI7QUFBQSxFQUM5QixNQUFNO0FBQUEsRUFFTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFFYjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBO0FBQUEsTUFFWixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDWCxZQUFZO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCx1QkFBdUI7QUFBQTtBQUFBLElBRXZCLENBQUM7QUFBQSxJQUNELHNCQUFzQjtBQUFBO0FBQUEsTUFFcEIsSUFBRztBQUFBLElBQ0wsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBO0FBQUEsTUFFVCxVQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsSUFDRCxVQUFVO0FBQUE7QUFBQSxNQUVWLFVBQVM7QUFBQSxJQUNULENBQUM7QUFBQSxJQUNELDBCQUEwQjtBQUFBLElBQzFCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQTtBQUFBLElBRWYsQ0FBQztBQUFBLElBQ0QsaUJBQWlCO0FBQUE7QUFBQSxJQUVqQixDQUFDO0FBQUEsSUFDRCxnQkFBZ0I7QUFBQSxNQUNkLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxRQUNQLEtBQUs7QUFBQSxVQUNILGFBQWE7QUFBQSxVQUNiLGNBQWM7QUFBQSxZQUNaLFFBQVE7QUFBQSxjQUNOLFlBQVk7QUFBQSxZQUNkO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxrQkFBa0I7QUFBQTtBQUFBLElBRWxCLENBQUM7QUFBQSxJQUNELGtCQUFrQjtBQUFBO0FBQUEsSUFFbEIsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBSUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
