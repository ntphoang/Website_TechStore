import { api } from '../../../lib/api';
const categoryApi = {
  getAll: () => {
    return api.get('/categories');
  },

  getById: (id: number) => {
    return api.get(`/categories/${id}`);
  },

  create: (data: any) => {
    return api.post('/categories', data);
  },

  update: (id: number, data: any) => {
    return api.put(`/categories/${id}`, data);
  },

  delete: (id: number) => {
    return api.delete(`/categories/${id}`);
  },
};

export default categoryApi;
