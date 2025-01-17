import { css } from 'lit';
import componentStyles from '~/styles/component.styles';
//language=CSS
export default css`
  ${componentStyles}

  :host{
    display:block;
    --ac-tab-active-background-color:rgb(var(--sl-primary-color-100));
    --ac-header-color:rgba(0,0,0,.65);
    --ac-header-font-size:1.2em;
    --ac-header-padding:.3em 0.6em;
    --ac-content-padding:.3em 0.6em;
  }
  .ac-tab-header{
    background-color: var(--ac-tab-active-background-color) ;
  }

  .ac-tab-header{
    border-top: 1px solid var(--ac-tab-border-color,#c8c8c8);
    background-color:  var(--ac-tab-background-color,#fafafa);
    padding: var(--ac-header-padding);
    font-size: var(--ac-header-font-size);
    color: var(--ac-header-color);
    cursor:pointer;
    display:flex;
    align-items:center;
  }
  .ac-tab-header sl-icon{
    margin-right: var(--ac-panel-icon-margin-right,4px);
  }

  span[part=header-span]{
    flex: 1 1 auto;
  }

  div[part=content]{
    border-top: 1px solid var(--ac-tab-border-color,#c8c8c8) ;
    background-color: #fff;
    padding: var(--ac-content-padding);
  }
  div[part=content].close{
     display:none;
  }



`;
