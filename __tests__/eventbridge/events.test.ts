import { eventBridgeEvent } from '../../src/eventbridge/events';
import { uuidRegex, isoDateRegex } from '../config';

describe('eventBridgeEvent', () => {
  it('Generates a correct stub', () => {
    const { id, time, ...deterministicProps } = eventBridgeEvent();

    expect(deterministicProps).toMatchSnapshot();
    expect(id).toEqual(expect.stringMatching(uuidRegex));
    expect(time).toEqual(expect.stringMatching(isoDateRegex));
  });
});
