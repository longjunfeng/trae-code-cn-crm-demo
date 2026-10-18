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
      <div className={styles.modalShell}>
        <p className={styles.formTitle}>新建用户</p>
        <div className={styles.autoWrapper}>
          <p className={styles.fieldLabel}>name,姓名,赵敏</p>
          <div className={styles.input}>
            <p className={styles.inputValue}>undefined</p>
          </div>
        </div>
        <div className={styles.autoWrapper2}>
          <p className={styles.fieldLabel}>email,邮箱,zhao.min@example.test</p>
          <div className={styles.input}>
            <p className={styles.inputValue}>undefined</p>
          </div>
        </div>
        <div className={styles.autoWrapper2}>
          <p className={styles.fieldLabel}>org,组织,产品部</p>
          <div className={styles.input}>
            <p className={styles.inputValue}>undefined</p>
          </div>
        </div>
        <div className={styles.autoWrapper3}>
          <p className={styles.fieldLabel}>角色</p>
          <div className={styles.roleInput}>
            <p className={styles.roleValue}>销售经理</p>
          </div>
        </div>
        <div className={styles.autoWrapper4}>
          <div className={styles.cancel}>
            <p className={styles.cancelLabel}>取消</p>
          </div>
          <div className={styles.save}>
            <p className={styles.saveLabel}>保存</p>
          </div>
        </div>
      </div>
      <p className={styles.screenCaption}>02 新建用户</p>
    </div>
  );
}

export default Component;
