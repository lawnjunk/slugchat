export default (req, res, next) => {
  console.log('forwareded-proto', req.headers['x-forwarded-proto'])
  if(process.env.NODE_ENV !== 'production')
    return next()
  if(req.headers['x-forwarded-proto'] !== 'https'){
    let secureURL = 'https://' + req.hostname + req.originalUrl
    console.log('secureURL', secureURL)
    return res.redirect(secureURL)
  }
  next()
}
