import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlNumericBone from './numeric-bone';

describe('<sl-numeric-bone>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-numeric-bone></sl-numeric-bone> `);

    expect(el).to.exist;
  });
});
