import { onMessage } from './utils/chrome'

onMessage(msg => {
  console.log(msg)
})
