import urllib.request
import re
import os

url = "https://pixabay.com/videos/soccer-ball-football-sport-5264/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    mp4s = re.findall(r'https://[^\"]+?\.mp4[^\"]*', html)
    print("Found MP4 links:")
    for link in set(mp4s):
        print(link)

    # Pick the best resolution (medium/large)
    pixabay_mp4s = [l for l in mp4s if "pixabay" in l]
    if pixabay_mp4s:
        target_url = pixabay_mp4s[0]
        print(f"\nDownloading: {target_url}")
        output_path = os.path.join(os.getcwd(), "public", "hero-video.mp4")
        urllib.request.urlretrieve(target_url, output_path)
        print(f"Successfully downloaded to {output_path}")
    else:
        print("No direct pixabay mp4 found in HTML directly, checking JSON-LD or API patterns")
        # try regex for video sources
        sources = re.findall(r'src=["\'](https://[^"\']+\.mp4[^"\']*)["\']', html)
        print("Sources:", sources)
except Exception as e:
    print("Error:", e)
