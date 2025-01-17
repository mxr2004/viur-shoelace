import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/dialog/dialog';

export default createComponent(React, 'sl-dialog', Component, {
  onSlShow: 'sl-show',
  onSlAfterShow: 'sl-after-show',
  onSlHide: 'sl-hide',
  onSlAfterHide: 'sl-after-hide',
  onSlInitialFocus: 'sl-initial-focus',
  onSlRequestClose: 'sl-request-close'
});
