import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // el proxy de vite redirige a tu backend
})

export default api