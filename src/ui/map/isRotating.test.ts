import Map from '../../ui/map';
import DOM from '../../util/dom';
import {setWebGlContext, setPerformance, setMatchMedia} from '../../util/test/util';

let map;

function createMap() {
    return new Map({style: '', container: DOM.create('div', '', window.document.body)});
}

beforeEach(() => {
    setWebGlContext();
    setPerformance();
    setMatchMedia();
    map = createMap();
});

afterEach(() => {
    map.remove();
});

describe('Map#isRotating', () => {
    test('returns false by default', () => {
        expect(map.isRotating()).toBe(false);
    });

    test('returns true during a camera rotate animation', done => {
        map.on('rotatestart', () => {
            expect(map.isRotating()).toBe(true);
        });

        map.on('rotateend', () => {
            expect(map.isRotating()).toBe(false);
            done();
        });

        map.rotateTo(5, {duration: 0});
    });
});
