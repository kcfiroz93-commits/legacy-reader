import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Type, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';

/* ==================================================================================
   ⬇️ CONFIGURATION ZONE ⬇️
   ================================================================================== */

const CONFIG = {
  // 1. METADATA
  title: "THE LEGACY OS",
  subtitle: "Rebooting the Human Operating System",
  author: "KC FIROZ", 
  
  // 2. FILES (Must be in 'public' folder)
  logoPath: "/logo.png",   
  coverPath: "/cover.png", 
  bookPath: "/book.md",

  // 3. FALLBACK CONTENT
  defaultChapters: [
    {
      id: 0,
      title: "Loading System...",
      subtitle: "Please Wait",
      content: "<p>Initializing the Legacy Operating System...</p>"
    }
  ]
};

// --- PRELOADED CONTENT (FALLBACK) ---
// This ensures the book works immediately even if the file fetch fails
const PRELOADED_BOOK = `
![Cover Image](cover.jpg)

---

# THE LEGACY OS
**Re-building a Lost Life into a Generational System.**

**Master Map — Launch Edition (2026)**
**Micro Book — 0/12**

Copyright © 2025 **Advocate Firoz KC**
All rights reserved.

This publication is protected under the Indian Copyright Act, 1957 and international copyright conventions. No part of this work may be reproduced, distributed, stored in a retrieval system, or transmitted in any form or by any means, whether electronic, mechanical, photocopying, recording or otherwise, without the prior written consent of the copyright owner, except as permitted under applicable fair dealing provisions.

First published in 2025.

**Author:** Advocate Firoz KC
**Publisher:** Advocate Firoz KC
**Place of Publication:** India
**ISBN:** [insert ISBN]

This work is presently published in the personal capacity of the author. The author expressly states the intention that, upon incorporation of **SHAHANA HERITAGE LLP (under incorporation; name approved by the Ministry of Corporate Affairs)**, all copyright and associated intellectual property rights in this work shall be assigned and vested in the said LLP pursuant to a formal Deed of Assignment.

Until such assignment is executed, all rights in this work shall vest solely in **Advocate Firoz KC**.

All disputes arising out of or in connection with this publication shall be subject to the exclusive jurisdiction of the courts at The State of Kerala, India.

Printed in India.

First Edition — 2026

By Advocate Firoz KC

---

![Wide Logo](logo_wide.png)

## GLOBAL EDITION NOTICE

This book documents personal experiences, interpretations, and systems developed by the author in response to real-life events.

Certain passages reference trauma, loss, legal uncertainty, financial collapse, and systemic failure. These accounts are included for clarity and truth—not for shock, blame, justification, or persuasion.

Readers are encouraged to interpret the material through their own cultural, legal, ethical, and personal frameworks. The systems described herein are presented as one possible model, not as universal instruction.

This work does not seek agreement.
It seeks structure.

---

![Square Logo](logo_square.png)

## DEDICATION

**For Shanu —**
Whose life defined partnership,
And whose absence demanded structure.

**For Innu —**
Whose steadiness restored continuity
When continuity was uncertain.

**For Fateh Shah —**
Whose existence imposed responsibility,
And for whom this system must endure.

**For our parents —**
Whose trust, sacrifice, and values formed the earliest framework and foundation upon which continuity was possible.
And from which everything that follows was built.

---

## AUTHOR’S NOTE

This book was written to document a system, not to narrate a life.

The ideas that follow were shaped by experience, pressure, responsibility, and consequence. They are structured not to persuade, but to endure—beyond personality, context, or emotion.

The Legacy OS is not motivational. It exists to clarify how stability, continuity, and legacy are designed rather than hoped for.

Readers are encouraged to move slowly. Systems reward disciplined application, not instant agreement.

What is offered here is not completeness, but architecture—meant to be understood first, and operated deliberately over time.

This book is not written to inspire emotion.
It is written to preserve clarity.

**Read slowly. Apply deliberately.**

---

## THE LEGACY ARCHITECT
**Why This Work Is Not Authorship Alone**

An author documents thoughts, stories, or ideas.
A Legacy Architect designs systems.

The distinction matters.

Authorship is concerned with expression.
Architecture is concerned with endurance.

**An author asks:**
What should be said?
What should be remembered?
What should be felt?

**A Legacy Architect asks:**
What survives pressure?
What functions without the founder?
What scales across time, people, and generations?

This work is not written to persuade, inspire, or narrate experience.
It is written to define, document, and deploy an operating system.

### The Difference in Function
An author produces content.
A Legacy Architect produces infrastructure.

An author completes books.
A Legacy Architect builds frameworks that outlive books.

An author reflects on life.
A Legacy Architect converts life into repeatable architecture.

Authorship ends at publication.
Architecture begins at implementation.

### The Difference in Accountability
An author is responsible for accuracy and voice.
A Legacy Architect is responsible for stability and continuity.

Every concept in The Legacy OS is treated as:
* a governance mechanism,
* a decision filter,
* or a structural safeguard.

Nothing exists for elegance alone.
Everything exists to reduce failure, ambiguity, and dependency on personality.

### The Difference in Time Horizon
Most authors write for readers.
A Legacy Architect designs for:
* families that outlive him,
* institutions that function without him,
* successors who never meet him.

This work is written with a multi-decade horizon, not a launch cycle.

### The Difference in Identity
This title is not a claim of superiority.
It is a declaration of responsibility.

The role of a Legacy Architect is not to be admired, but to ensure that:
* values do not dilute,
* assets do not fragment,
* decisions do not collapse under emotion,
* and continuity does not depend on memory.

Authorship is a role.
Legacy Architecture is a duty.

This book, and every volume that follows, is written from that position.

---

## THE 2026–2027 READER JOURNEY
**How The Legacy OS Is Meant to Be Experienced**

The Legacy OS is not a collection of books to be consumed.
It is a system to be installed in phases.

This journey is intentional.

### PHASE 0 — ORIENTATION (January 2026)
**Micro Book 0: THE LEGACY OS (V.01)**

* **Purpose:**
    * Define the operating philosophy
    * Establish architectural intent
    * Prevent misinterpretation
    * Set expectations for the year ahead
* **Outcome:** The reader understands *what this system is* and *what it is not*.

No execution is required here. Only clarity.

### PHASE I — FOUNDATION & REBUILD (January–April 2026)
**Micro Books 1–4**

* **Focus:**
    * Responsibility philosophy
    * Identity reset
    * Life architecture
    * Emotional governance
* **Reader transformation:**
    * From reaction → authorship
    * From emotional decision-making → internal governance

This phase stabilizes the individual.
Without this layer, nothing that follows will hold.

### PHASE II — CAPABILITY & RESOURCES (May–August 2026)
**Micro Books 5–8**

* **Focus:**
    * Legal clarity
    * Wealth architecture
    * Family governance
    * Trauma integration
* **Reader transformation:**
    * From personal effort → institutional thinking
    * From survival → protected growth

This phase builds capacity and resilience.

### PHASE III — SCALING & LEGACY (September–December 2026)
**Micro Books 9–12**

* **Focus:**
    * Quarterly operating cadence
    * Generational systems
    * Risk protection
    * Succession over self
* **Reader transformation:**
    * From success → continuity
    * From identity → stewardship

This phase ensures the system survives the founder.

### CONSOLIDATION PHASE (January 2027)
**THE LEGACY OS — MASTER BOOK**
**THE LEGACY OS — V2**

* **Purpose:**
    * Integrate all modules into one canonical reference
    * Refine the system after a full year of public deployment
    * Separate philosophy from execution permanently
* **Outcome:**
    * A stabilized, field-tested operating system
    * Designed to be inherited, not remembered

**HOW THE READER SHOULD APPROACH THIS JOURNEY**

This system rewards patience, sequence, and discipline.

Skipping phases creates gaps.
Reordering modules creates instability.

Each volume assumes the previous layer is active.

This is not a race. It is an installation.

---

## ACKNOWLEDGEMENTS

This book did not emerge from storytelling intent.
It emerged from the need to document what survives pressure.

What follows was shaped by people, experiences, and moments that tested stability, responsibility, and judgment. Their role is acknowledged here not for sentiment, but for structural relevance.

I acknowledge my parents, whose trust and freedom created the conditions for independent thought, and whose values formed the earliest framework of responsibility I would later formalize.

I acknowledge my family, whose collective journey—through alignment and disagreement alike—revealed the consequences of operating without shared systems, and the necessity of governance over assumption.

I acknowledge Shanu, whose presence defined partnership, and whose absence demanded structure. Her life and loss clarified the difference between emotional attachment and enduring responsibility.

I acknowledge Innu, whose steadiness contributed to continuity at a time when continuity itself was uncertain. Her role belongs to stabilization, not description.

I acknowledge my son, Fateh Shah, not as inspiration, but as obligation. His existence imposed clarity, direction, and the requirement that decisions be designed to outlive the decision-maker.

I acknowledge the experiences that applied pressure—legal uncertainty, financial collapse, isolation, and failure. They offered no comfort, but they revealed where systems were absent and where structure was required.

I acknowledge those who offered correction instead of reassurance, and clarity instead of encouragement. Their restraint mattered.

Finally, I acknowledge the discipline of documentation. This work exists not to persuade or justify, but to record what was learned under constraint and what was built in response.

This book stands as an act of responsibility—
to family,
to structure,
and to continuity beyond a single life.

---

## PART 0 — ORIENTATION
**What This System Is and How to Use It**

This is not a collection of books.
This is an operating system.

The Legacy OS exists to answer one fundamental question:

> How does a human being transition from survival to structure, from reaction to design, from success to succession?

The answer is not motivation.
The answer is architecture.

This system documents the deliberate construction of a human, familial, legal, and financial operating system—designed to survive chaos, scale responsibility, and transmit clarity across generations.

You do not finish this system.
You operate it.

---

## INTRODUCTION
**THE 10/90 RULE — A PHILOSOPHY BORN FROM FIRE.**

Every human life operates within two forces.

One is inherited.
The other is constructed.

Destiny accounts for the circumstances we do not choose—
birth, family, environment, timing, disruption, loss, and chance.
It shapes the starting conditions of a life, but not its final form.

Creation begins where destiny ends.

The 10/90 rule is a simple distinction with serious consequences:

> **Ten percent of life is dictated by forces beyond control.**
> **Ninety percent is determined by how a person responds, structures, and governs what follows.**

This is not optimism.
It is responsibility.

The rule does not deny randomness, injustice, or tragedy.
It acknowledges them—and then places obligation where it belongs.

Destiny introduces events.
Creation determines outcomes.

Most lives fail not because destiny is cruel, but because reaction replaces design.

Effort is mistaken for structure.
Emotion substitutes for governance.
Success is pursued without succession.
And responsibility grows without systems to support it.

The result is instability—not just in individuals, but in families, enterprises, and generations.

The Legacy OS exists because reaction does not scale.

When pressure increases, unstructured effort collapses.
When responsibility multiplies, motivation expires.
When succession approaches, clarity disappears.

The 10/90 rule reframes the problem.
It shifts attention away from blaming circumstances and toward designing systems that can absorb them.

Creation, in this context, is not ambition.
It is architecture.
It is the deliberate construction of internal discipline, emotional governance, family structure, legal clarity, financial continuity, and decision-making systems that function under stress.

This philosophy was not formed in theory.
It was forced into existence by pressure—by moments where effort failed, emotion overwhelmed, and the absence of structure became undeniable.

Fire reveals what survives without design.
It also reveals what must be built afterward.

The chapters that follow do not attempt to control destiny.
They focus on mastering response.
They do not promise certainty.
They insist on preparation.
They do not celebrate success.
They prioritize continuity.

The 10/90 rule is not a belief system.
It is a filter.

It asks one question repeatedly:
**What part of this is uncontrollable—and what part must now be designed?**

Once that distinction is made, excuses lose relevance.
Structure becomes mandatory.

This introduction marks the philosophical boundary.
What follows is no longer an explanation of why systems matter.
It is a commitment to build them.

---

## THE AGE 33 MANIFESTO
**THE TRANSITION FROM REACTION TO CREATION**

What follows is not reflection.
It is commitment.

Age thirty-three is not a milestone.
It is a threshold.

It marks the point where experience stops accumulating and begins demanding structure.

The years before this phase are shaped largely by inheritance—
family, environment, opportunity, error, timing, and circumstance.
They teach, but they do not yet ask for authorship.

At thirty-three, that changes.

This is the age where reaction becomes insufficient.
Where survival no longer justifies repetition.
Where responsibility outweighs explanation.

Age thirty-three is the moment a person is no longer shaped primarily by events, but by the systems used to respond to them.

This is not a claim of maturity.
It is an acceptance of accountability.

From this point forward, outcomes are no longer attributed to chance alone.

Patterns must be examined.
Structures must be built.
Decisions must be designed to endure beyond emotion.

Age thirty-three marks the transition from living within circumstances to designing the operating system that governs how circumstances are handled.

This is the shift from effort to architecture.
From intent to implementation.
From hope to design.

The past provides data.
The future demands structure.

This manifesto does not promise control.
It demands responsibility.

From this point on, life is not optimized through intensity, but through clarity, discipline, and repeatable systems.

Age thirty-three is not the beginning of certainty.
It is the beginning of authorship.

The years ahead will not be measured by what happens, but by what is built to handle what happens.

This page marks that transition.
What follows is no longer a story of events.
It is a record of design.

---

## PART I
**THE PROBLEM BEFORE THE SYSTEM**
*—Why Most Lives Collapse Without Architecture—*

### WHY EFFORT IS NOT ENOUGH

Most people believe effort precedes order.
In reality, effort without structure accelerates collapse.

Human beings are capable of discipline, sacrifice, intelligence, and endurance.
What they lack is architecture.

Without structure:
effort becomes exhaustion, ambition becomes noise, success becomes unstable, and responsibility becomes overwhelming.

Life does not break people because they are weak.
It breaks them because complexity outgrows ungoverned capacity.

This part exists to establish one truth:
The absence of structure is not a personal failure.
It is a design failure.

### THE ILLUSION OF CONTROL

People assume control exists because:
they are busy,
they make decisions daily,
and outcomes occasionally work.

This is illusion.

Control without systems is coincidence.
Consistency without systems is luck.

When pressure increases—
financial, emotional, relational, legal—
reaction replaces reason.

Most lives function acceptably in calm conditions.
They collapse under stress.

This is not morality.
It is mechanics.

### WHY SUCCESS DOES NOT PREVENT FAILURE

Success delays collapse. It does not prevent it.

Wealth amplifies weaknesses. Growth exposes gaps. Visibility increases risk.

Many people reach stability once—and mistake that moment for permanence.

Without systems: money magnifies entitlement, authority concentrates dangerously, and continuity depends on one individual.

This is where legacies die.

### THE REAL PROBLEM

The real problem is not lack of motivation.
It is lack of governance.

Human lives were never meant to scale emotionally. They must scale structurally.
Until structure exists, repetition is inevitable.

This part closes with one conclusion:
Before any operating system can be built, the need for one must be undeniable.

---

## PART II
**FROM EXPERIENCE TO DATA**
*—How Pain Becomes Architecture—*

### WHY EXPERIENCE ALONE DOES NOT CREATE WISDOM

Experience is raw input.
Wisdom is processed output.

Most people accumulate experiences and call it growth.
They do not extract systems.

Pain without structure becomes trauma.
Failure without analysis becomes repetition.
Responsibility without boundaries becomes resentment.

Experience only becomes useful when it is converted into rules.

### THE ROLE OF PRESSURE

Pressure is not an enemy.
It is a diagnostic tool.

Under pressure:
weak habits surface,
unclear roles explode,
undocumented decisions create conflict,
and emotional governance fails.

Pressure does not create flaws.
It reveals them.

This part reframes hardship as signal, not suffering.

### THE DIFFERENCE BETWEEN HEALING AND DESIGN

Healing restores function.
Design prevents recurrence.

Most people stop at healing.
They do not redesign the system that caused the wound.
As a result, the same failures return in different forms.

Design asks a harder question:
What allowed this to happen—and how do I prevent it structurally?

### EXPERIENCE AS DATA

This system treats life events as data points:
* What broke?
* Why did it break?
* What was undocumented?
* What depended on emotion?
* What lacked delegation?
* What lacked authority boundaries?

Answers to these questions form the blueprint.

This part ends with a shift:
Life is no longer interpreted emotionally.
It is audited architecturally.

---

## PART III
**THE INTERNAL OPERATING SYSTEM**
*—From Reaction to Governance—*

### WHY THE FIRST SYSTEM IS INTERNAL

Before families can be governed,
before institutions can be designed,
before wealth can be structured—
the individual must be governed.

An ungoverned mind cannot run a governed system.

This part introduces the Internal OS—the invisible layer that decides how everything else functions.

### EMOTIONAL GOVERNANCE

Emotions are signals, not commands.

Without governance:
fear dictates decisions,
guilt distorts judgment,
anger accelerates damage,
and grief hijacks authority.

The Internal OS introduces:
delay,
review,
filtering,
and restraint.

Emotion is acknowledged.
Authority is not surrendered.

### DECISION ARCHITECTURE

Most decisions fail because:
criteria are unclear,
authority is undefined,
and consequences are not mapped.

The Internal OS enforces:
decision thresholds, escalation rules, review cycles, and documentation.

This is not rigidity.
It is protection.

### RESPONSIBILITY WITHOUT HEROISM

Heroism destroys systems.
Burnout is not sacrifice.
It is design failure.

The Internal OS removes dependence on:
intensity, personal suffering, emotional endurance, and silent carrying.

Responsibility becomes sustainable only when it is distributed.

### THE TRANSITION COMPLETE

At the end of this part, the reader understands:
Reaction is human.
Governance is chosen.

This completes the internal transition.
What follows next is no longer personal reform.
It is generational design.

---

## PART IV
**VISION 2030 — THE DECADE DESIGN**
*Why Vision Is Not a Dream.*

**This section defines a governing boundary, not an execution plan**

Most people treat vision as imagination.
I treat it as governance.

A dream is emotional.
A vision is architectural.

Dreams comfort the mind.
Visions discipline behaviour.

Vision 2030 is not a motivational destination.
It is a ten-year operating boundary that decides:
what I build,
what I refuse,
what I protect,
and what I deliberately leave unfinished.

This vision exists to answer one question with brutal clarity:
> **If I live deliberately for the next decade, what must exist by 2030—regardless of noise, cycles, or disruption?**

### THE DECADE FRAME

The decade from 2020 to 2030 is not linear.
It is compressed.

Technology accelerates outcomes.
Mistakes compound faster.
Discipline pays earlier.
Negligence destroys quicker.

In such an environment, reaction is fatal.
Only design survives.

Vision 2030 exists to ensure that my life, my family, and my institutions are run on intention, not momentum.

### THE FIVE PILLARS OF VISION 2030

Vision 2030 is structured across five non-negotiable pillars.

Each pillar is independent.
Together, they form a closed system.

If one collapses, the vision weakens.
If all are governed, continuity is assured.

#### PILLAR I — FAMILY STABILITY & CONTINUITY

Wealth without family stability is failure.

By 2030, the primary outcome is not scale.
It is peace.

This pillar exists to ensure:
emotional security, role clarity, inter-generational trust, and conflict-resilient relationships.

*Vision 2030 Family Outcomes:*
* A clearly documented Family Constitution
* Defined roles across generations
* No ambiguity around responsibility vs entitlement
* Financial transparency without emotional dependency
* Decision-making systems that prevent disputes
* Children raised with clarity, not confusion
* Family unity that does not depend on my presence alone

The goal is simple:
If I am absent, the family still functions.
If I am present, the family flourishes.

#### PILLAR II — DEBT ELIMINATION & FINANCIAL SANITY

Debt is not just financial pressure.
It is psychological leakage.

Vision 2030 does not chase excess returns.
It prioritizes clean structure.

This pillar exists to restore financial dignity, control, and predictability.

*Vision 2030 Financial Outcomes:*
* Complete elimination of toxic and legacy debt
* Cashflow stability over speculative growth
* Assets that serve governance, not ego
* Clear separation between: income, operating capital, long-term assets, and legacy holdings
* No personal guarantees without institutional backing
* No emotional investing
* No dependency on single income sources

Freedom is not how much you earn.
Freedom is how little you fear financial collapse.

#### PILLAR III — INSTITUTIONAL ASSET ARCHITECTURE

Individuals die. Institutions endure.

Vision 2030 moves my life from person-centric execution to institution-centric continuity.

This pillar exists to ensure that: assets outlive individuals, values outlive founders, and operations survive succession.

*Vision 2030 Institutional Outcomes:*
* Shahana Heritage LLP functioning as a true heritage holding institution
* Clear asset segregation: personal, operational, legacy.
* Property and real-estate systems that run independent of me
* AssetWise operating as a professional property management engine
* Legal clarity across ownership, management, and beneficiaries
* Intellectual property (books, frameworks, systems) owned institutionally
* No single point of failure

If The Legacy OS is the software,
this pillar ensures the hardware never crashes.

#### PILLAR IV — KNOWLEDGE, AUTHORSHIP & AUTHORITY

By 2030, silence is not humility.
Silence is abdication.

This pillar exists to ensure that lived wisdom does not die undocumented.

Authorship is not branding.
It is responsibility.

*Vision 2030 Knowledge Outcomes:*
* Completion of *The Legacy OS* master system
* A published micro-book series documenting each OS layer
* Clear authorial positioning: not as a guru, not as a motivator, but as a system architect
* A documented philosophy that others can operate
* No dependency on trends, platforms, or virality
* Authority derived from structure, not noise

This is not about influence.
It is about preservation of clarity.

#### PILLAR V — SUCCESSION OVER SELF

The final pillar dissolves the ego.

Vision 2030 is not about what I accumulate.
It is about what continues.

This pillar exists to finalize the transition from:
achievement → stewardship
identity → succession
self → system

*Vision 2030 Succession Outcomes:*
* Children inheriting clarity, not chaos
* Systems that reduce emotional decision-making after my exit
* Governance that protects assets during grief
* Leadership continuity without personality dependence
* Wealth serving responsibility, not entitlement
* A legacy measured in stability, not applause

By 2030, my relevance must decrease—
while the system’s relevance increases.

That is success.

### WHAT VISION 2030 IS NOT

To protect execution, Vision 2030 explicitly rejects:
* vanity expansion
* uncontrolled diversification
* fame without substance
* speed without structure
* partnerships without alignment
* growth that threatens family peace
* success that requires moral compromise

Exclusion is as important as ambition.

### THE NON-NEGOTIABLE PRINCIPLES OF THE DECADE

Vision 2030 is governed by five rules:

1.  **Family First Is Operational, Not Emotional**
    Decisions must protect long-term family stability.
2.  **Structure Before Scale**
    No expansion without governance.
3.  **Clarity Over Comfort**
    Hard decisions made early prevent chaos later.
4.  **Systems Over Heroics**
    Nothing should depend on burnout or sacrifice theatrics.
5.  **Succession Is the End Goal**
    Everything must be transferable.

### VISION 2030 AS A FILTER

From this point forward, every major decision passes one question:
> **Does this strengthen Vision 2030—or distract from it?**

If it strengthens → proceed deliberately.
If it distracts → decline without guilt.

Vision removes negotiation with temptation.

### THE ROLE OF TIME

Vision 2030 does not demand urgency.
It demands consistency.

I am not racing the decade.
I am designing it.

Small correct decisions, repeated patiently, will outperform emotional intensity.

### THE FINAL INTENT

Vision 2030 is not about becoming extraordinary.
It is about becoming unshakeable.

By 2030:
my family must feel secure,
my institutions must function without my presence,
my son must inherit structure, not burden,
my work must speak without explanation,
and my legacy must not rely on memory.

This is not aspiration.
This is design.

The decade is defined. Execution begins now.

---

## PART V
**THE MICRO BOOK OPERATING MAP**
*—How the Legacy OS Is Deployed—*

The Legacy OS is not meant to be consumed at once.
It is designed to be installed in layers.

The twelve micro books are not spin-offs.
They are execution modules.

Each micro book isolates one layer of the operating system so it can be understood, applied, and stabilized before moving to the next.

This prevents overwhelm.
It prevents misapplication.
It prevents intellectual consumption without behavioral change.

### HOW TO READ THE MICRO BOOKS

The micro books must be read in sequence.
Skipping modules creates structural gaps.
Reordering them creates instability.

Each book assumes the previous layer is already active.

### THE 12 MICRO BOOKS — SYSTEM ORDER

#### PHASE 1 — THE FOUNDATION & THE REBUILD

* **Micro Book 1 — My Life: 10% Destiny, 90% Creation**
    Responsibility philosophy and lived foundation.
* **Micro Book 2 — The Age 33 Reset: Rebooting the Human Operating System**
    The transition from reaction to authorship.
* **Micro Book 3 — The Blueprint: Designing Life Instead of Surviving It**
    Intentional life architecture and system thinking.
* **Micro Book 4 — Emotional Governance: Running Your Inner World Like a CEO**
    Emotions acknowledged without authority.

#### PHASE 2 — BUILDING CAPABILITY & RESOURCES

* **Micro Book 5 — The Legal Clarity Framework: How Law Protects Your Peace & Growth**
    Legal structure as stability, boundaries, and protection.
* **Micro Book 6 — The Wealth Kernel 1.0: Multi-Tier Money Architecture**
    Clean money structure serving continuity.
* **Micro Book 7 — The Family Constitution 1.0: Governance, Roles, Boundaries & Peace Architecture**
    Family as an institution, not emotion.
* **Micro Book 8 — The Trauma Alchemy Manual: Turning Pain Into Power Assets**
    Converting suffering into structured strength.

#### PHASE 3 — SCALING & LEGACY

* **Micro Book 9 — The 90-Day OS Upgrade: The Quarterly Reset That Rewrites Identity**
    Cadence, review, and renewal.
* **Micro Book 10 — The Generational OS: Upgrading Your Life Into a Dynasty System**
    Institutions over individuals.
* **Micro Book 11 — The Firewall: Protecting Your Legacy from Threats**
    Risk, disruption, and continuity protection.
* **Micro Book 12 — My Legacy: 5% Self, 95% Succession**
    Final transition from self to system.

### HOW THIS MASTER BOOK SHOULD BE USED

This Master Map exists to:
orient the reader,
define the system,
and prevent misinterpretation.

It is not meant to replace the micro books.

Once the system is understood here, execution happens through the micro books—one layer at a time.

---

## THE INVITATION TO UPDATE YOUR OS.

You do not need a perfect past.
You do not need talent.
You need awareness.
You need structure.
You need discipline.
You need ownership.

**Welcome to The Legacy OS.**

This is not a book series. This is a system.

Your old operating system ends here.
Your legacy begins now.

**VERSION NOTE**
The Legacy OS - v1.0
Future editions refine execution, not philosophy.

---

## THE LEGACY OS — PHASE MAP

**PHASE I: FOUNDATION & REBUILD**
│
├─ Philosophy Installed → (10% Destiny / 90% Creation)
├─ Identity Rebooted → (Age 33 Reset)
├─ Life Architecture Defined → (The Blueprint)
├─ Emotional Control Established → (Emotional Governance)
├─ Trauma Integrated → (Trauma Alchemy)
├─ Identity Stabilized → (90-Day OS Upgrade)
│
▼
**[OUTCOME: A self-aware, emotionally governed, non-reactive individual]**

**PHASE II: CAPABILITY & RESOURCES**
│
├─ Legal Protection Layer → (Legal Clarity Framework)
├─ Wealth Architecture Layer → (Wealth Kernel 1.0)
├─ Family Governance Layer → (Family Constitution 1.0)
├─ Risk Protection Layer → (The Firewall)
│
▼
**[OUTCOME: A legally protected, financially structured, institution-ready life system]**

**PHASE III: SCALING & LEGACY**
│
├─ Generational Transfer Systems → (Generational OS)
├─ Succession Finalization → (My Legacy: 5% Self, 95% Succession)
│
▼
**[OUTCOME: A legacy that operates without the founder]**

---

## THE_LEGACY_OS
**A Human, Family & Institutional Operating System**

Most lives fail not because of a lack of intelligence, effort, or ambition—but because they are run on inherited defaults.

* Unexamined beliefs.
* Emotional decision-making.
* No structure.
* No governance.
* No system.

The Legacy OS is not a motivational book. It is a framework. Written as the master map for a modular micro-book series, this book introduces a three-phase operating system designed to help individuals move:

* from survival to structure
* from reaction to design
* from success to succession

Inside, the author lays out a clear architecture for rebuilding life across three phases: Foundation & Rebuild, Capability & Resources, and Scaling & Legacy—along with the twelve core modules that implement this system in real life.

This book does not tell you what to feel. It tells you what to build. The philosophy documented here is not theoretical. It is actively implemented through a legacy institution designed to preserve values, assets, governance, and continuity across generations.

If you are looking for inspiration, this book is not for you. If you are looking for structure, clarity, and long-term continuity, Your old operating system ends here.

Welcome to **THE_LEGACY_OS**.
`;

