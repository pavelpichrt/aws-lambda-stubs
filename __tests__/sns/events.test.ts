import { snsEvent } from '../../src/sns/events';
import { uuidRegex, isoDateRegex } from '../config';

describe('snsEvent', () => {
  it('Generates a correct stub', () => {
    const {
      Records: [
        {
          Sns: { MessageId, Timestamp, ...snsDeterministicProps },
          ...deterministicProps
        },
      ],
    } = snsEvent([{}]);

    expect(deterministicProps).toMatchSnapshot();
    expect(snsDeterministicProps).toMatchSnapshot();
    expect(MessageId).toEqual(expect.stringMatching(uuidRegex));
    expect(Timestamp).toEqual(expect.stringMatching(isoDateRegex));
  });
});
