import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
let before = 0,
  after = 0;
for (const name of (await readdir('public/images')).filter((name) => name.endsWith('.png'))) {
  const source = 'public/images/' + name,
    target = source.replace('.png', '.webp');
  before += (await stat(source)).size;
  await sharp(source)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(target);
  after += (await stat(target)).size;
}
console.log(
  JSON.stringify({
    originalBytes: before,
    webpBytes: after,
    reduction: Math.round((1 - after / before) * 100) + '%',
  }),
);
