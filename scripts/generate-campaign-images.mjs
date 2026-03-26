import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const campaignDir = path.join(projectRoot, 'public/campaigns/tshirt-70-left');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(campaignDir, 'png');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert image to base64
function imageToBase64(imagePath) {
  const fullPath = path.join(publicDir, imagePath);
  if (fs.existsSync(fullPath)) {
    const imageBuffer = fs.readFileSync(fullPath);
    const ext = path.extname(imagePath).slice(1);
    const mimeType = ext === 'jpg' ? 'jpeg' : ext;
    return `data:image/${mimeType};base64,${imageBuffer.toString('base64')}`;
  }
  console.warn(`⚠️  Image not found: ${fullPath}`);
  return '';
}

// Replace all image src with base64
function embedImages(htmlContent) {
  const imgRegex = /src="(\/images\/[^"]+)"/g;
  let match;
  let result = htmlContent;

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const imagePath = match[1];
    const base64 = imageToBase64(imagePath);
    if (base64) {
      result = result.replace(`src="${imagePath}"`, `src="${base64}"`);
    }
  }

  return result;
}

const templates = [
  // Original Story templates
  { file: 'story/barrel-story.html', output: 'barrel-story.png', width: 1080, height: 1920, transparent: false },
  { file: 'story/reben-story.html', output: 'vino-story.png', width: 1080, height: 1920, transparent: false },
  { file: 'story/communion-story.html', output: 'communion-story.png', width: 1080, height: 1920, transparent: false },

  // Original Feed templates
  { file: 'feed/barrel-feed.html', output: 'barrel-feed.png', width: 1080, height: 1080, transparent: false },
  { file: 'feed/reben-feed.html', output: 'vino-feed.png', width: 1080, height: 1080, transparent: false },
  { file: 'feed/communion-feed.html', output: 'communion-feed.png', width: 1080, height: 1080, transparent: false },

  // Transparent Overlays
  { file: 'overlay/barrel-overlay.html', output: 'barrel-overlay.png', width: 1080, height: 1920, transparent: true },
  { file: 'overlay/vino-overlay.html', output: 'vino-overlay.png', width: 1080, height: 1920, transparent: true },
  { file: 'overlay/communion-overlay.html', output: 'communion-overlay.png', width: 1080, height: 1920, transparent: true },

  // New Feed Variants (V2)
  { file: 'feed-v2/fast-ausverkauft.html', output: 'v2-fast-ausverkauft.png', width: 1080, height: 1080, transparent: false },
  { file: 'feed-v2/letzte-chance.html', output: 'v2-letzte-chance.png', width: 1080, height: 1080, transparent: false },
  { file: 'feed-v2/dont-sleep.html', output: 'v2-dont-sleep.png', width: 1080, height: 1080, transparent: false },
  { file: 'feed-v2/going-going.html', output: 'v2-going-going.png', width: 1080, height: 1080, transparent: false },
  { file: 'feed-v2/sold-out-soon.html', output: 'v2-sold-out-soon.png', width: 1080, height: 1080, transparent: false },
  { file: 'feed-v2/minimal-urgency.html', output: 'v2-minimal-urgency.png', width: 1080, height: 1080, transparent: false },
];

async function generateImages() {
  console.log('🚀 Starting image generation...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const template of templates) {
    const page = await browser.newPage();

    await page.setViewport({
      width: template.width,
      height: template.height,
      deviceScaleFactor: 1,
    });

    const htmlPath = path.join(campaignDir, template.file);

    if (!fs.existsSync(htmlPath)) {
      console.log(`⏭️  Skipping ${template.file} (not found)`);
      await page.close();
      continue;
    }

    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Embed all images as base64
    htmlContent = embedImages(htmlContent);

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Wait for images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      );
    });

    // Small delay to ensure everything is rendered
    await new Promise(r => setTimeout(r, 500));

    const outputPath = path.join(outputDir, template.output);
    await page.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: template.transparent,
      clip: {
        x: 0,
        y: 0,
        width: template.width,
        height: template.height,
      },
    });

    const label = template.transparent ? '🔲' : '✅';
    console.log(`${label} ${template.output}`);
    await page.close();
  }

  await browser.close();

  console.log(`\n🎉 Done! Images saved to:\n   ${outputDir}\n`);
}

generateImages().catch(console.error);
