import { defineClientConfig } from "vuepress/client";
import { onMounted } from "vue";

export default defineClientConfig({
  setup() {
    onMounted(() => {
      // 调试确认代码运行
      console.log("粒子拖尾效果已启动");

      let particleCount = 0;
      const maxParticles = 12; // 最多同时存在的粒子数量
      const mainSizes = [12, 15, 18]; // 主粒子大小
      const secondarySizes = [8, 10, 12, 14]; // 次级粒子大小

      // 创建单个粒子
      const createParticle = (x: number, y: number, isMain: boolean) => {
        if (particleCount >= maxParticles) return;

        // 创建粒子元素
        const particle = document.createElement('div');
        particle.classList.add('mouse-particle', isMain ? 'main' : 'secondary');
        
        // 设置大小
        const sizes = isMain ? mainSizes : secondarySizes;
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // 随机偏移（形成拖尾分散感）
        const offsetX = (Math.random() - 0.5) * (isMain ? 8 : 20);
        const offsetY = (Math.random() - 0.5) * (isMain ? 8 : 20);
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;

        // 添加到页面
        document.body.appendChild(particle);
        particleCount++;

        // 动画结束后移除
        const duration = isMain ? 800 : 1200;
        setTimeout(() => {
          if (particle.parentNode) particle.remove();
          particleCount--;
        }, duration);
      };

      // 鼠标移动时生成粒子群
      const handleMouseMove = (e: MouseEvent) => {
        // 每次移动生成1个主粒子+2-3个次级粒子
        createParticle(e.clientX, e.clientY, true);
        
        const secondaryCount = Math.floor(Math.random() * 2) + 2; // 2-3个次级粒子
        for (let i = 0; i < secondaryCount; i++) {
          createParticle(e.clientX, e.clientY, false);
        }
      };

      // 绑定事件（添加捕获阶段确保不被拦截）
      document.addEventListener('mousemove', handleMouseMove, { capture: true });

      // 清理函数
      return () => {
        document.removeEventListener('mousemove', handleMouseMove, { capture: true });
        console.log("粒子拖尾效果已停止");
      };
    });
  },
});