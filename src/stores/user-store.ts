import { defineStore } from "pinia";
import { axiosClient } from "@/lib/axios";
import { type User, type UsersState } from "@/types/user";

export const useUserStore = defineStore("user", {
  state: (): UsersState => {
    return {
      currentUser: {
        username: "",
        email: "",
        msisdn: "",
      },
      usersList: [],
    };
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await axiosClient.get<User[]>("/users");

        this.usersList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
