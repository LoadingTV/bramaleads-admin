// src/hooks/useLeads.ts
import useSWR from 'swr'
import { api } from '../lib/api'
import type { Lead } from '@/types/lead'

export function useLeads() {
  const { data, error, isLoading } = useSWR<Lead[]>(
    '/leads',
    () => api.get('/leads').then(res => res.data)
  )
  return {
    leads: data ?? [],
    isLoading,
    isError: !!error,
  }
}
