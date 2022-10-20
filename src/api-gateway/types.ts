import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEvent,
  APIGatewayTokenAuthorizerEvent,
  Context,
} from 'aws-lambda';

export interface APIGatewayAuthorizer {
  principalId: string;
  integrationLatency: number;
}

export interface APIGatewayEventContextParams {
  resourceId?: string;
  authorizer?: APIGatewayAuthorizer;
  resourcePath: string;
  path: string;
  stage: string;
  apiId: string;
  userAgent: string;
  sourceIp: string;
  httpMethod?: string;
}

export interface APIGatewayEventParams {
  resourceId?: string;
  authorizer?: APIGatewayAuthorizer;
  stage?: string;
  resourcePath?: string;
  queryStringParameters?: Record<string, string>;
  apiId?: string;
  userAgent?: string;
  sourceIp?: string;
  pathParameters?: Record<string, string>;
  body?: object;
  headers?: Record<string, string>;
  includeAuthorizationHeader?: boolean;
  authorizationHeaderGenerator?: () => string;
  path?: string;
  httpMethod?: string;
}

export interface APIGatewayRequestContextParams {
  functionName?: string;
  memoryLimitInMB?: number;
}

export interface APIGatewayEventContextGenerator {
  ({
    resourceId,
    authorizer,
    resourcePath,
    path,
    stage,
    apiId,
    userAgent,
    sourceIp,
    httpMethod,
  }: APIGatewayEventContextParams): APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>;
}
export interface APIGatewayEventGenerator {
  ({
    resourceId,
    authorizer,
    stage,
    resourcePath,
    queryStringParameters,
    apiId,
    userAgent,
    sourceIp,
    pathParameters,
    body,
    headers,
    includeAuthorizationHeader,
    authorizationHeaderGenerator,
    path,
    httpMethod,
  }?: APIGatewayEventParams): APIGatewayProxyEvent;
}

export interface APIGatewayContextGenerator {
  ({ functionName, memoryLimitInMB }?: APIGatewayRequestContextParams): Context;
}

export interface APIGatewayAuthorizerEventParams {
  authorizationToken?: string;
  resource?: string;
}

export interface APIGatewayAuthorizerEventGenerator {
  ({
    authorizationToken,
    resource,
  }?: APIGatewayAuthorizerEventParams): APIGatewayTokenAuthorizerEvent;
}
