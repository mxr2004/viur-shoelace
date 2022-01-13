import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/boolean-bone/boolean-bone';

export default createComponent(React, 'sl-boolean-bone', Component, {
  onSlEventName: 'sl-event-name'
});
