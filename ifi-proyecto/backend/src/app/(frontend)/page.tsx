import { redirect } from 'next/navigation'

export default function HomePage() {
  // Esto redirige automáticamente a tu archivo index.html
  redirect('/index.html')
}