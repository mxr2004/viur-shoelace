import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/password-bone/password-bone';

export default createComponent(React, 'sl-password-bone', Component, {
  onSlEventName: 'sl-event-name'
});
