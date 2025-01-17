import { css } from 'lit';
import componentStyles from '~/styles/component.styles';
//language=CSS
export default css`
  ${componentStyles}
  :host {
    display: block;
    position: relative;
    /****** Navigation picture size：width 100px***/
    --thumb-image-size:100px;
    --sl-image-transition-time:450ms;
  }

  .full-screen.bottom .images, .full-screen.top .images {
    max-height: calc( 100vh - var(--thumb-image-size) );
  }

  .full-screen img.image-gallery-image {
    object-fit: contain;
  }

  .full-screen.left, .full-screen.right {
    max-height: 100vh;
  }

  .base {
    position: relative;
    display: flex;
  }
  .base .images {
    flex: 1 0 auto;
    position: relative;
    order: 0;
  }
  .base .thumbs {
    z-index: 1;
    flex: 0 0 auto;
    order: 1;
    overflow: hidden;
  }
  .base.top .thumbs {
    order: 0;
  }
  .base.top .images {
    order: 1;
  }
  .base.bottom, .base.top {
    flex-direction: column;
  }
  .base.left, .base.right {
    flex-direction: row;
    overflow: hidden;
  }
  .base.right .thumbs, .base.left .thumbs {
    order: 0;
    margin: 0 4px;
    flex-basis: var(--thumb-image-size);
  }
  .base.right .thumb-image-conatainer, .base.left .thumb-image-conatainer {
    height: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .base.right .images, .base.left .images {
    order: 1;
    flex-basis: calc( 100% - var(--thumb-image-size));
  }
  .base.right.right .images, .base.left.right .images {
    order: 0;
  }
  .base.right.right .thumbs, .base.left.right .thumbs {
    order: 1;
  }

  ::slotted(*) {
    position: absolute;
    color: #FFF;
    top: 10px;
    right: 10px;
  }

  .nav-button {
    position: absolute;
    padding: 20px 10px;
    transition-property: color;
    color: #fff;
    transition: all 0.3s ease-out;
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
    z-index: 4;
    filter: drop-shadow(0 2px 2px #1a1a1a);
  }
  .nav-button svg {
    fill: none;
    stroke: currentcolor;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    height: 120px;
    width: 60px;
  }
  .nav-button.left-nav {
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  .nav-button.right-nav {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .nav-button.button-pauseButton {
    bottom: 0;
    left: 0px;
    padding: 10px;
  }
  .nav-button.button-pauseButton svg {
    height: 30px;
    width: 30px;
  }
  .nav-button.button-fullscreen {
    bottom: 0;
    right: 0px;
    padding: 10px;
  }
  .nav-button.button-fullscreen svg {
    height: 30px;
    width: 30px;
  }
  .nav-button:hover {
    color: rgb(var(--sl-color-primary-500));
  }
  .nav-button:hover .image-gallery-svg {
    transform: scale(1.1);
  }

  div[part=image-exta] {
    position: absolute;
    top: 12px;
    line-height: 1em;
    padding-left: 5px;
    color: #FFF;
  }

  .thumb-button {
    display: inline-block;
    cursor: pointer;
    background-color: transparent;
    border: 4px solid transparent;
    transition: border var(--sl-image-transition-time) ease-out;
    width: var(--thumb-image-size);
    padding: 0;
  }
  .thumb-button:hover, .thumb-button[current-image] {
    outline: none;
    border: 4px solid #337ab7;
  }
  .thumb-button img {
    width: 100%;
    vertical-align: middle;
    line-height: 0;
  }

  .thumb-button + .thumb-button {
    margin-left: 2px;
  }

  .left .thumb-button, .right .thumb-button {
    display: block;
  }

  .left .thumb-button + .thumb-button, .right .thumb-button + .thumb-button {
    margin-left: 0px;
    margin-top: 2px;
  }

  .thumb-image-conatainer {
    padding: 5px 0;
    transition: all var(--sl-image-transition-time) ease-out;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
  }

  .image-sliders {
    line-height: 0;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    text-align: left;
  }
  .image-sliders .image-gallery-slide {
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .image-sliders .image-gallery-slide[current-image] {
    position: relative;
  }
  .image-sliders .image-gallery-slide img.image-gallery-image {
    width: 100%;
    object-fit: contain;
  }

  div.imgage-navigation {
    width: 80%;
    bottom: 20px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    width: 80%;
    z-index: 4;
  }
  div.imgage-navigation .imgage-navigation-wrap {
    margin: 0;
    padding: 0;
    overflow: hidden;
    text-align: center;
  }
  div.imgage-navigation .imgage-navigation-wrap button[part=nav-button] {
    display: inline-block;
    appearance: none;
    cursor: pointer;
    background-color: transparent;
    margin: 0 5px;
    padding: 5px;
    border: 1px solid #fff;
    border-radius: 50%;
    box-shadow: 0 2px 2px #1a1a1a;
    transition: all var(--sl-image-transition-time) ease-out;
  }
  div.imgage-navigation .imgage-navigation-wrap button[part=nav-button][current-image], div.imgage-navigation .imgage-navigation-wrap button[part=nav-button]:hover {
    transform: scale(1.2);
    border: 1px solid #fff;
    background: #fff;
  }
`;
