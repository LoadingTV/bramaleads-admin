// src/types/lead.ts

export interface Project {
    id: string
    name: string
  }
  
  export interface Lead {
    id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    gclid?: string | null
    utm_source?: string | null
    utm_campaign?: string | null
  
    source_project: Project
  
    status: 'new' | 'in_progress' | 'done' | 'spam'
    is_spam: boolean
    is_viewed: boolean
  
    cost?: number | null
    scheduled_at?: string | null
  
    created_at: string
    updated_at: string
  }
  