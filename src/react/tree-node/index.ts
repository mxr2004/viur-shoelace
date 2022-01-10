import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/tree-node/tree-node';

export default createComponent(React, 'sl-tree-node', Component, {
  onSlNodeClick: 'sl-node-click',
  onSlNodeBeforeOpen: 'sl-node-before-open',
  onSlNodeBeforeClose: 'sl-node-before-close',
  onSlNodeBeforeToogle: 'sl-node-before-toogle',
  onSlNodeClose: 'sl-node-close',
  onSlNodeOpen: 'sl-node-open',
  onSlNodeToogle: 'sl-node-toogle'
});
