import inject from './inject'
import { onMessage } from '@chrome-plugin/common'

const target = document.createElement('div');

onMessage( ({ currentTab, ...msg }) => {
  console.log(msg, currentTab)
  document.body.appendChild(target);
  inject.create({ target, tab: currentTab })
})
