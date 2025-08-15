<template>
  <div class="searchable-post-list">
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="搜索文章..." 
        class="search-input"
      >
      <button @click="clearSearch" class="search-clear" v-if="searchQuery">清除</button>
    </div>
    
    <div class="filters">
      <label class="filter-option">
        <input type="checkbox" v-model="showOnlyRecent" />
        只显示最近文章
      </label>
    </div>
    
    <div class="results-info">
      找到 {{ filteredPosts.length }} 篇文章
    </div>
    
    <div class="post-list-container">
      <PostCard 
        v-for="post in filteredPosts" 
        :key="post.id" 
        :post="post" 
        @click="handlePostClick(post)"
        class="post-list-item"
      />
    </div>
  </div>
</template>

<script>
import PostCard from './PostCard.vue';

export default {
  name: 'SearchablePostList',
  components: {
    PostCard
  },
  data() {
    return {
      searchQuery: '',
      showOnlyRecent: false,
      posts: [
        {
          id: 1,
          title: 'Vue组件化开发实践',
          excerpt: '深入探讨Vue中的组件化开发思想和实践方法，以及如何构建可复用的组件。',
          date: '2025-08-10',
          author: '带着黄昏出逃',
          link: '/posts/2.html'
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
        },

      ]
    }
  },
  computed: {
    filteredPosts() {
      let result = this.posts;
      
      // 根据搜索关键词过滤
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query)
        );
      }
      
      // 根据日期过滤（最近30天）
      if (this.showOnlyRecent) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        result = result.filter(post => 
          new Date(post.date) >= thirtyDaysAgo
        );
      }
      
      return result;
    }
  },
  methods: {
    clearSearch() {
      this.searchQuery = '';
    },
    
    handlePostClick(post) {
      console.log('用户点击了文章:', post.title);
      // 这里可以添加统计代码或其他操作
    }
  }
}
</script>

<style scoped>
.searchable-post-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-bar {
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.search-clear {
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.search-clear:hover {
  background-color: #e9ecef;
}

.filters {
  margin-bottom: 1rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.results-info {
  margin-bottom: 1rem;
  color: #6a737d;
  font-size: 0.9rem;
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
  
  .searchable-post-list {
    padding: 1rem;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>