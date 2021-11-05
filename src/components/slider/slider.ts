import { LitElement, html } from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import styles from './slider.styles';
// @ts-ignore
import Glider from './glider.js';

/**
 * @since 2.0
 * @status experimental
 * @viur 0.5
 *
 * @slot - Insert HTML Elements which will be used as slides
 *
 * @csspart base - The component's base wrapper.
 * @csspart dots - The component's dots wrapper.
 * @csspart previous-button - The component's previous Button.
 * @csspart next-button - The component's next Button.
 *
 * @cssproperty --slider-dot-color - The dot color.
 * @cssproperty --slider-arrow-color - The arrow color.
 * @cssproperty --slider-arrow-color-hover - The arrow hover color.
 */
@customElement('sl-slider')
export default class SlSlider extends LitElement {
  static styles = styles;
  @query('.glider') gliderWrapper: HTMLElement;

  /** Wenn set arrows are rendered */
  @property({ type: Boolean, reflect: true }) arrows = true;

  /** Wenn set navigation dots are rendered */
  @property({ type: Boolean, reflect: true }) dots = true;

  /** The amount of visible Slides */
  @property({ type: Number, reflect: true }) slidesToShow = 1;

  /** This value is ignored unless slidesToShow is set to auto, in which it is then required. */
  @property({ type: Number, reflect: true }) itemWidth = undefined;

  /** An aggravator used to control animation speed. Higher is slower! */
  @property({ type: Number, reflect: true }) duration = 0.5;

  /** Wenn set the slides are draggable */
  @property({ type: Boolean, reflect: true }) draggable = true;

  /** If true, Glider.js will scroll to the nearest slide after any scroll interactions */
  @property({ type: Boolean, reflect: true }) scrollLock = true;

  /** If true, Glider.js will lock to the nearest slide on resizing of the window */
  @property({ type: Boolean, reflect: true }) resizeLock = true;

  /** If true, Glider.js will scroll to the beginning/end when its respective endpoint is reached */
  @property({ type: Boolean, reflect: true }) rewind = true;

  /** This value is ignored unless rewind is set to true. Amount of second till next slide */
  @property({ type: Number, reflect: true }) autoScroll = 0;

  baseOptions = {}
  gliderInstance:any = null
  interval:any = null

  collectOtions(){
    if (this.arrows){
      Object.assign(this.baseOptions,{'arrows':{
        prev: '.prev',
        next: '.next',
      }})
    }

    if (this.dots){
      Object.assign(this.baseOptions, {"dots":'.dots'})
    }

    Object.assign(this.baseOptions,{
      "slidesToShow": this.slidesToShow === 0?"auto":this.slidesToShow,
      "slidesToScroll":this.slidesToShow === 0?1:this.slidesToShow,
      "draggable": this.draggable,
      "duration": this.duration,
      "scrollLock": this.scrollLock,
      "resizeLock": this.resizeLock,
      "rewind": this.rewind,
      "itemWidth":this.itemWidth
    })
  }

  startAutoScroll(){
    if (this.interval){
      clearInterval(this.interval)
    }
    if (this.autoScroll !== 0 && this.rewind){
       this.interval = setInterval(()=>{
       if(this.gliderInstance){
         this.gliderInstance.scrollItem("next")
       }
    },this.autoScroll)
    }

  }


  hasChanged(){
    if(this.gliderInstance){
      this.gliderInstance.destroy()
    }

    this.collectOtions()
    this.gliderInstance = new Glider( this.gliderWrapper, this.baseOptions)
    this.startAutoScroll()
  }

  handleSlotChange(){
    this.collectOtions()
    this.gliderInstance = new Glider( this.gliderWrapper, this.baseOptions)
    this.startAutoScroll()
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
