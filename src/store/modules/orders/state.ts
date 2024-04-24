import { Order } from '@/typespaces/interfaces/order.interface';
import { Status } from '@/typespaces/enums/status.enum';

export interface State {
  orders: Order[];
  status: Status;
  error: string | null;
}

export const state: State = {
  orders: [],
  status: Status.IDLE,
  error: null,
};
