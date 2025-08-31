import React from 'react';
import styles from './styles.module.scss';
import { VscLoading } from 'react-icons/vsc';

type LoaderProps = {
  radius?: number;
  isFixed?: boolean;
  icon?: React.ReactNode | null;
};

function Loader({ radius = 25, isFixed = false, icon = null }: LoaderProps) {
  return (
    <div className={`${styles.loader} ${isFixed ? styles.isFixed : ''}`}>
      <div className={styles.content}>
        {icon || <VscLoading style={{ fontSize: radius }} />}
      </div>
    </div>
  );
}

export default Loader;
