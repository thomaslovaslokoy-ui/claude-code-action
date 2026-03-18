import { useState, useEffect } from 'react'
import { BANKS, type Bank } from '../lib/banks-data'
import { supabase } from '../lib/supabase'

export function useBanks() {
  const [banks, setBanks] = useState<Bank[]>(BANKS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBanks() {
      try {
        const { data, error } = await supabase
          .from('banks')
          .select('*')
          .order('is_sponsored', { ascending: false })
          .order('rating', { ascending: false })

        if (error || !data || data.length === 0) {
          setBanks(BANKS)
        } else {
          setBanks(data as unknown as Bank[])
        }
      } catch {
        setBanks(BANKS)
      } finally {
        setLoading(false)
      }
    }

    fetchBanks()
  }, [])

  return { banks, loading }
}
