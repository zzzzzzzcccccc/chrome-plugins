import inject from './inject'
import { onMessage } from '@chrome-plugin/common'

onMessage(msg => {
  console.log(msg)
  inject.create()
})
