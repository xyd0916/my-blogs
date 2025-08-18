<template>
  <!-- 图表容器，包含整个组件的UI -->
  <div class="oil-chart-container">
    <!-- 图表控制区域，包含标题和选择器 -->
    <div class="chart-controls">
      <!-- 图表标题 -->
      <h2>日产油量趋势分析</h2>
      <!-- 筛选控件组 -->
      <div class="filter-group">
        <!-- 井号选择器标签 -->
        <label for="wellIdSelect">选择井号ID：</label>
        <!-- 井号选择下拉框 -->
        <!-- 使用v-model进行双向数据绑定到selectedWellId -->
        <!-- @change监听选择变化事件，触发loadWellData方法 -->
        <select 
          id="wellIdSelect" 
          v-model="selectedWellId" 
          @change="loadWellData"
          class="well-select"
        >
          <!-- 默认选项 -->
          <option value="">-- 请选择井号 --</option>
          <!-- 使用v-for循环渲染井列表 -->
          <!-- :key提供Vue追踪列表的唯一标识 -->
          <!-- :value绑定选项的值为井号ID -->
          <option v-for="well in wellList" :key="well.jhId" :value="well.jhId">
            <!-- 显示井号ID和井名 -->
            {{ well.jhId }} ({{ well.jh }})
          </option>
        </select>
      </div>
      <!-- 加载指示器，当isLoading为true时显示 -->
      <div class="loading-indicator" v-if="isLoading">
        <!-- 旋转动画span元素 -->
        <span class="spinner"></span> 数据加载中...
      </div>
      <!-- 错误信息显示区域，当errorMessage有值时显示 -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
    
    <!-- 图表包装器 -->
    <div class="chart-wrapper">
      <!-- 图表区域，通过ref引用DOM元素 -->
      <div ref="chartDom" class="chart-area"></div>
    </div>
  </div>
</template>

<script setup>
// 从Vue导入响应式API和生命周期钩子
import { ref, onMounted, watch, onUnmounted } from 'vue';

// 从ECharts核心模块导入use和init函数
import { use, init } from 'echarts/core';

// 从ECharts渲染器模块导入Canvas渲染器
import { CanvasRenderer } from 'echarts/renderers';

// 从ECharts图表模块导入折线图
import { LineChart } from 'echarts/charts';

// 从ECharts组件模块导入网格和提示框组件
import { GridComponent, TooltipComponent } from 'echarts/components';

// 导入完整的ECharts库，用于图形相关功能
import * as echarts from 'echarts';

// 导入axios用于HTTP请求
import axios from 'axios';

// 注册ECharts所需组件，按需引入以减小打包体积
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent]);

// 创建响应式引用变量
// 图表DOM元素引用
const chartDom = ref(null);
// 图表实例引用
const chartInstance = ref(null);
// 井列表数据
const wellList = ref([]);
// 选中的井号ID
const selectedWellId = ref('');
// 生产数据（包含日期和产量值）
const productionData = ref({ dates: [], values: [] });
// 加载状态标识
const isLoading = ref(false);
// 错误信息
const errorMessage = ref('');

