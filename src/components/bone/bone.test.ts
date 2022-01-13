import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlBone from './bone';

describe('<sl-bone>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-bone></sl-bone> `);

    expect(el).to.exist;
  });
});
