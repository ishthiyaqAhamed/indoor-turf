const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Fetching Pixabay video page HTML via curl...');
  const cmd = `curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36" "https://pixabay.com/videos/soccer-ball-football-sport-5264/"`;
  const html = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

  console.log('HTML Length:', html.length);
  fs.writeFileSync(path.join(__dirname, 'page.html'), html);

  // Extract video MP4 URLs
  const matches = html.match(/https:\/\/cdn\.pixabay\.com\/video\/[^\s"']+\.mp4[^\s"']*/g) || [];
  console.log('Found MP4 matches:', matches);

  if (matches.length > 0) {
    const targetUrl = matches[0];
    console.log('Downloading:', targetUrl);
    const dest = path.join(__dirname, '../public/hero-video.mp4');
    execSync(`curl -s -L -A "Mozilla/5.0" "${targetUrl}" -o "${dest}"`);
    console.log('SUCCESS: Video downloaded to public/hero-video.mp4');
  } else {
    // Look for any video CDN / AWS / cloudfront links
    const anyVideo = html.match(/https:\/\/[^\s"']+\.mp4[^\s"']*/g) || [];
    console.log('Any MP4 matches:', anyVideo);
    if (anyVideo.length > 0) {
      const targetUrl = anyVideo[0];
      const dest = path.join(__dirname, '../public/hero-video.mp4');
      execSync(`curl -s -L -A "Mozilla/5.0" "${targetUrl}" -o "${dest}"`);
      console.log('SUCCESS: Video downloaded to public/hero-video.mp4');
    }
  }
} catch (e) {
  console.error('Error:', e.message);
}
