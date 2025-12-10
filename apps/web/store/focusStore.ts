import { create } from "zustand";
import { ActiveSession } from "@repo/types";
import { modes } from "../data";

const useActiveSession = create<ActiveSession>((set) => ({
  session: null,
  duration: 25 * 60, // seconds
  isRunning: false,

  updateSession: (newSession) => {
    set({ session: newSession });
  },

  updateSessionType: (newType) => {
    set((state) => ({
      session: state.session ? { ...state.session, type: newType } : null,
      duration: modes[newType].duration,
    }));
  },

  updateSessionActivity: (active) => {
    set({ isRunning: active });
  },

  updateSessionStatus: (status) => {
    set((state) => ({
      session: state.session ? { ...state.session, status } : null,
    }));
  },
}));

export default useActiveSession;
