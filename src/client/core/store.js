// import { createLogger } 	from 'redux-logger'
import { createMiddleware } from 'redux-promises'

import { initializeStore } from '@utils/store'

import * as allModules from '@modules'

// const logger = createLogger()
const promise = createMiddleware()

export default initializeStore(allModules, [promise])