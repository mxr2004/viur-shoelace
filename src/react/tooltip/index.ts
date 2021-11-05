import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/tooltip/tooltip';

export default createComponent(React, 'sl-tooltip', Component, {
  onSlShow: 'sl-show',
  onSlAfterShow: 'sl-after-show',
  onSlHide: 'sl-hide',
  onSlAfterHide: 'sl-after-hide'
});
