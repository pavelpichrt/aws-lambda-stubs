import { v4 as uuidv4 } from 'uuid';

import { EventBridgeEventGenerator } from './types';

export const eventBridgeEvent: EventBridgeEventGenerator = ({
  version = '1',
  source = 'aws.events',
  accountId = '123456789012',
  time = new Date().toISOString(),
  region = 'eu-west-1',
  resources,
  detail = {},
} = {}) => ({
  id: uuidv4(),
  version,
  'detail-type': 'Scheduled Event',
  source,
  account: accountId,
  time,
  region,
  resources: resources || [
    `arn:aws:events:${region}:${accountId}:rule/ExampleRule`,
  ],
  detail,
});
