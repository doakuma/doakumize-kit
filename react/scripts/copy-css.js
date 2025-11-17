import { copyFileSync } from 'fs';
import { join } from 'path';

const source = join(process.cwd(), 'dist', 'index.css');
const target = join(process.cwd(), 'dist', 'styles.css');

try {
  copyFileSync(source, target);
  console.log(`✓ Copied ${source} to ${target}`);
} catch (error) {
  console.error(`✗ Failed to copy CSS file:`, error.message);
  process.exit(1);
}

