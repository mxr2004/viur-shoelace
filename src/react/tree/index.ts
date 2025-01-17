import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import Component from '../../components/tree/tree';

export default createComponent(React, 'sl-tree', Component, {
  onSlTreeNodeClick: 'sl-tree-node-click',
  onSlTreeNodeToogle: 'sl-tree-node-toogle',
  onSlTreeNodeBeforeToogle: 'sl-tree-node-before-toogle',
  onSlTreeNodeOpen: 'sl-tree-node-open',
  onSlTreeNodeClose: 'sl-tree-node-close',
  onSlTreeNodeBeforeOpen: 'sl-tree-node-before-open',
  onSlTreeNodeBeforeClose: 'sl-tree-node-before-close',
  onSlTreeNodeSelectChange: 'sl-tree-node-select-change'
});
