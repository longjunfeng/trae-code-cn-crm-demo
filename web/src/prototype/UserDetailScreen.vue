<script setup lang="ts">
// 03 用户详情 · Figma 原型还原（.figma/3_55）
// 展示用户：林晓 / lin.xiao@example.test / 管理员 / 华东销售部 / 启用 / 2026-10-15 09:20
</script>
<template>
  <div class="frame">
    <div class="topNavigation">
      <p class="brand">Trae CRM</p>
      <p class="environment">DEMO</p>
    </div>
    <p class="pageLabel">用户管理</p>
    <p class="subtitle">用户与权限中心</p>
    <div class="detailShell">
      <p class="detailEyebrow">用户详情</p>
      <p class="detailName">林晓</p>
      <p class="detailEmail">lin.xiao@example.test</p>
      <div class="detailRow">
        <p class="detailLabel">角色</p>
        <p class="detailValue">管理员</p>
      </div>
      <div class="detailRow">
        <p class="detailLabel">组织</p>
        <p class="detailValue">华东销售部</p>
      </div>
      <div class="detailRow">
        <p class="detailLabel">状态</p>
        <p class="detailValue">启用</p>
      </div>
      <div class="detailRow">
        <p class="detailLabel">最近登录</p>
        <p class="detailValue">2026-10-15 09:20</p>
      </div>
      <div class="editButton">
        <p class="editLabel">编辑用户</p>
      </div>
    </div>
    <p class="screenCaption">03 用户详情</p>
  </div>
</template>

<style scoped>
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 18px;
  background: #f5f7fb;
  padding-bottom: 36px;
  width: 420px;
  height: 700px;
  overflow: hidden;
  flex-shrink: 0;
}
.topNavigation {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  justify-content: space-between;
  border-radius: 18px;
  background: #101827;
  padding: 22px 30px 16px 24px;
  min-width: 420px;
}
.topNavigation .brand {
  width: 120px;
  height: 24px;
  margin: 0;
  letter-spacing: 0;
  color: #ffffff;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 600;
}
.topNavigation .environment {
  margin: 2px 0 0;
  width: 60px;
  height: 24px;
  letter-spacing: 0;
  color: #9eabc2;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 600;
}
.pageLabel {
  margin: 28px 0 0 24px;
  width: 220px;
  height: 32px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 600;
}
.subtitle {
  margin: 4px 0 0 24px;
  width: 220px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.detailShell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  margin: 12px 24px 0;
  border-radius: 14px;
  background: #ffffff;
  padding: 26px 24px;
}
.detailShell .detailEyebrow {
  margin: 0;
  width: 110px;
  height: 24px;
  letter-spacing: 0;
  color: #536cf3;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 600;
}
.detailShell .detailName {
  margin: 2px 0 0;
  width: 180px;
  height: 32px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 600;
}
.detailShell .detailEmail {
  margin: 4px 0 0;
  width: 240px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.detailShell .detailRow {
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  margin-top: 28px;
  padding-right: 12px;
  padding-left: 0;
}
.detailShell .detailRow .detailLabel {
  margin: 0;
  width: 100px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.detailShell .detailRow .detailValue {
  margin: 0;
  width: 190px;
  height: 24px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.detailShell .editButton {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  margin-top: 46px;
  border-radius: 8px;
  background: #536cf3;
  padding: 12px 92px 2px 132px;
}
.detailShell .editButton .editLabel {
  margin: 0;
  width: 100px;
  height: 24px;
  letter-spacing: 0;
  color: #ffffff;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.screenCaption {
  margin: 46px 0 0 24px;
  width: 300px;
  height: 24px;
  letter-spacing: 0;
  color: #536cf3;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 600;
}
</style>
