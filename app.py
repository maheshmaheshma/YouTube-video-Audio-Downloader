import os
import base64
from flask import Flask, request, render_template, jsonify, send_file
from yt_dlp import YoutubeDL
from datetime import datetime
from pathlib import Path

app = Flask(__name__)
app.secret_key = 'secret'

# Decode COOKIE_DATA env variable and save as cookies.txt
cookie_b64 = os.getenv('COOKIE_DATA')
if cookie_b64:
    with open('cookies.txt', 'wb') as f:
        f.write(base64.b64decode(cookie_b64))

        
DOWNLOADS_DIR = str(Path.home() / "Downloads")

QUALITY_MAP = {
    'highest': 'bestvideo[ext=mp4]+bestaudio/best',
    'high': 'bestvideo[height<=1440]+bestaudio/best',
    'balanced': 'bestvideo[height<=720]+bestaudio/best',
    'compatible': 'bestvideo[height<=480]+bestaudio/best'
}


def sanitize_filename(name):
    return "".join(c for c in name if c not in r'<>:"/\|?*')

# Reusable yt-dlp base options (with cookies + user-agent)
def get_common_ydl_opts():
    return {
        'cookiefile': 'cookies.txt',  # Make sure this file exists and is valid
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36'
        },
        'quiet': True,
        'noplaylist': True
    }


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/start-download', methods=['POST'])
def start_download():
    data = request.get_json()
    url = data.get('url')
    quality = data.get('quality', 'highest')

    if not url:
        return jsonify({'success': False, 'error': 'No URL provided.'})

    try:
        # Get video info and sanitized title
        with YoutubeDL({'quiet': True}) as ydl:
            info_dict = ydl.extract_info(url, download=False)
            title = sanitize_filename(info_dict.get('title', 'video'))

        filepath = os.path.join(DOWNLOADS_DIR, f"{title}.mp4")

        ydl_opts = {
            'format': QUALITY_MAP.get(quality, 'bestvideo+bestaudio/best'),
            'outtmpl': filepath,
            'merge_output_format': 'mp4',
            'quiet': True,
            'noplaylist': True,
            'cookiefile': 'cookies.txt'
        }

        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        if not os.path.exists(filepath):
            return jsonify({'success': False, 'error': 'Downloaded file not found.'})

        return jsonify({'success': True, 'title': title})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/download-audio', methods=['POST'])
def download_audio():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'success': False, 'error': 'No URL provided.'})

    try:
        with YoutubeDL({'quiet': True}) as ydl:
            info = ydl.extract_info(url, download=False)
            title = sanitize_filename(info.get('title', 'audio'))

        outtmpl = os.path.join(DOWNLOADS_DIR, title + '.%(ext)s')

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': outtmpl,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '320',
                'cookiefile': 'cookies.txt'
            }],
            'quiet': True,
        }

        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        # Find the downloaded file
        downloaded_file = None
        for ext in ['.mp3', '.webm', '.m4a', '.wav']:
            possible_file = os.path.join(DOWNLOADS_DIR, f"{title}{ext}")
            if os.path.exists(possible_file):
                downloaded_file = possible_file
                break

        if not downloaded_file:
            return jsonify({'success': False, 'error': f"Audio file not found for title '{title}'."})

        return jsonify({'success': True, 'title': title})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/info', methods=['POST'])
def info():
    url = request.form.get('video_url')
    try:
        with YoutubeDL({'quiet': True}) as ydl:
            info = ydl.extract_info(url, download=False)
            return jsonify({
                'title': info.get('title'),
                'duration': info.get('duration'),
                'uploader': info.get('uploader'),
                'view_count': info.get('view_count'),
                'upload_date': info.get('upload_date'),
            })
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
