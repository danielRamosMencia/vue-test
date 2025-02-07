<template>

    <div class="flex justify-center items-center h-screen">
        <form class="border border-gray-300 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full md:w-3/4 lg:w-1/2">
            <span class="text-2xl font-bold text-center block mb-5">Editar usuario {{ userId }}</span>
            <div class="mb-5">
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Nombre de usuario</label>
                <input type="text" id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ingresa el usuario" required />
            </div>
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ingresa el email" required />
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                <input type="password" id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required placeholder="Ingresa tu contraseña" />
            </div>
            <div class="mb-5">
                <label for="msisdn" class="block mb-2 text-sm font-medium text-gray-900">MSISDN</label>
                <input type="text" id="msisdn"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ingresa el MSISDN" required />
            </div>
            <div class="flex justify-end mt-4">
                <button type="submit" @click="handleEdit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2">Editar</button>
                <button type="submit" @click="handleCancel"
                    class="text-white bg-gray-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancelar</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userId = ref(route.params.id);

const handleEdit = () => {
    console.log('Usuario editado', userId.value);
    router.push('/users');
}

const handleCancel = () => {
    router.push('/users');
}
</script>