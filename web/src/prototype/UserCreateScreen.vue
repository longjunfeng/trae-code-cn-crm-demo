<script setup lang="ts">
// 02 新建用户 · Figma 原型还原（.figma/3_30）
// 字段示例数据：姓名=赵敏、邮箱=zhao.min@example.test、组织=产品部、角色=销售经理
</script>
<template>
  <div class="frame">
    <div class="topNavigation">
      <p class="brand">Trae CRM</p>
      <p class="environment">DEMO</p>
    </div>
    <p class="pageLabel">用户管理</p>
    <p class="subtitle">用户与权限中心</p>
    <div class="modalShell">
      <p class="formTitle">新建用户</p>
      <div class="field fieldFirst">
        <p class="fieldLabel">姓名</p>
        <div class="input">
          <p class="inputValue">赵敏</p>
        </div>
      </div>
      <div class="field">
        <p class="fieldLabel">邮箱</p>
        <div class="input">
          <p class="inputValue">zhao.min@example.test</p>
        </div>
      </div>
      <div class="field">
        <p class="fieldLabel">组织</p>
        <div class="input">
          <p class="inputValue">产品部</p>
        </div>
      </div>
      <div class="field">
        <p class="fieldLabel">角色</p>
        <div class="roleInput">
          <p class="roleValue">销售经理</p>
          <span class="roleCaret">▾</span>
        </div>
      </div>
      <div class="actions">
        <div class="cancel">
          <p class="cancelLabel">取消</p>
        </div>
        <div class="save">
          <p class="saveLabel">保存</p>
        </div>
      </div>
    </div>
    <p class="screenCaption">02 新建用户</p>
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
.modalShell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  margin: 12px 24px 0;
  border-radius: 14px;
  background: #ffffff;
  padding: 26px 24px 8px;
}
.modalShell .formTitle {
  margin: 0;
  width: 220px;
  height: 26px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: 600;
}
.modalShell .field {
  position: relative;
  margin-top: 40px;
  width: 324px;
  height: 38px;
}
.modalShell .field.fieldFirst {
  margin-top: 46px;
}
.modalShell .field .fieldLabel {
  position: absolute;
  top: -22px;
  left: 0;
  margin: 0;
  width: 100px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 600;
}
.modalShell .field .input {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: flex-start;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #d9e0ef;
  padding: 12px 22px 2px 12px;
  width: 324px;
  height: 38px;
}
.modalShell .field .input .inputValue {
  margin: 0;
  width: 290px;
  height: 24px;
  letter-spacing: 0;
  color: #172033;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.modalShell .field .roleInput {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: flex-start;
  border-radius: 8px;
  background: #edf1ff;
  padding: 12px 72px 2px 12px;
  width: 324px;
  height: 38px;
}
.modalShell .field .roleInput .roleValue {
  margin: 0;
  width: 240px;
  height: 24px;
  letter-spacing: 0;
  color: #536cf3;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.modalShell .field .roleInput .roleCaret {
  position: absolute;
  top: 11px;
  right: 12px;
  color: #536cf3;
  font-size: 12px;
  line-height: 1;
}
.modalShell .actions {
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  margin-top: 18px;
  padding-right: 0;
  padding-left: 162px;
}
.modalShell .actions .cancel {
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #d9e0ef;
  padding: 10px 16px 0 20px;
}
.modalShell .actions .cancel .cancelLabel {
  margin: 0;
  width: 38px;
  height: 24px;
  letter-spacing: 0;
  color: #69758c;
  font-family: Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimHei, Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.modalShell .actions .save {
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  background: #536cf3;
  padding: 10px 14px 0 22px;
}
.modalShell .actions .save .saveLabel {
  margin: 0;
  width: 38px;
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
