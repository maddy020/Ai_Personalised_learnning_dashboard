"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  Target,
  Clock,
  TrendingUp,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { Session } from "@repo/types";

export default function FocusTimerPage() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const intervalRef = useRef(null);
  const token = sessionStorage.getItem("token");

  const modes = {
    focus: {
      duration: 25 * 60,
      label: "Focus Time",
      color: "from-indigo-500 to-purple-600",
      icon: Brain,
    },
    shortBreak: {
      duration: 5 * 60,
      label: "Short Break",
      color: "from-green-500 to-emerald-600",
      icon: Coffee,
    },
    longBreak: {
      duration: 15 * 60,
      label: "Long Break",
      color: "from-blue-500 to-cyan-600",
      icon: Target,
    },
  };

  const currentMode = modes[mode];
  const Icon = currentMode.icon;

  async function getSessionDetails() {
    try {
      const response = await axios.get<Session>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getSession`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      //@ts-ignore
      if (response?.data?.success) {
        //@ts-ignore
        setCurrentSession(response.data.session);
      }
    } catch (error) {
      console.log("Error in getting the session", error);
    }
  }

  useEffect(() => {
    getSessionDetails();
  }, []);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const handleTimerComplete = async () => {
    try {
      setIsRunning(false);
      if (mode === "focus") {
        setCompletedSessions((prev) => prev + 1);
        setTotalFocusTime((prev) => prev + 25);
        if (soundEnabled) {
          // Play completion sound
          console.log("Timer complete!");
        }
        if (!currentSession || !currentSession.id) return;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/completeSession/${currentSession.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response);
        // Auto switch to break
        if ((completedSessions + 1) % 4 === 0) {
          switchMode("longBreak");
        } else {
          switchMode("shortBreak");
        }
      } else {
        switchMode("focus");
      }
    } catch (error) {
      console.log("Error in completion of timer", error);
    }
  };

  const toggleTimer = async () => {
    try {
      const requestApi = !currentSession
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/startSession`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/pauseOrResumeSession/${currentSession?.id}?isResume=${isRunning ? false : true}`;
      const response = await axios[!currentSession ? "post" : "patch"](
        requestApi,
        { endTime: currentSession?.endTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //@ts-ignore
      !currentSession && setCurrentSession(response.data.session);
      setIsRunning((prev) => !prev);
    } catch (error) {
      console.log("Error in starting the session", error);
    }
  };

  const resetTimer = async () => {
    try {
      if (!currentSession || !currentSession.id) return;
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/resetSession/${currentSession.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsRunning(false);
      setTime(currentMode.duration);
    } catch (error) {
      console.log("Error in resetting the timer");
    }
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTime(modes[newMode].duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((currentMode.duration - time) / currentMode.duration) * 100;

  const stats = [
    {
      label: "Sessions Today",
      value: completedSessions,
      icon: Trophy,
      color: "from-purple-500 to-indigo-500",
    },
    {
      label: "Focus Time",
      value: `${totalFocusTime}m`,
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Current Streak",
      value: "12 days",
      icon: TrendingUp,
      color: "from-orange-500 to-amber-500",
    },
  ];

  const tips = [
    "Remove distractions from your workspace",
    "Stay hydrated during focus sessions",
    "Take short walks during breaks",
    "Practice deep breathing exercises",
    "Set clear goals before each session",
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 10000);
    return () => clearInterval(tipInterval);
  }, []);

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
                Focus Timer
              </h1>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-6 h-6 text-gray-600" />
              ) : (
                <VolumeX className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-md`}
                  >
                    <StatIcon className="w-6 h-6 text-white" />
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
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              {/* Mode Selector */}
              <div className="flex gap-3 mb-8 bg-gray-100 rounded-2xl p-2">
                <button
                  onClick={() => switchMode("focus")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    mode === "focus"
                      ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Focus
                </button>
                <button
                  onClick={() => switchMode("shortBreak")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    mode === "shortBreak"
                      ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Short Break
                </button>
                <button
                  onClick={() => switchMode("longBreak")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    mode === "longBreak"
                      ? "bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Long Break
                </button>
              </div>

              {/* Current Mode Label */}
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r ${currentMode.color} text-white font-semibold`}
                >
                  <Icon className="w-5 h-5" />
                  {currentMode.label}
                </div>
              </div>

              {/* Circular Progress Timer */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8">
                {/* Progress Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="url(#linear)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                  <defs>
                    <linearlinear
                      id="linear"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearlinear>
                  </defs>
                </svg>

                {/* Timer Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl font-bold bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-2">
                      {formatTime(time)}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {isRunning ? "Stay focused!" : "Ready to start?"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleTimer}
                  className={`px-10 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 bg-linear-to-r ${currentMode.color}`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-6 h-6" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      Start
                    </>
                  )}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Focus Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Focus Tips
              </h3>
              <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  💡 {tips[currentTip]}
                </p>
              </div>
            </div>

            {/* Session Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Session Progress
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Sessions until long break:
                  </span>
                  <span className="font-semibold text-indigo-600">
                    {4 - (completedSessions % 4)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-indigo-600 to-purple-700 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((completedSessions % 4) / 4) * 100}%` }}
                  ></div>
                </div>
                <div className="flex gap-2 pt-2">
                  {[...Array(4)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                        idx < completedSessions % 4
                          ? "bg-linear-to-r from-indigo-600 to-purple-700 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-black">
              <h3 className="text-lg font-bold mb-3 text-white">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all text-sm font-medium">
                  📊 View detailed stats
                </button>
                <button className="w-full text-left px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all text-sm font-medium">
                  🎯 Set daily goal
                </button>
                <button className="w-full text-left px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all text-sm font-medium">
                  🏆 Check leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
