"use client";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Menu,
  X,
  ChevronRight,
  FileText,
  Map,
  Clock,
  Trophy,
  BarChart3,
  Target,
  Zap,
  Users,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { handleAuth } from "../utils";
import type { Session } from "@repo/types";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const next_session = useSession();
  const router = useRouter();

  async function getSessionDetails() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getSession`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log("Error in getting the session", error);
    }
  }

  useEffect(() => {
    getSessionDetails();
  }, []);

  const features = [
    {
      icon: FileText,
      title: "Mock Test Preparation",
      description:
        "Practice with realistic mock tests that simulate actual exam conditions. Get instant feedback and improve your performance.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Map,
      title: "Personalized Learning Roadmap",
      description:
        "AI-powered learning paths tailored to your goals, skill level, and learning pace. Follow a structured journey designed just for you.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Clock,
      title: "Focus Time Tracking",
      description:
        "Monitor your study sessions with built-in focus timers. Build consistent study habits and track your dedication.",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Trophy,
      title: "Competitive Leaderboards",
      description:
        "Compete with peers based on focus time and test scores. Stay motivated with real-time rankings and achievements.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Reports",
      description:
        "Get detailed analytics and insights on your performance. Track progress with visual reports and identify areas for improvement.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "50K+", label: "Tests Completed" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "JEE Aspirant",
      avatar: "👩‍🎓",
      content:
        "The personalized roadmap helped me focus on my weak areas. Cleared JEE Advanced with 98 percentile!",
      rating: 5,
    },
    {
      name: "Rahul Kumar",
      role: "Software Engineer",
      avatar: "👨‍💻",
      content:
        "Mock tests were incredibly realistic. Got placed at my dream company thanks to the DSA preparation.",
      rating: 5,
    },
    {
      name: "Anjali Patel",
      role: "UPSC Aspirant",
      avatar: "📚",
      content:
        "Focus time tracking kept me disciplined. The leaderboard motivated me to study consistently every day.",
      rating: 5,
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-lg shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                LearnQuest AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors cursor-pointer"
              >
                Testimonials
              </button>
            </div>

            {/* Auth Buttons */}

            {!token && !next_session.data?.user?.email ? (
              <div className="hidden md:flex items-center gap-4">
                <button
                  className="px-5 py-2 text-indigo-700 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() => router.push("/auth")}
                >
                  Login
                </button>
                <button
                  className="px-5 py-2 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() =>
                    handleAuth(
                      false,
                      true,
                      { name: "", email: "", password: "" },
                      () => {},
                      () => {}
                    )
                  }
                >
                  Continue as Guest
                </button>
              </div>
            ) : (
              <div className="cursor-pointer">
                <button
                  className="px-5 py-2 text-indigo-700 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    localStorage.removeItem("name");
                    if (next_session && next_session.data) signOut();
                  }}
                >
                  {`Welcome, ${!next_session.data?.user?.email ? localStorage.getItem("name") || "Guest" : next_session.data.user.name}`}
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Testimonials
              </button>
              <div className="pt-2 space-y-2">
                <button className="block w-full px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all">
                  Hassle Free Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ animation: "blob 7s infinite" }}
          ></div>
          <div
            className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ animation: "blob 7s infinite 2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-600 font-medium text-sm mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Learning Platform
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your Goals with
              <span className="bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                {" "}
                Personalized Learning
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Transform your exam preparation with AI-powered roadmaps,
              realistic mock tests, and gamified learning experiences that keep
              you motivated.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                onClick={() => router.push("/auth")}
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all"
              >
                Explore Features
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-md">
                  <div className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-600 font-medium text-sm mb-4">
              <Target className="w-4 h-4" />
              Platform Features
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools and features designed to accelerate your learning
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 group"
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white flex flex-col justify-center">
              <Sparkles className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Ready to Start?</h3>
              <p className="text-indigo-100 mb-6">
                Join thousands of learners achieving their goals with LearnQuest
                AI
              </p>
              <button
                className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center gap-2 w-fit"
                onClick={() => router.push("/auth")}
              >
                Sign Up Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-indigo-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sign Up & Set Goals
              </h3>
              <p className="text-gray-600">
                Create your account and tell us about your learning goals and
                interests
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Get Your AI Roadmap
              </h3>
              <p className="text-gray-600">
                Receive a personalized learning path tailored to your skill
                level and pace
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Learn & Excel
              </h3>
              <p className="text-gray-600">
                Practice with mock tests, track progress, and compete on
                leaderboards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 font-medium text-sm mb-4">
              <Users className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Learners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our community has to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of successful learners. Start your personalized
            learning experience today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              onClick={() => router.push("/auth")}
            >
              Get Started Free
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">LearnQuest AI</span>
              </div>
              <p className="text-sm">
                AI-powered personalized learning platform for competitive exam
                preparation.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm">
                <div>Features</div>
                <div>Pricing</div>
                <div>Mock Tests</div>
                <div>Roadmaps</div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm">
                <div>About Us</div>
                <div>Careers</div>
                <div>Blog</div>
                <div>Contact</div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Cookie Policy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            © 2024 LearnQuest AI. All rights reserved.
          </div>
        </div>
      </footer>

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
