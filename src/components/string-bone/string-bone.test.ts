import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlStringBone from './string-bone';

describe('<sl-string-bone>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-string-bone></sl-string-bone> `);

    expect(el).to.exist;
  });
});
