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
      <div className={styles.autoWrapper2}>
        <div className={styles.searchField}>
          <p className={styles.searchPlaceholder}>搜索姓名、邮箱或组织</p>
        </div>
        <div className={styles.roleFilter}>
          <p className={styles.roleFilterValue}>角色</p>
        </div>
        <div className={styles.autoWrapper}>
          <div className={styles.primaryButton} />
          <p className={styles.primaryLabel}>＋ 新建</p>
        </div>
      </div>
      <div className={styles.tableCard}>
        <div className={styles.autoWrapper3}>
          <p className={styles.tableTitle}>用户列表</p>
          <p className={styles.count}>3 位用户</p>
        </div>
        <div className={styles.autoWrapper4}>
          <p className={styles.userName}>林晓</p>
          <p className={styles.userRole}>管理员</p>
          <p className={styles.userStatus}>启用</p>
        </div>
        <div className={styles.rowDivider} />
        <div className={styles.autoWrapper5}>
          <p className={styles.userName}>周宁</p>
          <p className={styles.userRole}>销售经理</p>
          <p className={styles.userStatus}>启用</p>
        </div>
        <div className={styles.rowDivider} />
        <div className={styles.autoWrapper6}>
          <p className={styles.userName}>陈可</p>
          <p className={styles.userRole}>只读成员</p>
          <p className={styles.userStatus2}>停用</p>
        </div>
        <div className={styles.rowDivider} />
      </div>
      <p className={styles.screenCaption}>01 用户列表</p>
    </div>
  );
}

export default Component;
