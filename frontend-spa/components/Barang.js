import axios from '../axiosConfig.js';

export default {
    template: `
    <div class="p-8 bg-pink-50 min-h-screen">
        <div class="flex justify-between mb-6">
            <h2 class="text-2xl font-bold text-pink-700">Master Barang</h2>
            <button @click="openModal" class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition shadow-sm">+ Tambah</button>
        </div>

        <table class="w-full bg-white rounded-lg shadow-sm p-4">
            <thead>
                <tr class="border-b text-pink-600 text-left bg-pink-50/50">
                    <th class="p-3 rounded-tl-lg">Nama</th>
                    <th class="p-3">Stok</th>
                    <th class="p-3">Harga</th>
                    <th class="p-3 rounded-tr-lg">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading && list.length === 0">
                    <td colspan="4" class="p-8 text-center text-pink-500 font-medium animate-pulse">Sedang memuat data...</td>
                </tr>
                
                <tr v-else-if="!loading && list.length === 0">
                    <td colspan="4" class="p-8 text-center text-gray-400">Belum ada data barang. Silakan tambah data baru.</td>
                </tr>

                <tr v-for="b in list" :key="b.id" class="border-b hover:bg-gray-50 transition">
                    <td class="p-3 font-medium text-gray-700">{{ b.nama_barang }}</td>
                    <td class="p-3 text-gray-600">{{ b.stok }}</td>
                    <td class="p-3 text-gray-600">Rp {{ Number(b.harga || 0).toLocaleString() }}</td>
                    <td class="p-3">
                        <button @click="editData(b)" class="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded transition mr-1">Edit</button>
                        <button @click="deleteData(b.id)" class="text-red-500 hover:bg-red-50 px-2 py-1 rounded transition">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm transition-opacity">
            <div class="bg-white p-6 rounded-2xl w-96 shadow-2xl">
                <h3 class="font-bold mb-4 text-xl text-pink-700">{{ isEdit ? 'Edit Barang' : 'Tambah Barang' }}</h3>
                
                <div class="space-y-3">
                    <div>
                        <label class="text-sm text-gray-500 mb-1 block">Nama Barang</label>
                        <input v-model="form.nama_barang" class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400" placeholder="Masukkan nama...">
                    </div>
                    <div>
                        <label class="text-sm text-gray-500 mb-1 block">Stok Barang</label>
                        <input v-model="form.stok" type="number" class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400" placeholder="0">
                    </div>
                    <div>
                        <label class="text-sm text-gray-500 mb-1 block">Harga (Rp)</label>
                        <input v-model="form.harga" type="number" class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400" placeholder="0">
                    </div>
                </div>
                
                <div class="flex justify-end gap-3 mt-6">
                    <button @click="showModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">Batal</button>
                    <button @click="saveData" :disabled="loading" class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 font-medium transition shadow-md">
                        {{ loading ? 'Menyimpan...' : 'Simpan Data' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return { 
            list: [], 
            loading: false,
            showModal: false,
            isEdit: false,
            form: { id: '', nama_barang: '', stok: 0, harga: 0, kategori_id: 1 }
        }
    },
    methods: {
        async fetchData() {
            this.loading = true;
            try {
                const res = await axios.get('/barang');
                this.list = res.data.data || res.data || [];
            } catch (e) {
                if (e.response && e.response.status !== 401) {
                   console.error("Gagal ambil data:", e);
                }
            } finally {
                this.loading = false;
            }
        },
        openModal() { 
            this.isEdit = false; 
            this.form = { id: '', nama_barang: '', stok: 0, harga: 0, kategori_id: 1 }; 
            this.showModal = true; 
        },
        editData(item) { 
            this.isEdit = true; 
            this.form = { ...item }; 
            this.showModal = true; 
        },
        async saveData() {
            this.loading = true;
            try {
                if (this.isEdit) await axios.put('/barang/' + this.form.id, this.form);
                else await axios.post('/barang', this.form);
                
                this.showModal = false;
                await this.fetchData();
            } catch (e) { 
                alert("Gagal menyimpan data! Pastikan kolom terisi.");
            } finally {
                this.loading = false;
            }
        },
        async deleteData(id) {
            if(confirm('Hapus barang ini?')) {
                this.loading = true;
                try {
                    await axios.delete('/barang/' + id);
                    await this.fetchData();
                } catch (e) {
                    alert('Gagal menghapus data');
                } finally {
                    this.loading = false;
                }
            }
        }
    },
    mounted() { 
        // Otomatis memuat data tanpa tombol manual!
        this.fetchData(); 
    }
}