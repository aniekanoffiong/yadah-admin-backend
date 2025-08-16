import HttpException from './http.exception';

class InvalidTwoFactorException extends HttpException {
  constructor() {
    super(401, 'The two factor authentication code provided is invalid');
  }
}

export default InvalidTwoFactorException;
