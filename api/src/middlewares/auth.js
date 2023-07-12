import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

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
        const user = 'username' // await getUserController(payload.username)
        return done(null, user !== null ? user : false)
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
