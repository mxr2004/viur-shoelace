import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlBooleanBone from './boolean-bone';

describe('<sl-boolean-bone>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-boolean-bone></sl-boolean-bone> `);

    expect(el).to.exist;
  });
});
