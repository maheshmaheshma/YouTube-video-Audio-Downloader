# 🎬 YouTube Video & Audio Downloader

A powerful web application built with **Flask** and **yt-dlp** that lets users download YouTube videos and audio in multiple quality formats — including up to 8K!

## 🚀 Features

- 🎥 Download YouTube videos in 480p, 720p, 1440p, or highest available
- 🎵 Extract high-quality audio (MP3 320kbps)
- 📁 Files saved to your system's `Downloads` folder
- ✅ Real-time progress 
- 🧼 Clean filenames and supports audio-only extraction
- 💻 Simple, responsive HTML frontend

---

## 🛠 Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** HTML, CSS, JS
- **Downloader Engine:** yt-dlp (advanced fork of youtube-dl)
- **Others:** ffmpeg (for audio conversion)

---
To install FFmpeg, follow the instructions based on your operating system:

🪟 For Windows
🔧 Method 1: Manual Installation (Recommended for Python/yt-dlp projects)
Go to:
👉 https://www.gyan.dev/ffmpeg/builds/

Download:

Under “Release builds”, click the “ffmpeg-release-essentials.zip”

Extract the ZIP:

Right-click → Extract All

Move the extracted folder to a location like:
C:\ffmpeg

Add to Environment Variables:

Copy the path: C:\ffmpeg\bin

Press Windows + S, search for "Environment Variables"

In System Variables, select Path → click Edit

Click New → paste C:\ffmpeg\bin → click OK

✅ Verify:

Open Command Prompt, type:

nginx
Copy
Edit
ffmpeg -version
You should see FFmpeg version info.

🍎 For macOS
Using Homebrew:
bash
Copy
Edit
brew install ffmpeg
Don’t have Homebrew? Install it first:

bash
Copy
Edit
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
🐧 For Linux (Ubuntu/Debian)
bash
Copy
Edit
sudo apt update
sudo apt install ffmpeg
✅ Verify installation:
bash
Copy
Edit
ffmpeg -version
## 🔧 Requirements

Make sure the following are installed:

- Python 3.8+
- `ffmpeg` (add to PATH)
- `yt-dlp`

### Install dependencies:

```bash
pip install -r requirements.txt

👨‍💻 Developed by
Mamidi Mahesh
