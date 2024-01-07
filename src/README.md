---
home: true
icon: home
title: 项目主页
heroImage: /blog_head_logo.gif
heroText: OK,YOU PASSED!
tagline: ✨每星期更新一次站点，记录秋招的点点滴滴，更多信息请关注个人博客✨
actions:
  - text: 个人博客
    link: http://120.48.18.228:8090/
    type: primary

  - text: 面试指南
    link: ./blog/

  - text: 技术文档
    link: ./guide/

  - text: ChatGPT
    link: http://120.48.18.228:8888/chat/share?shareId=u5keipyegqs6aspkmwfcntlu
 
features:
  - title: 抖音
    icon: /othericon/douyin.svg
    link: https://www.douyin.com/

  - title: Gitee
    icon: /othericon/gitee.svg
    link: https://www.gitee.com/

  - title: 哔哩哔哩
    icon: /othericon/bilibili.svg
    link: https://www.bilibili.com/

  - title: LeetCode
    icon: /othericon/leetcode.svg
    link: https://leetcode.cn/
---

::: vue-playground 在线代码

@file PASS.vue

```vue
<template>
  <div id="app">
    <div class="box" v-bind:style="{ background: gradient }">
      <div class="text">欢迎！</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      gradient: "linear-gradient(red, blue)",
    };
  },
  mounted() {
    // 每隔两秒就调用changeGradient方法
    setInterval(this.changeGradient, 2000);
  },
  methods: {
    changeGradient() {
      // 随机生成两个十六进制颜色
      let randomColor1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
      let randomColor2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
      // 创建一个线性渐变的背景
      this.gradient = `linear-gradient(${randomColor1}, ${randomColor2})`;
    },
  },
};
</script>

<style>
.box {
  width: 100vw;
  height: 100vh;
}

.text {
  font-size: 24px;
  text-align: center;
  vertical-align: middle;
  line-height: 100vh;
  overflow: hidden;
  white-space: nowrap;
}
</style>

```

:::
