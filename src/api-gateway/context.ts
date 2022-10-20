import { v4 as uuidv4 } from 'uuid';

import { randomAlphaNumericString } from '../support';
import { APIGatewayContextGenerator } from './types';

export const apiGatewayProxyContext: APIGatewayContextGenerator = ({
  functionName,
  memoryLimitInMB,
} = {}) => {
  const actualFunctionName = functionName || 'mock-function-name';
  const functionVersion = '1';
  const now = new Date();

  return {
    callbackWaitsForEmptyEventLoop: true,
    functionVersion,
    functionName: actualFunctionName,
    memoryLimitInMB: memoryLimitInMB ? memoryLimitInMB.toString() : '128',
    logGroupName: `/aws/lambda/${actualFunctionName}`,
    logStreamName: `${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()}/[${functionVersion}]${randomAlphaNumericString(32)}`,
    invokedFunctionArn: `arn:aws:lambda:eu-west-1:123456278901:function:${actualFunctionName}:latest`,
    awsRequestId: uuidv4(),
    getRemainingTimeInMillis: () => now.getTime() + 10000 * 60, // 10 minutes from now
    done: () => null,
    fail: () => null,
    succeed: () => null,
  };
};
