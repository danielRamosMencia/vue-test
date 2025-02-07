<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
        <div class="p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-md">
            <h1 class="text-xl font-bold mb-4">
                ¿Está seguro que quiere eliminar el usuario con el ID {{ userId }}?
            </h1>
            <div class="flex justify-end mt-4">
                <button @click="handleDelete"
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mx-2">
                    Confirmar
                </button>
                <button @click="handleCancel"
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user-store";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userId = ref(Number(route.params.id));

const handleDelete = async () => {
    try {
        if (userId.value) {
            await userStore.deleteUser(userId.value);
            router.push("/users");
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
};

const handleCancel = () => {
    router.push("/users");
};
</script>