import { User } from '@/typespaces/interfaces/user.interface';
import { Auth } from '@/typespaces/types/auth.type';
import InstanceHttpClient from './instance';

export default class AuthClient extends InstanceHttpClient {
  constructor() {
    super('users');
  }

  async signIn(data: Auth): Promise<User> {
    try {
      const user: User[] = await this.apiCall({
        method: 'GET',
        params: data,
      });
      if (user.length) {
        return user[0];
      }
      throw new Error();
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
