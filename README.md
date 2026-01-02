#The Legacy OS - Digital Heritage Artifact

A React-based progressive web application (PWA) designed to host and display the "Legacy OS" micro-book series by Advocate Firoz KC.

🌟 Overview

This project is not just an ebook reader; it is a Digital Heritage Artifact. It is designed with a "systems-first" philosophy, treating the life and lessons of the author as an operating system (OS) rather than just content.

Key Features:

Vibrant Landing Portal: Gold & Black aesthetic with animated entry points.

Dual-Language Support: Full English and Malayalam (ML) interface and content toggling.

Media Hub: Supports Text (Markdown), Audio (MP3), and Video reviews.

Phase-Based Library: Books are organized into 5 distinct phases of the Legacy OS.

Progress Tracking: LocalStorage saves reading progress automatically.

PWA Ready: Installable on iOS and Android home screens.

📂 Project Structure

The project uses a File-Based Content Management System. You do not need to edit code to update content; you only need to manage files in the public folder.

legacy-reader/
├── public/                 # ALL CONTENT GOES HERE
│   ├── data/
│   │   ├── audio.json      # List of tracks for the Audio section
│   │   └── reviews.json    # List of reviews for the Review section
│   ├── audio/              # Upload MP3 files here (e.g., audio-1-en.mp3)
│   ├── book-0.md           # English content for Book 0
│   ├── book-0-ml.md        # Malayalam content for Book 0
│   ├── cover-0.png         # Cover image for Book 0
│   ├── cover.png           # Main landing page cover
│   └── icon-v2.png         # App Icon
├── src/
│   └── TheLegacyReader.jsx # Main Application Logic (React)
└── README.md               # This file


🚀 How to Update Content

1. Adding a New Book Chapter

Write your content in Markdown format (use # for headers).

Save the file as book-{ID}.md (e.g., book-1.md) for English.

Save the Malayalam version as book-{ID}-ml.md (e.g., book-1-ml.md).

Upload both to the public folder.

2. Updating Audio Tracks

Upload your MP3 file to public/audio/.

Naming convention: audio-{ID}-{LANG}.mp3 (e.g., audio-1-en.mp3).

(Optional) Edit public/data/audio.json if you want to add global tracks to the main "Audio Books" window.

3. Managing Reviews

Open public/data/reviews.json.

Add a new entry following the existing format:

{
  "id": 4,
  "name": "New Reviewer",
  "role": "Reader",
  "type": "text",
  "content": "This book changed my life..."
}


4. Changing Images

Book Covers: Overwrite cover-{ID}.png (e.g., cover-0.png).

Landing Covers: Overwrite cover.png (Series), cover1.png (Architect), cover-audio.png, or cover-reviews.png.

🛠 Deployment

To push your changes to the live site, open your terminal in the project folder and run:

git add .
git commit -m "Update content"
git push


The site will automatically rebuild and update within 60 seconds.

© 2026 Shahana Heritage LLP
Designed & Architected for Advocate Firoz KC# The Legacy OS Reader