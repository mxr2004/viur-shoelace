import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/button/button';

export default createComponent(React, 'sl-button', Component, {
  onSlBlur: 'sl-blur',
  onSlFocus: 'sl-focus'
});
