import {spawnSync} from 'node:child_process';
import chromium, {inflate} from '@sparticuz/chromium';
import {resolve} from 'node:path';

// The bundled headless Chromium is self-contained. Its Amazon Linux runtime libs are
// extracted from the npm package so rendering also works in a minimal Debian image.
const executable = await chromium.executablePath();
const libs = await inflate(resolve('node_modules/@sparticuz/chromium/bin/al2023.tar.br'));
const args = process.argv.slice(2);
if (!args.length) args.push('render', 'src/index.ts', 'KishoreRetroBollywoodReel', 'kishore_10on10_reel.mp4');
const result = spawnSync(resolve('node_modules/.bin/remotion'), [
  ...args,
  '--browser-executable', executable,
], {
  stdio: 'inherit',
  env: {...process.env, LD_LIBRARY_PATH: [libs + '/lib', process.env.LD_LIBRARY_PATH].filter(Boolean).join(':')},
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
