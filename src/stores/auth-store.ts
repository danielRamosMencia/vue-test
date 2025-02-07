import { defineStore } from "pinia";
import { axiosClient } from "@/lib/axios";

interface AuthState {
  token: string;
  isAuth: boolean;
  user: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      token: "",
      isAuth: false,
      user: "",
    };
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axiosClient.post("/auth/login", {
          username,
          password,
        });

        if (response.status === 200) {
          this.token = response.data;
          this.user = username;
          this.isAuth = true;
          localStorage.setItem("token", this.token);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("user", this.user);
        }
      } catch (error) {
        console.error("Error al hacer login:", error);
        throw error;
      }
    },
    logout() {
      this.token = "";
      this.user = "";
      this.isAuth = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
    },
  },
});
