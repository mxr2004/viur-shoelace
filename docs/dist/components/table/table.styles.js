import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
export default css `
  ${componentStyles}

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
