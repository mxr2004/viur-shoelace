import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import type SlStep from './step';

describe('<sl-step>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-step></sl-step> `);

    expect(el).to.exist;
  });
});
