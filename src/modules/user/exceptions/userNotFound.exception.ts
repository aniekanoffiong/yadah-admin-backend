import HttpException from '../../../exceptions/http.exception';

class UserNotFoundException extends HttpException {
  constructor() {
    super(404, `User not found`);
  }
}

export default UserNotFoundException;
