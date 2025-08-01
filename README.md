# 🎬 YouTube Video & Audio Downloader

A powerful web application built with **Flask** and **yt-dlp** that lets users download YouTube videos and audio in multiple quality formats — including up to 8K!

## 🚀 Features

- 🎥 Download YouTube videos in 480p, 720p, 1440p, or highest available
- 🎵 Extract high-quality audio (MP3 320kbps)
- 📁 Files saved to your system's `Downloads` folder
- 🔒 Cookies support for age-restricted/private videos
- ✅ Real-time progress (if enabled)
- 🧼 Clean filenames and supports audio-only extraction
- 💻 Simple, responsive HTML frontend

---

## 🛠 Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** HTML, CSS, JS
- **Downloader Engine:** yt-dlp (advanced fork of youtube-dl)
- **Others:** ffmpeg (for audio conversion)

---

## 📂 Project Structure
YouTube Video Downloader/
├── app.py # Main Flask backend
├── templates/
│ └── index.html # HTML frontend
├── static/
│ ├── css/ # Styling
│ └── js/ # JavaScript (progress, validation, etc.)
├── cookies.txt # (Optional) YouTube login session
├── .gitignore
└── README.md


---

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
