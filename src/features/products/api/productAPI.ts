import { api } from '../../../lib/api';
const productApi = {
  getAll: () => {
    return api.get('/products');
  },

  getById: (id: number) => {
    return api.get(`/products/${id}`);
  },

  create: (data: any) => {
    return api.post('/products', data);
  },

  update: (id: number, data: any) => {
    return api.put(`/products/${id}`, data);
  },

  delete: (id: number) => {
    return api.delete(`/products/${id}`);
  },
};

export default productApi;
