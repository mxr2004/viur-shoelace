import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlDate from './date';

describe('<sl-date>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-date></sl-date> `);

    expect(el).to.exist;
  });
});
