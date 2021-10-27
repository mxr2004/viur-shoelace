import { LitElement, html } from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import styles from './slider.styles';
import Glider from './glider.js'

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
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('sl-slider')
export default class SlSlider extends LitElement {
  static styles = styles;
  @query('.glider') gliderWrapper: HTMLElement;

  baseOptions = {
    slidesToShow: 1,
      draggable: true,
      dots: '.dots',
      arrows: {
        prev: '.prev',
        next: '.next',
            skipTrack: true
      }
    }

  firstUpdated(){
    //new Glider( this.gliderWrapper, this.baseOptions)
  }

  handleSlotChange(){
    new Glider( this.gliderWrapper, this.baseOptions)
  }

  render() {
    return html`
      <div class="glider-contain">
        <div part="base" class="glider">
          <slot @slotchange=${this.handleSlotChange}>
          </slot>
        </div>

        <sl-icon-button part="previous-button" aria-label="Previous" class="prev glider-prev" name="arrow-left"></sl-icon-button>
        <sl-icon-button part="next-button" aria-label="Next" class="next glider-next" name="arrow-right"></sl-icon-button>

        <div part="dots" role="tablist" class="dots"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-slider': SlSlider;
  }
}
