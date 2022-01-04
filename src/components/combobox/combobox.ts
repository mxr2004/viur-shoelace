import {LitElement, html} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import SlMenuItem from '../menu-item/menu-item';
import type SlDropdown from '../dropdown/dropdown';
import type SlMenu from '../menu/menu';
import styles from './combobox.styles';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {scrollIntoView} from "../../internal/scroll";
import {emit} from "../../internal/event";

export interface Suggestion {
  text: string;
  value: string;
}

export interface SuggestionSource {
  (search: string): Promise<Suggestion[]>
}

/**
 * @since 2.X
 * @status beta
 *
 * @dependency sl-input
 * @dependency sl-icon
 * @dependency sl-dropdown
 * @dependency sl-menu
 * @dependency sl-menu-item
 *
 * @event {{ item: SlMenuItem }} sl-select - Emitted when a menu item is selected.
 * @event sl-change - Emitted when the input's value changes.
 * @event sl-clear - Emitted when the clear button is activated.
 * @event sl-input - Emitted when the input receives input.
 * @event sl-focus - Emitted when the input gains focus.
 * @event sl-blur - Emitted when the input loses focus.
 * @event sl-show - Emitted when the dropdown opens.
 * @event sl-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event sl-hide - Emitted when the dropdown closes.
 * @event sl-after-hide - Emitted after the dropdown closes and all animations are complete.*
 *
 * @csspart base - The component's base wrapper.
 *
 */
@customElement('sl-combobox')
export default class SlCombobox extends LitElement {
  static styles = styles;
  static navigationKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt', 'Enter', 'Escape'];

  private comboboxId = comboboxIds++;
  private resizeObserver: ResizeObserver;

  @query('sl-input') input: HTMLInputElement;
  @query('sl-dropdown') dropdown: SlDropdown;
  @query('sl-menu') menu: SlMenu;

  @state() activeItemIndex: number = -1;
  @state() suggestions: Array<{ text: string; value: string }> = [];

  /** The combobox's size. */
  @property({reflect: true}) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style combobox with rounded edges. */
  @property({type: Boolean, reflect: true}) pill: boolean = false;

  /** The combobox's label. */
  @property() label: string;

  /** The combobox's name attribute. */
  @property() name: string;

  /** The combobox's help text. */
  @property({attribute: 'help-text'}) helpText: string = '';

  /** Adds a clear button when the input is populated. */
  @property({type: Boolean}) clearable: boolean = false;

  /** Enable this option to prevent the panel from being clipped when the component is placed inside a container with `overflow: auto|scroll`. */
  @property({type: Boolean}) hoist: boolean = false;

  /** The input's placeholder text. */
  @property() placeholder: string;

  /** The input's autofocus attribute. */
  @property({type: Boolean}) autofocus: boolean;

  /** Disables the combobox component. */
  @property({type: Boolean, reflect: true}) disabled: boolean = false;

  /** Message displayed when no result found. */
  @property({attribute: 'empty-message'}) emptyMessage: string = 'no data found';

