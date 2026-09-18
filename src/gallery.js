const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'images', 'gallery');
const IMAGE_PATTERN = /\.(jpe?g|png|webp|gif)$/i;

function listGalleryImages() {
  try {
    return fs.readdirSync(GALLERY_DIR).filter((f) => IMAGE_PATTERN.test(f));
  } catch (err) {
    return [];
  }
}

// Picks a stable image per page (same photo on every reload of that page, different pages get
// different photos) instead of a random one bouncing around on every request.
function pickGalleryImage(seed) {
  const images = listGalleryImages();
  if (images.length === 0) return null;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return images[hash % images.length];
}

module.exports = { listGalleryImages, pickGalleryImage };
