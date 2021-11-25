import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlTableWrapper from './table-wrapper';

describe('<sl-table-wrapper>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-table-wrapper></sl-table-wrapper> `);

    expect(el).to.exist;
  });
});
