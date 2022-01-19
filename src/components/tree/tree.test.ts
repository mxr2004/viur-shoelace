import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlTree from './tree';

describe('<sl-tree>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-tree></sl-tree> `);

    expect(el).to.exist;
  });
});
