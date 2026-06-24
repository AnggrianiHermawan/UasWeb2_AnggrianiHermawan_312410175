export default {
    template: `
    <div class="flex h-screen">
        <nav class="w-64 bg-gray-800 text-white p-4">
            <h1 class="font-bold mb-6">Inventory App</h1>
            <router-link to="/barang" class="block py-2">Master Barang</router-link>
            <button @click="logout" class="mt-10 text-red-400">Logout</button>
        </nav>
        <main class="flex-1 p-8">
            <h1 class="text-2xl font-bold">Dashboard Admin</h1>
        </main>
    </div>
    `,
    methods: {
        logout() {
    localStorage.clear();
    this.$router.push('/login');
}
}
}