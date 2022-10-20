import { Context } from 'aws-lambda';
import { apiGatewayProxyContext } from '../../src/api-gateway/context';
import { uuidRegex } from '../config';

const logStreamRegex = /^\d{4}\/\d{2}\/\d{2}\/\[\d+\][a-z0-9]{32}$/;

const validateContext = (context: Context) => {
  const { logStreamName, awsRequestId, ...deterministicParams } = context;

  expect(deterministicParams).toMatchSnapshot();
  expect(logStreamName).toEqual(expect.stringMatching(logStreamRegex));
  expect(awsRequestId).toEqual(expect.stringMatching(uuidRegex));
};

describe('apiGatewayProxyContext', () => {
  it('Generates a correct stub with default arguments', () => {
    const actualContext = apiGatewayProxyContext();

    validateContext(actualContext);
  });

  it('Generates a correct stub with arguments specified', () => {
    const actualContext = apiGatewayProxyContext({
      functionName: 'my-function',
      memoryLimitInMB: 512,
    });

    validateContext(actualContext);
  });
});
