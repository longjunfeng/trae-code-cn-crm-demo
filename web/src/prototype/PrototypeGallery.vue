<script setup lang="ts">
import UserListScreen from './UserListScreen.vue';
import UserCreateScreen from './UserCreateScreen.vue';
import UserDetailScreen from './UserDetailScreen.vue';
</script>
<template>
  <div class="gallery">
    <header class="fileHeader">
      <p class="fileTitle">Trae Code CN CRM · User Management Prototype</p>
      <p class="fileSubtitle">Editable prototype · requirements → spec → code trace</p>
      <a class="backLink" href="/">← 返回 CRM 应用</a>
    </header>
    <div class="boards">
      <UserListScreen />
      <UserCreateScreen />
      <UserDetailScreen />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  min-height: 100vh;
  background: #eef1f7;
  padding: 48px 40px 64px;
}
.fileHeader {
  max-width: 1348px;
  margin: 0 auto 32px;
}
.fileTitle {
  margin: 0;
  width: 500px;
  height: 28px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 600;
}
.fileSubtitle {
  margin: 4px 0 0;
  width: 500px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.backLink {
  display: inline-block;
  margin-top: 14px;
  color: #536cf3;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}
.backLink:hover {
  text-decoration: underline;
}
.boards {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  max-width: 1348px;
  margin: 0 auto;
}
</style>
