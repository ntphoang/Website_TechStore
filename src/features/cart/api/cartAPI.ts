import { api } from '../../../lib/api';

const cartApi = {
  getCart: () => {
    return api.get('/carts');
  },

  addToCart: (data: any) => {
    return api.post('/carts', data);
  },

  updateCart: (id: number, data: any) => {
    return api.put(`/carts/${id}`, data);
  },

  removeFromCart: (id: number) => {
    return api.delete(`/carts/${id}`);
  },
};

export default cartApi;
