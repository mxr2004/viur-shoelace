import { css } from 'lit';
import componentStyles from '~/styles/component.styles';
//language=CSS
export default css`
  ${componentStyles}
  :host{
      position: relative ;
      display: inline-block;
      flex: 1;
      overflow: hidden;
   }

   :host([finished]){
      --step-background-color: #fff;
      --step-border-color: #42b983 ;
      --step-icon-color:#42b983 ;
      --step-line-color:#42b983 ;

   }
   :host([current]){
      --step-background-color: #42b983;
      --step-border-color: #42b983;
      --step-icon-color:#FFF;
      --step-line-color:#f0f0f0;
   }

   :host([last]){
      flex: 0 0 auto;
   }
   :host([direction=vertical]){
      display: block;
   }
   div[part=step-container]{
     box-sizing:border-box;
     display: flex;
     overflow:hidden;
   }
   :host([direction=vertical])  div[part=step-container]{
     position:relative;
     display:flex;
   }
   div[part=step-icon]{
      display:inline-block;
      position: relative;
      background-color: var(--step-background-color,#fff);
      flex:0 0 auto ;
      width: 32px;
      height: 32px;
      margin: 0 8px 0 0;
      font-size: 16px;
      line-height: 32px;
      text-align: center;
      border: 1px solid var(--step-border-color,rgba(0,0,0,.25));
      border-radius: 32px;
      transition: background-color .3s,border-color .3s;
      color:var(--step-icon-color,inherit);
   }

   .step-icon-span{
      display: inline-block;
      color: inherit;
      text-align: center;
   }
   div[part=step-content]{
      display:inline-block;
   }
   :host([direction=vertical]) .div[part=step-content]{
      min-height:48px;
   }

   div[part=step-title]{
      color: rgba(0,0,0,.85);
      font-weight: 400;
      display: inline-block;
      position: relative;
   }
   :host(:not([direction=vertical]):not([last]) )   div[part=step-title]::after{
      position: absolute;
      top: 16px;
      left: 100%;
      margin-left:10px;
      display: block;
      width: 9999px;
      height: 1px;
      background:var(--step-line-color,#f0f0f0);
      content: "";
   }
   div[part=step-description]{
      color: rgba(0,0,0,.85);
      white-space: normal;
      max-width:400px;
      box-sizing:border-box;
   }
   :host([direction=vertical]) div[part=step-description]
   {
      max-width:none;
   }
   .tail{
    display:none;
   }
   :host([direction=vertical]) .tail{
      position: absolute;
      display:block;
      left:16px;
      width:1px;
      height:100%;
    }
    :host([direction=vertical]) div[part=icon-part]{
      margin-right: 16px;
      float:left;
    }
    :host([direction=vertical]:not([last])) .tail::after{
      display: inline-block;
      width: 100%;
      height: 100%;
      background: #f0f0f0;
      border-radius: 1px;
      transition: background-color .3s;
      background-color:var(--step-border-color,rgba(0,0,0,.25));
      content:"";
    }
    :host([direction=vertical]) div[part=step-content]{
          display: block;
          min-height:46px;
    }
`;
