import LoginForm from '@/components/auth/LoginForm';

export default function RootPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <LoginForm />
    </div>
  );
}
