import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/animated-image/animated-image';

export default createComponent(React, 'sl-animated-image', Component, {
  onSlLoad: 'sl-load',
  onSlError: 'sl-error'
});
