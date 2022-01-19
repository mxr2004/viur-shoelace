import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlRow from './row';

describe('<sl-row>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-row></sl-row> `);

    expect(el).to.exist;
  });
});
