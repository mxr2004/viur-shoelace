import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlPasswordBone from './password-bone';

describe('<sl-password-bone>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-password-bone></sl-password-bone> `);

    expect(el).to.exist;
  });
});
