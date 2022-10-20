import { SNSEventRecord, SNSMessageAttributes } from 'aws-lambda';

export interface SNSEventParams {
  Message?: string;
  TopicArn?: string;
  Subject?: string;
  EventSubscriptionArn?: string;
  MessageAttributes?: SNSMessageAttributes;
  MessageId?: string;
  Timestamp?: string;
}

export interface SNSEventGenerator {
  ({
    Subject,
    Message,
    TopicArn,
    EventSubscriptionArn,
    MessageAttributes,
    MessageId,
    Timestamp,
  }?: SNSEventParams): SNSEventRecord;
}
