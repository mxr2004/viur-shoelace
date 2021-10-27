import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlSlider from './slider';

describe('<sl-slider>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-slider></sl-slider> `);

    expect(el).to.exist;
  });
});
