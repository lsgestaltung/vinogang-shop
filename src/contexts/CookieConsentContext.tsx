"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CookiePreferences = {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  preferences: CookiePreferences | null;
  showBanner: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openSettings: () => void;
  closeSettings: () => void;
  showSettings: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = "vinogang_cookie_consent";

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
        setShowBanner(false);
      } catch (e) {
        console.error("Failed to parse cookie preferences", e);
        setShowBanner(true);
      }
    } else {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(prefs);
  };

  const acceptNecessary = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(prefs);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    // First hide UI immediately for better UX
    setShowBanner(false);
    setShowSettings(false);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));

    // Defer preference state update to next tick to prevent UI blocking
    // This allows React to finish rendering before loading heavy scripts
    setTimeout(() => {
      setPreferences(prefs);
    }, 100);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        showBanner,
        acceptAll,
        acceptNecessary,
        savePreferences,
        openSettings,
        closeSettings,
        showSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
