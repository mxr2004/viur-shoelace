import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
//language=CSS
export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .entry{
    padding:5px 0;
  }

  .entry-actions{
    display:none;
  }

  .entry-actions.is-active{
     display:block;
  }

  .entry-value-multiple{
    display: grid;
    justify-items: stretch;
    align-items: start;
    align-content: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr max-content;
    padding-bottom:5px;
    gap:5px;
  }

  .button-icon{
    pointer-events: none;
  }

  sl-tab::part(base){
    padding:5px 10px;
  }
`;
