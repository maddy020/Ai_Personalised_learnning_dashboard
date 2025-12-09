import type { Request } from "express";
export interface customRequest extends Request {
  user?: {
    id: Number;
    name: string;
    email: string;
  };
}

enum SessionStatus {
  RUNNING,
  COMPLETED,
  PAUSED,
}

export type Session = {
  id: Number;
  startTime: Date;
  endTime: Date;
  status?: SessionStatus;
  remainingsec?: Number;
  userId: Number;
};
