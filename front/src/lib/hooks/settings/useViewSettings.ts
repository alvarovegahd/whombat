import { useMemo } from "react";
import { useImmerReducer } from "use-immer";

import { DEFAULT_VIEW_SETTINGS } from "@/lib/constants";
import type { ViewSettings } from "@/lib/types";

/**
 * Custom hook to manage spectrogram settings.
 */
export default function useViewSettings({
  initialSettings = DEFAULT_VIEW_SETTINGS,
}: {
  /** The initial values for the spectrogram settings. */
  initialSettings?: ViewSettings;
} = {}): ViewSettingsInterface {
  const reducer = useMemo(
    () =>
      createViewSettingsReducer({
        initial: initialSettings,
      }),
    [initialSettings],
  );
  const [settings, dispatch] = useImmerReducer(reducer, initialSettings);
  return {
    settings,
    dispatch,
  };
}

/**
 * Types of actions that can be dispatched to update the spectrogram settings.
 */
export type ViewSettingsAction =
  | { type: "setAll"; settings: ViewSettings }
  | { type: "setDuration"; duration: number }
  | { type: "setMinFreq"; min_freq: number }
  | { type: "setMaxFreq"; max_freq: number }
  | { type: "reset" };

/**
 * Creates a reducer function to manage spectrogram settings.
 */
function createViewSettingsReducer({
  initial,
}: {
  /** The initial spectrogram settings. */
  initial: ViewSettings;
}) {
  return function spectrogramSettingsReducer(
    draft: ViewSettings,
    action: ViewSettingsAction,
  ) {
    switch (action.type) {
      case "setAll": {
        return action.settings;
      }
      case "setDuration": {
        if (action.duration < 0) {
          throw new Error("Window size must be non-negative");
        }
        draft.duration = action.duration;
        break;
      }
      case "setMinFreq": {
        if (action.min_freq < 0) {
          throw new Error("Minimum frequency must be non-negative");
        }
        draft.min_freq = action.min_freq;
        break;
      }
      case "setMaxFreq": {
        if (action.max_freq < 0) {
          throw new Error("Maximum frequency must be non-negative");
        }
        draft.max_freq = action.max_freq;
        break;
      }
      case "reset": {
        return initial;
      }
      default: {
        // @ts-ignore
        throw Error("Unknown action: " + action.type);
      }
    }
  };
}

/**
 * Interface for the spectrogram settings hook.
 */
export type ViewSettingsInterface = {
  /** The current spectrogram settings. */
  settings: ViewSettings;
  dispatch: (action: ViewSettingsAction) => void;
};
