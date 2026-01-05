import React, { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 bg-zinc-900 border border-zinc-700 rounded-2xl p-5 max-w-lg">
      <p className="text-sm text-zinc-300">
        We use cookies to enhance your experience, analyze traffic and improve
        our services. You can accept or reject non-essential cookies.
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={accept}
          className="px-4 py-2 rounded-xl bg-zinc-200 text-zinc-900 text-sm font-semibold"
        >
          Accept all
        </button>

        <button
          onClick={reject}
          className="px-4 py-2 rounded-xl border border-zinc-600 text-sm"
        >
          Reject non-essential
        </button>
      </div>
    </div>
  );
}
