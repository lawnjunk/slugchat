import {each} from 'lodash/fp'

let required = [
  'PORT',
  'SECRET',
  'API_URL',
  'NODE_ENV',
  'CLIENT_URL',
  'CORS_ORIGINS',
  'MONGODB_URI',
]

export default () => {
  each((key) => {
    if(!process.env[key])
      throw new Error(`ENVIRONMNET ERROR: process.env.${key} must be set`)
  })(required)
}
