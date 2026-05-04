import axiosClient from "../../../lib/axiosClient";
const categoryApi = {
  getAll: () => {
    return axiosClient.get("/categories");
  },

  getById: (id: number) => {
    return axiosClient.get(`/categories/${id}`);
  },

  create: (data: any) => {
    return axiosClient.post("/categories", data);
  },

  update: (id: number, data: any) => {
    return axiosClient.put(`/categories/${id}`, data);
  },

  delete: (id: number) => {
    return axiosClient.delete(`/categories/${id}`);
  }
};

export default categoryApi;