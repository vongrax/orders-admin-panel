import { Order } from '@/typespaces/interfaces/order.interface';
import { Query } from '@/typespaces/types/query.type';
import { AppoveOrder } from '@/typespaces/types/order.type';
import InstanceHttpClient from './instance';

export default class OrderClient extends InstanceHttpClient {
  constructor() {
    super('events');
  }

  async fetchOrders(query?: Query): Promise<Order[]> {
    try {
      return await this.apiCall({
        method: 'GET',
        params: query,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async approveOrder(data: AppoveOrder) {
    try {
      await this.apiCall({
        method: 'PUT',
        url: `${data.id}`,
        data,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async removeOrder(id: number) {
    try {
      await this.apiCall({
        method: 'DELETE',
        url: `${id}`,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async createOrder(data: Order) {
    try {
      await this.apiCall({
        method: 'POST',
        data,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
