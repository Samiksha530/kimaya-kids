import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)],
      ),
    )
  ).flat();
}
let count = 0;
for (const file of (await files('src/app')).filter(
  (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts'),
)) {
  const source = await readFile(file, 'utf8');
  if (!source.includes('@Component(')) continue;
  const stem = file.slice(0, -3);
  for (const ext of ['.html', '.css', '.spec.ts']) await access(stem + ext);
  if (!source.includes('templateUrl:') || !source.includes('styleUrl:'))
    throw new Error(file + ' must use external template and styles');
  count++;
}
console.log(`${count} components have separate TS, HTML, CSS and spec files.`);
