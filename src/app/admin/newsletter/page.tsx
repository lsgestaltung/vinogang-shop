"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

export default function NewsletterAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already authenticated in session
    const isAuth = sessionStorage.getItem("admin-authenticated");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      fetchSubscribers();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin-authenticated", "true");
        setPassword("");
        fetchSubscribers();
      } else {
        setAuthError("Falsches Passwort");
      }
    } catch (err) {
      setAuthError("Authentifizierungsfehler");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin-authenticated");
    setSubscribers([]);
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/newsletter/subscribers");
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setSubscribers(data.subscribers);
      setError(null);
    } catch (err) {
      setError("Fehler beim Laden der Subscriber");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Email", "Subscribed At"];
    const csvContent = [
      headers.join(","),
      ...subscribers.map((sub) =>
        `${sub.email},${new Date(sub.subscribed_at).toLocaleString("de-DE")}`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 border-2 border-gold flex items-center justify-center">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                Admin
              </span>
              <div className="w-8 h-px bg-gold" />
            </div>

            <h1 className="text-3xl font-black mb-2">
              Newsletter <span className="text-gold">Admin</span>
            </h1>
            <p className="text-white/60 text-sm">Bitte Passwort eingeben</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              variant="dark"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={authLoading}
              required
            />

            {authError && (
              <p className="text-red-500 text-sm">{authError}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={authLoading}
              className="w-full"
            >
              {authLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent animate-spin" />
              ) : (
                "Anmelden"
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (loading && subscribers.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Lade Subscriber...</p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
              Admin
            </span>
            <div className="flex-1 h-px bg-gold/20" />
            <Button variant="outline" onClick={handleLogout} className="text-sm">
              Abmelden
            </Button>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Newsletter <span className="text-gold">Subscribers</span>
          </h1>

          <div className="flex items-center gap-6 text-white/60">
            <p>{subscribers.length} Subscriber</p>
            <Button variant="primary" onClick={exportToCSV} disabled={subscribers.length === 0}>
              Als CSV exportieren
            </Button>
            <Button variant="outline" onClick={fetchSubscribers}>
              Aktualisieren
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-8">
            {error}
          </div>
        )}

        {/* Subscribers Table */}
        {subscribers.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-xl mb-2">Noch keine Subscriber</p>
            <p className="text-sm">Sobald sich jemand anmeldet, erscheinen die E-Mails hier.</p>
          </div>
        ) : (
          <div className="border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gold">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gold">
                    E-Mail
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gold">
                    Angemeldet am
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {subscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-white/60">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {new Date(subscriber.subscribed_at).toLocaleString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 p-6 border border-white/10 bg-white/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-3">
            Hinweise
          </h3>
          <ul className="text-sm text-white/60 space-y-2">
            <li>• E-Mails werden automatisch in der Datenbank gespeichert</li>
            <li>• Doppelte E-Mails werden ignoriert</li>
            <li>• Klicke auf "Als CSV exportieren" um die Liste herunterzuladen</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
