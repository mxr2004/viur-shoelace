import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import type SlDetailsGroup from './details-group';

describe('<sl-details-group>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-details-group></sl-details-group> `);

    expect(el).to.exist;
  });
});
