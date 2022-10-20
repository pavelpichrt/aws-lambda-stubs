import { EventBridgeEvent } from 'aws-lambda';

export interface EventBridgeEventParams {
  version?: string;
  source?: string;
  accountId?: string;
  time?: string;
  region?: string;
  resources?: string[];
  detail?: Record<string, unknown>;
}

export interface EventBridgeEventGenerator {
  ({
    version,
    source,
    accountId,
    time,
    region,
    resources,
    detail,
  }?: EventBridgeEventParams): EventBridgeEvent<
    string,
    Record<string, unknown>
  >;
}