// 初始化图表函数
const initChart = () => {
  // 如果已有图表实例，则先销毁避免内存泄漏
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  
  // 初始化图表实例，绑定到DOM元素，使用Canvas渲染器
  chartInstance.value = init(chartDom.value, null, { renderer: 'canvas' });

  // 图表配置项
  const option = {
    // 背景颜色设置为透明
    backgroundColor: 'transparent',
    
    // 标题配置
    title: { 
      // 标题文本
      text: '日产油量变化趋势', 
      // 标题位置居中
      left: 'center', 
      // 标题文字样式
      textStyle: { color: '#333', fontSize: 16 } 
    },
    
    // 提示框配置
    tooltip: {
      // 触发类型：坐标轴触发
      trigger: 'axis',
      // 背景颜色
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      // 边框颜色
      borderColor: '#ddd',
      // 边框宽度
      borderWidth: 1,
      // 文字样式
      textStyle: { color: '#333' },
      // 内容格式化函数
      formatter: (params) => {
        // 获取第一个数据项
        const param = params[0];
        // 返回格式化的提示内容
        return `日期: ${param.name}<br/>日产油量: ${param.value} 吨`;
      }
    },
    
    // 网格配置
    grid: { 
      // 左右边距5%
      left: '5%', 
      right: '5%', 
      // 底部边距15%
      bottom: '15%', 
      // 顶部边距15%
      top: '15%', 
      // 是否包含坐标轴标签
      containLabel: true 
    },
    
    // X轴配置
    xAxis: {
      // 类型：类目轴
      type: 'category',
      // 坐标轴两边不留白
      boundaryGap: false,
      // 数据（初始为空数组）
      data: [],
      // 坐标轴标签配置
      axisLabel: { 
        // 标签旋转45度
        rotate: 45, 
        // 显示间隔为0（全部显示）
        interval: 0, 
        // 字体大小
        fontSize: 12 
      },
      // 坐标轴线配置
      axisLine: { 
        // 线样式配置
        lineStyle: { color: '#eee' } 
      }
    },
    
    // Y轴配置
    yAxis: {
      // 类型：数值轴
      type: 'value',
      // 轴名称
      name: '日产油量（吨）',
      // 名称文字样式
      nameTextStyle: { 
        // 内边距设置
        padding: [0, 0, 0, 10] 
      },
      // 是否显示轴线
      axisLine: { show: false },
      // 分割线配置
      splitLine: { 
        // 线样式配置
        lineStyle: { color: '#f5f5f5' } 
      }
    },
    
    // 数据区域缩放配置（用于处理大量数据）
    dataZoom: [
      // 内置型数据区域缩放组件
      { 
        type: 'inside', 
        start: 0, 
        end: 100, 
        filterMode: 'none' 
      },
      // 滑动条型数据区域缩放组件
      { 
        show: true, 
        type: 'slider', 
        bottom: 25, 
        start: 0, 
        end: 100, 
        filterMode: 'none', 
        height: 15 
      }
    ],
    
    // 系列列表（图表数据）
    series: [
      {
        // 系列名称
        name: '日产油量',
        // 图表类型：折线图
        type: 'line',
        // 标记点图形：圆形
        symbol: 'circle',
        // 标记点大小
        symbolSize: 4,
        // 是否启用平滑曲线
        smooth: true,
        // 图形样式
        itemStyle: { color: '#4e79a7' },
        // 区域填充样式
        areaStyle: {
          // 使用线性渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(78, 121, 167, 0.6)' },
            { offset: 1, color: 'rgba(78, 121, 167, 0.1)' }
          ])
        },
        // 数据（初始为空数组）
        data: []
      }
    ]
  };

  // 设置图表配置项
  chartInstance.value.setOption(option);
};

// 更新图表数据函数
const updateChartData = () => {
  // 如果没有图表实例，则直接返回
  if (!chartInstance.value) return;
  
  // 更新图表的X轴数据和系列数据
  chartInstance.value.setOption({
    xAxis: { data: productionData.value.dates },
    series: [{ data: productionData.value.values }]
  });

  // 当没有数据时显示提示信息
  if (productionData.value.values.length === 0) {
    chartInstance.value.setOption({
      title: {
        // 提示文本
        text: '暂无数据',
        // 标题居中
        left: 'center',
        // 标题垂直居中
        top: 'center',
        // 文字样式
        textStyle: { color: '#999', fontSize: 16 }
      }
    });
  }
};

// 获取井列表函数
const loadWellList = async () => {
  // 开始加载，设置加载状态为true
  try {
    isLoading.value = true;
    // 清空错误信息
    errorMessage.value = '';
    
    // 发起HTTP请求获取井列表数据
    const response = await axios.get('https://xyd0916.github.io/lakes/%E4%BA%A7%E9%87%8F.json');
    
    // 检查响应数据格式是否正确
    if (response.data.code === 200 && response.data.data?.records) {
      // 使用Map进行去重处理
      const wellsMap = new Map();
      // 遍历数据，过滤并去重
      response.data.data.records.forEach(item => {
        // 确保井号ID存在且未重复
        if (item.jhId && !wellsMap.has(item.jhId)) {
          // 将井信息存入Map
          wellsMap.set(item.jhId, { jhId: item.jhId, jh: item.jh || '未知' });
        }
      });
      // 转换为数组并赋值给井列表
      wellList.value = Array.from(wellsMap.values());
    } else {
      // 设置错误信息
      errorMessage.value = '获取井列表失败：接口返回数据格式错误';
    }
  } catch (error) {
    // 错误处理
    console.error('获取井列表失败:', error);
    errorMessage.value = '获取井列表失败，请检查网络连接';
  } finally {
    // 无论成功与否，重置加载状态
    isLoading.value = false;
  }
};

