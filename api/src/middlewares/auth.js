import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

import { postgreUserHelper } from '../helpers/postgreUsers.helper.js'

const jwtsecretkey = 'llavesecreta'

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtsecretkey
    },
    async (payload, done) => {
      try {
        const response = await postgreUserHelper.getByUsername(payload.username)
        if (response.length > 0) {
          // en req.user puedo obtener el username luego de este middleware
          return done(null, response[0].username)
        }
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user.username)
})

passport.deserializeUser(function (username, done) {
  done(null, { username })
})

export default passport

export const generateJwtToken = (username) => {
  const payload = {
    username
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtsecretkey, options)
}
