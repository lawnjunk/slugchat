import {each} from 'lodash/fp'

let required = [
  'PORT',
  'SECRET',
  'API_URL',
  'NODE_ENV',
  'CORS_ORIGINS',
  'MONGODB_URI',
  'REDIS_PORT', 
  'REDIS_URL',
]

export default () => {
  each((key) => {
    if(!process.env[key])
      throw new Error(`ENVIRONMNET ERROR: process.env.${key} must be set`)
  })(required)
}
