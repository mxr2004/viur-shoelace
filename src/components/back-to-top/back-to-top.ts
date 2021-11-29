import { LitElement, html } from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import styles from './back-to-top.styles';

/**
 * @since 2.0
 * @status experimental
 * @viur 0.5
 *
 * @slot - The default slot.
 *
 * @csspart wrapper - The component's base wrapper.
 */
@customElement('sl-back-to-top')
export default class SlBackToTop extends LitElement {
  static styles = styles;
  targetElement:any;
  @query('.back-to-top-wrapper') wrapper: HTMLElement;


  /** selector for scroll target */
  @property() target = "html";

  scrollToTop(){
    this.targetElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scolling(e:any){
    this.classList.toggle("scrolled", 1.5 * e.target.scrollTop > e.target.clientHeight )
  }

  initSlot(){
    this.targetElement = document.querySelector(this.target)
    this.targetElement.addEventListener("scroll", this.scolling)
  }

  firstUpdated() {
    this.initSlot()
  }

  render() {
    return html`<div part="wrapper" class="back-to-top-wrapper" @click="${this.scrollToTop}">
        <slot @slotchange=${this.initSlot}>
          <sl-button circle><sl-icon name="arrow-up"></sl-icon></sl-button>
        </slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-back-to-top': SlBackToTop;
  }
}
