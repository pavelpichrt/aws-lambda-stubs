import { v4 as uuidv4 } from 'uuid';

import { generateRandomInt, randomAlphaNumericString } from '../support';
import {
  APIGatewayAuthorizerEventGenerator,
  APIGatewayEventContextGenerator,
  APIGatewayEventGenerator,
} from './types';

const generateEventContext: APIGatewayEventContextGenerator = ({
  resourceId,
  authorizer,
  resourcePath,
  path,
  stage,
  apiId,
  userAgent,
  sourceIp,
  httpMethod = 'POST',
}) => {
  const actualAuthorizer = authorizer || {
    principalId: 'mock-principal',
    integrationLatency: generateRandomInt(5, 500),
  };
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const now = new Date();

  return {
    resourceId: resourceId || randomAlphaNumericString(6),
    authorizer: actualAuthorizer,
    resourcePath,
    httpMethod,
    extendedRequestId: `${randomAlphaNumericString(15)}=`,
    requestTime: `${now.getDate()}/${
      monthNames[now.getMonth()]
    }/${now.getFullYear()}:${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} +0000`,
    path,
    accountId: '123456278901',
    protocol: 'HTTP/1.1',
    stage,
    domainPrefix: apiId,
    requestTimeEpoch: now.getTime(),
    requestId: uuidv4(),
    identity: {
      cognitoIdentityPoolId: null,
      apiKey: null,
      apiKeyId: null,
      clientCert: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp,
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent,
      user: null,
    },
    domainName: `${apiId}.execute-api.eu-west-2.amazonaws.com`,
    apiId,
  };
};

export const apiGatewayProxyEvent: APIGatewayEventGenerator = ({
  resourceId,
  authorizer,
  stage = 'mock-stage',
  resourcePath = '/mock/{id}/path',
  apiId = 'mockapi',
  userAgent = 'MockApi/1.0.0',
  sourceIp = '123.123.123.123',
  pathParameters,
  queryStringParameters = null,
  body,
  headers = {
    'Content-Type': 'application/json',
  },
  authorizationHeaderGenerator,
  includeAuthorizationHeader = true,
  path = `/${stage}/${resourcePath}`,
  httpMethod = 'POST',
} = {}) => {
  const actualPathParameters: Record<string, string> = {};
  (resourcePath.match(/({[a-zA-Z0-9_-]+})/g) || []).forEach(
    (fullParam: string) => {
      const paramWithoutBrackets = fullParam.substring(1, fullParam.length - 1);
      const paramValue = pathParameters?.[paramWithoutBrackets] || 'foo';

      path = path.replace(fullParam, paramValue);
      actualPathParameters[paramWithoutBrackets] = paramValue;
    },
  );
  const additionalHeaders: Record<string, string> = headers;

  if (includeAuthorizationHeader) {
    const defaultHeaderGenerator = () => randomAlphaNumericString(32);
    const actualAuthorizationHeaderGenerator =
      authorizationHeaderGenerator || defaultHeaderGenerator;

    additionalHeaders.Authorization = actualAuthorizationHeaderGenerator();
  }

  const eventContext = generateEventContext({
    resourceId,
    authorizer,
    resourcePath,
    path,
    stage,
    apiId,
    userAgent,
    sourceIp,
    httpMethod,
  });
  const traceId = `Root=1-${randomAlphaNumericString(
    8,
  )}-${randomAlphaNumericString(24)}`;
  const additionalHeadersMultiValue: Record<string, string[]> = {};

  for (const [headerName, headerValue] of Object.entries(additionalHeaders)) {
    additionalHeadersMultiValue[headerName] = [headerValue];
  }

  return {
    resource: resourcePath,
    path,
    httpMethod,
    queryStringParameters,
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      Host: `${apiId}.execute-api.eu-west-2.amazonaws.com`,
      'User-Agent': userAgent,
      'X-Amzn-Trace-Id': traceId,
      'X-Forwarded-For': sourceIp,
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https',
      ...additionalHeaders,
    },
    multiValueHeaders: {
      Accept: ['*/*'],
      'Accept-Encoding': ['gzip, deflate, br'],
      Host: [`${apiId}.execute-api.eu-west-2.amazonaws.com`],
      'User-Agent': [userAgent],
      'X-Amzn-Trace-Id': [traceId],
      'X-Forwarded-For': [sourceIp],
      'X-Forwarded-Port': ['443'],
      'X-Forwarded-Proto': ['https'],
      ...additionalHeadersMultiValue,
    },
    multiValueQueryStringParameters: null,
    pathParameters: actualPathParameters,
    stageVariables: null,
    requestContext: eventContext,
    body: body ? JSON.stringify(body) : null,
    isBase64Encoded: false,
  };
};

export const apiGatewayAuthorizerEvent: APIGatewayAuthorizerEventGenerator = ({
  authorizationToken = 'authorization-token-stub',
  resource = '/prod/POST/{proxy+}',
} = {}) => ({
  type: 'TOKEN',
  authorizationToken,
  methodArn: `arn:aws:execute-api:eu-west-1:123456789012:example${resource}`,
});
