import { signup } from '@/lib/actions/auth'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <form action={signup} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">Create an account</h1>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input name="fullName" placeholder="Full name" required className="border rounded px-3 py-2" />
      <input name="email" type="email" placeholder="Email" required className="border rounded px-3 py-2" />
      <input name="password" type="password" placeholder="Password" required minLength={6} className="border rounded px-3 py-2" />

      <select name="role" required className="border rounded px-3 py-2">
        <option value="">Select your role</option>
        <option value="citizen">Citizen</option>
        <option value="volunteer">Volunteer</option>
        <option value="donor">Restaurant / Food Donor</option>
        <option value="ngo">NGO / Charity</option>
      </select>

      <button type="submit" className="bg-black text-white rounded px-3 py-2">
        Sign up
      </button>

      <p className="text-sm">
        Already have an account? <a href="/login" className="underline">Log in</a>
      </p>
    </form>
  )
}