// 加载选中井数据函数
const loadWellData = async () => {
  // 如果没有选择井号，则清空数据并更新图表
  if (!selectedWellId.value) {
    productionData.value = { dates: [], values: [] };
    updateChartData();
    return;
  }
  
  // 开始加载，设置加载状态为true
  try {
    isLoading.value = true;
    // 清空错误信息
    errorMessage.value = '';
    
    // 发起HTTP请求获取指定井的数据
    const response = await axios.get('https://xyd0916.github.io/lakes/%E4%BA%A7%E9%87%8F.json', {
      // 传递井号ID作为查询参数
      params: { jhId: selectedWellId.value }
    });
    
    // 检查响应数据格式是否正确
    if (response.data.code === 200 && response.data.data?.records) {
      // 过滤有效数据并按日期排序
      const sortedData = response.data.data.records
        // 过滤条件：日期存在且日产油量不为空且为有效数字
        .filter(item => item.rq && item.rcyl !== null && !isNaN(item.rcyl))
        // 按日期升序排序
        .sort((a, b) => new Date(a.rq) - new Date(b.rq));
      
      // 提取日期和产量数据
      productionData.value = {
        // 映射出日期数组
        dates: sortedData.map(item => item.rq),
        // 映射出产量数组并转换为数字
        values: sortedData.map(item => Number(item.rcyl))
      };
      
      // 更新图表数据
      updateChartData();
    } else {
      // 设置错误信息
      errorMessage.value = '获取井数据失败：接口返回数据格式错误';
    }
  } catch (error) {
    // 错误处理
    console.error('获取井数据失败:', error);
    errorMessage.value = '获取井数据失败，请重试';
  } finally {
    // 无论成功与否，重置加载状态
    isLoading.value = false;
  }
};

// 窗口大小变化处理函数
const handleResize = () => {
  // 调整图表大小以适应容器
  chartInstance.value?.resize();
};

// 组件挂载后执行的生命周期钩子
onMounted(() => {
  // 初始化图表
  initChart();
  // 加载井列表数据
  loadWellList();
  // 添加窗口大小变化事件监听器
  window.addEventListener('resize', handleResize);
});

// 组件卸载前执行的生命周期钩子
onUnmounted(() => {
  // 移除窗口大小变化事件监听器
  window.removeEventListener('resize', handleResize);
  // 销毁图表实例避免内存泄漏
  chartInstance.value?.dispose();
});
</script>

<style scoped>
/* 图表容器样式 */
.oil-chart-container {
  /* 宽度100% */
  width: 100%;
  /* 最小宽度600px */
  min-width: 600px;
  /* 内边距20px */
  padding: 20px;
  /* 盒模型设置 */
  box-sizing: border-box;
  /* 背景色白色 */
  background-color: #fff;
  /* 圆角8px */
  border-radius: 8px;
  /* 阴影效果 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

/* 图表控制区域样式 */
.chart-controls {
  /* 下边距20px */
  margin-bottom: 20px;
}

/* 控制区域标题样式 */
.chart-controls h2 {
  /* 外边距设置 */
  margin: 0 0 15px 0;
  /* 文字颜色 */
  color: #333;
  /* 字体大小 */
  font-size: 18px;
  /* 字体粗细 */
  font-weight: 600;
}

/* 筛选控件组样式 */
.filter-group {
  /* 弹性布局 */
  display: flex;
  /* 垂直居中对齐 */
  align-items: center;
  /* 元素间距10px */
  gap: 10px;
  /* 下边距15px */
  margin-bottom: 15px;
}

/* 筛选控件标签样式 */
.filter-group label {
  /* 文字颜色 */
  color: #666;
  /* 字体大小 */
  font-size: 14px;
}

/* 下拉选择框样式 */
.well-select {
  /* 内边距 */
  padding: 8px 12px;
  /* 边框样式 */
  border: 1px solid #ddd;
  /* 圆角 */
  border-radius: 4px;
  /* 字体大小 */
  font-size: 14px;
  /* 最小宽度 */
  min-width: 200px;
  /* 背景色 */
  background-color: #fff;
  /* 过渡动画 */
  transition: border-color 0.2s;
}

/* 下拉选择框焦点样式 */
.well-select:focus {
  /* 去除默认轮廓 */
  outline: none;
  /* 边框颜色 */
  border-color: #4e79a7;
}

/* 加载指示器和错误信息样式 */
.loading-indicator, .error-message {
  /* 文字颜色 */
  color: #666;
  /* 字体大小 */
  font-size: 14px;
  /* 弹性布局 */
  display: flex;
  /* 垂直居中对齐 */
  align-items: center;
  /* 元素间距 */
  gap: 8px;
  /* 上边距 */
  margin-top: 10px;
}

/* 错误信息特殊样式 */
.error-message {
  /* 错误文字颜色 */
  color: #e74c3c;
}

/* 自定义加载动画 */
.spinner {
  /* 宽度 */
  width: 16px;
  /* 高度 */
  height: 16px;
  /* 边框 */
  border: 2px solid #ddd;
  /* 上边框颜色 */
  border-top-color: #4e79a7;
  /* 圆形 */
  border-radius: 50%;
  /* 旋转动画 */
  animation: spin 1s linear infinite;
}

/* 旋转动画定义 */
@keyframes spin {
  /* 旋转360度 */
  to { transform: rotate(360deg); }
}

/* 图表包装器样式 */
.chart-wrapper {
  /* 宽度 */
  width: 100%;
  /* 高度 */
  height: 500px;
  /* 定位 */
  position: relative;
}

/* 图表区域样式 */
.chart-area {
  /* 宽度 */
  width: 100%;
  /* 高度 */
  height: 100%;
}
</style>