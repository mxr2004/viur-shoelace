import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import type SlBackToTop from './back-to-top';

describe('<sl-back-to-top>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-back-to-top></sl-back-to-top> `);

    expect(el).to.exist;
  });
});
