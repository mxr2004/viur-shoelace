import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/tag/tag';

export default createComponent(React, 'sl-tag', Component, {
  onSlRemove: 'sl-remove'
});
