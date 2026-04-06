import axiosClient from "../../../axiosClient"; // chỉnh lại path nếu cần

export const authApi = {
    // 🔐 LOGIN
    login: async (email: string, password: string) => {
        const res = await axiosClient.get(`/users?email=${email}`);
        const user = res.data[0];

        if (!user || user.password !== password) {
            throw new Error("Sai tài khoản hoặc mật khẩu");
        }

        return {
            accessToken: "fake-token",
            user
        };
    },

    // 📝 REGISTER
    register: async (data: {
        email: string;
        password: string;
        name: string;
    }) => {
        const res = await axiosClient.post("/users", {
            ...data,
            role: "user" // mặc định user
        });

        return res.data;
    }
};