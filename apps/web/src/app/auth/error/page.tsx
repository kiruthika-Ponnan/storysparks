import Link from "next/link";

interface ErrorPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams.error;
  
  const getErrorMessage = (error: string) => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "Access denied. You do not have permission to sign in.";
      case "Verification":
        return "The verification token has expired or has already been used.";
      case "Default":
        return "An error occurred during authentication.";
      default:
        return "An unexpected error occurred.";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-50 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-red-400">Authentication Error</h1>
            <p className="mt-2 text-sm text-zinc-400">
              {error ? getErrorMessage(error) : "An unexpected error occurred during sign in."}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="inline-flex items-center px-4 py-2 bg-amber-400 text-zinc-950 rounded-xl font-semibold hover:bg-amber-300 transition-colors"
          >
            Try again
          </Link>
          
          <div>
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
