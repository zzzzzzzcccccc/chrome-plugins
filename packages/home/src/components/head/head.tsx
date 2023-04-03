import React from 'react';
import NexHead from 'next/head';
import { useTranslation } from '../../hooks';

export default function Head() {
  const t = useTranslation();
  return (
    <NexHead>
      <title>{t('meta.title')}</title>
      <meta name="description" content={t('meta.description') || ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NexHead>
  );
}
