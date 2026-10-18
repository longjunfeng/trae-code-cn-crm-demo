<script setup lang="ts">
// 01 用户列表 · Figma 原型还原（.figma/3_2）
</script>
<template>
  <div class="frame">
    <div class="topNavigation">
      <p class="brand">Trae CRM</p>
      <p class="environment">DEMO</p>
    </div>
    <p class="pageLabel">用户管理</p>
    <p class="subtitle">用户与权限中心</p>
    <div class="toolbar">
      <div class="searchField">
        <p class="searchPlaceholder">搜索姓名、邮箱或组织</p>
      </div>
      <div class="roleFilter">
        <p class="roleFilterValue">角色</p>
      </div>
      <div class="autoWrapper">
        <div class="primaryButton" />
        <p class="primaryLabel">＋ 新建</p>
      </div>
    </div>
    <div class="tableCard">
      <div class="tableHead">
        <p class="tableTitle">用户列表</p>
        <p class="count">3 位用户</p>
      </div>
      <div class="row">
        <p class="userName">林晓</p>
        <p class="userRole">管理员</p>
        <p class="userStatus userStatusActive">启用</p>
      </div>
      <div class="rowDivider" />
      <div class="row rowGap">
        <p class="userName">周宁</p>
        <p class="userRole">销售经理</p>
        <p class="userStatus userStatusActive">启用</p>
      </div>
      <div class="rowDivider" />
      <div class="row rowGap">
        <p class="userName">陈可</p>
        <p class="userRole">只读成员</p>
        <p class="userStatus userStatusDisabled">停用</p>
      </div>
      <div class="rowDivider" />
    </div>
    <p class="screenCaption">01 用户列表</p>
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
.toolbar {
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  margin-top: 12px;
  padding-right: 24px;
  padding-left: 24px;
}
.toolbar .searchField {
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  background: #ffffff;
  padding: 12px 24px 2px 14px;
}
.toolbar .searchField .searchPlaceholder {
  margin: 0;
  width: 190px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.toolbar .roleFilter {
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  background: #ffffff;
  padding: 12px 10px 2px 14px;
}
.toolbar .roleFilter .roleFilterValue {
  margin: 0;
  width: 38px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.toolbar .autoWrapper {
  position: relative;
  width: 66px;
  height: 38px;
}
.toolbar .autoWrapper .primaryButton {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  background: #536cf3;
  width: 66px;
  height: 38px;
}
.toolbar .autoWrapper .primaryLabel {
  position: absolute;
  top: 12px;
  right: -1px;
  margin: 0;
  width: 55px;
  height: 24px;
  letter-spacing: 0;
  color: #ffffff;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.tableCard {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  margin: 18px 24px 0;
  border-radius: 12px;
  background: #ffffff;
  padding: 20px 16px 71px;
}
.tableCard .tableHead {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  justify-content: space-between;
  padding-right: 15px;
  padding-left: 0;
}
.tableCard .tableHead .tableTitle {
  margin: 0;
  width: 100px;
  height: 24px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-weight: 600;
}
.tableCard .tableHead .count {
  margin: 2px 0 0;
  width: 65px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.tableCard .row {
  display: flex;
  align-items: center;
  align-self: stretch;
  margin-top: 14px;
  padding-right: 49px;
  padding-left: 0;
}
.tableCard .row.rowGap {
  margin-top: 17px;
}
.tableCard .row .userName {
  margin: 0;
  width: 90px;
  height: 24px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 13px;
  font-weight: 600;
}
.tableCard .row .userRole {
  margin: 0 0 0 30px;
  width: 90px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.tableCard .row .userStatus {
  margin: 0 0 0 36px;
  width: 45px;
  height: 24px;
  letter-spacing: 0;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 600;
}
.tableCard .row .userStatusActive {
  color: #1a8c5c;
}
.tableCard .row .userStatusDisabled {
  color: #996e1f;
}
.tableCard .rowDivider {
  margin-top: 34px;
  background: #e0e5f0;
  width: 340px;
  height: 1px;
}
.screenCaption {
  margin: 78px 0 0 24px;
  width: 300px;
  height: 24px;
  letter-spacing: 0;
  color: #536cf3;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 600;
}
</style>
