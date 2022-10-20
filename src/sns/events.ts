import { v4 as uuidv4 } from 'uuid';
import { SNSEventGenerator, SNSEventParams } from './types';

const generateSnsEventObject: SNSEventGenerator = ({
  Subject = 'EXAMPLE-SUBJECT',
  Message = 'EXAMPLE-MESSAGE',
  TopicArn = 'arn:aws:sns:eu-west-1-1:123456789012:ExampleTopic',
  EventSubscriptionArn = 'arn:aws:sns:us-east-1:123456789012:ExampleTopic',
  MessageAttributes = {
    Test: {
      Type: 'String',
      Value: 'TestString',
    },
    TestBinary: {
      Type: 'Binary',
      Value: 'TestBinary',
    },
  },
  MessageId = uuidv4(),
  Timestamp = new Date().toISOString(),
} = {}) => ({
  EventSource: 'aws:sns',
  EventVersion: '1.0',
  EventSubscriptionArn,
  Sns: {
    SignatureVersion: '1',
    Timestamp,
    Signature: 'EXAMPLE',
    SigningCertUrl: 'EXAMPLE',
    MessageId,
    Message,
    MessageAttributes,
    Type: 'Notification',
    UnsubscribeUrl: 'EXAMPLE-UNSUBSCRIBE-URL',
    TopicArn,
    Subject,
  },
});

export const snsEvent = (parametrizedEvents: SNSEventParams[]) => ({
  Records: parametrizedEvents.map(generateSnsEventObject),
});
