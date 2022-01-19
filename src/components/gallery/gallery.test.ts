import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlGallery from './gallery';

describe('<sl-gallery>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-gallery></sl-gallery> `);

    expect(el).to.exist;
  });
});
