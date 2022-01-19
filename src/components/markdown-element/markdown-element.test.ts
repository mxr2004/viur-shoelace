import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlMarkdownElement from './markdown-element';

describe('<sl-markdown-element>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-markdown-element></sl-markdown-element> `);

    expect(el).to.exist;
  });
});
