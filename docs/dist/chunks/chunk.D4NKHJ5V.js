import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.I4TE3TJV.js";
import {
  component_styles_default
} from "./chunk.G466JWVF.js";
import {
  e,
  i,
  n as n2
} from "./chunk.JPCNAH5U.js";
import {
  n,
  r,
  y
} from "./chunk.X3WLUTHF.js";
import {
  __decorateClass
} from "./chunk.IHGPZX35.js";

// src/components/table/table.styles.ts
var table_styles_default = r`
  ${component_styles_default}

  :host {
    display: block;
  }

  .table {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 1.5em;
    padding: 0;
    width: 100%;
  }

  .table thead{
    position: relative;
    clip: auto;
    height: auto;
    width: auto;
    overflow: auto;
    padding: 0;
    border: 0;
  }
  .table thead th{
    background-color: #d00f1c;
    border: 1px
    solid #890a12;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }

  .table tbody{
    padding: 0;
    white-space: normal;
    text-align: right;
    vertical-align: middle;
  }

  .table tbody tr{
    border: 1px solid #890a12;
    padding: 0;
    white-space: normal;
    text-align: right;
    vertical-align: middle;
    margin-bottom: 1em;
    background-color: #f4f4f4;
  }

  .table tbody tr td{
    white-space: normal;
    text-align: right;
    vertical-align: middle;
    padding: 0.45em 0.9em;
  }



  .table tbody tr:nth-of-type(even):hover{
    background-color: #ffffff;
  }
  .table tbody tr:nth-of-type(odd):hover{
    background-color: #ffffff;
  }

  .table tbody tr:not(:last-of-type){
    border-bottom: 1px solid #d8d8d8;
  }

  .table tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  /* active State */
  .table tbody tr.is-active{
    background-color: #49a63f;
  }
  .table tbody tr.is-active:hover{
    background-color: #5bbd51;
  }

  .table tbody tr:nth-of-type(odd).is-active{
    background-color: #469e3c;
  }

  .table tbody tr:nth-of-type(odd).is-active:hover{
    background-color: #5bbd51;
  }

`;

// src/components/table/table.ts
var SlTable = class extends n {
  constructor() {
    super(...arguments);
    this.tableInstance = null;
    this.prop = "example";
  }
  doSomething() {
    emit(this, "sl-event-name");
  }
  firstUpdated() {
  }
  loadHeader() {
  }
  render() {
    return y`
      <table class="table" data-sortable>
        <thead>
            <tr>
              <slot name="header" @slotchange=${this.loadHeader}>
                <th slot="header">1</th>
                <th slot="header">2</th>
                <th slot="header">3</th>
              </slot>
            </tr>
        </thead>

        <tbody class="list">
          <slot>
            <tr>
              <td> Test1</td>
              <td> Test1</td>
              <td> Test1</td>
            </tr>
            <tr>
              <td> Test2</td>
              <td> Test2</td>
              <td> Test2</td>
            </tr>
            <tr>
              <td> Test2000000</td>
              <td> Test2</td>
              <td> Test2</td>
            </tr>
            <tr class="is-active">
              <td> Test2</td>
              <td> Test2</td>
              <td> Test2</td>
            </tr>
          </slot>
        </tbody>
        <tfoot>
            <slot name="footer"></slot>
        </tfoot>
      </table>
    `;
  }
};
SlTable.styles = table_styles_default;
__decorateClass([
  i(".table")
], SlTable.prototype, "tableWrapper", 2);
__decorateClass([
  e()
], SlTable.prototype, "prop", 2);
__decorateClass([
  watch("someProp")
], SlTable.prototype, "doSomething", 1);
SlTable = __decorateClass([
  n2("sl-table")
], SlTable);
var table_default = SlTable;

export {
  table_default
};
