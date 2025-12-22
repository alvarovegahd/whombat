/** State for application wide spectrogram view settings. */
import { StateCreator } from "zustand";

import { DEFAULT_VIEW_SETTINGS } from "@/lib/constants";
import type { ViewSettings } from "@/lib/types";

export type ViewSlice = {
  viewSettings: ViewSettings;
  setViewSettings: (settings: ViewSettings) => void;
};

export const createViewSlice: StateCreator<ViewSlice> = (set) => ({
  viewSettings: DEFAULT_VIEW_SETTINGS,
  setViewSettings: (settings) => {
    set((state) => {
      return {
        ...state,
        viewSettings: settings,
      };
    });
  },
});
