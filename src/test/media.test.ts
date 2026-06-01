/**
 * media.test.ts — verify extension icon and dashboard logo assets.
 */
import { test } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

const MEDIA = path.resolve(__dirname, '..', '..', 'media');

function pngDimensions(buf: Buffer): { width: number; height: number; colorType: number } {
  assert.strictEqual(buf.toString('ascii', 1, 4), 'PNG');
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
    colorType: buf[25]
  };
}

test('media/icon.png: exists, 128x128, under 80 KB', () => {
  const icon = path.join(MEDIA, 'icon.png');
  assert.ok(fs.existsSync(icon), 'media/icon.png missing');
  const buf = fs.readFileSync(icon);
  const { width, height } = pngDimensions(buf);
  assert.strictEqual(width, 128);
  assert.strictEqual(height, 128);
  assert.ok(buf.length / 1024 < 80, `icon too large: ${(buf.length / 1024).toFixed(1)} KB`);
});

test('media/dmctn-taste-logo.png: valid PNG', () => {
  const logo = path.join(MEDIA, 'dmctn-taste-logo.png');
  assert.ok(fs.existsSync(logo), 'media/dmctn-taste-logo.png missing');
  const buf = fs.readFileSync(logo);
  const { width, height } = pngDimensions(buf);
  assert.ok(width > 0 && height > 0);
  assert.ok(buf.length < 500 * 1024, 'logo file unexpectedly large for VSIX');
});

test('media/dmctn-taste-logo-dashboard.png: valid PNG for webview', () => {
  const dash = path.join(MEDIA, 'dmctn-taste-logo-dashboard.png');
  assert.ok(fs.existsSync(dash), 'media/dmctn-taste-logo-dashboard.png missing');
  const buf = fs.readFileSync(dash);
  const { width, height } = pngDimensions(buf);
  assert.ok(width <= 200 && height <= 200);
  assert.ok(buf.length < 120 * 1024);
});
