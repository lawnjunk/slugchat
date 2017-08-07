'use strict'

import {Router} from 'express'
import User from '../model/user.js'
import superagent from 'superagent'
import bodyParser from 'body-parser'
import basicAuth from '../middleware/basic-auth.js'
import * as querystring from 'querystring'

export default new Router()
.get('/oauth/google/code', (req, res, next) => {
  console.log('boom', req.query)
  if(!req.query.code){
    // it failed 
    res.redirect(process.env.CLIENT_URL)
  } else {
    let tokenURI = 'https://www.googleapis.com/oauth2/v4/token'
    let redirect_uri = `${process.env.API_URL}/oauth/google/code`
    // request a token
    superagent.post(tokenURI)
    .type('form')
    .send({
      redirect_uri, 
      code: req.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: 'authorization_code',
    })
    // request openid
    .then((res) => {
      console.log('token', req.body)
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
      .set('Authorization', `Bearer ${res.body.access_token}`)  
    })
    // find or create user
    .then((response) => {
      console.log('openid', response.body)
      return User.handleOAUTH(response.body)
    })
    // genorate user token
    .then(user => user.tokenCreate())
    // redirect to client with token in cookie
    .then(token => {
      res.cookie('X-Slugchat-Token', token)
      res.redirect(process.env.CLIENT_URL)
    })
    .catch((err) => {
      console.error(err)
      res.redirect(process.env.CLIENT_URL) 
    })
  }
})
.post('/signup', bodyParser.json() , (req, res, next) => {
  new User.createFromSignup(req.body)
  .then(user => user.tokenCreate())
  .then(token => {
    res.cookie('X-Sluggram-Token', token, {maxAge: 900000})
    res.send(token)
  })
  .catch(next)
})
.get('/usernames/:username', (req, res, next) => {
  User.findOne({username: username})
  .then(user => {
    if(!user)
      return res.sendStatus(409)
    return res.sendStatus(200)
  })
  .catch(next)
})
.get('/login', basicAuth, (req, res, next) => {
  req.user.tokenCreate()
  .then((token) => {
    let cookieOptions = {maxAge: daysToMilliseconds(7)}
    res.cookie('X-Sluggram-Token', token, cookieOptions)
    res.send(token)
  })
  .catch(next)
})
