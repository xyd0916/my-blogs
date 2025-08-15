<template>
  <div class="post-list">
    <h2 class="post-list-title">博客文章</h2>
    <div class="post-list-container">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
        class="post-list-item"
      />
    </div>
  </div>
</template>

<script>
import PostCard from './PostCard.vue';

export default {
  name: 'PostList',
  components: {
    PostCard
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Vue组件化开发实践',
          excerpt: '深入探讨Vue中的组件化开发思想和实践方法，以及如何构建可复用的组件。',
          date: '2025-08-10',
          author: '带着黄昏出逃',
          link: '/posts/vue3/2.html'
        },
        {
          id: 2,
          title: 'ArcGIS Pro使用技巧',
          excerpt: '分享ArcGIS Pro软件的高级使用技巧，提高地理信息处理效率。',
          date: '2025-08-05',
          author: '带着黄昏出逃',
          link: '/ArcGIS_Pro/0.html'
        },
        {
          id: 3,
          title: 'Spring框架核心原理',
          excerpt: '解析Spring框架的核心概念和工作原理，帮助开发者更好地理解和使用Spring。',
          date: '2025-07-28',
          author: '带着黄昏出逃',
          link: '/posts/spring/1.html'
        }
      ]
    }
  }
}
</script>

<style scoped>
.post-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.post-list-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.post-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .post-list-container {
    grid-template-columns: 1fr;
  }
  
  .post-list {
    padding: 1rem;
  }
}
</style>