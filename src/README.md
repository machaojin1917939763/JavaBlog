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
  <canvas id="canvas" ></canvas>
</template>

<script>
    export default {
        name: "BackCanvas",
        props: {
            height: {
                type: Number,
                default: 500
            }
        },
        data() {
            return {
                settings: {
                    COL_WIDTH: 15,
                    COL_HEIGHT: 15,
                    // 速度参数 最小值:4 - 最大值:8
                    VELOCITY_PARAMS: {
                        min: 3,
                        max: 8
                    },
                    // 代码长度参数  最小值 20  - 最大值 40
                    CODE_LENGTH_PARAMS: {
                        min: 20,
                        max: 40
                    }
                },
                animation: null,
                c: null,
                ctx: null,
                lineC: null,
                ctx2: null,
                WIDTH: window.innerWidth,
                HEIGHT: window.innerHeight,
                COLUMNS: null,
                canvii: [],
                // font from here https://www.dafont.com/matrix-code-nfi.font
                font: '24px matrix-code',
                letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'this', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '+', '-', '*', '/', '=', '%', '"', '\'', '#', '&', '_', '(', ')', ',', '.', ';', ':', '?', '!', '\\', '|', '{', '}', '<', '>', '[', ']', '^', '~'],
                codes: [],
                createCodeLoop: null,
                codesCounter: 0
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init () {
                this.c = document.getElementById( 'canvas' );
                this.ctx = this.c.getContext( '2d' );
                this.c.width = this.WIDTH;
                this.c.height = this.HEIGHT;

                this.ctx.shadowBlur = 0;
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                this.ctx.font = this.font;

                this.COLUMNS = Math.ceil(this.WIDTH / this.settings.COL_WIDTH);

                for (let i = 0; i < this.COLUMNS; i++) {
                    this.codes[i] = [];
                    this.codes[i][0] = {
                        'open': true,
                        'position': {'x': 0, 'y': 0},
                        'strength': 0
                    };
                }

                this.loop();

                this.createLines();

                this.createCode();

                window.onresize = function () {
                    window.cancelAnimationFrame(this.animation);
                    this.animation = null;
                    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                    this.codesCounter = 0;

                    this.ctx2.clearRect(0, 0, this.WIDTH, this.HEIGHT);

                    this.WIDTH = window.innerWidth;
                    this.HEIGHT = window.innerHeight;
                    this.init();
                };
            },
            loop () {
                this.animation = requestAnimationFrame( () => { this.loop(); } );
                this.draw();
            },
            draw () {
                let velocity, height, x, y, c, ctx;
                // slow fade BG colour
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                this.ctx.globalCompositeOperation = 'source-over';
                for (let i = 0; i < this.COLUMNS; i++) {
                    if (this.codes[i][0].canvas) {
                        velocity = this.codes[i][0].velocity;
                        height = this.codes[i][0].canvas.height;
                        x = this.codes[i][0].position.x;
                        y = this.codes[i][0].position.y - height;
                        c = this.codes[i][0].canvas;
                        ctx = c.getContext('2d');

                        this.ctx.drawImage(c, x, y, this.settings.COL_WIDTH, height);

                        if ((this.codes[i][0].position.y - height) < this.HEIGHT){
                            this.codes[i][0].position.y += velocity;
                        } else {
                            this.codes[i][0].position.y = 0;
                        }
                    }
                }
            },
            createCode () {
                if (this.codesCounter > this.COLUMNS) {
                    clearTimeout(this.createCodeLoop);
                    return;
                }
                let randomInterval = this.randomFromInterval(0, 100);
                let column = this.assignColumn();
                if (column) {
                    let codeLength = this.randomFromInterval(this.settings.CODE_LENGTH_PARAMS.min, this.settings.CODE_LENGTH_PARAMS.max);
                    let codeVelocity = (Math.random() * (this.settings.VELOCITY_PARAMS.max - this.settings.VELOCITY_PARAMS.min)) + this.settings.VELOCITY_PARAMS.min;
                    let lettersLength = this.letters.length;

                    this.codes[column][0].position = {'x': (column * this.settings.COL_WIDTH), 'y': 0};
                    this.codes[column][0].velocity = codeVelocity;
                    this.codes[column][0].strength = this.codes[column][0].velocity / this.settings.VELOCITY_PARAMS.max;

                    for (let i = 1; i <= codeLength; i++) {
                        let newLetter = this.randomFromInterval(0, (lettersLength - 1));
                        this.codes[column][i] = this.letters[newLetter];
                    }

                    this.createCanvii(column);

                    this.codesCounter++;
                }
                this.createCodeLoop = setTimeout(this.createCode, randomInterval);

            },
            createCanvii (i) {
                let codeLen = this.codes[i].length - 1;
                let canvHeight = codeLen * this.settings.COL_HEIGHT;
                let velocity = this.codes[i][0].velocity;
                let strength = this.codes[i][0].strength;
                let text, fadeStrength;

                let newCanv = document.createElement('canvas');
                let newCtx = newCanv.getContext('2d');

                newCanv.width = this.settings.COL_WIDTH;
                newCanv.height = canvHeight;

                for (let j = 1; j < codeLen; j++) {
                    text = this.codes[i][j];
                    newCtx.globalCompositeOperation = 'source-over';
                    newCtx.font = '24px matrix-code';

                    if (j < 5) {
                        newCtx.shadowColor = 'hsl(104, 79%, 74%)';
                        newCtx.shadowOffsetX = 0;
                        newCtx.shadowOffsetY = 0;
                        // 设置模糊程度
                        newCtx.shadowBlur = 6;
                        newCtx.fillStyle = 'hsla(104, 79%, ' + (100 - (j * 5)) + '%, ' + strength + ')';
                    } else if (j > (codeLen - 4)) {
                        fadeStrength = j / codeLen;
                        fadeStrength = 1 - fadeStrength;

                        newCtx.shadowOffsetX = 0;
                        newCtx.shadowOffsetY = 0;
                        newCtx.shadowBlur = 0;
                        newCtx.fillStyle = 'hsla(104, 79%, 74%, ' + (fadeStrength + 0.3) + ')';
                    } else {
                        newCtx.shadowOffsetX = 0;
                        newCtx.shadowOffsetY = 0;
                        newCtx.shadowBlur = 0;
                        newCtx.fillStyle = 'hsla(104, 79%, 74%, ' + strength + ')';
                    }

                    newCtx.fillText(text, 0, (canvHeight - (j * this.settings.COL_HEIGHT)));
                }

                this.codes[i][0].canvas = newCanv;

            },
            createLines () {
                this.linesC = document.createElement('canvas');
                this.linesC.width = this.WIDTH;
                this.linesC.height = this.HEIGHT;
                this.linesC.style.position = 'fixed';
                this.linesC.style.top = 0;
                this.linesC.style.left = 0;
                this.linesC.style.zIndex = 10;
                document.body.appendChild(this.linesC);

                let linesYBlack = 0;
                let linesYWhite = 0;
                this.ctx2 = this.linesC.getContext('2d');

                this.ctx2.beginPath();

                this.ctx2.lineWidth = 1;
                this.ctx2.strokeStyle = 'rgba(0, 0, 0, 0.7)';

                while (linesYBlack < this.HEIGHT) {

                    this.ctx2.moveTo(0, linesYBlack);
                    this.ctx2.lineTo(this.WIDTH, linesYBlack);

                    linesYBlack += 5;
                }

                this.ctx2.lineWidth = 0.15;
                this.ctx2.strokeStyle = 'rgba(255, 255, 255, 0)';

                while (linesYWhite < this.HEIGHT) {

                    this.ctx2.moveTo(0, linesYWhite+1);
                    this.ctx2.lineTo(this.WIDTH, linesYWhite+1);

                    linesYWhite += 5;
                }

                this.ctx2.stroke();
            },
            assignColumn () {
                let randomColumn = this.randomFromInterval(0, (this.COLUMNS - 1));

                if (this.codes[randomColumn][0].open) {
                    this.codes[randomColumn][0].open = false;
                } else {
                    return false;
                }

                return randomColumn;
            },
            randomFromInterval (from, to) {
                return Math.floor(Math.random() * (to - from+ 1 ) + from);
            }

        }
    }
</script>

<style scoped>
/** 让这个背景固定在页面不随着滚动而滚动 */
 #canvas {
     position: fixed;
     top: 0;
     left: 0;
 }
</style>
```

:::
