import { log } from 'console'
import { Watson } from './Watson'

const emotions = await Watson(`put your text here`)
log(`WATSON EMOTIONS: ${emotions}`)
