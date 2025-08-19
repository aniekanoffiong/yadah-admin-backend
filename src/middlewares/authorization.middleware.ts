import { Response, NextFunction } from 'express';
import { UserRepository } from '../modules/user/repositories/user.repository';
import { CustomRequest } from '../interfaces/customRequest';

export function authorizationMiddleware(neededPermission: string) {
  return async function(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.token?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userRepository = new UserRepository();
      const user = await userRepository.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Collect all permissions the user has
      const userPermissions = new Set<string>();
      user.roles.forEach(role => {
        role.permissions.forEach(perm => userPermissions.add(perm.name));
      });

      if (!userPermissions.has(neededPermission)) {
        return res.status(403).json({ message: 'Access Forbidden' });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}
