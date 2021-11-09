import { LitElement } from 'lit';
export default class SlTable extends LitElement {
    static styles: import("lit").CSSResult;
    tableInstance: null;
    tableWrapper: HTMLElement;
    prop: string;
    doSomething(): void;
    firstUpdated(): void;
    loadHeader(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-table': SlTable;
    }
}
