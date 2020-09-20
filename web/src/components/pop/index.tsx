import React from 'react';
import cx from 'classnames';
import styles from './index.less';

interface PopProps {
  children?: any;
  className?: string;
  arrowPosition?: 'right' | 'left';
}

export default function Pop(props: PopProps) {
  const { children, className, arrowPosition = 'left' } = props;

  return (
    <div
      className={cx(
        styles.wrapper,
        {
          [styles.wrapperArrowRight]: arrowPosition === 'right',
          [styles.wrapperArrowLeft]: arrowPosition === 'left',
        },
        className,
      )}
    >
      {children}
      <div className={cx(styles.arrow)} />
    </div>
  );
}
