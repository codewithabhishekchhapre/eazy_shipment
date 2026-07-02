import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    (set) => ({
      fontSize: 'medium',
      autoCopy: false,
      autoPaste: false,
      defaultTool: 'remove-dot',
      setFontSize: (fontSize) => set({ fontSize }),
      toggleAutoCopy: () => set((state) => ({ autoCopy: !state.autoCopy })),
      toggleAutoPaste: () => set((state) => ({ autoPaste: !state.autoPaste })),
      setDefaultTool: (defaultTool) => set({ defaultTool }),
    }),
    { name: 'eazy-shipment-settings' },
  ),
)
