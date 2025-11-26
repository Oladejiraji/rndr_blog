import { useEffect } from "react";

interface UseKeyboardShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  onKeyPress: () => void;
  preventDefault?: boolean;
}

/**
 * Custom hook to handle keyboard shortcuts
 * @param options Configuration for the keyboard shortcut
 */
export const useKeyboardShortcut = ({
  key,
  ctrlKey = false,
  metaKey = false,
  shiftKey = false,
  altKey = false,
  onKeyPress,
  preventDefault = true,
}: UseKeyboardShortcutOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if all modifier keys match
      const modifiersMatch =
        event.ctrlKey === ctrlKey &&
        event.metaKey === metaKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey;

      // Check if the key matches (case-insensitive)
      const keyMatches = event.key.toLowerCase() === key.toLowerCase();

      if (modifiersMatch && keyMatches) {
        if (preventDefault) {
          event.preventDefault();
        }
        onKeyPress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, ctrlKey, metaKey, shiftKey, altKey, onKeyPress, preventDefault]);
};

/**
 * Hook specifically for Cmd+K (Mac) and Ctrl+K (Windows)
 * @param onKeyPress Callback function to execute when the shortcut is pressed
 */
export const useCommandK = (onKeyPress: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K on Mac or Ctrl+K on Windows/Linux
      const isMac = event.metaKey && event.key.toLowerCase() === "k";
      const isWindowsLinux = event.ctrlKey && event.key.toLowerCase() === "k";

      if ((isMac || isWindowsLinux) && !event.shiftKey && !event.altKey) {
        event.preventDefault();
        onKeyPress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyPress]);
};
