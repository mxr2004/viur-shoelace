import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import '../../../dist/shoelace.js';
import type SlInput from '../input/input';
import type SlCombobox from "./combobox";
import type { SuggestionSource } from "./combobox";
import type SlMenu from "../menu/menu";

describe('<sl-input>', () => {
  describe('no source', () => {
    it('should be accessible', async () => {
      const el = await fixture<SlCombobox>(html`<sl-combobox label="test"></sl-combobox>`);
      await expect(el).to.be.accessible();
    });

    it('should show empty message', async () => {
      const el = await fixture<SlCombobox>(html`<sl-combobox></sl-combobox>`);
      const input = el.shadowRoot?.querySelector('[part="input"]') as SlInput;
      const menu = el.shadowRoot?.querySelector('[part="menu"]') as SlMenu;
      input.focus();

      await sendKeys({
        type: 'a'
      });

      await expect(menu).to.contain.text('no data found');
    });
  });

  describe('with source', () => {
    it('should be accessible', async () => {
      const emptyDataSource = async (search: string) => ([]);
      const el = await fixture<SlCombobox>(html`<sl-combobox label="test"></sl-combobox>`);
      el.source = emptyDataSource;
      await expect(el).to.be.accessible();
    });

    it('should show empty message when no data is available', async () => {
      const emptyDataSource = async (search: string) => ([]);
      const el = await fixture<SlCombobox>(html`<sl-combobox></sl-combobox>`);
      el.source = emptyDataSource;
      const input = el.shadowRoot?.querySelector('[part="input"]') as SlInput;
      const menu = el.shadowRoot?.querySelector('[part="menu"]') as SlMenu;
      input.focus();

      await sendKeys({
        type: 'a'
      });

      await expect(menu).to.contain.text('no data found');
    })

    it('should suggest items coming back from source method', async () => {
      const dummyDataSource: SuggestionSource = async (search: string) => ([
        {text: 'test', value: 'test'},
        {text: 'test2', value: 'test2'},
      ]);

      const el = await fixture<SlCombobox>(html`<sl-combobox></sl-combobox>`);
      el.source = dummyDataSource;
      const input = el.shadowRoot?.querySelector('[part="input"]') as SlInput;
      const menu = el.shadowRoot?.querySelector('[part="menu"]') as SlMenu;
      input.focus();

      await sendKeys({
        type: 't'
      });

      await expect(menu).to.contain.text('test');
      await expect(menu).to.contain.text('test2');
    });

    it('should activate first item when pressing arrow down', async () => {
      const dummyDataSource: SuggestionSource = async (search: string) => ([
        {text: 'test', value: 'test'},
      ]);

      const el = await fixture<SlCombobox>(html`<sl-combobox></sl-combobox>`);
      el.source = dummyDataSource;
      const input = el.shadowRoot?.querySelector('[part="input"]') as SlInput;
      const menu = el.shadowRoot?.querySelector('[part="menu"]') as SlMenu;
      input.focus();

      await sendKeys({
        type: 't'
      });

      await sendKeys({
        press: 'ArrowDown'
      });

      await expect(menu.getAllItems()[0].getAttribute('active')).to.equal('');
    });

    it('should keep focus on input when navigation with arrow keys', async () => {
      const dummyDataSource: SuggestionSource = async (search: string) => ([
        {text: 'test', value: 'test'},
      ]);

      const el = await fixture<SlCombobox>(html`<sl-combobox></sl-combobox>`);
      el.source = dummyDataSource;
      const input = el.shadowRoot?.querySelector('[part="input"]') as SlInput;
      const menu = el.shadowRoot?.querySelector('[part="menu"]') as SlMenu;
      input.focus();

      await sendKeys({
        type: 't'
      });

      await sendKeys({
        press: 'ArrowDown'
      });

      await expect(el.shadowRoot.activeElement).to.equal(input);
    });
  });
});
