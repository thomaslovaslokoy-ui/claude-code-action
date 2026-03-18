import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const slug = url.searchParams.get('slug')

  if (!slug) {
    return new Response('Missing slug', { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Track click
  await supabase.from('click_events').insert({
    slug,
    referrer: req.headers.get('referer'),
    user_agent: req.headers.get('user-agent'),
  })

  // Get affiliate URL
  const { data: bank } = await supabase
    .from('banks')
    .select('affiliate_url')
    .eq('slug', slug)
    .single()

  if (!bank?.affiliate_url) {
    return new Response('Bank not found', { status: 404 })
  }

  return new Response(null, {
    status: 302,
    headers: { Location: bank.affiliate_url },
  })
})
