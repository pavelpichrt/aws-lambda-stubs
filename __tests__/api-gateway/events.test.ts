import {
  apiGatewayProxyEvent,
  apiGatewayAuthorizerEvent,
} from '../../src/api-gateway/events';

const nonEmptyAlNumStringRegex = /[a-zA-Z0-9]+/;

describe('apiGatewayProxyEvent', () => {
  it('Generates a correct stub', () => {
    const { headers, requestContext, multiValueHeaders, ...baseParams } =
      apiGatewayProxyEvent();
    const {
      Authorization,
      'X-Amzn-Trace-Id': traceId,
      deterministicHeaders,
    } = headers;
    const {
      requestId,
      requestTime,
      requestTimeEpoch,
      resourceId,
      extendedRequestId,
      authorizer,
      ...deterministicContext
    } = requestContext;

    expect(baseParams).toMatchSnapshot();
    expect(deterministicHeaders).toMatchSnapshot();
    expect(deterministicContext).toMatchSnapshot();
    expect(multiValueHeaders['Content-Type']).toMatchSnapshot();
    expect(Authorization).toEqual(
      expect.stringMatching(nonEmptyAlNumStringRegex),
    );
    expect(traceId).toEqual(expect.stringMatching(nonEmptyAlNumStringRegex));
    expect(requestId).toEqual(
      expect.stringMatching(
        /^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/,
      ),
    );
    expect(requestTime).toEqual(
      expect.stringMatching(nonEmptyAlNumStringRegex),
    );
    expect(requestTimeEpoch).toEqual(expect.any(Number));
    expect(resourceId).toEqual(expect.stringMatching(/[a-z0-9]{6}$/));
    expect(extendedRequestId).toEqual(
      expect.stringMatching(nonEmptyAlNumStringRegex),
    );
    expect(authorizer?.integrationLatency).toEqual(expect.any(Number));
  });
});

describe('apiGatewayAuthorizerEvent', () => {
  it('Generates a correct stub', () => {
    const actualEvent = apiGatewayAuthorizerEvent();

    expect(actualEvent).toMatchSnapshot();
  });
});
