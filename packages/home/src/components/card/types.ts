import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  value?: string;
  onSubmitTitle?: (v: string) => void;
  placeholder?: string;
}
