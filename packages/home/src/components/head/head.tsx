import React from 'react';
import NexHead from 'next/head';
import { useTranslation } from '../../hooks';
import { FAVICON_URL } from '../../constants';

export default function Head() {
  const t = useTranslation();
  return (
    <NexHead>
      <title>{t('meta.title')}</title>
      <link rel="icon" href={FAVICON_URL} sizes="any" />
      <meta name="description" content={t('meta.description') || ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NexHead>
  );
}
