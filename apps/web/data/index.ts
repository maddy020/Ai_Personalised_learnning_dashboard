import { Brain, Coffee, Target } from "lucide-react";
export const modes = {
  focus: {
    duration: 1 * 10,
    label: "Focus Time",
    color: "from-indigo-500 to-purple-600",
    icon: Brain,
  },

  shortBreak: {
    duration: 1 * 5,
    label: "Short Break",
    color: "from-green-500 to-emerald-600",
    icon: Coffee,
  },
  longBreak: {
    duration: 1 * 15,
    label: "Long Break",
    color: "from-blue-500 to-cyan-600",
    icon: Target,
  },
};