// --- MARKDOWN PARSER ENGINE V2.0 ---
const parseMarkdown = (text) => {
  if (!text) return [];
  
  // 1. Split by Headers (# or ## or ###)
  const parts = text.split(/^#{1,3}\s+(.+)$/gm);
  
  const chapters = [];
  
  // Start loop at 1 (skipping preamble text before first header)
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const rawContent = parts[i + 1];

    if (!title || !rawContent) continue;

    // 2. Process Content to HTML
    let htmlContent = rawContent
      .split(/\n\s*\n/) // Split paragraphs
      .map(para => {
        let p = para.trim();
        if (!p) return '';

        // Images: ![Alt](url)
        if (p.startsWith('![') && p.includes('](')) {
          const imgMatch = p.match(/!\[(.*?)\]\((.*?)\)/);
          if (imgMatch) {
            let src = imgMatch[2];
            return `<div class="my-8 flex justify-center"><img src="${src}" alt="${imgMatch[1]}" class="max-w-full h-auto rounded-sm border border-stone-800" onError="this.style.display='none'" /></div>`;
          }
        }

        // Blockquotes: > text
        if (p.startsWith('> ')) {
          return `<blockquote class="border-l-2 border-amber-600 pl-4 italic text-stone-400 my-6">${p.replace(/^> /, '')}</blockquote>`;
        }
        
        // Horizontal Rules: ---
        if (p === '---' || p === '***') {
          return `<hr class="border-stone-800 my-8 opacity-50" />`;
        }

        // Formatting
        p = p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-200 font-bold">$1</strong>'); // Bold
        p = p.replace(/\*(.*?)\*/g, '<em class="text-amber-600/80">$1</em>'); // Italic
        
        // Lists
        if (p.startsWith('- ') || p.startsWith('* ')) {
             const items = p.split('\n').map(item => `<li class="ml-4 list-disc text-stone-400">${item.replace(/^[-*] /, '')}</li>`).join('');
             return `<ul class="space-y-2 my-4">${items}</ul>`;
        }
        
        return `<p>${p}</p>`;
      })
      .join('');

    chapters.push({
      id: i,
      title: title,
      subtitle: `SECTION ${chapters.length + 1}`,
      content: htmlContent
    });
  }

  return chapters;
};

