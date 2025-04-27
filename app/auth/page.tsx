import { redirect } from 'next/navigation';

export default function AuthPage() {
  // Redirect to the login page by default
  redirect('/auth/login');
}
