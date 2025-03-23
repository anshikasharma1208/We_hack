import yt_dlp
import requests

def get_transcription(video_url):
    """Extracts subtitles (if available) from a YouTube video."""
    ydl_opts = {
        'skip_download': True,
        'writeautomaticsub': True,
        'subtitleslangs': ['en'],
        'outtmpl': '%(id)s.%(ext)s'
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=False)
        subtitles = info.get('subtitles') or info.get('automatic_captions')
        if subtitles and 'en' in subtitles:
            sub_url = subtitles['en'][0]['url']
            return requests.get(sub_url).text  # Fetch subtitle content

    return None  # If no subtitles are available
