import { LitElement } from 'lit';
export default class SlSlider extends LitElement {
    static styles: import("lit").CSSResult;
    gliderWrapper: HTMLElement;
    arrows: boolean;
    dots: boolean;
    slidesToShow: number;
    itemWidth: undefined;
    duration: number;
    draggable: boolean;
    scrollLock: boolean;
    resizeLock: boolean;
    rewind: boolean;
    autoScroll: number;
    baseOptions: {};
    gliderInstance: any;
    interval: any;
    collectOtions(): void;
    startAutoScroll(): void;
    hasChanged(): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-slider': SlSlider;
    }
}
