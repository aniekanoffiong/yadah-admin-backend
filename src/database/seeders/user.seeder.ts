import { RolesEnum } from '../../enum/roles.enum';
import { Role } from '../../modules/user/entities/role.entity';
import { User } from '../../modules/user/entities/user.entity';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcrypt';
import dotenv from "dotenv"

dotenv.config()

const userData = [
  {
    name: 'Aniekan Offiong',
    email: process.env.SYSTEM_USER_EMAIL!,
    password: process.env.SYSTEM_USER_PASSWORD!,
    roles: [RolesEnum.SYSTEM_ADMIN],
    isActive: true
  },
];

export async function seedUser() {
  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);
  const rolesMap = Object.fromEntries(
    (await roleRepo.find()).map(role => [role.name, role])
  );
  for (const u of userData) {
    const user = userRepo.create({
      ...u,
      password: bcrypt.hashSync(u.password, 10),
      roles: u.roles.map(name => rolesMap[name]) 
    });
    await userRepo.save(user);
  }
  console.log('Seeded Users');
}
