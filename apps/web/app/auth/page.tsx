"use client";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  BookOpen,
  Trophy,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { handleAuth } from "../../utils";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const handleFormData = (
    data: {
      name: string;
      email: string;
      password: string;
    },
    isLoginSuccess: boolean
  ) => {
    setFormData(data);
    if (isLoginSuccess) router.push("/");
  };

  const handleLoginState = (value: boolean) => {
    setIsLogin(value);
  };

  const handleSubmit = (isGuest: boolean = false) => {
    handleAuth(isLogin, isGuest, formData, handleFormData, handleLoginState);
  };

  const handleGoogleSignIn = () => {
    if (!session) {
      signIn();
    } else signOut();
  };

  const handleGuestContinue = async () => {
    try {
      handleSubmit(true);
    } catch (error) {
      console.log("Error in continue as guest", error);
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyPress = async (e: any) => {
    if (e.key === "Enter") {
      await handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: "blob 7s infinite",
          }}
        ></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: "blob 7s infinite 2s",
          }}
        ></div>
        <div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: "blob 7s infinite 4s",
          }}
        ></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 flex-col justify-between text-white shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-2xl font-bold">LearnQuest AI</h1>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Personalized Learning,
              <br />
              Gamified Experience
            </h2>
            <p className="text-indigo-100 text-lg mb-12">
              Transform your education journey with AI-powered personalization
              and engaging game mechanics
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Adaptive Learning Paths
                  </h3>
                  <p className="text-indigo-100">
                    AI tailors content to your unique learning style and pace
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Earn Rewards & Badges
                  </h3>
                  <p className="text-indigo-100">
                    Level up and unlock achievements as you progress
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Comprehensive Tracking
                  </h3>
                  <p className="text-indigo-100">
                    Monitor your progress with detailed analytics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-indigo-100 text-sm">
            © 2024 LearnQuest AI. All rights reserved.
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                  LearnQuest AI
                </h1>
              </div>

              {/* Toggle buttons */}
              <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
                    isLogin
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
                    !isLogin
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome back!" : "Create your account"}
              </h2>
              <p className="text-gray-600 mb-8">
                {isLogin
                  ? "Sign in to continue your learning journey"
                  : "Start your personalized learning adventure today"}
              </p>

              <div className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    signIn("credentials", {
                      email: formData.email,
                      password: formData.password,
                      redirect: false,
                    });
                  }}
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={handleGuestContinue}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Continue as Guest
                </button>
              </div>

              {!isLogin && (
                <p className="text-xs text-gray-500 text-center mt-6">
                  By signing up, you agree to our{" "}
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Privacy Policy
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `,
        }}
      />
    </div>
  );
}
