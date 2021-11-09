import { LitElement } from 'lit';
export default class SlDetailsGroup extends LitElement {
    static styles: import("lit").CSSResult;
    currentSlotNodes: any;
    hasChanged(): void;
    handleSlotChange(): void;
    registerDetails(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-details-group': SlDetailsGroup;
    }
}
