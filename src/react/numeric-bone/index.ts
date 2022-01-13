import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/numeric-bone/numeric-bone';

export default createComponent(React, 'sl-numeric-bone', Component, {
  onSlEventName: 'sl-event-name'
});
