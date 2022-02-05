const rootFixturePath = 'test/query/';
const suitePath = 'fixtures';

import {generateFixtureJson} from '../test/query/fixtures-dist/generate-fixture-json.js';

await generateFixtureJson(rootFixturePath, suitePath);
