import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/transfer/transfer';

export default createComponent(React, 'sl-transfer', Component, {
  onSlFilterChange: 'sl-filter-change',
  onSlTransferChange: 'sl-transfer-change',
  onSlScrollItem: 'sl-scroll-item'
});
