<template>
    <div class="flex justify-center items-center h-screen">
        <form class="border border-gray-300 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full md:w-3/4 lg:w-1/2"
            @submit.prevent="handleSubmit">
            <span class="text-2xl font-bold text-center block mb-5">
                {{ isEditMode ? "Editar usuario" : "Registrar nuevo usuario" }}
            </span>

            <div class="mb-5">
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Nombre de usuario</label>
                <input v-model="formData.username" type="text" id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ingresa el usuario" />
                <p v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</p>
            </div>

            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input v-model="formData.email" type="email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ingresa el email" />
                <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>

            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                <input v-model="formData.password" type="password" id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ingresa tu contraseña" />
                <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
            </div>

            <div class="mb-5">
                <label for="msisdn" class="block mb-2 text-sm font-medium text-gray-900">MSISDN</label>
                <input v-model="formData.msisdn" type="text" id="msisdn"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ingresa el MSISDN" />
                <p v-if="errors.msisdn" class="text-red-500 text-sm">{{ errors.msisdn }}</p>
            </div>

            <div class="flex justify-end mt-4">
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-lg w-full sm:w-auto px-5 py-2.5 text-center mr-2">
                    {{ isEditMode ? "Actualizar" : "Registrar" }}
                </button>
                <button type="button" @click="handleCancel"
                    class="text-white bg-gray-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-sm w-full text-lg sm:w-auto px-5 py-2.5 text-center">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</template>


<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { z } from "zod";
import { userSchema } from "@/types/schemas/user-schema";
import { useUserStore } from "@/stores/user-store";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const formData = reactive({
    username: "",
    email: "",
    msisdn: "",
    password: "",
});

const errors = reactive<Record<string, string>>({});
const isEditMode = !!route.params.id;

onMounted(async () => {
    if (isEditMode) {
        try {
            const userId = Number(route.params.id);

            const user = userStore.usersList.find((u) => u.id === userId);
            if (!user) {
                await userStore.fetchUsers();
            }

            const selectedUser = userStore.usersList.find((u) => u.id === userId);
            if (selectedUser) {
                Object.assign(formData, selectedUser);
            } else {
                console.error("Usuario no encontrado");
                router.push("/users");
            }
        } catch (error) {
            console.error("Error al cargar los datos del usuario", error);
        }
    }
});

const handleSubmit = async () => {
    errors.username = "";
    errors.email = "";
    errors.msisdn = "";
    errors.password = "";

    try {
        userSchema.parse(formData);

        if (isEditMode) {
            const userId = Number(route.params.id);
            await userStore.updateUser(formData, userId);
            console.log("Usuario actualizado");
        } else {
            // Lógica para registrar
            await userStore.registerUser(formData);
            console.log("Usuario registrado");
        }

        router.push("/users");
    } catch (error) {
        if (error instanceof z.ZodError) {
            error.errors.forEach((issue) => {
                const fieldName = issue.path[0] as string;
                errors[fieldName] = issue.message;
            });
        } else {
            console.error("Error en el manejo del usuario:", error);
        }
    }
};

const handleCancel = () => {
    router.push("/users");
};
</script>
