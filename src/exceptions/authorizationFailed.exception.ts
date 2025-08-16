import HttpException from './http.exception';

class AuthorizationFailedException extends HttpException {
  constructor() {
    super(401, 'User is not authorization to access resource');
  }
}

export default AuthorizationFailedException;
