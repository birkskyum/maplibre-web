import Map from '../map';
import DOM from '../../util/dom';
import simulate from '../../../test/unit/lib/simulate_interaction';
import {setWebGlContext, setPerformance, setMatchMedia} from '../../util/test/util';

function createMap(clickTolerance) {
    return new Map({style: '', container: DOM.create('div', '', window.document.body), clickTolerance});
}

beforeEach(() => {
    setWebGlContext();
    setPerformance();
    setMatchMedia();
});

describe('BoxZoomHandler', () => {
    test('fires boxzoomstart and boxzoomend events at appropriate times', () => {
        const map = createMap(undefined);

        const boxzoomstart = jest.fn();
        const boxzoomend   = jest.fn();

        map.on('boxzoomstart', boxzoomstart);
        map.on('boxzoomend',   boxzoomend);

        simulate.mousedown(map.getCanvas(), {shiftKey: true, clientX: 0, clientY: 0});
        map._renderTaskQueue.run();
        expect(boxzoomstart).not.toHaveBeenCalled();
        expect(boxzoomend).not.toHaveBeenCalled();

        simulate.mousemove(map.getCanvas(), {shiftKey: true, clientX: 5, clientY: 5});
        map._renderTaskQueue.run();
        expect(boxzoomstart).toHaveBeenCalledTimes(1);
        expect(boxzoomend).not.toHaveBeenCalled();

        simulate.mouseup(map.getCanvas(), {shiftKey: true, clientX: 5, clientY: 5});
        map._renderTaskQueue.run();
        expect(boxzoomstart).toHaveBeenCalledTimes(1);
        expect(boxzoomend).toHaveBeenCalledTimes(1);

        map.remove();
    });
});
