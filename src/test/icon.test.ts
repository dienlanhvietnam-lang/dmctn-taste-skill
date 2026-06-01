/**
 * icon.test.ts — verify Marketplace icon dimensions and size.
 */
import { test } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

const ICON = path.resolve(__dirname, '..', '..', 'media', 'icon.png');

/** Read width/height from PNG IHDR chunk. */
function pngDimensions(buf: Buffer): { width: number; height: number } {
  // PNG signature 8 bytes, then chunk: length(4) type(4) data...
  assert.strictEqual(buf.toString('ascii', 1, 4), 'PNG');
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

test('media/icon.png: exists, 128x128, under 80 KB', () => {
  assert.ok(fs.existsSync(ICON), 'media/icon.png missing');
  const buf = fs.readFileSync(ICON);
  const { width, height } = pngDimensions(buf);
  assert.strictEqual(width, 128, 'width must be 128');
  assert.strictEqual(height, 128, 'height must be 128');
  const kb = buf.length / 1024;
  assert.ok(kb < 80, `icon too large: ${kb.toFixed(2)} KB (max 80 KB)`);
});
