import React from 'react';
import { AppIconProps } from './types';
import { CSS_NAME_SPACE } from '../../constants';
import Image from 'next/image';

export default function AppIcon(props: AppIconProps) {
  const { className, style, target, type, width, height } = props;

  const commonProps = {
    className: [className, `${CSS_NAME_SPACE}-fcc`].filter(Boolean).join(' '),
    style,
  };

  switch (type) {
    case 'svg':
      return (
        <svg {...commonProps}>
          <use xlinkHref={target} />
        </svg>
      );
    case 'image':
      return <Image width={width} height={height} priority {...commonProps} alt="icon" src={target} />;
  }
}
