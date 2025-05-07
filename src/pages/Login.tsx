import { googleLogin } from "../utils/hooks/useAuthorize";
import { useState } from "react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);

    googleLogin().finally(() => {
      setIsLoading(false);
      if (window) {
        window.location.reload();
      }

    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to continue to your account</p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-3 space-x-3 text-gray-700 transition-colors duration-300 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? (
              <svg className="w-5 h-5 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            )}
            <span>{isLoading ? "Connecting..." : "Sign in with Google"}</span>
          </button>

          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500">Don't have an account?</span>
            <a href="#" className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </a>
          </div>
        </div>

        <div className="pt-4 text-center text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default LoginPage;