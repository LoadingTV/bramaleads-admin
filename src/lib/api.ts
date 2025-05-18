import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  withCredentials: true,                              
  headers: { 'Content-Type': 'application/json' },
})


api.interceptors.response.use(
  res => res,
  (err: AxiosError) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
