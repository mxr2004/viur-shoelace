import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlRipple from './ripple';

describe('<sl-ripple>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-ripple></sl-ripple> `);
    expect(el).to.exist;
  });
});
