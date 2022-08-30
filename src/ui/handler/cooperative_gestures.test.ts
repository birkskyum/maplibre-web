import browser from '../../util/browser';
import Map from '../map';
import DOM from '../../util/dom';
import simulate from '../../../test/unit/lib/simulate_interaction';
import {setMatchMedia, setPerformance, setWebGlContext} from '../../util/test/util';

function createMap() {
    return new Map({
        container: DOM.create('div', '', window.document.body),
        style: {
            'version': 8,
            'sources': {},
            'layers': []
        },
        cooperativeGestures: true
    });
}

beforeEach(() => {
    setPerformance();
    setWebGlContext();
    setMatchMedia();
});

describe('CoopGesturesHandler', () => {

    test('Does not zoom on wheel if no key is down', () => {
        const browserNow = jest.spyOn(browser, 'now');
        let now = 1555555555555;
        browserNow.mockReturnValue(now);

        const map = createMap();
        map._renderTaskQueue.run();

        const startZoom = map.getZoom();
        // simulate a single 'wheel' event
        simulate.wheel(map.getCanvas(), {type: 'wheel', deltaY: -simulate.magicWheelZoomDelta});
        map._renderTaskQueue.run();

        now += 400;
        browserNow.mockReturnValue(now);
        map._renderTaskQueue.run();

        const endZoom = map.getZoom();
        expect(endZoom).toBeCloseTo(startZoom);

        map.remove();
    });

    test('Does not pan on touchmove with a single touch', () => {
        const map = createMap();
        const target = map.getCanvas();
        const startCenter = map.getCenter();
        map._renderTaskQueue.run();

        const dragstart = jest.fn();
        const drag      = jest.fn();
        const dragend   = jest.fn();

        map.on('dragstart', dragstart);
        map.on('drag',      drag);
        map.on('dragend',   dragend);

        simulate.touchstart(target, {touches: [{target, clientX: 0, clientY: 0}]});
        map._renderTaskQueue.run();

        simulate.touchmove(target, {touches: [{target, clientX: 10, clientY: 10}]});
        map._renderTaskQueue.run();

        simulate.touchend(target);
        map._renderTaskQueue.run();

        const endCenter = map.getCenter();
        expect(endCenter.lng).toEqual(startCenter.lng);
        expect(endCenter.lat).toEqual(startCenter.lat);

        map.remove();
    });
});
