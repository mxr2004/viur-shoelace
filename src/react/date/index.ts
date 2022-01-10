import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/date/date';

export default createComponent(React, 'sl-date', Component, {
  onSlDateChange: 'sl-date-change'
});
