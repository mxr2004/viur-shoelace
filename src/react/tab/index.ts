import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/tab/tab';

export default createComponent(React, 'sl-tab', Component, {
  onSlClose: 'sl-close'
});