// --- COMPONENTS ---

const CoverPage = ({ onStart, loading }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-stone-200 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950"></div>
      <div className="w-full h-full opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>

    <div className="z-10 flex flex-col items-center px-6 max-w-4xl mx-auto animate-fade-in-up">
      <div className="mb-10 p-6 rounded-full bg-zinc-900/80 border border-stone-800 shadow-[0_0_50px_rgba(217,119,6,0.1)] backdrop-blur-sm">
         <img src={CONFIG.logoPath} alt="Logo" className="w-24 h-24 object-contain opacity-90" onError={(e) => e.target.style.display='none'} />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-serif tracking-tight font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-stone-100 to-stone-500 mb-4">{CONFIG.title}</h1>
      <p className="text-lg md:text-xl text-amber-600/90 font-mono tracking-widest uppercase text-center mb-8">{CONFIG.subtitle}</p>

      <div className="w-56 md:w-64 aspect-[2/3] my-8 shadow-2xl shadow-amber-900/20 border border-stone-800/50 relative group cursor-pointer overflow-hidden rounded-sm" onClick={onStart}>
         <img src={CONFIG.coverPath} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML = '<div class="flex items-center justify-center h-full text-stone-500">Cover Image</div>'; }} />
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
      </div>

      <p className="text-stone-500 font-sans tracking-wide text-xs mt-4 mb-8">BY {CONFIG.author.toUpperCase()}</p>

      <button onClick={onStart} disabled={loading} className="group relative px-10 py-4 bg-transparent border border-stone-700 hover:border-amber-600 text-stone-300 transition-all duration-500 ease-out overflow-hidden rounded-sm disabled:opacity-50">
        <span className="absolute inset-0 w-full h-full bg-amber-900/10 group-hover:bg-amber-900/20 transition-all duration-500 transform translate-y-full group-hover:translate-y-0"></span>
        <span className="relative font-mono tracking-widest text-sm group-hover:text-amber-500">
          {loading ? "LOADING DATA..." : "INITIALIZE READING"}
        </span>
      </button>
    </div>
    <div className="absolute bottom-6 text-stone-700 text-[10px] font-mono tracking-wider opacity-50">v2.4.0 SYSTEM READY</div>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
    <div className="h-full bg-amber-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(217,119,6,0.5)]" style={{ width: `${progress}%` }} />
  </div>
);

