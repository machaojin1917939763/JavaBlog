import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { componentsPlugin } from "vuepress-plugin-components";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { seoPlugin } from "vuepress-plugin-seo2";
import { removeHtmlExtensionPlugin } from 'vuepress-plugin-remove-html-extension'
import { feedPlugin } from "vuepress-plugin-feed2";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
import { commentPlugin } from "vuepress-plugin-comment2";
import { iconifyPlugin } from 'vuepress-plugin-iconify'


export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JavaBlog",
  description: "",

  theme,
  plugins: [
    iconifyPlugin(),
    commentPlugin({
      // 插件选项
      repo: "machaojin1917939763/machaojin1917939763.github.io",
      repoId: "R_kgDOKFJsOg",
      category: "Announcements",
     categoryId: "DIC_kwDOKFJsOs4CYe_S",
    }),
    externalLinkIconPlugin({
      // 配置项
    }),
    googleAnalyticsPlugin({
      // 配置项
      id:""
    }),
    feedPlugin({
      // 插件选项
      hostname:"https://machaojin.cn"
    }),
    seoPlugin({
      // 你的选项
    hostname:"https://machaojin.cn"
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
      appId: '<APP_ID>',
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
      },
    }),
    readingTimePlugin({
      // 你的选项
    }),
    autoCatalogPlugin({
      //插件选项
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
