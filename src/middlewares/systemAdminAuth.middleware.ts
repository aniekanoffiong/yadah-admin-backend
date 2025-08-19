import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import { UserRepository } from '../modules/user/repositories/user.repository';
import { RolesEnum } from '../enum/roles.enum';

// Example check for system admin; replace with your real auth logic
async function isSystemAdmin(req: CustomRequest): Promise<boolean> {
  const userId = req.token?.id;
  if (!userId) {
    return false;
  }

  const userRepository = new UserRepository();
  const user = await userRepository.findById(userId);
  if (!user) {
    return false;
  }

  return user.roles.some(role => role.name === RolesEnum.SYSTEM_ADMIN);
}

export async function systemAdminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  // if path is exactly like /admin/config-fields/entity/:entityName then skip system admin check
  // Adjust req.baseUrl or full path as needed depending on your mount

  // Extract the relative path after /admin/config-fields prefix:
  const relativePath = req.path; // express trims mount path from req.path

  // Allow /entity/:entityName path for other admins (non system-admins)
  if (relativePath.startsWith('/entity/')) {
    // Allow access, so just next():
    return next();
  }

  // For all other routes under /admin/config-fields, restrict to system admins only
  if (await isSystemAdmin(req)) {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: System admin access only' });
  }
}