const TableOfContents = ({ chapters, activeChapter, onSelect, onClose }) => (
  <div className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in">
    <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors p-2"><X size={32} strokeWidth={1} /></button>
    <h2 className="text-2xl font-serif text-amber-600 mb-12 tracking-wider border-b border-amber-900/30 pb-4">INDEX</h2>
    <nav className="space-y-4 w-full max-w-md text-center max-h-[70vh] overflow-y-auto">
      {chapters.map((chapter, index) => (
        <button key={chapter.id} onClick={() => onSelect(index)} className={`w-full py-4 px-4 text-lg md:text-xl font-serif transition-all duration-300 rounded-sm ${activeChapter === index ? 'bg-amber-900/10 text-amber-500 border border-amber-900/20' : 'text-stone-500 hover:text-stone-200 hover:bg-stone-900'}`}>
          <span className="block text-[10px] font-mono text-stone-600 mb-1 uppercase tracking-widest">{chapter.subtitle}</span>
          {chapter.title}
        </button>
      ))}
    </nav>
  </div>
);

const IconSimulator = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in">
    <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-white"><X size={24} /></button>
    <h2 className="text-amber-500 font-mono tracking-widest uppercase mb-12 text-sm">Device Simulation Mode</h2>
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 bg-black rounded-[28px] overflow-hidden ring-1 ring-white/10 shadow-2xl">
           <img src={CONFIG.logoPath} className="w-full h-full object-cover bg-stone-900" alt="App Icon" />
        </div>
        <span className="text-xs font-sans text-stone-500">iOS (iPhone)</span>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 flex items-center justify-center">
           <div className="w-28 h-28 rounded-full overflow-hidden bg-stone-900 ring-1 ring-white/10 shadow-2xl">
             <img src={CONFIG.logoPath} className="w-full h-full object-cover" alt="App Icon" />
           </div>
        </div>
        <span className="text-xs font-sans text-stone-500">Android (Adaptive)</span>
      </div>
    </div>
  </div>
);

