import { OrderStatus } from '@/typespaces/enums/orderStatus.enum';

export interface Order {
  id: number;
  name: string;
  address: string;
  date: string;
  status: OrderStatus;
  comment: string | null;
}
