<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
</script>

<template>
    <!-- 使用 Blog 组件作为主页布局 -->
    <Blog>
        <!-- 覆盖默认 Hero 标志为更高级的，像主题主页一样 -->
        <template #heroLogo>
            <div class="cycle_item">
                <!-- 添加装饰性元素 -->
                <div class="decorative-circle circle-1"></div>
                <div class="decorative-circle circle-2"></div>
                <div class="decorative-circle circle-3"></div>
                <div class="decorative-circle circle-4"></div>
                
                <div class="green_cycle">
                    <img class="green_cycle_img" src="/assets/icon/cycle/green_cycle.svg">
                    <div class="yellow_cycle">
                        <img class="yellow_cycle_img" src="/assets/icon/cycle/yellow_cycle.svg">
                        <div class="blue_cycle">
                            <img class="blue_cycle_img" src="/assets/icon/cycle/blue_cycle.svg">
                            <div class="head_img_div">
                                <img class="head_img" src="/assets/icon/头像.jpg">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </template>
    </Blog>
</template>
<style scoped>
.cycle_item {
    background: url('/assets/icon/cycle/cycle.svg') no-repeat;
    width: 400px;
    height: 400px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

.green_cycle {
    width: 260px;
    height: 260px;
    margin: 0 auto;
    padding-top: 70px;
}

.yellow_cycle {
    display: inline-block;
    width: 240px;
    height: 240px;
    margin: 10px;
}

.blue_cycle {
    width: 220px;
    height: 220px;
    text-align: center;
    margin: 10px auto 10px auto;
}

.green_cycle_img,
.yellow_cycle_img,
.blue_cycle_img {
    position: absolute;
}

.head_img_div {
    position: relative;
    z-index: 2;
    display: inline;
    width: 200px;
    height: 200px;
    margin-top: 7px;
}

.head_img {
    display: inline-block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 3px solid pink;
    margin: 7px;
    -webkit-animation: headneon 1.5s ease-in-out infinite alternate;
    -moz-animation: headneon 1.5s ease-in-out infinite alternate;
    animation: headneon 1.5s ease-in-out infinite alternate;
}

@keyframes headneon {
    from {
        box-shadow: 0 0 1px #fff,
            0 0 2px #fff,
            0 0 3px #fff,
            0 0 4px #fff;
    }

    to {
        box-shadow: 0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #fff,
            0 0 20px #fff;
    }
}

@-webkit-keyframes headneon {
    from {
        box-shadow: 0 0 1px #fff,
            0 0 2px #fff,
            0 0 3px #fff,
            0 0 4px #fff;
    }

    to {
        box-shadow: 0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #fff,
            0 0 20px #fff;
    }
}

.green_cycle_img {
    animation-name: clockwise;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;

    /*safari & Chrome */
    -webkit-animation-name: clockwise;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: normal;
}

.yellow_cycle_img {
    animation-name: anticlockwise;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;

    /*safari & Chrome */
    -webkit-animation-name: anticlockwise;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: normal;
}

.blue_cycle_img {
    animation-name: clockwise;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;

    /*safari & Chrome */
    -webkit-animation-name: clockwise;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: normal;
}

@keyframes clockwise {
    from {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
    }
}

@-webkit-keyframes clockwise {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes anticlockwise {
    from {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(-360deg);
        -moz-transform: rotate(-360deg);
        -ms-transform: rotate(-360deg);
        -o-transform: rotate(-360deg);
    }
}

@-webkit-keyframes anticlockwise {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(-360deg);
    }
}

/* 装饰性元素样式 */
.decorative-circle {
    position: absolute;
    border-radius: 50%;
    z-index: 0;
}

.circle-1 {
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #42c9a3, #6DB3D9);
    top: 30px;
    left: 30px;
    animation: pulse 2s infinite;
}

.circle-2 {
    width: 15px;
    height: 15px;
    background: linear-gradient(45deg, #8E44AD, #EAC251);
    bottom: 50px;
    right: 40px;
    animation: pulse 2s infinite 0.5s;
}

.circle-3 {
    width: 12px;
    height: 12px;
    background: linear-gradient(45deg, #6DB3D9, #42c9a3);
    top: 100px;
    right: 60px;
    animation: pulse 2s infinite 1s;
}

.circle-4 {
    width: 18px;
    height: 18px;
    background: linear-gradient(45deg, #EAC251, #8E44AD);
    bottom: 80px;
    left: 50px;
    animation: pulse 2s infinite 1.5s;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.7;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* 响应式设计 */
@media screen and (max-width: 700px) {
    .cycle_item {
        width: 100%;
        height: auto;
        margin: 0 auto;
        background: none;
    }

    .green_cycle {
        padding-top: 3.2em;
    }
    
    .hero-subtitle {
        font-size: 16px;
        bottom: 10px;
    }
    
    .decorative-circle {
        display: none;
    }
}
</style>