const Controls = ({ theme, toggleTheme, fontSize, setFontSize, onSimulate }) => (
  <div className="absolute top-full right-0 mt-4 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xl rounded-sm p-5 w-64 animate-slide-up z-50">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans uppercase tracking-wider text-stone-500 dark:text-stone-400">Mode</span>
        <div className="flex bg-stone-100 dark:bg-zinc-800 rounded-full p-1 border border-stone-200 dark:border-zinc-700">
          <button onClick={() => theme === 'dark' && toggleTheme()} className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow-sm text-amber-600' : 'text-stone-400'}`}><Sun size={14} /></button>
          <button onClick={() => theme === 'light' && toggleTheme()} className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-zinc-700 shadow-sm text-amber-400' : 'text-stone-400'}`}><Moon size={14} /></button>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
          <span className="text-xs font-sans uppercase tracking-wider">Size</span>
          <span className="text-xs font-mono">{fontSize}px</span>
        </div>
        <input type="range" min="16" max="26" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full h-1 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-600" />
      </div>
      <button onClick={onSimulate} className="w-full flex items-center justify-center space-x-2 py-3 border border-stone-200 dark:border-zinc-700 rounded-sm text-xs font-sans text-stone-500 hover:text-amber-600 hover:border-amber-600/30 transition-all">
        <Smartphone size={14} /><span>Icon Simulator</span>
      </button>
    </div>
  </div>
);

