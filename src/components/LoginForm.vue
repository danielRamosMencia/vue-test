<template>
    <div class="flex flex-col justify-center items-center h-screen bg-gray-100 md:flex-row">
        <div class="flex justify-center items-center p-4 md:w-1/3">
            <img src="../assets/logo.svg" alt="Logo" class="w-32 h-32 md:w-48 md:h-48" />
        </div>

        <div class="flex justify-center items-center p-4 md:w-2/3">
            <form @submit.prevent="handleLogin"
                class="border border-gray-300 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full md:w-3/4 lg:w-1/2">
                <span class="text-2xl font-bold text-center block mb-5">Inicia sesión</span>

                <div class="mb-5">
                    <label for="usuario" class="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
                    <input v-model="form.usuario" type="text" id="usuario"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Ingresa tu usuario" />
                    <p v-if="errors.usuario" class="text-red-600 text-sm">{{ errors.usuario }}</p>
                </div>

                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                    <input v-model="form.password" type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Ingresa tu contraseña" />
                    <p v-if="errors.password" class="text-red-600 text-sm">{{ errors.password }}</p>
                </div>

                <div class="flex items-center justify-end">
                    <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center">Ingresar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { loginSchema } from '@/types/schemas/login-schema';

const router = useRouter();
const form = reactive({
    usuario: '',
    password: '',
});

const errors = reactive<{ [key: string]: string }>({});

const handleLogin = () => {
    const result = loginSchema.safeParse(form);

    if (!result.success) {
        errors.usuario = '';
        errors.password = '';
        result.error.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            errors[field] = issue.message;
        });
    } else {
        router.push("/users");
    }
}
</script>