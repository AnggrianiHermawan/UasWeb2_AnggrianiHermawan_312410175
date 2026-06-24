export default {
    template: `
    <div class="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-8">
        <div class="bg-white p-10 rounded-3xl shadow-xl border border-pink-100 text-center max-w-lg">
            <h1 class="text-4xl font-extrabold text-pink-600 mb-4">E-Inventory</h1>
            <p class="text-gray-600 mb-8">
                Selamat datang di sistem manajemen stok barang berbasis web. 
                Kelola barangmu dengan mudah, cepat, dan estetik.
            </p>
            
            <div class="flex gap-4 justify-center">
                <router-link 
                    to="/login" 
                    class="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-md"
                >
                    Login Admin
                </router-link>
            </div>
        </div>
        
        <p class="mt-8 text-pink-300 text-sm">
            Projek UAS Pemrograman Web 2 - 2026
        </p>
    </div>
    `
}