export default function TheLegacyReader() {
  const [view, setView] = useState('cover'); 
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(19);
  const [showControls, setShowControls] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- AUTO-LOADER SYSTEM ---
  useEffect(() => {
    async function loadBook() {
      try {
        // Try to fetch file first, IF it fails, use preloaded content
        // This solves the preview error while keeping the deployment feature active
        try {
            const response = await fetch(`${CONFIG.bookPath}?t=${Date.now()}`);
            if (!response.ok) throw new Error("Fetch failed");
            const text = await response.text();
            processText(text);
        } catch (fetchError) {
            console.warn("Using embedded content fallback");
            processText(PRELOADED_BOOK);
        }
      } catch (error) {
        console.error("Critical Failure:", error);
        setChapters(CONFIG.defaultChapters);
      } finally {
        setLoading(false);
      }
    }

    function processText(text) {
        const parsedChapters = parseMarkdown(text);
        if (parsedChapters.length > 0) {
          setChapters(parsedChapters);
        } else {
          setChapters([{
             id: 1,
             title: "Full Document",
             subtitle: "READING",
             content: text.split('\n').map(p => `<p>${p}</p>`).join('')
          }]);
        }
    }

    loadBook();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (view !== 'reader') return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      const chapterBase = (currentChapterIndex / chapters.length) * 100;
      const chapterSegment = 100 / chapters.length;
      const chapterProgress = (scrollPercentage / 100) * chapterSegment;
      setProgress(chapterBase + chapterProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view, currentChapterIndex, chapters]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Fonts injection
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const currentChapter = chapters[currentChapterIndex] || CONFIG.defaultChapters[0];

  if (view === 'cover') return <CoverPage onStart={() => setView('reader')} loading={loading} />;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900 text-stone-300' : 'bg-stone-50 text-stone-800'}`}>
      <ProgressBar progress={progress} />
      <header className={`fixed top-0 w-full z-30 transition-all duration-300 border-b backdrop-blur-md ${theme === 'dark' ? 'bg-zinc-900/95 border-zinc-800/50' : 'bg-white/95 border-stone-200/50'}`}>
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setShowTOC(true)} className="p-2 -ml-2 hover:text-amber-600 transition-colors"><Menu size={20} /></button>
          <div className="flex flex-col items-center cursor-pointer group" onClick={() => setShowTOC(true)}>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 opacity-80 group-hover:opacity-100 transition-opacity">{CONFIG.title}</span>
            <span className={`text-xs font-serif ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
               {currentChapter.subtitle}
            </span>
          </div>
          <div className="relative">
            <button onClick={() => setShowControls(!showControls)} className={`p-2 -mr-2 transition-colors ${showControls ? 'text-amber-600' : 'hover:text-amber-600'}`}><Type size={20} /></button>
            {showControls && <Controls theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} fontSize={fontSize} setFontSize={setFontSize} onSimulate={() => { setShowControls(false); setShowSimulator(true); }} />}
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <article className="animate-fade-in">
          <header className="mb-12 text-center">
            <span className="block text-amber-600 font-mono text-xs tracking-[0.2em] mb-4 uppercase">{currentChapter.subtitle}</span>
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-8 ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>{currentChapter.title}</h2>
            <div className="w-8 h-[1px] bg-amber-600/50 mx-auto"></div>
          </header>
          <div className="prose dark:prose-invert prose-lg md:prose-xl mx-auto font-serif leading-loose" style={{ fontSize: `${fontSize}px` }}>
            <div dangerouslySetInnerHTML={{ __html: currentChapter.content }} />
          </div>
          <div className="mt-20 flex items-center justify-center space-x-3 text-amber-600/40">
            <div className="w-1 h-1 rounded-full bg-current"></div><div className="w-1 h-1 rounded-full bg-current"></div><div className="w-1 h-1 rounded-full bg-current"></div>
          </div>
        </article>
      </main>
      <footer className={`fixed bottom-0 w-full z-30 border-t backdrop-blur-md transition-colors ${theme === 'dark' ? 'bg-zinc-900/95 border-zinc-800/50' : 'bg-white/95 border-stone-200/50'}`}>
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => { if(currentChapterIndex > 0) { setCurrentChapterIndex(prev => prev - 1); window.scrollTo(0,0); } }} disabled={currentChapterIndex === 0} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-stone-100 dark:hover:bg-zinc-800'}`}><ChevronLeft size={16} /><span className="text-sm font-sans font-medium hidden md:inline">Previous</span></button>
          <span className="text-[10px] font-mono text-stone-500 tracking-wider">{(currentChapterIndex + 1)} <span className="text-stone-700">/</span> {chapters.length}</span>
          <button onClick={() => { if(currentChapterIndex < chapters.length - 1) { setCurrentChapterIndex(prev => prev + 1); window.scrollTo(0,0); } }} disabled={currentChapterIndex === chapters.length - 1} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === chapters.length - 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-stone-100 dark:hover:bg-zinc-800'}`}><span className="text-sm font-sans font-medium hidden md:inline">Next</span><ChevronRight size={16} /></button>
        </div>
      </footer>
      {showTOC && <TableOfContents chapters={chapters} activeChapter={currentChapterIndex} onSelect={(idx) => { setCurrentChapterIndex(idx); setShowTOC(false); window.scrollTo(0,0); }} onClose={() => setShowTOC(false)} />}
      {showSimulator && <IconSimulator onClose={() => setShowSimulator(false)} />}
      <style>{`
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::selection { background: #d97706; color: white; }
        .prose p { margin-bottom: 1.8em; text-align: left; }
        .prose strong { color: inherit; font-weight: 700; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(120, 113, 108, 0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(120, 113, 108, 0.4); }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}