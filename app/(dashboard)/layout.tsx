import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/actions/auth'

const NAV_LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/issues', label: 'Community Issues' },
  { href: '/food-rescue', label: 'Food Rescue' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/map', label: 'Map' },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <nav className="flex gap-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <span>{profile?.full_name} · {profile?.role}</span>
          <form action={logout}>
            <button type="submit" className="underline">Log out</button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
