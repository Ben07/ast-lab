import fs from 'fs';
import path from 'path';
import _debug from 'debug';
import mergeDepMap from '../src/mergeDepMap';

const debug = _debug('get-dependencies:test');
const tests = [
  'exports',
  'imports'
]
describe('mergeDepMap()', () => {
  tests.forEach(_dir => {
    const dir = path.resolve(__dirname, '__fixtures__', _dir);
    const sources = fs.readdirSync(dir);
    test(_dir, async () => {
      debug(_dir);
      const res = await mergeDepMap(
        sources.map(src => path.resolve(dir, src)),
        {
          parserOptions: {
            plugins: ['dynamicImport']
          }
        }
      );
      expect(res).toMatchSnapshot();
    });
  });
});
