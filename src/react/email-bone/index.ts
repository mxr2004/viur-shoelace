import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/email-bone/email-bone';

export default createComponent(React, 'sl-email-bone', Component, {
  onSlEventName: 'sl-event-name'
});
