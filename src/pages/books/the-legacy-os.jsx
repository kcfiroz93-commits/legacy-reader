import React from "react";

export default function LegacyOSBook() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BookSeries",
          "name": "The Legacy OS",
          "author": {
            "@type": "Person",
            "name": "Advocate Firoz KC"
          },
          "inLanguage": ["en", "ml"],
          "genre": "Self-development",
          "bookFormat": "EBook",
          "description": "The Legacy OS is a structured life operating system consisting of 12 micro books that transform emotional survival into generational design.",
          "url": "https://legacy.kc-capitals.com/books/the-legacy-os"
        })
      }} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-16 max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">The Legacy OS</h1>
        <p className="text-zinc-400 mt-2">A Micro-Book Series</p>

        <p className="mt-6 text-lg text-zinc-300">
          The Legacy OS is not just a book. It is a system designed to rebuild life into a generational architecture.
        </p>

        <ul className="mt-6 space-y-2 text-zinc-300">
          <li>• 12 Micro Books</li>
          <li>• Monthly releases</li>
          <li>• English & Malayalam</li>
          <li>• eBook + Audiobook</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">Core Modules</h2>

        <ul className="mt-3 space-y-2 text-zinc-300">
          <li>• Life: 10% Destiny, 90% Creation</li>
          <li>• The Age 33 Reset</li>
          <li>• The Blueprint</li>
          <li>• Emotional Governance</li>
        </ul>

      </main>
    </>
  );
}
