import { Role } from '@/typespaces/enums/role.enum';

export interface User {
  user: string;
  password: string | number;
  name: string;
  role: Role;
}
