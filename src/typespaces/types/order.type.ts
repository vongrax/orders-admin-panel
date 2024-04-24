import { OrderStatus } from '@/typespaces/enums/orderStatus.enum';

export type AppoveOrder = {
  id: number;
  status: OrderStatus;
};
