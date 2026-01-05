import React from "react";

export default function WealthArchitecture() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          "name": "Wealth Architecture 1.0",
          "author": {
            "@type": "Person",
            "name": "Advocate Firoz KC"
          },
          "bookFormat": "EBook",
          "genre": "Wealth Management",
          "inLanguage": "en",
          "description": "A structured multi-tier money operating system integrating family offices, asset protection, governance and long-term wealth compounding.",
          "url": "https://legacy.kc-capitals.com/books/wealth-architecture"
        })
      }} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-16 max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">Wealth Architecture 1.0</h1>
        <p className="text-zinc-400 mt-2">Multi-tier money operating system</p>

        <p className="mt-6 text-lg text-zinc-300">
          Wealth is not luck — it is architecture. This book introduces structured systems for cashflow, investing, legal clarity and family-office design.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">What you will learn</h2>

        <ul className="mt-3 space-y-2 text-zinc-300">
          <li>• Asset vs cashflow strategy</li>
          <li>• KC Capitals family-office structure</li>
          <li>• Real-estate and tokenization synergy</li>
          <li>• Risk layers and governance</li>
        </ul>

      </main>
    </>
  );
}
