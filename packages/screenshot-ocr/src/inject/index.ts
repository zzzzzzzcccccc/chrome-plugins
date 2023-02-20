import inject from './inject';
import { onMessage } from '@chrome-plugin/common';

onMessage(({ currentTab, ...msg }) => {
  console.log(msg, currentTab);
  inject.create({ tab: currentTab });
});
