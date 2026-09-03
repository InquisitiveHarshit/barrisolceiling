"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "#d1d5db",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#ffffff",
          border: "1px solid #9ca3af",
          boxShadow: "4px 4px 0px #9ca3af",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            background: "#1a2340",
            borderBottom: "2px solid #111827",
            padding: "14px 20px",
          }}
        >
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#9aa5be", marginBottom: "2px" }}
          >
            Restricted Area
          </p>
          <h1
            className="text-lg font-bold"
            style={{ color: "#ffffff" }}
          >
            Administrator Login
          </h1>
        </div>

        {/* Form body */}
        <div style={{ padding: "24px 20px" }}>
          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                color: "#b91c1c",
                padding: "8px 12px",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#374151",
                  marginBottom: "5px",
                }}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #9ca3af",
                  background: "#f9fafb",
                  color: "#111827",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "Georgia, serif",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.border = "1px solid #1a2340")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.border = "1px solid #9ca3af")
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#374151",
                  marginBottom: "5px",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #9ca3af",
                  background: "#f9fafb",
                  color: "#111827",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "Georgia, serif",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.border = "1px solid #1a2340")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.border = "1px solid #9ca3af")
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "4px",
                background: loading ? "#4b5563" : "#1a2340",
                color: "#ffffff",
                border: "none",
                padding: "10px 0",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#243050";
              }}
              onMouseLeave={(e) => {
                if (!loading)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#1a2340";
              }}
            >
              {loading ? "Verifying..." : "Log In"}
            </button>
          </form>
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "8px 20px",
            background: "#f3f4f6",
            fontSize: "11px",
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          Authorised personnel only
        </div>
      </div>
    </div>
  );
}
