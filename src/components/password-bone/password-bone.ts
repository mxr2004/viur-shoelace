import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './password-bone.styles';

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
@customElement('sl-password-bone')
export default class SlPasswordBone extends LitElement {
  static styles = styles;

  /** An example property. */
  @property() prop = 'example';

  @watch('someProp')
  doSomething() {
    // Example event
    emit(this, 'sl-event-name');
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-password-bone': SlPasswordBone;
  }
}
