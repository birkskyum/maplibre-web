import Map from '../map';
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

describe('Map#isMoving', () => {
    // MouseEvent.buttons
    const buttons = 1;

    test('returns false by default', () => {
        expect(map.isMoving()).toBe(false);
    });

    test('returns true during a camera zoom animation', done => {
        map.on('zoomstart', () => {
            expect(map.isMoving()).toBe(true);
        });

        map.on('zoomend', () => {
            expect(map.isMoving()).toBe(false);
            done();
        });

        map.zoomTo(5, {duration: 0});
    });

});
