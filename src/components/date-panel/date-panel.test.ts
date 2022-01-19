import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlDatePanel from './date-panel';

describe('<sl-date-panel>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-date-panel></sl-date-panel> `);
    expect(el).to.exist;
  });
});
