import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/mutation-observer/mutation-observer';

export default createComponent(React, 'sl-mutation-observer', Component, {
  onSlMutation: 'sl-mutation'
});
