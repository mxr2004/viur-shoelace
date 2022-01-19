import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlTransfer from './transfer';

describe('<sl-transfer>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-transfer></sl-transfer> `);

    expect(el).to.exist;
  });
});
