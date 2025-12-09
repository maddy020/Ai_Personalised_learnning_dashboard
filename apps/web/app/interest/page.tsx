"use client";
import { useState } from "react";
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Code,
  Brain,
  Calculator,
  ChevronRight,
  Check,
  Zap,
  Trophy,
  Rocket,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [skillLevel, setSkillLevel] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const router = useRouter();

  const interests = [
    {
      id: "upsc",
      title: "UPSC Preparation",
      description: "Civil services, IAS, IPS preparation",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      selectedBg: "bg-blue-500",
    },
    {
      id: "jee",
      title: "JEE Preparation",
      description: "Engineering entrance exam preparation",
      icon: Calculator,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverBorder: "hover:border-green-400",
      selectedBg: "bg-green-500",
    },
    {
      id: "neet",
      title: "NEET Preparation",
      description: "Medical entrance exam preparation",
      icon: Brain,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      hoverBorder: "hover:border-red-400",
      selectedBg: "bg-red-500",
    },
    {
      id: "dsa",
      title: "Data Structures & Algorithms",
      description: "Master DSA for tech interviews",
      icon: Code,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverBorder: "hover:border-purple-400",
      selectedBg: "bg-purple-500",
    },
    {
      id: "puzzles",
      title: "Puzzle Solving",
      description: "Logical puzzles and problem solving",
      icon: Brain,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverBorder: "hover:border-orange-400",
      selectedBg: "bg-orange-500",
    },
    {
      id: "aptitude",
      title: "Aptitude Questions",
      description: "Quantitative aptitude and reasoning",
      icon: Calculator,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      hoverBorder: "hover:border-teal-400",
      selectedBg: "bg-teal-500",
    },
    {
      id: "tech-companies",
      title: "Tech Company Preparation",
      description: "Complete interview preparation",
      icon: Briefcase,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      hoverBorder: "hover:border-violet-400",
      selectedBg: "bg-violet-500",
    },
  ];

  const skillLevels = [
    {
      id: "BEGINNER",
      title: "Beginner",
      description: "Just starting out, need to learn the basics",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      features: [
        "Foundational concepts",
        "Step-by-step guidance",
        "Simple exercises",
      ],
    },
    {
      id: "INTERMEDIATE",
      title: "Intermediate",
      description: "Have some knowledge, want to improve",
      icon: Trophy,
      color: "from-blue-500 to-indigo-500",
      features: [
        "Advanced topics",
        "Practice problems",
        "Real-world scenarios",
      ],
    },
    {
      id: "ADVANCED",
      title: "Advanced",
      description: "Experienced, looking for challenges",
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
      features: [
        "Expert-level content",
        "Complex problems",
        "Competitive preparation",
      ],
    },
  ];

  const avatars = [
    {
      id: "avatar1",
      emoji: "🦊",
      color: "from-orange-400 to-red-500",
      name: "Fox",
    },
    {
      id: "avatar2",
      emoji: "🐼",
      color: "from-gray-400 to-gray-600",
      name: "Panda",
    },
    {
      id: "avatar3",
      emoji: "🦁",
      color: "from-yellow-400 to-orange-500",
      name: "Lion",
    },
    {
      id: "avatar4",
      emoji: "🐨",
      color: "from-gray-400 to-blue-500",
      name: "Koala",
    },
    {
      id: "avatar5",
      emoji: "🦉",
      color: "from-indigo-400 to-purple-500",
      name: "Owl",
    },
    {
      id: "avatar6",
      emoji: "🐸",
      color: "from-green-400 to-emerald-500",
      name: "Frog",
    },
    {
      id: "avatar7",
      emoji: "🦄",
      color: "from-pink-400 to-purple-500",
      name: "Unicorn",
    },
    {
      id: "avatar8",
      emoji: "🐻",
      color: "from-amber-600 to-orange-600",
      name: "Bear",
    },
    {
      id: "avatar9",
      emoji: "🐯",
      color: "from-orange-500 to-red-600",
      name: "Tiger",
    },
    {
      id: "avatar10",
      emoji: "🐱",
      color: "from-pink-400 to-rose-500",
      name: "Cat",
    },
    {
      id: "avatar11",
      emoji: "🐶",
      color: "from-amber-400 to-yellow-600",
      name: "Dog",
    },
    {
      id: "avatar12",
      emoji: "🦊",
      color: "from-blue-400 to-indigo-500",
      name: "Blue Fox",
    },
  ];

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleContinueStep1 = () => {
    if (selectedInterests.length > 0) {
      setCurrentStep(2);
    }
  };

  const handleContinueStep2 = () => {
    if (skillLevel) {
      setCurrentStep(3);
    }
  };

  const handleContinueStep3 = () => {
    if (selectedAvatar) {
      setCurrentStep(4);
    }
  };

  const handleFinish = async () => {
    try {
      const avatarObj = avatars.find((item) => item.id === selectedAvatar);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/complete`,
        {
          interests: selectedInterests,
          skillLevel: skillLevel,
          avatar: avatarObj?.emoji,
        }
      );
      if (response.data) {
        router.push("/profile");
      }
    } catch (error) {
      console.log("Error in completing the profile", error);
    }
    // Save to database and navigate to dashboard
  };

  const handleSkip = () => {
    router.push("/profile");
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ animation: "blob 7s infinite" }}
        ></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ animation: "blob 7s infinite 2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ animation: "blob 7s infinite 4s" }}
        ></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
              LearnQuest AI
            </h1>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                currentStep >= 1 ? "w-12 bg-indigo-600" : "w-8 bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                currentStep >= 2 ? "w-12 bg-indigo-600" : "w-8 bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                currentStep >= 3 ? "w-12 bg-indigo-600" : "w-8 bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                currentStep >= 4 ? "w-12 bg-indigo-600" : "w-8 bg-gray-300"
              }`}
            ></div>
          </div>

          {/* Step 1: Interests */}
          {currentStep === 1 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                What are you interested in?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select your areas of interest so we can personalize your
                learning journey. You can choose multiple options.
              </p>
            </>
          )}

          {/* Step 2: Skill Level */}
          {currentStep === 2 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                What's your skill level?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Help us understand your current level so we can provide content
                that's just right for you.
              </p>
            </>
          )}

          {/* Step 3: Avatar Selection */}
          {currentStep === 3 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Choose your avatar
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pick an avatar that represents you. This will be displayed on
                your profile.
              </p>
            </>
          )}

          {/* Step 4: Ready to Begin */}
          {currentStep === 4 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                You're all set! 🎉
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your personalized learning journey is ready to begin. Let's
                start achieving your goals!
              </p>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-6">
          {/* Step 1: Interest Selection */}
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interests.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = selectedInterests.includes(interest.id);

                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                        isSelected
                          ? `${interest.borderColor} ${interest.bgColor} shadow-lg scale-105`
                          : `border-gray-200 hover:shadow-md ${interest.hoverBorder}`
                      }`}
                    >
                      <div
                        className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? `${interest.selectedBg} border-transparent`
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl bg-linear-to-br ${interest.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex-1 pr-8">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {interest.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {interest.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedInterests.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-sm font-medium text-indigo-600">
                    {selectedInterests.length}{" "}
                    {selectedInterests.length === 1 ? "interest" : "interests"}{" "}
                    selected
                  </p>
                </div>
              )}
            </>
          )}

          {/* Step 2: Skill Level Selection */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillLevels.map((level) => {
                const Icon = level.icon;
                const isSelected = skillLevel === level.id;

                return (
                  <button
                    key={level.id}
                    onClick={() => setSkillLevel(level.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-center group ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50 shadow-lg scale-105"
                        : "border-gray-200 hover:shadow-md hover:border-indigo-300"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-linear-to-br ${level.color} flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {level.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {level.description}
                    </p>

                    <div className="space-y-2">
                      {level.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {isSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 3: Avatar Selection */}
          {currentStep === 3 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {avatars.map((avatar) => {
                const isSelected = selectedAvatar === avatar.id;

                return (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`relative aspect-square rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-4 group ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50 shadow-lg scale-110"
                        : "border-gray-200 hover:shadow-md hover:border-indigo-300 hover:scale-105"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl bg-linear-to-br ${avatar.color} flex items-center justify-center shadow-md mb-2 text-3xl`}
                    >
                      {avatar.emoji}
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {avatar.name}
                    </span>

                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 4: Ready to Begin */}
          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-2xl text-5xl">
                {avatars.find((a) => a.id === selectedAvatar)?.emoji || "🚀"}
              </div>

              <div className="max-w-md mx-auto mb-8">
                <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Your Learning Profile
                  </h3>
                  <div className="space-y-3 text-left">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Interests:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedInterests.map((id) => {
                          const interest = interests.find((i) => i.id === id);
                          return (
                            <span
                              key={id}
                              className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-600 border border-indigo-200"
                            >
                              {interest?.title}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Skill Level:</p>
                      <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-purple-600 border border-purple-200 inline-block">
                        {skillLevels.find((l) => l.id === skillLevel)?.title}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Avatar:</p>
                      <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-600 border border-indigo-200 inline-flex items-center gap-2">
                        <span className="text-lg">
                          {avatars.find((a) => a.id === selectedAvatar)?.emoji}
                        </span>
                        {avatars.find((a) => a.id === selectedAvatar)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
                  <h3 className="font-semibold mb-2">What's Next?</h3>
                  <p className="text-sm text-indigo-100">
                    We've curated personalized content, challenges, and learning
                    paths tailored just for you. Start earning points, unlocking
                    badges, and tracking your progress!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 font-semibold hover:text-gray-900 transition-all flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back
              </button>
            )}
          </div>

          <div className="flex gap-4">
            {currentStep < 4 && (
              <button
                onClick={handleSkip}
                className="px-8 py-3 text-gray-600 font-semibold hover:text-gray-900 transition-all"
              >
                Skip for now
              </button>
            )}

            {currentStep === 1 && (
              <button
                onClick={handleContinueStep1}
                disabled={selectedInterests.length === 0}
                className={`px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group ${
                  selectedInterests.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800"
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                onClick={handleContinueStep2}
                disabled={!skillLevel}
                className={`px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group ${
                  !skillLevel
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800"
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handleContinueStep3}
                disabled={!selectedAvatar}
                className={`px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group ${
                  !selectedAvatar
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800"
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={handleFinish}
                className="px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group bg-linear-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800"
              >
                Start Learning
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Help text */}
        {currentStep < 4 && (
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't worry, you can always change these preferences later in your
            settings
          </p>
        )}
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
