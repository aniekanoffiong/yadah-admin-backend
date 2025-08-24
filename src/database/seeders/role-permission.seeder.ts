import { RolesEnum } from "../../enum/roles.enum";
import { Permission } from "../../modules/user/entities/permission.entity";
import { Role } from "../../modules/user/entities/role.entity";
import { AppDataSource } from "../data-source";
import { permissionsToSeed } from "./permission.seeder";

const userPermissions = permissionsToSeed[0].map(perm => perm.name)
const adminPermissions = permissionsToSeed[1].map(perm => perm.name)
const superAdminPermissions = permissionsToSeed[2].map(perm => perm.name)
const systemAdminPermissions = permissionsToSeed[3].map(perm => perm.name)

export const rolePermissionsMap: Record<string, string[]> = {
  [RolesEnum.USER]: userPermissions,
  [RolesEnum.GUEST]: [],
  [RolesEnum.ADMIN]: [...userPermissions, ...adminPermissions],
  [RolesEnum.SUPER_ADMIN]: [
    ...userPermissions, ...adminPermissions, ...superAdminPermissions,
  ],
  [RolesEnum.SYSTEM_ADMIN]: [
    ...userPermissions, ...adminPermissions, ...superAdminPermissions, ...systemAdminPermissions
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
