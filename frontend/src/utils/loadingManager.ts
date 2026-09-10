import { useState, useEffect } from 'react';

type Listener = (state: { isLoading: boolean; progress: number }) => void;

class LoadingManager {
  private activeRequests = 0;
  private progress = 0;
  private isLoading = false;
  private listeners: Set<Listener> = new Set();
  private intervalTimer: ReturnType<typeof setInterval> | null = null;
  private resetTimer: ReturnType<typeof setTimeout> | null = null;

  private notify() {
    this.listeners.forEach((listener) => {
      listener({ isLoading: this.isLoading, progress: this.progress });
    });
  }

  private startProgressTrickle() {
    if (this.intervalTimer) clearInterval(this.intervalTimer);

    // Initial jump
    this.progress = Math.max(this.progress, 15);
    this.notify();

    // Trickle progress up to 90%
    this.intervalTimer = setInterval(() => {
      if (this.progress < 30) {
        this.progress += 10;
      } else if (this.progress < 60) {
        this.progress += 5;
      } else if (this.progress < 80) {
        this.progress += 2;
      } else if (this.progress < 90) {
        this.progress += 0.8;
      }
      this.notify();
    }, 150);
  }

  public start() {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }

    this.activeRequests += 1;

    if (this.activeRequests === 1) {
      this.isLoading = true;
      this.startProgressTrickle();
    }
  }

  public done() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);

    if (this.activeRequests === 0) {
      if (this.intervalTimer) {
        clearInterval(this.intervalTimer);
        this.intervalTimer = null;
      }

      // Complete to 100%
      this.progress = 100;
      this.notify();

      // Fade out and reset
      this.resetTimer = setTimeout(() => {
        this.isLoading = false;
        this.progress = 0;
        this.notify();
      }, 350);
    }
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    // Call listener immediately with current state
    listener({ isLoading: this.isLoading, progress: this.progress });

    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const loadingManager = new LoadingManager();

/**
 * Custom React hook to consume the global loading progress bar state
 */
export const useLoadingProgress = () => {
  const [state, setState] = useState({ isLoading: false, progress: 0 });

  useEffect(() => {
    const unsubscribe = loadingManager.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  return state;
};
