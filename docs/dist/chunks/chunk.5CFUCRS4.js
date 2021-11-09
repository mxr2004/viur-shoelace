import {
  component_styles_default
} from "./chunk.G466JWVF.js";
import {
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

// src/components/spinner/spinner.styles.ts
var spinner_styles_default = r`
  ${component_styles_default}

  :host {
    --indicator-color: rgb(var(--sl-color-primary-600));
    --dot-width: calc(1em / 4);
    --speed: 1s;
  }

  .loader{
    position: relative;
    display: block;
    width:calc(var(--dot-width) *4);
    height:calc(var(--dot-width) *4);
  }
  .loader span:nth-child(1){
    --i:0;
  }
  .loader span:nth-child(2){
    --i:1;
    left:calc(50% - (50% / 4) );
  }
  .loader span:nth-child(3){
    --i:2;
    left:calc(100% - (50% / 4) * 2);
  }
  .loader span:nth-child(4){
    --i:3;
    left:calc(100% - (50% / 4) * 2);
    top:calc(50% - (50% / 4));
  }
  .loader span:nth-child(5){
    --i:4;
    left:calc(100% - (50% / 4) * 2);
    top:calc(100% - (50% / 4) * 2);
  }
  .loader span:nth-child(6){
    --i:5;
    left:calc(50% - (50% / 4));
    top:calc(100% - (50% / 4) * 2);
  }
  .loader span:nth-child(7){
    --i:6;
    top:calc(100% - (50% / 4) * 2);
  }
  .loader span:nth-child(8){
    --i:7;
    top:calc(50% - (50% / 4));
  }

  .loader span{
    content: "";
    position:absolute;
    top:0;
    left:0;
    width:calc((50% / 4) * 2);
    height:calc((50% / 4) * 2);
    background: var(--indicator-color);
    box-shadow: 0 0 calc(var(--dot-width) / 2 ) var(--indicator-color);
    animation: animate calc(var(--speed)) linear infinite;
    animation-delay: calc(var(--speed)/8 * var(--i));
  }

  @keyframes animate {
    0% {
      opacity: 1;
    }
    80%, 100%{
      opacity:0;
    }
  }

`;

// src/components/spinner/spinner.ts
var SlSpinner = class extends n {
  render() {
    return y`
      <div part="base" class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>`;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass([
  n2("sl-spinner")
], SlSpinner);
var spinner_default = SlSpinner;

export {
  spinner_default
};
