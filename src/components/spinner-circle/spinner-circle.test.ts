import { expect, fixture, html } from '@open-wc/testing';
import type SlSpinnerCircle from './spinner-circle';

describe('<sl-spinner-circle>', () => {
  let el: SlSpinnerCircle;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<SlSpinnerCircle>(html` <sl-spinner-circle></sl-spinner-circle> `);
    });

    it('should render a component that passes accessibility test.', async () => {
      await expect(el).to.be.accessible();
    });

    it('should have a role of "status".', async () => {
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
      const base = el.shadowRoot?.querySelector('[part="base"]') as SVGElement;
      await expect(base).have.attribute('role', 'status');
    });
  });
});
