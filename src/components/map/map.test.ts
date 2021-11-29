import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlMap from './map';

describe('<sl-map>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-map></sl-map> `);

    expect(el).to.exist;
  });
});
