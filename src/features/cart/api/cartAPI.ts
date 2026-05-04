import axiosClient from "../../../lib/axiosClient";

const cartApi = {
  getCart: () => {
    return axiosClient.get("/carts");
  },

  addToCart: (data: any) => {
    return axiosClient.post("/carts", data);
  },

  updateCart: (id: number, data: any) => {
    return axiosClient.put(`/carts/${id}`, data);
  },

  removeFromCart: (id: number) => {
    return axiosClient.delete(`/carts/${id}`);
  }
};

export default cartApi;