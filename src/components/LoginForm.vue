<template>
    <div class="flex flex-col justify-center items-center h-screen bg-gray-100 md:flex-row">
        <div class="flex justify-center items-center p-4 md:w-1/3">
            <img src="../assets/logo.svg" alt="Logo" class="w-32 h-32 md:w-48 md:h-48" />
        </div>

        <div class="flex justify-center items-center p-4 md:w-2/3">
            <form class="border border-gray-300 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full md:w-3/4 lg:w-1/2">
                <span class="text-2xl font-bold text-center block mb-5">Inicia sesión</span>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
                    <input type="text" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Ingresa tu usuario" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                    <input type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required placeholder="Ingresa tu contraseña" />
                </div>
                <div class="flex items-center justify-end">
                    <button @click="login" type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center">Ingresar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const login = () => {
    router.push("/users");
}
</script>