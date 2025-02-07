import { defineStore } from "pinia";
import { axiosClient } from "@/lib/axios";
import { type User, type UsersState } from "@/types/user";
import { type UserInput } from "@/types/schemas/user-schema";

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
    async registerUser(user: UserInput) {
      try {
        const response = await axiosClient.post<User>("/users", user);

        if (response.status === 201) {
          this.usersList.push(response.data);
        }
      } catch (error) {
        alert("Error al registrar el usuario, o usuario existente");
        console.error(error);
      }
    },
    async updateUser(user: UserInput, id: number) {
      try {
        const response = await axiosClient.put<User>(`/users/${id}`, user);

        if (response.status === 200) {
          const index = this.usersList.findIndex((user) => user.id === id);
          if (index !== -1) {
            this.usersList[index] = response.data;
          }
        }
      } catch (error) {
        alert("Error al actualizar el usuario");
        console.error(error);
      }
    },

    async deleteUser(id: number) {
      try {
        const response = await axiosClient.delete(`/users/${id}`);

        if (response.status === 200) {
          this.usersList = this.usersList.filter((user) => user.id !== id);
        }
      } catch (error) {
        alert("Error al eliminar el usuario");
        console.error(error);
      }
    },
  },
});
