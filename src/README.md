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
    link: http://120.48.18.228:3000/
 
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

::: vue-playground Vue 交互演示

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("OK,YOU PASSED!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::
