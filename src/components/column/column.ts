import { LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EDIT_TYPE } from '../table/edit';
import SlTable from '../table/table';
import { CellContext, CellHeadContext, ColumnItems } from '../table/tableConfig';
let columnUniqueID = 0;
/**
 * @since 2.0
 * @status experimental
 * @description: Used to define headers and columns for sl-table, no actual rendering
 *
 */
@customElement('sl-column')
export default class SlColumn extends LitElement {
  /**Header custom rendering*/
  @property({ attribute: false, type: Object }) renderCol: (context: CellHeadContext) => TemplateResult<1>;

  /**Corresponding to TD rendering, receive table cellContext: as a parameter, render TD*/
  @property({ attribute: false, type: Object }) renderCell: (context: CellContext) => TemplateResult<1> | { template: TemplateResult<1>; colspan?: number; rowspan?: number } | typeof nothing;

  /**whether to hide this column*/
  @property({ type: Boolean, reflect: true, attribute: true })
  hidden: boolean = false;

  /** The field corresponding to the column should be unique in the same table, which will be used as the key of rowData, and supports "." as the separator */
  @property({ type: String, reflect: true, attribute: true })
  field: string;

  /** The label corresponding to the column, the default th is to display this label*/
  @property({ type: String, reflect: true, attribute: true })
  label: string;

  /** The horizontal alignment of the header TH corresponding to the column*/
  @property({ type: String, reflect: true, attribute: 'col-align' })
  colAlign: 'left' | 'center' | 'right' = 'center';

  /** The vertical alignment of the header TH corresponding to the column*/
  @property({ type: String, reflect: true, attribute: 'col-valign' })
  colvAlign: 'top' | 'middle' | 'bottom' = 'middle';

  /** Horizontal alignment of the TD corresponding to the column*/
  @property({ type: String, reflect: true, attribute: 'align' })
  align: 'left' | 'center' | 'right' = 'left';

  /** The vertical alignment of the TD corresponding to the column*/
  @property({ type: String, reflect: true, attribute: 'valign' })
  vAlign: 'top' | 'middle' | 'bottom' = 'middle';

  // /** Sort, ascending or descending*/
  // @property({ type: String, reflect: true, attribute: true })
  // sort: SortingEnum; //ascending, descending

  /** Whether the column supports sorting */
  @property({ type: Boolean, reflect: true, attribute: 'sort-able' })
  sortAble: boolean;

  /** Whether to support dragging the width of the column */
  @property({ type: Boolean, reflect: true, attribute: 'resize-able' })
  resizeAble: boolean;

  /**column width */
  @property({ type: String, reflect: true, attribute: 'width' })
  width: string;

  /**Minimum column width */
  @property({ type: String, reflect: true, attribute: 'min-width' })
  minWidth: string;

  /**Maximum column width */
  @property({ type: String, reflect: true, attribute: 'max-width' })
  maxWidth: string;

  /**Initialize auto-generated unique ID */
  @property({ type: String, reflect: true, attribute: 'uniqueID' })
  uniqueID: string = 'unique_' + columnUniqueID++;

  // /**Whether to allow dragging of column positions */
  // @property({ type: String, reflect: true, attribute: 'can-drag' })
  // canDrag: string;

  // /**Whether to allow dragging to this column */
  // @property({ type: String, reflect: true, attribute: 'drag-accept' })
  // dragAccept: string;

  /**Order: the smaller the first */
  @property({ type: Number, reflect: true, attribute: 'order' })
  order = 0;

  /**The type of the column, the column of the specified type, has a specific rendering, such as index, checkbox, radio, or edit mode that affects the column */
  @property({ type: String })
  type: 'index' | 'checkbox' | 'radio' | 'date' | 'date-month' | 'date-year';

  /**Column editor, built-in cell editor, EDIT_TYPE:input,text,date,select,multi-select, multi-checkbox, or a function that implements a custom column editor */
  @property({ type: Object, attribute: false })
  edit: EDIT_TYPE | string | ((context: CellContext) => TemplateResult<1>);

  /** Editor input, textarea maximum input length */
  @property({ type: Number })
  inputMaxLength: number;

  /** Editor input, textarea minimum input length */
  @property({ type: Number })
  inputMinLength: number;

  /**Editor is required to be implemented*/
  @property({ type: Boolean })
  editRequired: boolean;

  /** Define the column data mapper, which will turn rowData[field] into a display value, and at the same time when editing, it will also be used as a select, checkbox drop-down item */
  @property({ type: Array, attribute: false })
  items: Array<ColumnItems>;

  /**
   *  All hidden!=false direct sub-columns, and sorted by order
   */
  get childCanShowColumn(): SlColumn[] {
    let children = Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn && item.hidden != true;
    }) as SlColumn[];
    return children.sort((item1, item2) => item1.order - item2.order);
  }

  /**
   * all direct child columns
   */
  get childAllColumn() {
    return Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn;
    }) as SlColumn[];
  }
  get table(): SlTable {
    return this.closest('sl-table') as SlTable;
  }

  updated(map: PropertyValues) {
    super.updated(map);
    this.table?.columnChangeHanlder();
  }
  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-column': SlColumn;
  }
}
