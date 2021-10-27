import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlSpinner from './spinner';

describe('<sl-spinner>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-spinner></sl-spinner> `);

    expect(el).to.exist;
  });
});
