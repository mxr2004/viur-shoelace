import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/form/form';

export default createComponent(React, 'sl-form', Component, {
  onSlSubmit: 'sl-submit'
});
