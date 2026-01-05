import React from "react";

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Advocate Firoz KC",
          "alternateName": ["Firoz KC"],
          "jobTitle": "Legacy Architect",
          "description": "Author, Lawyer, and System Designer. Creator of The Legacy OS – a life operating system for generational architecture.",
          "url": "https://legacy.kc-capitals.com",
          "image": "https://legacy.kc-capitals.com/og-image.jpg",
          "worksFor": {
            "@type": "Organization",
            "name": "KC Capitals"
          },
          "knowsAbout": [
            "Family Governance",
            "Wealth Architecture",
            "System Design",
            "Law and Governance",
            "Emotional Intelligence",
            "Web3",
            "Legacy Planning"
          ]
        })
      }} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-16 max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">Advocate Firoz KC</h1>
        <p className="text-zinc-400 mt-2">The World’s First Legacy Architect</p>

        <p className="mt-6 text-lg text-zinc-300">
          I build operating systems for life — structured philosophies that transform emotional survival into intentional, generational architecture.
        </p>

        <p className="mt-4 text-zinc-300">
          My work combines law, governance, systems design, emotional intelligence and Web3-enabled legacy tools. I write to bring clarity where there is confusion, structure where there is chaos, and legacy where there is loss.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Strategic Identity</h2>
        <ul className="mt-3 space-y-2 text-zinc-300">
          <li>• Legacy Architect</li>
          <li>• Author & System Designer</li>
          <li>• Lawyer</li>
          <li>• Founder — The Legacy OS</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">Mission</h2>
        <p className="mt-3 text-zinc-300">
          To design systems that outlive me — for my son, my family and readers transitioning from reaction to creation.
        </p>

      </main>
    </>
  );
}
