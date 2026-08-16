import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'

const MODULE_LINKS = [
  { href: '/issues', label: 'Community Issues' },
  { href: '/food-rescue', label: 'Food Rescue' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/map', label: 'Map' },
]

export default async function WelcomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          CommunityHub BD
        </Link>

        <nav className="hidden md:flex gap-6">
          {MODULE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Link href="/dashboard" className={buttonVariants()}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: 'ghost' })}>
                Log in
              </Link>
              <Link href="/signup" className={buttonVariants()}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-3xl mx-auto text-center px-6 py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Stronger communities, built together
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            CommunityHub BD connects citizens, volunteers, restaurants, and NGOs across
            Bangladesh to report and resolve local issues, rescue surplus food before it goes
            to waste, and match willing hands with the people who need them — all in one place.
          </p>
          <div className="flex items-center justify-center gap-3">
            {user ? (
              <Link href="/dashboard" className={buttonVariants({ size: 'lg' })}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/signup" className={buttonVariants({ size: 'lg' })}>
                  Get started
                </Link>
                <Link href="/login" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
                  I already have an account
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">Community in action</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm"
              >
                Photo placeholder {i}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-6 text-center text-sm text-gray-500">
        CommunityHub BD — built for a hackathon, built for the community.
      </footer>
    </div>
  )
}
