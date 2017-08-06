import * as server from './lib/server.js'
import assertEnv from './lib/assert-env.js'

assertEnv()
server.start()
