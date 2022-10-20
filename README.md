# Lambda stubs

Supports unit testing (or other use cases) in AWS lambda functions by providing functions to generate event and context stubs.

## API Gateway

### Authorizer

Generates API Gateway authorizer stub.

```javascript
import { apiGatewayAuthorizerEvent } from '@pichrt/lambda-stubs';

const actualResult = await handler(apiGatewayAuthorizerEvent());

expect(actualResult).toMatchSnapshot();
```

### Proxy event handler

```typescript
import {
  apiGatewayProxyEvent,
  apiGatewayProxyContext,
} from '@pichrt/lambda-stubs';

const actualResult = await handler(
  apiGatewayProxyEvent({
    /* Commonly useful params --------------------- */
    body: {
      text: 'foo bar',
    },
    resourcePath: 'teams/{teamId}/members',
    pathParameters: {
      teamId: '5',
    },
    headers: {
      'Content-Type': 'application/json',
      foo: 'bar',
    },
    /* Rarely useful params ----------------------- */
    // apiId: 'my-api',
    // sourceIp: '123.123.123.123',
    // stage: 'mock-stage',
    // userAgent: 'MockApi/1.0.0',
    // authorizationHeaderGenerator: () => 'my-secret-header',
    // resourceId: 'asdfgh',
    // authorizer: {
    //   principalId: 'mock-principal',
    //   integrationLatency: 123,
    // },
  }),
  apiGatewayProxyContext({
    functionName: 'My function',
    memoryLimitInMB: 128,
  }),
  jest.fn,
);

expect(actualResult).toMatchSnapshot();
```

## SNS

```typescript
import { snsEvent, apiGatewayProxyContext } from '@pichrt/lambda-stubs';

const actualResult = await handler(
  snsEvent({
    /* Occasionally useful (but optional) params ----- */
    Subject: 'EXAMPLE-SUBJECT',
    Message: 'EXAMPLE-MESSAGE',
    TopicArn: 'arn:aws:sns:eu-west-1-1:123456789012:ExampleTopic',
    EventSubscriptionArn: 'arn:aws:sns:us-east-1:123456789012:ExampleTopic',
    MessageAttributes: {
      Test: {
        Type: 'String',
        Value: 'TestString',
      },
      TestBinary: {
        Type: 'Binary',
        Value: 'TestBinary',
      },
    },
    MessageId: uuidv4(),
    Timestamp: new Date().toISOString(),
  }),
  apiGatewayProxyContext({
    functionName: 'My function',
    memoryLimitInMB: 256,
  }),
  jest.fn,
);

expect(actualResult).toMatchSnapshot();
```

## EventBridge

### Scheduled Event

```typescript
import { eventBridgeEvent, apiGatewayProxyContext } from '@pichrt/lambda-stubs';

const actualResult = await handler(
  eventBridgeEvent({
    /* Occasionally useful (but optional) params ----- */
    version: '1',
    source: 'aws.events',
    accountId: '123456789012',
    time: new Date().toISOString(),
    region: 'eu-west-1',
    resources: [`arn:aws:events:eu-west-1:123456789012:rule/ExampleRule`],
    detail: {},
  }),
  apiGatewayProxyContext({
    functionName: 'My function',
    memoryLimitInMB: 256,
  }),
  jest.fn,
);

expect(actualResult).toMatchSnapshot();
```
