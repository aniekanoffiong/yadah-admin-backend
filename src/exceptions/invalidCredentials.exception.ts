import HttpException from './http.exception';

class InvalidCredentialsException extends HttpException {
  constructor() {
    super(401, 'The credentials provided is not valid');
  }
}

export default InvalidCredentialsException;
