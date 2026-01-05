import React from "react";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="mt-4 text-zinc-300">
        This website is the official digital library of The Legacy OS by Advocate Firoz KC.
        We respect your privacy and are committed to protecting your personal data.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Information We Collect</h2>
      <p className="text-zinc-300 mt-2">
        We may collect anonymized analytics data, device information, and any details you
        voluntarily submit through contact or subscription forms.
      </p>

      <h2 className="mt-8 text-xl font-semibold">How We Use Information</h2>
      <ul className="text-zinc-300 mt-2 space-y-2">
        <li>• Improve site performance</li>
        <li>• Deliver book releases and updates</li>
        <li>• Respond to reader enquiries</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Cookies</h2>
      <p className="text-zinc-300 mt-2">
        We use cookies for analytics and improving user experience. You may accept or
        reject non-essential cookies via the consent banner.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Data Sharing</h2>
      <p className="text-zinc-300 mt-2">
        We do not sell, rent or trade personal data. Data may be processed by trusted
        hosting and analytics service providers.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="text-zinc-300 mt-2">
        For privacy enquiries: adv.firoz@kc-capitals.com
      </p>
    </main>
  );
}