  /** The source property is a function executed on user input. The search result is displayed in the suggestions list. */
  @property() source?: SuggestionSource;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    this.updateComplete.then(() => this.resizeObserver.observe(this.input));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }

  clear() {
    this.input.value = '';
    this.dropdown.focusOnTrigger();
    this.dropdown.hide();
  }

  ignoreInputClick(event: MouseEvent) {
    event.stopImmediatePropagation();
  }

  handleCloseMenu() {
    this.menu.getCurrentItem()?.setAttribute('tabindex', '-1');
  }

  handleKeyDown(event: KeyboardEvent) {
    event.stopImmediatePropagation();

    if (!(event.target instanceof SlMenuItem)) {
      return
    }

    this.handleMenuItemKeyDown(event);
  }

  private handleMenuItemKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.clear();
        break;
      default:
        if (!SlCombobox.navigationKeys.includes(event.key)) this.input.focus();
        break;
    }
  }

  handleInputKeyDown(event: KeyboardEvent) {
    event.stopImmediatePropagation();

    const menuItems: SlMenuItem[] = this.menu.getAllItems();
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];

    // Close when escape or tab is pressed
    if (event.key === 'Escape') {
      this.clear();
      return;
    }

    // When up/down is pressed, we make the assumption that the user is familiar with the menu and plans to make a
    // selection. Rather than toggle the panel, we focus on the menu (if one exists) and activate the first item for
    // faster navigation.
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();

      this.dropdown.show();

      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstMenuItem) {
        if (this.activeItemIndex !== -1) {
          menuItems[this.activeItemIndex].active = false;
        }

        if (this.activeItemIndex === menuItems.length - 1) {
          this.activeItemIndex = 0;
        } else {
          this.activeItemIndex++;
        }

        this.menu.setCurrentItem(menuItems[this.activeItemIndex]);
        menuItems[this.activeItemIndex].active = true;

        scrollIntoView(menuItems[this.activeItemIndex], this.dropdown.panel);

        return;
      }

      if (event.key === 'ArrowUp' && lastMenuItem) {
        if (this.activeItemIndex !== -1) {
          menuItems[this.activeItemIndex].active = false;
        }

        if (this.activeItemIndex === 0) {
          this.activeItemIndex = menuItems.length - 1;
        } else {
          this.activeItemIndex--;
        }

        this.menu.setCurrentItem(menuItems[this.activeItemIndex]);
        menuItems[this.activeItemIndex].active = true;

        scrollIntoView(menuItems[this.activeItemIndex], this.dropdown.panel);

        return;
      }
    }

    if (event.key === 'Enter' && this.activeItemIndex !== -1) {
      event.preventDefault();
      const item = menuItems[this.activeItemIndex];
      if (item) {
        this.onItemSelected(item);
      }
    }
  }

  onItemSelected(item: SlMenuItem) {
    const event = emit(this, 'sl-item-select', {
      detail: {item},
      cancelable: true,
    });
    if (!event.defaultPrevented) {
      this.dropdown.hide();
      this.input.value = item.textContent ?? '';
    }
  }

  ignoreKeyUp(event: KeyboardEvent) {
    event.stopImmediatePropagation();
  }

  async handleSlInput() {
    if (this.activeItemIndex !== -1) {
      this.menu.getAllItems({includeDisabled: false})[this.activeItemIndex].active = false;
      this.activeItemIndex = -1;
    }

    if (this.input.value === '') {
      await this.dropdown.hide();
      return
    }

    await this.prepareSuggestions(this.input.value);
    await this.dropdown.show();
  }

  resizeMenu() {
    this.menu.style.width = `${
      parseInt(getComputedStyle(this.input, null).width) -
      parseInt(getComputedStyle(this.input, null).marginLeft) -
      parseInt(getComputedStyle(this.input, null).marginRight)
    }px`;

    if (this.dropdown) this.dropdown.reposition();
  }

  async prepareSuggestions(text: string) {
    if (typeof this.source !== 'function') {
      return;
    }

    let items = await this.source(text);

    this.suggestions = this.highlightSearchTextInSuggestions(items, this.input.value);
  }

  highlightSearchTextInSuggestions(items: Suggestion[], searchText: string) {
    const regex = new RegExp(searchText, 'gi');
    return items.map(item => {
        const highlightedSuggestion = item.text.replace(
          regex,
          (match) => `<span class="highlight">${match}</span>`
        );

        return {
          ...item,
          text: highlightedSuggestion
        };
      }
    );
  }

  activeDescendant(): string|null {
    if (this.activeItemIndex === -1) {
      return null;
    }

    return this.menuItemId(this.activeItemIndex);
  }

  menuItemId(index: number): string {
    return `sl-combobox-menu-${this.comboboxId}-item-${index}`
  }

  render() {
    return html`
      <sl-dropdown
        part="base"
        closeOnSelect="true"
        .containing-element=${this}
        ?hoist=${this.hoist}
        @keydown=${this.handleKeyDown}
        @sl-hide=${this.handleCloseMenu}
        disableKeyboardToggle="true"
        stay-open-on-select
      >
        <sl-input
          part="input"
          slot="trigger"
          type="text"
          role="combobox"
          aria-expanded=${this.dropdown?.open}
          size=${this.size}
          label=${this.label}
          placeholder=${this.placeholder}
          help-text=${this.helpText}
          ?clearable=${this.clearable}
          ?disabled=${this.disabled}
          ?pill=${this.pill}
          ?spellcheck=${false}
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          inputmode="search"
          aria-activedescendant=${this.activeDescendant()}
          aria-controls=${`sl-combobox-menu-${this.comboboxId}`}
          aria-autocomplete="list"
          @keydown=${this.handleInputKeyDown}
          @keyup=${this.ignoreKeyUp}
          @sl-input=${this.handleSlInput}
          @click=${this.ignoreInputClick}
          @sl-clear=${this.clear}
        >
          <span class="input__prefix" slot="prefix">
            <slot name="prefix"></slot>
          </span>
          <span class="input__suffix" slot="suffix">
            <slot name="suffix"></slot>
          </span>
        </sl-input>

        <sl-menu
          part="menu"
          id=${`sl-combobox-menu-${this.comboboxId}`}
          role="listbox"
          @sl-select=${(selectEvent: CustomEvent) => this.onItemSelected(selectEvent.detail.item)}
        >
          ${this.suggestions.length === 0
            ? html`
              <sl-menu-item disabled>${this.emptyMessage}</sl-menu-item>`
            : this.suggestions.map((item, index) => html`
              <sl-menu-item value=${item.value} id=${this.menuItemId(index)}>${unsafeHTML(item.text)}</sl-menu-item>`)}
        </sl-menu>
      </sl-dropdown>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-combobox': SlCombobox;
  }
}

let comboboxIds = 0;
