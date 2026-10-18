import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.topNavigation}>
        <p className={styles.brand}>Trae CRM</p>
        <p className={styles.environment}>DEMO</p>
      </div>
      <p className={styles.pageLabel}>用户管理</p>
      <p className={styles.subtitle}>用户与权限中心</p>
      <div className={styles.detailShell}>
        <p className={styles.detailEyebrow}>用户详情</p>
        <p className={styles.detailName}>林晓</p>
        <p className={styles.detailEmail}>lin.xiao@example.test</p>
        <div className={styles.autoWrapper}>
          <p className={styles.detailLabel}>角色,管理员</p>
          <p className={styles.detailValue}>undefined</p>
        </div>
        <div className={styles.autoWrapper}>
          <p className={styles.detailLabel}>组织,华东销售部</p>
          <p className={styles.detailValue}>undefined</p>
        </div>
        <div className={styles.autoWrapper}>
          <p className={styles.detailLabel}>状态,启用</p>
          <p className={styles.detailValue}>undefined</p>
        </div>
        <div className={styles.autoWrapper}>
          <p className={styles.detailLabel}>最近登录,2026-10-15 09:20</p>
          <p className={styles.detailValue}>undefined</p>
        </div>
        <div className={styles.editButton}>
          <p className={styles.editLabel}>编辑用户</p>
        </div>
      </div>
      <p className={styles.screenCaption}>03 用户详情</p>
    </div>
  );
}

export default Component;
