const https = require('https');
const fs = require('fs');
const path = require('path');

const videoUrls = [
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd828d3e585aa2b6a22f3e82b7b51b&profile_id=164",
  "https://player.vimeo.com/external/435165997.sd.mp4?s=7b01d3211e4bf3ec1f33f95b5c90b63914ca46e4&profile_id=165",
  "https://player.vimeo.com/external/394347712.sd.mp4?s=83d65b7cbddbfbb50630b201476bbf2005e81f18&profile_id=165"
];

const dest = path.join(__dirname, '../public/hero-video.mp4');

function downloadVideo(urlIndex) {
  if (urlIndex >= videoUrls.length) {
    console.log("All candidates failed");
    return;
  }

  const url = videoUrls[urlIndex];
  console.log("Downloading video from:", url);

  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  https.get(url, options, (res) => {
    console.log("Status:", res.statusCode);
    if (res.statusCode === 302 || res.statusCode === 301) {
      https.get(res.headers.location, options, (redRes) => {
        const file = fs.createWriteStream(dest);
        redRes.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log("SUCCESS! Saved to public/hero-video.mp4");
        });
      });
    } else if (res.statusCode === 200) {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log("SUCCESS! Saved to public/hero-video.mp4");
      });
    } else {
      downloadVideo(urlIndex + 1);
    }
  }).on('error', (err) => {
    console.error("Error:", err);
    downloadVideo(urlIndex + 1);
  });
}

downloadVideo(0);
