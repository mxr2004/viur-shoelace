import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import type SlAcPanel from './ac-panel';

describe('<sl-ac-panel>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-ac-panel></sl-ac-panel> `);

    expect(el).to.exist;
  });
});
