// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationBaseStrategy, AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate(auth, params) {
    return { anonymous: true }
  }
}

export const authentication = (app) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('anonymous', new AnonymousStrategy())

  app.use('authentication', authentication)
}
