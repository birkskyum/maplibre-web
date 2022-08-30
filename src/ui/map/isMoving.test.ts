import browser from '../../util/browser';
import Map from '../map';
import DOM from '../../util/dom';
import simulate from '../../../test/unit/lib/simulate_interaction';
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

    test('returns true when drag panning', done => {
        map.on('movestart', () => {
            expect(map.isMoving()).toBe(true);
        });
        map.on('dragstart', () => {
            expect(map.isMoving()).toBe(true);
        });

        map.on('dragend', () => {
            expect(map.isMoving()).toBe(false);
        });
        map.on('moveend', () => {
            expect(map.isMoving()).toBe(false);
            done();
        });

        simulate.mousedown(map.getCanvas());
        map._renderTaskQueue.run();

        simulate.mousemove(map.getCanvas(), {buttons, clientX: 10, clientY: 10});
        map._renderTaskQueue.run();

        simulate.mouseup(map.getCanvas());
        map._renderTaskQueue.run();
    });

    test('returns true when drag rotating', done => {
        // Prevent inertial rotation.
        jest.spyOn(browser, 'now').mockImplementation(() => { return 0; });

        map.on('movestart', () => {
            expect(map.isMoving()).toBe(true);
        });

        map.on('rotatestart', () => {
            expect(map.isMoving()).toBe(true);
        });

        map.on('rotateend', () => {
            expect(map.isMoving()).toBe(false);
        });

        map.on('moveend', () => {
            expect(map.isMoving()).toBe(false);
            done();
        });

        simulate.mousedown(map.getCanvas(), {buttons: 2, button: 2});
        map._renderTaskQueue.run();

        simulate.mousemove(map.getCanvas(), {buttons: 2, clientX: 10, clientY: 10});
        map._renderTaskQueue.run();

        simulate.mouseup(map.getCanvas(),   {buttons: 0, button: 2});
        map._renderTaskQueue.run();
    });
});
