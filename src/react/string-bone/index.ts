import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/string-bone/string-bone';

export default createComponent(React, 'sl-string-bone', Component, {
  onSlEventName: 'sl-event-name'
});
