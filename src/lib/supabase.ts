import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type AuthUser = {
  id: string
  email: string
  email_confirmed_at: string | null
  user_metadata?: Record<string, any>
}