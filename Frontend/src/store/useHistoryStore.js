import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_HISTORY = 20

export const useHistoryStore = create(
  persist(
    (set) => ({
      entries: [],
      add: (entry) =>
        set((state) => ({
          entries: [
            { id: crypto.randomUUID(), timestamp: Date.now(), ...entry },
            ...state.entries,
          ].slice(0, MAX_HISTORY),
        })),
      clear: () => set({ entries: [] }),
    }),
    { name: 'eazy-shipment-history' },
  ),
)
