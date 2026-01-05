import React from "react";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "The Legacy OS",
            "url": "https://legacy.kc-capitals.com"
          }),
        }}
      />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-7xl font-bold">
            The Legacy OS
          </h1>

          <p className="mt-6 text-xl text-zinc-300 max-w-3xl">
            A life operating system built to transform chaos into structure, emotion into architecture,
            and individuals into legacy creators.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/books/the-legacy-os"
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold"
            >
              View Book Series
            </a>

            <a
              href="/about"
              className="px-6 py-3 rounded-xl border border-zinc-700"
            >
              About the Author
            </a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold">Clarity</h3>
            <p className="text-zinc-400 mt-2">
              Replace confusion with defined personal operating principles.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Structure</h3>
            <p className="text-zinc-400 mt-2">
              Systems for family governance, wealth, law, and emotional control.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Legacy</h3>
            <p className="text-zinc-400 mt-2">
              Building what outlives you — values, governance, assets and lineage frameworks.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>

          <div className="mt-6 space-y-6 text-zinc-300">

            <div>
              <h3 className="font-semibold">What is The Legacy OS?</h3>
              <p>
                A structured life operating system consisting of micro books, frameworks,
                and governance toolkits.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Is this just a book?</h3>
              <p>
                No — it is a complete framework combining philosophy, law, systems design,
                and applied emotional intelligence.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Who is this for?</h3>
              <p>
                Founders, parents, leaders, and anyone ready to shift from reaction to intentional creation.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
