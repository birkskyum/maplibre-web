
import './stub_loader';
import canvas from 'canvas';
import {run} from './render';
import suiteImplementation from './suite_implementation';
import ignores from './ignores.json';
import st from 'st';
import http from 'http';
import puppeteer, {Browser, Page} from 'puppeteer';
import path from 'path';
const {registerFont} = canvas;

registerFont('./node_modules/npm-font-open-sans/fonts/Bold/OpenSans-Bold.ttf', {family: 'Open Sans', weight: 'bold'});

let browser: Browser;
let page: Page;
const server = http.createServer(
    st({
        path: 'test/integration/assets',
        cors: true,
    })
).listen(7357);

describe('render', () => {

    test('name', done => {
        render(style, params, (err, data) => {
            if (err) return done(err);

            let stats;
            const dir = path.join(directory, params.id);
            try {
                // @ts-ignore
                stats = fs.statSync(dir, fs.R_OK | fs.W_OK);
                if (!stats.isDirectory()) throw new Error();
            } catch (e) {
                fs.mkdirSync(dir);
            }

            const expectedPath = path.join(dir, 'expected.png');
            const actualPath = path.join(dir, 'actual.png');
            const diffPath = path.join(dir, 'diff.png');

            const width = Math.floor(params.width * params.pixelRatio);
            const height = Math.floor(params.height * params.pixelRatio);
            const actualImg = new PNG({width, height});

            // PNG data must be unassociated (not premultiplied)
            for (let i = 0; i < data.length; i++) {
                const a = data[i * 4 + 3] / 255;
                if (a !== 0) {
                    data[i * 4 + 0] /= a;
                    data[i * 4 + 1] /= a;
                    data[i * 4 + 2] /= a;
                }
            }
            actualImg.data = data;

            // there may be multiple expected images, covering different platforms
            const expectedPaths = glob.sync(path.join(dir, 'expected*.png'));

            if (!process.env.UPDATE && expectedPaths.length === 0) {
                throw new Error('No expected*.png files found; did you mean to run tests with UPDATE=true?');
            }

            if (process.env.UPDATE) {
                fs.writeFileSync(expectedPath, PNG.sync.write(actualImg));

            } else {
                // if we have multiple expected images, we'll compare against each one and pick the one with
                // the least amount of difference; this is useful for covering features that render differently
                // depending on platform, i.e. heatmaps use half-float textures for improved rendering where supported
                let minDiff = Infinity;
                let minDiffImg, minExpectedBuf;

                for (const path of expectedPaths) {
                    const expectedBuf = fs.readFileSync(path);
                    const expectedImg = PNG.sync.read(expectedBuf);
                    const diffImg = new PNG({width, height});

                    const diff = pixelmatch(
                        actualImg.data, expectedImg.data, diffImg.data,
                        width, height, {threshold: 0.1285}) / (width * height);

                    if (diff < minDiff) {
                        minDiff = diff;
                        minDiffImg = diffImg;
                        minExpectedBuf = expectedBuf;
                    }
                }

                const diffBuf = PNG.sync.write(minDiffImg, {filterType: 4});
                const actualBuf = PNG.sync.write(actualImg, {filterType: 4});

                fs.writeFileSync(diffPath, diffBuf);
                fs.writeFileSync(actualPath, actualBuf);

                params.difference = minDiff;
                params.ok = minDiff <= params.allowed;

                params.actual = actualBuf.toString('base64');
                params.expected = minExpectedBuf.toString('base64');
                params.diff = diffBuf.toString('base64');
            }

            done();
        });
    });

});
