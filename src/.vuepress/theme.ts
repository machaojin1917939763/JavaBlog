import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://machaojin.cn",

  author: {
    name: "Mr.Chaojin",
    url: "https://machaojin.cn",
    email:"ma@machaojin.cn"
  },
  fullscreen:true,

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
  iconAssets: "fontawesome-with-brands",
  // iconPrefix:"",
  logo: "/navicon/jeeweixin.ico",

  repo: "machaojin1917939763/JavaBlog",

  docsDir: "src",
  headerDepth:2,
  

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "",

  pageInfo:[
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
      // "/blog/encrypt.html": ["1234"],
    },
  },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    // You should generate and use your own comment service
    // components:{
      
    // },
    // copyCode:{},
    // feed:{},
    // seo:{},
    comment: {
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },

    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
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
        presets: ["ts", "vue"],
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
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,

    },
  },
});
