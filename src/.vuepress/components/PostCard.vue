<template>
  <div class="post-card">
    <div class="post-card-image" v-if="post.image">
      <img :src="post.image" :alt="post.title">
    </div>
    <div class="post-card-content">
      <h3 class="post-card-title">{{ post.title }}</h3>
      <p class="post-card-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
      <div class="post-card-meta">
        <span class="post-card-date">{{ formatDate(post.date) }}</span>
        <span v-if="post.author" class="post-card-author">by {{ post.author }}</span>
      </div>
      <a :href="post.link" class="post-card-link">阅读更多</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
      validator(value) {
        // 验证必需的属性
        return typeof value.title === 'string' && value.title.length > 0;
      }
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('zh-CN', options);
    }
  }
}
</script>

<style scoped>
.post-card {
  border: 1px solid #eaecef;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: white;
  margin-bottom: 1.5rem;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.post-card-image img {
  width: 100%;
  object-fit: cover;
}

.post-card-content {
  padding: 1.25rem;
}

.post-card-title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.post-card-excerpt {
  color: #6a737d;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.post-card-meta {
  font-size: 0.875rem;
  color: #6a737d;
  margin-bottom: 1rem;
}

.post-card-author {
  margin-left: 0.75rem;
}

.post-card-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.post-card-link:hover {
  background-color: #0056b3;
}
</style>