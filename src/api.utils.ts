import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const devUser = 3

export default api
