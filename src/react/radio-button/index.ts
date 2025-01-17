import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/radio-button/radio-button';

export default createComponent(React, 'sl-radio-button', Component, {
  onSlBlur: 'sl-blur',
  onSlChange: 'sl-change',
  onSlFocus: 'sl-focus'
});
