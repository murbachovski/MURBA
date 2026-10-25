// localStorage can be missing or blocked (private windows, strict settings). Games keep working
// without it; they just forget results and streaks.
export function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Nothing to do.
  }
}
