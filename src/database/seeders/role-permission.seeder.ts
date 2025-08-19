import { RolesEnum } from "../../enum/roles.enum";
import { Permission } from "../../modules/user/entities/permission.entity";
import { Role } from "../../modules/user/entities/role.entity";
import { AppDataSource } from "../data-source";
import { permissionsToSeed } from "./permission.seeder";

const adminPermissions = permissionsToSeed[0].map(perm => perm.name)
const superAdminPermissions = permissionsToSeed[1].map(perm => perm.name)
const systemAdminPermissions = permissionsToSeed[2].map(perm => perm.name)

export const rolePermissionsMap: Record<string, string[]> = {
  [RolesEnum.USER]: [],
  [RolesEnum.GUEST]: [],
  [RolesEnum.ADMIN]: adminPermissions,
  [RolesEnum.SUPER_ADMIN]: [
    ...adminPermissions, ...superAdminPermissions,
  ],
  [RolesEnum.SYSTEM_ADMIN]: [
    ...adminPermissions, ...superAdminPermissions, ...systemAdminPermissions
  ],
};

export async function seedRolesWithPermissions() {
  const roleRepo = AppDataSource.getRepository(Role);
  const permissionRepo = AppDataSource.getRepository(Permission);
  const permissionsMap = Object.fromEntries(
    (await permissionRepo.find()).map(perm => [perm.name, perm])
  );
  const roles = Object.entries(rolePermissionsMap).map(([roleName, permissions]) =>
    roleRepo.create({ name: roleName, permissions: permissions.map(name => permissionsMap[name]) })
  );
  await roleRepo.save(roles);
  console.log('Seeded Roles with Permissions');
}
