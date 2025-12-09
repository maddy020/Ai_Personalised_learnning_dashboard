"use client";
import { useState } from "react";
import {
  Sparkles,
  User,
  Mail,
  Calendar,
  Award,
  Target,
  Clock,
  TrendingUp,
  Edit2,
  Save,
  X,
  Trophy,
  Zap,
  BookOpen,
  Settings,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    avatar: "🦊",
    avatarColor: "from-orange-400 to-red-500",
    joinDate: "January 2024",
    skillLevel: "Intermediate",
    interests: [
      "UPSC Preparation",
      "Data Structures & Algorithms",
      "Aptitude Questions",
    ],
  });

  const [editData, setEditData] = useState({ ...userData });

  const stats = [
    {
      icon: Clock,
      label: "Total Focus Time",
      value: "156 hours",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      label: "Tests Completed",
      value: "48",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      label: "Current Streak",
      value: "12 days",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: TrendingUp,
      label: "Avg Score",
      value: "87%",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const badges = [
    { emoji: "🔥", name: "7-Day Streak", color: "from-orange-400 to-red-500" },
    {
      emoji: "⭐",
      name: "Top Performer",
      color: "from-yellow-400 to-orange-500",
    },
    {
      emoji: "🎯",
      name: "50 Tests Done",
      color: "from-blue-400 to-indigo-500",
    },
    {
      emoji: "⚡",
      name: "100 Hours Focused",
      color: "from-purple-400 to-pink-500",
    },
    {
      emoji: "🏆",
      name: "Leaderboard Top 10",
      color: "from-green-400 to-emerald-500",
    },
    {
      emoji: "📚",
      name: "Knowledge Master",
      color: "from-indigo-400 to-purple-500",
    },
  ];

  const recentActivity = [
    {
      type: "test",
      title: "JEE Physics Mock Test",
      score: "92%",
      date: "2 hours ago",
      color: "bg-blue-100 text-blue-600",
    },
    {
      type: "focus",
      title: "Focused Study Session",
      duration: "2h 30m",
      date: "5 hours ago",
      color: "bg-orange-100 text-orange-600",
    },
    {
      type: "achievement",
      title: 'Earned "7-Day Streak" Badge',
      date: "Yesterday",
      color: "bg-green-100 text-green-600",
    },
    {
      type: "test",
      title: "DSA Practice Test",
      score: "85%",
      date: "2 days ago",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
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
                LearnQuest AI
              </h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              {/* Avatar */}
              <div
                className={`w-24 h-24 rounded-2xl bg-linear-to-br ${userData.avatarColor} flex items-center justify-center text-5xl shadow-lg flex-shrink-0`}
              >
                {userData.avatar}
              </div>

              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {userData.name}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {userData.joinDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                        {userData.skillLevel}
                      </span>
                      {userData.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      placeholder="Email"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-linear-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Badges Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Achievements
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-2 rounded-xl bg-linear-to-br ${badge.color} flex items-center justify-center text-3xl shadow-md`}
                    >
                      {badge.emoji}
                    </div>
                    <div className="text-xs font-medium text-gray-700">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}
                    >
                      {activity.type === "test" && (
                        <Trophy className="w-5 h-5" />
                      )}
                      {activity.type === "focus" && (
                        <Clock className="w-5 h-5" />
                      )}
                      {activity.type === "achievement" && (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {activity.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        {activity.score && (
                          <span className="font-medium text-green-600">
                            Score: {activity.score}
                          </span>
                        )}
                        {activity.duration && (
                          <span className="font-medium text-orange-600">
                            Duration: {activity.duration}
                          </span>
                        )}
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
