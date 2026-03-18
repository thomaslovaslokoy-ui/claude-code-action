import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Fetch current rates from banks table and store in history
  const { data: banks } = await supabase
    .from('banks')
    .select('id, savings_rate')

  if (banks) {
    const historyEntries = banks.map((bank) => ({
      bank_id: bank.id,
      savings_rate: bank.savings_rate,
    }))

    await supabase.from('bank_rate_history').insert(historyEntries)
  }

  return new Response('Rates refreshed', { status: 200 })
})
