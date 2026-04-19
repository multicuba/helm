"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  seedCompanies,
  seedApprovals,
  seedActivityStream,
  seedThreads,
  buildEVStationFinderCompany,
} from "./seed-data";
import type { Company, Approval, ActivityEntry, Thread, ChatMessage, User } from "./types";

// ───── Workspace ─────
interface WorkspaceState {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
      logout: () => {
        set({ user: null });
        if (typeof window !== "undefined") {
          localStorage.clear();
        }
      },
    }),
    { name: "helm-workspace" }
  )
);

// ───── Companies ─────
interface CompaniesState {
  companies: Company[];
  addCompany: (c: Company) => void;
  upsertCompany: (c: Company) => void;
  updateCompany: (id: string, patch: Partial<Company>) => void;
  convertEVStationFinder: () => Company;
}

export const useCompaniesStore = create<CompaniesState>()(
  persist(
    (set, get) => ({
      companies: seedCompanies,
      addCompany: (c) => set((s) => ({ companies: [c, ...s.companies] })),
      upsertCompany: (c) =>
        set((s) => {
          const existing = s.companies.find((x) => x.id === c.id);
          return existing
            ? { companies: s.companies.map((x) => (x.id === c.id ? c : x)) }
            : { companies: [c, ...s.companies] };
        }),
      updateCompany: (id, patch) =>
        set((s) => ({
          companies: s.companies.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      convertEVStationFinder: () => {
        const seed = buildEVStationFinderCompany();
        get().upsertCompany(seed);
        return seed;
      },
    }),
    { name: "helm-companies", version: 7 }
  )
);

// ───── Approvals ─────
interface ApprovalsState {
  approvals: Approval[];
  approve: (id: string) => void;
  reject: (id: string) => void;
}

export const useApprovalsStore = create<ApprovalsState>()(
  persist(
    (set) => ({
      approvals: seedApprovals,
      approve: (id) => set((s) => ({ approvals: s.approvals.filter((a) => a.id !== id) })),
      reject: (id) => set((s) => ({ approvals: s.approvals.filter((a) => a.id !== id) })),
    }),
    { name: "helm-approvals" }
  )
);

// ───── Activity ─────
interface ActivityState {
  activity: ActivityEntry[];
  pushEntry: (e: ActivityEntry) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activity: seedActivityStream,
      pushEntry: (e) => set((s) => ({ activity: [e, ...s.activity].slice(0, 50) })),
    }),
    { name: "helm-activity" }
  )
);

// ───── Threads (Chat) ─────
interface ThreadsState {
  threads: Thread[];
  activeThreadId: string | null;
  activeRoleId: string;
  setActiveThread: (id: string) => void;
  setActiveRole: (id: string) => void;
  addThread: (t: Thread) => void;
  appendMessage: (threadId: string, message: ChatMessage) => void;
}

export const useThreadsStore = create<ThreadsState>()(
  persist(
    (set) => ({
      threads: seedThreads,
      activeThreadId: seedThreads[0]?.id ?? null,
      activeRoleId: "interview",
      setActiveThread: (id) => set({ activeThreadId: id }),
      setActiveRole: (id) => set({ activeRoleId: id }),
      addThread: (t) =>
        set((s) => ({ threads: [t, ...s.threads], activeThreadId: t.id })),
      appendMessage: (threadId, message) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  messages: [...t.messages, message],
                  updatedAt: message.timestamp,
                }
              : t
          ),
        })),
    }),
    { name: "helm-threads", version: 2 }
  )
);

// ───── Tours ─────
interface TourState {
  activeTour: string | null;
  startTour: (id: string) => void;
  endTour: () => void;
}

export const useTourStore = create<TourState>((set) => ({
  activeTour: null,
  startTour: (id) => set({ activeTour: id }),
  endTour: () => set({ activeTour: null }),
}));

// ───── Command palette (⌘K) ─────
interface CommandPaletteState {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
}

export const useCommandPalette = create<CommandPaletteState>((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
  toggle: () => set((s) => ({ open: !s.open })),
}));
