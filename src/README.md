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

::: vue-playground 在线代码

@file PASS.vue

```vue
<template>
  <div id="app">
    <div class="box" v-bind:style="{ background: gradient }">
      <div class="text">给我个offer吧，球球了!</div>
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

```card
title: 深信服
desc: 已意向，等offer，已offer
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(253, 230, 138, 0.15)
```

```flow
st=>start: 笔试
yi=>operation: 一面
er=>operation: 二面
san=>operation: 三面
hr=>operation: HR面
yx=>operation: 意向
offer=>operation: offer
e=>end: 结束
st->yi
yi->er
er->san
san->hr
hr->yx
yx->offer
offer->e
```

```card
title: 掌阅科技
desc:  等捞         
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(192, 57, 43, 0.8)```
```

```flow
st=>start: 笔试
st->yi
```

```card
title: 贝壳找房
desc: 非常想去，等捞
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(230, 126, 34, 0.8)
```

```flow
st=>start: 想去
st->yi
```

```card
title: 金蝶
desc: 笔试结束    
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(46, 134, 193, 0.8)
```



```flow
st=>start: 笔试
st->yi
```



```card
title: 赛意
desc: 统计信息       
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(39, 174, 96, 0.8)
```

```flow
st=>start: 统计信息
e=>end: 结束
st->e
```

```card
title: 数字马力
desc: 等待笔试         
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(155, 89, 182, 0.8)
```

```flow
st=>start: 笔试
st->yi
```



```card
title: 百融云创
desc: 笔试结束       
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(243, 156, 18, 0.8)
```



```flow
st=>start: 笔试
st->yi
```



```card
title: 特来电
desc: 待约一面     
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(52, 152, 219, 0.8)
```



```flow
st=>start: 笔试
yi=>operation: 待约一面
st->yi
```



```card
title: 同程旅行
desc: 待约一面   
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(231, 76, 60, 0.8)
```

```flow
st=>start: 笔试
yi=>operation: 待约一面
st->yi
```



```card
title: 掌上先机
desc: 笔试结束      
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(46, 204, 113, 0.8)
```



```flow
st=>start: 笔试
yi=>operation: 一面结束
st->yi
```



```card
title: 百度
desc: 待笔试           
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(46, 204, 113, 0.8)
```

```flow
st=>start: 笔试未开始
st->yi
```



```card
title: CVTE
desc: 一面通过，待二面
logo: https://message-stack.oss-cn-beijing.aliyuncs.com/halo/%E5%A4%B4%E5%83%8F.png
color: rgba(46, 204, 113, 0.8)
```

```flow
st=>start: 笔试
yi=>operation: 一面结束
er=>operation: 待约二面
st->yi
```

