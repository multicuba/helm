"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedCompanies, seedApprovals, seedActivityStream, seedThreads } from "./seed-data";
import type { Company, Approval, ActivityEntry, Thread, User } from "./types";

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
  updateCompany: (id: string, patch: Partial<Company>) => void;
}

export const useCompaniesStore = create<CompaniesState>()(
  persist(
    (set) => ({
      companies: seedCompanies,
      addCompany: (c) => set((s) => ({ companies: [c, ...s.companies] })),
      updateCompany: (id, patch) =>
        set((s) => ({
          companies: s.companies.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
    }),
    { name: "helm-companies" }
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
  setActiveThread: (id: string) => void;
  addThread: (t: Thread) => void;
}

export const useThreadsStore = create<ThreadsState>()(
  persist(
    (set) => ({
      threads: seedThreads,
      activeThreadId: seedThreads[0]?.id ?? null,
      setActiveThread: (id) => set({ activeThreadId: id }),
      addThread: (t) =>
        set((s) => ({ threads: [t, ...s.threads], activeThreadId: t.id })),
    }),
    { name: "helm-threads" }
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
