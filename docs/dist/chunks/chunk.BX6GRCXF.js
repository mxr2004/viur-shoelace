import {
  component_styles_default
} from "./chunk.G466JWVF.js";
import {
  n as n2,
  o
} from "./chunk.JPCNAH5U.js";
import {
  n,
  r,
  y
} from "./chunk.X3WLUTHF.js";
import {
  __decorateClass
} from "./chunk.IHGPZX35.js";

// src/components/details-group/details-group.styles.ts
var details_group_styles_default = r`
  ${component_styles_default}

  :host {
    display: block;
    --details-gap:var(--sl-spacing-2x-small);
  }

  ::slotted(sl-details:not(:last-of-type)) {
    margin-bottom: var(--details-gap);
  }
`;

// src/components/details-group/details-group.ts
var SlDetailsGroup = class extends n {
  hasChanged() {
    this.registerDetails();
  }
  handleSlotChange() {
    this.registerDetails();
  }
  registerDetails() {
    let detailsList = Array.prototype.filter.call(this.currentSlotNodes, (node) => node.nodeType == Node.ELEMENT_NODE);
    if (detailsList) {
      for (const details of detailsList) {
        details.addEventListener("sl-show", (event) => {
          [...detailsList].map((details2) => details2.open = event.target === details2);
        });
      }
    }
  }
  render() {
    return y`
      <slot @slotchange=${this.handleSlotChange}>
    </slot> `;
  }
};
SlDetailsGroup.styles = details_group_styles_default;
__decorateClass([
  o("", true)
], SlDetailsGroup.prototype, "currentSlotNodes", 2);
SlDetailsGroup = __decorateClass([
  n2("sl-details-group")
], SlDetailsGroup);
var details_group_default = SlDetailsGroup;

export {
  details_group_default
};
