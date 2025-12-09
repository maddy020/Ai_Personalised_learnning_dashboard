"use client";
import { useState } from "react";
import {
  Sparkles,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Medal,
  Crown,
  Award,
  ChevronDown,
  Filter,
  Calendar,
} from "lucide-react";

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("focus");
  const [timeRange, setTimeRange] = useState("week");
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for leaderboard
  const leaderboardData = {
    focus: [
      {
        rank: 1,
        name: "Priya Sharma",
        avatar: "👩‍🎓",
        score: "245 hrs",
        change: "+12",
        color: "from-orange-400 to-red-500",
        badge: "🔥",
      },
      {
        rank: 2,
        name: "Rahul Kumar",
        avatar: "👨‍💻",
        score: "238 hrs",
        change: "+8",
        color: "from-blue-400 to-indigo-500",
        badge: "⚡",
      },
      {
        rank: 3,
        name: "Anjali Patel",
        avatar: "📚",
        score: "232 hrs",
        change: "+15",
        color: "from-green-400 to-emerald-500",
        badge: "🎯",
      },
      {
        rank: 4,
        name: "Arjun Singh",
        avatar: "🦊",
        score: "228 hrs",
        change: "+10",
        color: "from-purple-400 to-pink-500",
        badge: "⭐",
      },
      {
        rank: 5,
        name: "Kavya Reddy",
        avatar: "🐼",
        score: "220 hrs",
        change: "+7",
        color: "from-pink-400 to-rose-500",
        badge: "💫",
      },
      {
        rank: 6,
        name: "Vikram Mehta",
        avatar: "🦁",
        score: "215 hrs",
        change: "+5",
        color: "from-yellow-400 to-orange-500",
        badge: "🌟",
      },
      {
        rank: 7,
        name: "Shreya Das",
        avatar: "🐨",
        score: "210 hrs",
        change: "+9",
        color: "from-teal-400 to-cyan-500",
        badge: "✨",
      },
      {
        rank: 8,
        name: "Aditya Verma",
        avatar: "🦉",
        score: "205 hrs",
        change: "+6",
        color: "from-indigo-400 to-purple-500",
        badge: "🎨",
      },
      {
        rank: 9,
        name: "Neha Gupta",
        avatar: "🐸",
        score: "198 hrs",
        change: "+11",
        color: "from-green-500 to-emerald-600",
        badge: "🏃",
      },
      {
        rank: 10,
        name: "Rohan Joshi",
        avatar: "🦄",
        score: "195 hrs",
        change: "+4",
        color: "from-violet-400 to-purple-500",
        badge: "🎪",
      },
    ],
    tests: [
      {
        rank: 1,
        name: "Anjali Patel",
        avatar: "📚",
        score: "98.5%",
        change: "+2.5",
        color: "from-green-400 to-emerald-500",
        badge: "🏆",
      },
      {
        rank: 2,
        name: "Rahul Kumar",
        avatar: "👨‍💻",
        score: "97.2%",
        change: "+1.8",
        color: "from-blue-400 to-indigo-500",
        badge: "🥇",
      },
      {
        rank: 3,
        name: "Priya Sharma",
        avatar: "👩‍🎓",
        score: "96.8%",
        change: "+3.2",
        color: "from-orange-400 to-red-500",
        badge: "🥈",
      },
      {
        rank: 4,
        name: "Vikram Mehta",
        avatar: "🦁",
        score: "95.5%",
        change: "+1.5",
        color: "from-yellow-400 to-orange-500",
        badge: "🥉",
      },
      {
        rank: 5,
        name: "Kavya Reddy",
        avatar: "🐼",
        score: "94.8%",
        change: "+2.1",
        color: "from-pink-400 to-rose-500",
        badge: "🎯",
      },
      {
        rank: 6,
        name: "Arjun Singh",
        avatar: "🦊",
        score: "93.2%",
        change: "+1.2",
        color: "from-purple-400 to-pink-500",
        badge: "💪",
      },
      {
        rank: 7,
        name: "Shreya Das",
        avatar: "🐨",
        score: "92.5%",
        change: "+2.8",
        color: "from-teal-400 to-cyan-500",
        badge: "📖",
      },
      {
        rank: 8,
        name: "Aditya Verma",
        avatar: "🦉",
        score: "91.7%",
        change: "+1.9",
        color: "from-indigo-400 to-purple-500",
        badge: "🎓",
      },
      {
        rank: 9,
        name: "Neha Gupta",
        avatar: "🐸",
        score: "90.3%",
        change: "+3.1",
        color: "from-green-500 to-emerald-600",
        badge: "📝",
      },
      {
        rank: 10,
        name: "Rohan Joshi",
        avatar: "🦄",
        score: "89.8%",
        change: "+1.7",
        color: "from-violet-400 to-purple-500",
        badge: "✍️",
      },
    ],
    streak: [
      {
        rank: 1,
        name: "Vikram Mehta",
        avatar: "🦁",
        score: "89 days",
        change: "+1",
        color: "from-yellow-400 to-orange-500",
        badge: "🔥",
      },
      {
        rank: 2,
        name: "Priya Sharma",
        avatar: "👩‍🎓",
        score: "76 days",
        change: "+1",
        color: "from-orange-400 to-red-500",
        badge: "💥",
      },
      {
        rank: 3,
        name: "Anjali Patel",
        avatar: "📚",
        score: "68 days",
        change: "+1",
        color: "from-green-400 to-emerald-500",
        badge: "⚡",
      },
      {
        rank: 4,
        name: "Rahul Kumar",
        avatar: "👨‍💻",
        score: "54 days",
        change: "+1",
        color: "from-blue-400 to-indigo-500",
        badge: "🌟",
      },
      {
        rank: 5,
        name: "Shreya Das",
        avatar: "🐨",
        score: "47 days",
        change: "+1",
        color: "from-teal-400 to-cyan-500",
        badge: "✨",
      },
      {
        rank: 6,
        name: "Arjun Singh",
        avatar: "🦊",
        score: "42 days",
        change: "+1",
        color: "from-purple-400 to-pink-500",
        badge: "🎯",
      },
      {
        rank: 7,
        name: "Kavya Reddy",
        avatar: "🐼",
        score: "38 days",
        change: "+1",
        color: "from-pink-400 to-rose-500",
        badge: "💫",
      },
      {
        rank: 8,
        name: "Aditya Verma",
        avatar: "🦉",
        score: "35 days",
        change: "+1",
        color: "from-indigo-400 to-purple-500",
        badge: "🌈",
      },
      {
        rank: 9,
        name: "Neha Gupta",
        avatar: "🐸",
        score: "29 days",
        change: "+1",
        color: "from-green-500 to-emerald-600",
        badge: "⭐",
      },
      {
        rank: 10,
        name: "Rohan Joshi",
        avatar: "🦄",
        score: "25 days",
        change: "+1",
        color: "from-violet-400 to-purple-500",
        badge: "🎪",
      },
    ],
    overall: [
      {
        rank: 1,
        name: "Priya Sharma",
        avatar: "👩‍🎓",
        score: "9,850 pts",
        change: "+250",
        color: "from-orange-400 to-red-500",
        badge: "👑",
      },
      {
        rank: 2,
        name: "Anjali Patel",
        avatar: "📚",
        score: "9,720 pts",
        change: "+310",
        color: "from-green-400 to-emerald-500",
        badge: "🏆",
      },
      {
        rank: 3,
        name: "Rahul Kumar",
        avatar: "👨‍💻",
        score: "9,580 pts",
        change: "+180",
        color: "from-blue-400 to-indigo-500",
        badge: "🥇",
      },
      {
        rank: 4,
        name: "Vikram Mehta",
        avatar: "🦁",
        score: "9,420 pts",
        change: "+220",
        color: "from-yellow-400 to-orange-500",
        badge: "🥈",
      },
      {
        rank: 5,
        name: "Kavya Reddy",
        avatar: "🐼",
        score: "9,180 pts",
        change: "+195",
        color: "from-pink-400 to-rose-500",
        badge: "🥉",
      },
      {
        rank: 6,
        name: "Arjun Singh",
        avatar: "🦊",
        score: "8,960 pts",
        change: "+170",
        color: "from-purple-400 to-pink-500",
        badge: "⭐",
      },
      {
        rank: 7,
        name: "Shreya Das",
        avatar: "🐨",
        score: "8,740 pts",
        change: "+210",
        color: "from-teal-400 to-cyan-500",
        badge: "💎",
      },
      {
        rank: 8,
        name: "Aditya Verma",
        avatar: "🦉",
        score: "8,520 pts",
        change: "+160",
        color: "from-indigo-400 to-purple-500",
        badge: "🌟",
      },
      {
        rank: 9,
        name: "Neha Gupta",
        avatar: "🐸",
        score: "8,310 pts",
        change: "+245",
        color: "from-green-500 to-emerald-600",
        badge: "✨",
      },
      {
        rank: 10,
        name: "Rohan Joshi",
        avatar: "🦄",
        score: "8,090 pts",
        change: "+155",
        color: "from-violet-400 to-purple-500",
        badge: "💫",
      },
    ],
  };

  const categories = [
    {
      id: "overall",
      label: "Overall Points",
      icon: Trophy,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "focus",
      label: "Focus Time",
      icon: Clock,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "tests",
      label: "Test Scores",
      icon: Target,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "streak",
      label: "Daily Streak",
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
    },
  ];

  const currentData = leaderboardData[selectedCategory];
  const myRank = 4; // Current user's rank

  const getRankBadge = (rank) => {
    if (rank === 1)
      return { icon: Crown, color: "text-yellow-500", bg: "bg-yellow-50" };
    if (rank === 2)
      return { icon: Medal, color: "text-gray-400", bg: "bg-gray-50" };
    if (rank === 3)
      return { icon: Medal, color: "text-orange-600", bg: "bg-orange-50" };
    return { icon: Award, color: "text-indigo-600", bg: "bg-indigo-50" };
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Leaderboard
              </h1>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-all font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Range
                </label>
                <div className="flex gap-2">
                  {["today", "week", "month", "all"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        timeRange === range
                          ? "bg-linear-to-r from-indigo-600 to-purple-700 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl transition-all ${
                  isActive
                    ? "bg-white shadow-xl scale-105 border-2 border-indigo-200"
                    : "bg-white shadow-md hover:shadow-lg border-2 border-transparent"
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-br ${category.color} flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {category.label}
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            {/* Top 3 Podium */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Top Performers
              </h2>
              <div className="flex items-end justify-center gap-4 mb-8">
                {/* 2nd Place */}
                <div className="flex-1 text-center">
                  <div
                    className={`w-20 h-20 mx-auto mb-3 rounded-2xl bg-linear-to-br ${currentData[1].color} flex items-center justify-center text-4xl shadow-lg`}
                  >
                    {currentData[1].avatar}
                  </div>
                  <div className="text-4xl mb-2">🥈</div>
                  <div className="font-bold text-gray-900">
                    {currentData[1].name}
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mt-2">
                    {currentData[1].score}
                  </div>
                  <div className="bg-gray-100 h-24 rounded-t-2xl mt-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">2</span>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="flex-1 text-center">
                  <div
                    className={`w-24 h-24 mx-auto mb-3 rounded-2xl bg-linear-to-br ${currentData[0].color} flex items-center justify-center text-5xl shadow-2xl border-4 border-yellow-400`}
                  >
                    {currentData[0].avatar}
                  </div>
                  <div className="text-5xl mb-2">👑</div>
                  <div className="font-bold text-gray-900 text-lg">
                    {currentData[0].name}
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mt-2">
                    {currentData[0].score}
                  </div>
                  <div className="bg-linear-to-b from-yellow-100 to-yellow-200 h-32 rounded-t-2xl mt-4 flex items-center justify-center">
                    <span className="text-5xl font-bold text-yellow-600">
                      1
                    </span>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="flex-1 text-center">
                  <div
                    className={`w-20 h-20 mx-auto mb-3 rounded-2xl bg-linear-to-br ${currentData[2].color} flex items-center justify-center text-4xl shadow-lg`}
                  >
                    {currentData[2].avatar}
                  </div>
                  <div className="text-4xl mb-2">🥉</div>
                  <div className="font-bold text-gray-900">
                    {currentData[2].name}
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mt-2">
                    {currentData[2].score}
                  </div>
                  <div className="bg-gray-100 h-20 rounded-t-2xl mt-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Rankings */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  Full Rankings
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {currentData.map((user, idx) => {
                  const badge = getRankBadge(user.rank);
                  const BadgeIcon = badge.icon;
                  const isCurrentUser = user.rank === myRank;

                  return (
                    <div
                      key={idx}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        isCurrentUser
                          ? "bg-indigo-50 border-l-4 border-indigo-600"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div
                          className={`w-12 h-12 rounded-xl ${badge.bg} flex items-center justify-center shrink-0`}
                        >
                          {user.rank <= 3 ? (
                            <BadgeIcon className={`w-6 h-6 ${badge.color}`} />
                          ) : (
                            <span className="font-bold text-gray-600">
                              {user.rank}
                            </span>
                          )}
                        </div>

                        {/* Avatar */}
                        <div
                          className={`w-12 h-12 rounded-xl bg-linear-to-br ${user.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}
                        >
                          {user.avatar}
                        </div>

                        {/* Name & Badge */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 truncate">
                              {user.name}
                            </span>
                            {isCurrentUser && (
                              <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs rounded-full font-medium">
                                You
                              </span>
                            )}
                            <span className="text-lg">{user.badge}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-green-600 font-medium">
                              {user.change}
                            </span>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                          <div className="text-xl font-bold text-indigo-600">
                            {user.score}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Performance */}
            <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Your Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-indigo-100 mb-1">
                    Current Rank
                  </div>
                  <div className="text-4xl font-bold">#{myRank}</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4">
                  <div className="text-sm text-indigo-100 mb-2">
                    Progress to Top 3
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-indigo-100">
                    Keep going! You're almost there!
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Highlights */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Focus Time
                    </span>
                  </div>
                  <span className="font-bold text-blue-600">42 hrs</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Tests
                    </span>
                  </div>
                  <span className="font-bold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-linear-to-r from-orange-50 to-amber-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Streak
                    </span>
                  </div>
                  <span className="font-bold text-orange-600">7 days</span>
                </div>
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      Top 5 Reached!
                    </div>
                    <div className="text-xs text-gray-600">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      50 Tests Completed
                    </div>
                    <div className="text-xs text-gray-600">5 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
