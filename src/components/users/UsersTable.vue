<template>
    <div class="flex justify-between">
        <p class="text-2xl font-bold my-4">Usuarios</p>
        <RouterLink to="/users/create" class="my-4">
            <button class="w-auto flex flex-row bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <p class="mr-4">Agregar</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </RouterLink>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        NOMBRE DE USUARIO
                    </th>
                    <th scope="col" class="px-6 py-3">
                        EMAIL
                    </th>
                    <th scope="col" class="px-6 py-3">
                        MSISDN
                    </th>
                    <th scope="col" class="px-6 py-3">
                        FECHA DE CREACION
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ACCIONES
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in usersList" :key="user.id"
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ user.username }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.msisdn }}
                    </td>
                    <td class="px-6 py-4">
                        {{ formatDate(user.createdAt) }}
                    </td>
                    <td class="px-6 py-4">
                        <template v-if="user.username !== currentUser">
                            <RouterLink :to="`/users/edit/${user.id}`"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-2">Editar
                            </RouterLink>
                            <RouterLink :to="`/users/delete/${user.id}`"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar
                            </RouterLink>
                        </template>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useAuthStore } from '@/stores/auth-store';
import { formatDate } from '@/lib/utils';

const userStore = useUserStore();
const authStore = useAuthStore();

const usersList = computed(() => userStore.usersList);
const currentUser = localStorage.getItem('user');

onMounted(async () => {
    await userStore.fetchUsers();
});
</script>
