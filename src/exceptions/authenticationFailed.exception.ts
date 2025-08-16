import HttpException from './http.exception';

class AuthenticationFailedException extends HttpException {
  constructor() {
    super(401, 'Authentication could not be completed');
  }
}

export default AuthenticationFailedException;
