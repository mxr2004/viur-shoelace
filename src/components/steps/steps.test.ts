import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';

//import type SlSteps from './steps';

describe('<sl-steps>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-steps></sl-steps> `);

    expect(el).to.exist;
  });
});
