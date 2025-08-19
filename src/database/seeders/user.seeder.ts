import { RolesEnum } from '../../enum/roles.enum';
import { Role } from '../../modules/user/entities/role.entity';
import { User } from '../../modules/user/entities/user.entity';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcrypt';

const userData = [
  {
    name: 'Aniekan Offiong',
    email: 'excellinginmotion@gmail.com',
    password: 'RandomPassword@123',
    roles: [RolesEnum.SYSTEM_ADMIN],
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
