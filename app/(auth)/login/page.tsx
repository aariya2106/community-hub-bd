import { login } from '@/lib/actions/auth'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <form action={login} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">Log in</h1>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input name="email" type="email" placeholder="Email" required className="border rounded px-3 py-2" />
      <input name="password" type="password" placeholder="Password" required className="border rounded px-3 py-2" />

      <button type="submit" className="bg-black text-white rounded px-3 py-2">
        Log in
      </button>

      <p className="text-sm">
        No account yet? <a href="/signup" className="underline">Sign up</a>
      </p>
    </form>
  )
}
