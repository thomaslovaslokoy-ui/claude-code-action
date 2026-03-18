import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const email = url.searchParams.get('email')

  if (!email) {
    return new Response('Missing email', { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  await supabase.from('newsletter_subscribers').delete().eq('email', email)

  return new Response('Du er nå avmeldt nyhetsbrevet.', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
})
