import axios from 'axios'
import { store } from './store'
import Cookies from 'js-cookie'

const service = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
})

service.interceptors.request.use(
  (config: any) => {
    const { currentUser } = store.getState()
    const token = currentUser?.token || Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

export default service
