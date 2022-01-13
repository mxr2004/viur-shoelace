import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './numeric-bone.styles';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @since 2.0
 * @status experimental
 * @viur 0.5
 *
 * @dependency sl-example
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('sl-numeric-bone')
export default class SlNumericBone extends LitElement {
  static styles = styles;

  /** Wenn set the bone contains multiple values */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /** Bones start value */
  @property({ type: String, reflect: false }) value ="";

  /** min value */
  @property({ type: Number, reflect: false }) min = null;

  /** max value */
  @property({ type: Number, reflect: false }) max = null;

  /** Can take a Array of Languages */
  @property({ type: String, reflect: true }) languages = "";

  /** active language index */
  @property({ type: Number, reflect: true, attribute: 'active-language' }) activeLanguage = 0;

  @watch('someProp')
  doSomething() {
    // Example event
    emit(this, 'sl-event-name');
  }

  render() {
    return html`
      <sl-bone
        ?multiple=${ifDefined(this.multiple ? "multiple" : undefined)}
        languages=${ifDefined(this.languages ? this.languages : undefined)}
        active-language="${this.activeLanguage}"
      >
        <sl-input type="number" id="value"></sl-input>
      </sl-bone>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-numeric-bone': SlNumericBone;
  }
}
