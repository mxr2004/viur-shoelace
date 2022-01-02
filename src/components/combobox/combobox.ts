import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { debounce } from '../../internal/throttle';
import SlInput from '../input/input';
import SlMenuItem from '../menu-item/menu-item';
import type SlDropdown from '../dropdown/dropdown';
import type SlMenu from '../menu/menu';
import styles from './combobox.styles';
import { unsafeHTML, UnsafeHTMLDirective } from 'lit/directives/unsafe-html.js';

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

  private resizeObserver: ResizeObserver;
  private search: string = '';
  private lastActiveItemIdex: number = -1;

  @query('sl-input') input: HTMLInputElement;
  @query('sl-dropdown') dropdown: SlDropdown;
  @query('sl-menu') menu: SlMenu;

  @state() suggestions: Array<{ text: string | UnsafeHTMLDirective; value: string }> = [];

  /** The combobox's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style combobox with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill: boolean = false;

  /** The combobox's label. */
  @property() label: string;

  /** The combobox's name attribute. */
  @property() name: string;

  /** The combobox's help text. */
  @property({ attribute: 'help-text' }) helpText: string = '';

  /** Adds a clear button when the input is populated. */
  @property({ type: Boolean }) clearable: boolean = false;

  /** Enable this option to prevent the panel from being clipped when the component is placed inside a container with `overflow: auto|scroll`. */
  @property({ type: Boolean }) hoist: boolean = false;

  /** The input's placeholder text. */
  @property() placeholder: string;

  /** The input's autofocus attribute. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Disables the combobox component. */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  /** The delay in milliseconds between when a keystroke occurs and when a search is performed. */
  @property({ type: Number }) delay: number = 300;

  /** The maximum number of suggestions that will be displayed. */
  @property({ type: Number, attribute: 'max-results' }) maxResults: number = 20;

  /** Message displayed when no result found. */
  @property({ type: String, attribute: 'empty-message' }) emptyMessage: string = 'no data found';

  /** The source property is a function executed on user input. The search result is displayed in the suggestions list. */
  @property()
  source?: (search: string) => Promise<Array<{ text: string; value: string }>>;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    this.updateComplete.then(() => this.resizeObserver.observe(this.input));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }

  handleClearClick() {
    this.search = '';
    this.dropdown.hide();
  }

  handleClick(event: MouseEvent) {
    event.stopImmediatePropagation();
  }

  handleMenuSelect(event: CustomEvent) {
    const item = event.detail.item;
    this.input.value = item.textContent;
    this.search = item.textContent;
  }

  handleCloseMenu() {
    this.menu.getCurrentItem()?.setAttribute('tabindex', '-1');
  }

  handleKeyDown(event: KeyboardEvent) {
    const items = this.menu.getAllItems({ includeDisabled: false });

    if (event.target instanceof SlInput) {
      if (event.key === 'ArrowDown') {
        this.dropdown.show();
        items[0].focus();
        this.lastActiveItemIdex = 0;
      }
    } else if (event.target instanceof SlMenuItem) {
      const activeItem = this.menu.getActiveItem();

      switch (event.key) {
        case 'ArrowUp':
          if (activeItem === 0 && this.lastActiveItemIdex === 0) {
            this.menu.getCurrentItem()?.setAttribute('tabindex', '-1');
            this.input.focus();
          }
          this.lastActiveItemIdex = activeItem;
          break;
        case 'ArrowDown':
          if (activeItem === items.length - 1 && this.lastActiveItemIdex === items.length - 1) {
            this.menu.setCurrentItem(items[0]);
            items[0].focus();
            this.lastActiveItemIdex = 0;
          } else {
            this.lastActiveItemIdex = activeItem;
          }
          break;
        default:
          const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt', 'Enter', 'Escape'];
          if (!ignoredKeys.includes(event.key)) this.input.focus();
          break;
      }
    }

    event.stopImmediatePropagation();
  }

  async handleKeyUp(event: KeyboardEvent) {
    await this.prepareSuggestions(this.input.value);
    event.stopImmediatePropagation();
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
    if (!this.source) {
      return;
    }

    this.search = this.input.value;

    let items = await this.source(text);
    items.splice(this.maxResults);

    this.suggestions = this.highlightSearchTextInSuggestions(items, this.search);

    this.dropdown.show();
  }

  private highlightSearchTextInSuggestions(items: Array<{ text: string; value: string }>, searchText: string) {
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

  render() {
    return html`
      <sl-dropdown
        part="base"
        closeOnSelect="true"
        .containing-element=${this}
        ?hoist=${this.hoist}
        @keydown=${this.handleKeyDown}
        @sl-hide=${this.handleCloseMenu}
      >
        <sl-input
          slot="trigger"
          type="text"
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
          @keyup=${debounce(this.handleKeyUp.bind(this), this.delay)}
          @click=${this.handleClick}
          @sl-clear=${this.handleClearClick}
        >
          <sl-icon slot="suffix" name="search" library="system"></sl-icon>
        </sl-input>

        <sl-menu @sl-select=${this.handleMenuSelect} ?select-on-type=${false}>
          ${this.suggestions.length === 0
            ? html`<sl-menu-item disabled>${this.emptyMessage}</sl-menu-item>`
            : this.suggestions.map(item => html`<sl-menu-item value=${item.value}>${unsafeHTML(item.text)}</sl-menu-item>`)}
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
