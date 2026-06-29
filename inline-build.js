import fs from 'fs';
import path from 'path';

try {
  const filePath = path.join(process.cwd(), 'dist', 'index.html');
  console.log('Post-processing build file:', filePath);

  if (!fs.existsSync(filePath)) {
    console.error('Error: dist/index.html not found!');
    process.exit(1);
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove ES Module constraints so that the single HTML file runs perfectly via file:// protocol offline!
  // Replace <script type="module" crossorigin> with <script defer>
  const originalScriptTag = '<script type="module" crossorigin>';
  const newScriptTag = '<script defer>';

  if (html.includes(originalScriptTag)) {
    html = html.replaceAll(originalScriptTag, newScriptTag);
    console.log('Successfully replaced module script tag with plain deferred script tag!');
  } else {
    console.warn('Warning: Could not find original module script tag. Checking for alternative variants...');
    html = html.replace(/<script\s+type="module"\s+crossorigin\s*>/g, '<script defer>');
    html = html.replace(/<script\s+crossorigin\s+type="module"\s*>/g, '<script defer>');
  }

  // 2. Set an elegant human title for the app tab instead of generic placeholder
  html = html.replace('<title>My Google AI Studio App</title>', '<title>BatikMath - Modul SPLDV Interaktif</title>');

  // 3. Inject global variable to let the app know it is running as a compiled standalone offline file
  html = html.replace('<head>', '<head><script>window.__OFFLINE__ = true;</script>');

  // Output filename as requested
  const outputFileName = 'indeks_spldv_standalone.html';

  // Save the polished file to its destination paths
  const destPaths = [
    path.join(process.cwd(), 'dist', outputFileName),
    path.join(process.cwd(), 'public', outputFileName),
    path.join(process.cwd(), outputFileName),
  ];

  for (const dest of destPaths) {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dest, html, 'utf8');
    console.log(`Successfully generated portable offline module at: ${dest}`);
  }

  console.log('Post-build script completed successfully!');
} catch (error) {
  console.error('Error in post-build script:', error);
  process.exit(1);
}
