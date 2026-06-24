// frontend-spa/components/Login.js
import axios from '../axiosConfig.js';

export default {
  template: `
    <div class="flex h-screen items-center justify-center bg-pink-50">
      <form @submit.prevent="login" class="p-8 bg-white rounded-2xl shadow-xl w-96">
        <h2 class="text-2xl font-bold text-pink-600 mb-6">Login Admin</h2>
        <input v-model="form.username" placeholder="Username" class="w-full p-3 mb-4 border rounded-lg">
        <input v-model="form.password" type="password" placeholder="Password" class="w-full p-3 mb-6 border rounded-lg">
        <button class="w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">Login</button>
      </form>
    </div>
  `,
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/login', this.form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        this.$router.push('/dashboard');
      } catch (e) {
        alert('Login Gagal: ' + (e.response?.data?.message || 'Error'));
      }
    }
  }
};