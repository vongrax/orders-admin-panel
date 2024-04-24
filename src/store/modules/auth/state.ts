import { User } from '@/typespaces/interfaces/user.interface';
import { Status } from '@/typespaces/enums/status.enum';

export interface State {
  user: User | null;
  status: Status;
  error: string | null;
}

export const state: State = {
  user: null,
  status: Status.IDLE,
  error: null,
};
