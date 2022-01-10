import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/step/step';

export default createComponent(React, 'sl-step', Component, {
  onSlEventName: 'sl-event-name'
});
