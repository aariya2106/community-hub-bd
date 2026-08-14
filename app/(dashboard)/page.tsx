import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()

  const [{ count: openIssues }, { count: activeListings }, { count: openRequests }] =
    await Promise.all([
      supabase.from('issues').select('*', { count: 'exact', head: true }).neq('status', 'resolved'),
      supabase.from('food_listings').select('*', { count: 'exact', head: true }).eq('status', 'available'),
      supabase.from('volunteer_requests').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    ])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Open Issues" value={openIssues ?? 0} />
        <StatCard label="Available Food Listings" value={activeListings ?? 0} />
        <StatCard label="Open Volunteer Requests" value={openRequests ?? 0} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  )
}
