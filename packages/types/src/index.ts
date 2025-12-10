import type { Request } from "express";
export interface customRequest extends Request {
  user?: {
    id: Number;
    name: string;
    email: string;
  };
}

export enum SessionStatus {
  RUNNING,
  COMPLETED,
  PAUSED,
}

export type Modes = "focus" | "longBreak" | "shortBreak";

export type Session = {
  id: number;
  startTime: Date;
  endTime: Date;
  status?: SessionStatus;
  remainingsec?: number;
  userId: number;
  type: Modes;
};

export type ActiveSession = {
  isRunning: boolean;
  duration: number;
  session: Session | null;
  updateSession: (newSession: Session) => void;
  updateSessionActivity: (active: boolean) => void;
  updateSessionType: (newType: Modes) => void;
  updateSessionStatus: (status: SessionStatus) => void;
};
