import { html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { castDate, getDaysPanel, isEqualsDate, parseDate } from '../../internal/date.util';
import resourceLocal from '../../internal/resourceLocal';
import { watchProps } from '../../internal/watchProps';
import { addEvent, animateCss, onEvent } from '../../utilities/common';
import { getResouceValue } from '../../utilities/getResouce';
import styles from './date-panel.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-example
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@resourceLocal()
@customElement('sl-date-panel')
export default class SlDatePanel extends LitElement {
  static styles = styles;

  /** 选中日期 */
  @property({type:String,attribute:'value'}) value ?:string;
  /**选择模式，年，月，日 */
  @property({type:String,attribute:'mode'}) mode:'year'|'month'|'date'='date';
  /** 最小值 */
  @property({type:String,attribute:false}) min?:string;
   /** 最大值 */
  @property({type:String,attribute:false}) max?:string;
 
  get maxDate() {
    return this.max !== undefined ? castDate(this.max) : null;
  }
  get minDate() {
      return this.min !== undefined ? castDate(this.min) : null;
  }

  @state()
  private innerMode:'year'|'month'|'date'='date';
  @state()
  private _year:number;
  @state()
  private _month:number;

  /** 内部 value 所对应的日期 */
  @state()
  valueDate?:Date;

  /** 内部：维护切换上下面板后显示的时间 */
  @state()
  private innerDate:Date=new Date();
  @watchProps(['value','mode'])
  watchSelectModeChange() {
    this.innerMode=this.mode;
    let dateTemp=castDate(this.value);
    if(dateTemp){
      this.value=parseDate(this.value as string,this.mode);
      this.innerDate=new Date(+dateTemp);
      this.valueDate=dateTemp;
    }
    if(!this.innerDate){
      this.innerDate=new Date();
    }
    this._year=this.innerDate.getFullYear();
    this._month=this.innerDate.getMonth();
  }
  private get innerDisplayDateStr( ):string {
    const date=this.innerDate;
    return getResouceValue('date.showHeaderStr')(date,this.innerMode);
  }
  /** 渲染顶部 */
  private renderHeader(){
    return html`<button class='button' part='prevButton' id='prevButton'>
      <svg class="icon" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
      </button>
      <span class=' date-switch' part='date-switch'>${this.innerDisplayDateStr}</span>
      <button  class="button" id="nextButton"  part='nextButton'>
          <svg class="icon" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path></svg>
      </button>
      `;
  }
  /** 渲染 周和月的天 */
  private renderDatePanel(){
    const weekArray=getResouceValue('date.weekDays') as Array<string>;
    const weeks=html`<div class='date-week'>
        ${weekArray.map(item=> html`<span class='date-week-item' part='week-head'>${item}</span>`)}
    </div>`;
      let minDate = this.minDate;
      const maxDate = this.maxDate;
      const dateArray=getDaysPanel(this._year,this._month+1);
      const dateResult=[];
      for(let i=0,j=dateArray.length;i<j;i++){
        const tempDate=dateArray[i];
        let other=this._year !== tempDate.getFullYear() || this._month !== tempDate.getMonth();
        const disabled = (minDate != null && tempDate < minDate) || (maxDate != null && tempDate > maxDate);
        const isCurent=this.innerDate&&isEqualsDate(tempDate,this.valueDate,'date');
        dateResult.push(
          html`<button part='item-date' class='date-button date-day-item ${other?'other':''} ${isCurent?'current':''} '
         .date=${tempDate} .disabled=${disabled} >${tempDate.getDate()}</button>`);
      }
      const dates=html`<div class='date-body'>${dateResult}</div>`;
      return html`${weeks}${dates}`;
  }
  /** 渲染 年选月Body */
  private renderMonthBody()  {
    const current = this.innerDate;
    if(current){
      const year = current.getFullYear();
      const minDate = this.minDate;
      const maxDate = this.maxDate;
      const month=getResouceValue('date.months') as Array<string>;
      return month.map((value: string, index: number) => {
          const date=new Date(year,index);
          let disabled = minDate != null && (year < minDate.getFullYear() || (minDate.getFullYear() === year && index < minDate.getMonth()));
          if (!disabled) {
              disabled = maxDate != null && (year > maxDate.getFullYear() || (maxDate.getFullYear() === year && index > maxDate.getMonth()));
          }
          return html`<button part='item-month' .date=${date}  class="date-button date-day-item ${isEqualsDate(date,this.valueDate,'month')?'current':''}"  ?disabled=${disabled} >${value}</button>`;
      });
    }
    return nothing;
}

 /** 渲染 年选月Body */
 private renderYearBody(){
  const current = this.innerDate;
  const result = [];
  if(current){
    const nv = current.getFullYear();
    const n = parseInt(String(nv / 20));
    const year = n * 20;
    const minDate = this.minDate;
    const maxDate = this.maxDate;
    for (let i = year, j = year + 20; i < j; i++) {
        const date=new Date(i,0,1);
        let disabled = minDate != null && (i < minDate.getFullYear());
        if (!disabled) {
            disabled = maxDate != null && (i > maxDate.getFullYear());
        }
        result.push(html`<button part='item-year' .date=${date} class="date-button date-day-item ${isEqualsDate(date,this.valueDate,'year')?'current':''}"  ?disabled=${disabled} >${i}</button>`);
    }
  }
  return result;
}
firstUpdated(map:PropertyValues){
  super.firstUpdated(map);
  const baseDIV=this.renderRoot.querySelector('div[part=base]') as HTMLElement;
  const panelBase=this.renderRoot.querySelector('div[part=panel-base]') as HTMLElement;
  onEvent(baseDIV, 'button[part=prevButton],button[part=nextButton], .date-day-item','click',(event:Event)=>{
     const el=(event as any).delegateTarget as HTMLElement;
     if(el.matches('button[part=prevButton]')){
        const date=this.innerDate;
        if(this.mode=='date'){
          date.setMonth(date.getMonth()-1);
        }else if(this.mode=='month'){
          date.setFullYear(date.getFullYear()-1);
        }else if(this.mode=='year'){
          date.setFullYear(date.getFullYear()-20);
        }
        panelBase.querySelector('.date-day-item.current')?.classList.remove('current');
        animateCss(panelBase,'animate-left').then(()=>{
          this.innerDate=new Date(+date);
        })
     }else if(el.matches('button[part=nextButton]')){
        const date=this.innerDate;
        if(this.mode=='date'){
          date.setMonth(date.getMonth()+1);
        }else if(this.mode=='month'){
          date.setFullYear(date.getFullYear()+1);
        }else if(this.mode=='year'){
          date.setFullYear(date.getFullYear()+20);
        }
        panelBase.querySelector('.date-day-item.current')?.classList.remove('current');
        animateCss(panelBase,'animate-right').then(()=>{
          this.innerDate=new Date(+date);
        })
     }else if(el.matches('.date-day-item')){
        this.value=parseDate((el as any).date as Date,this.mode);
    }
  });
  addEvent(this,'keydown',(event:KeyboardEvent)=>{
    const code=event.key;
    let date=this.valueDate;
    if(!date){
      date=this.innerDate;
    }
    let set=0;
    switch(code){
        case 'ArrowDown':
          set=1;
          if(this.innerMode=='year'){
            date.setFullYear(date.getFullYear()+5);
          }else if(this.innerMode=='month'){
            date.setMonth(date.getMonth()+4);
          }else if(this.innerMode=='date'){
            date.setDate(date.getDate()+7);
          }
        break;
        case 'ArrowRight':
          set=1;
          if(this.innerMode=='year'){
            date.setFullYear(date.getFullYear()+1);
          }else if(this.innerMode=='month'){
            date.setMonth(date.getMonth()+1);
          }else if(this.innerMode=='date'){
            date.setDate(date.getDate()+1);
          }
        break;
       case 'ArrowUp':
          set=1;
          if(this.innerMode=='year'){
            date.setFullYear(date.getFullYear()-5);
          }else if(this.innerMode=='month'){
            date.setMonth(date.getMonth()-4);
          }else if(this.innerMode=='date'){
            date.setDate(date.getDate()-7);
          }
        break;
       case 'ArrowLeft':
          set=-1;
          if(this.innerMode=='year'){
            date.setFullYear(date.getFullYear()-1);
          }else if(this.innerMode=='month'){
            date.setMonth(date.getMonth()-1);
          }else if(this.innerMode=='date'){
            date.setDate(date.getDate()-1);
          }
        break;
        default:
          break;
    }
    if(set!=0&&date){
      const dateStr=getResouceValue('date.showHeaderStr')(this.innerDate,this.innerMode) as string;
      const newDateStr=getResouceValue('date.showHeaderStr')(date,this.innerMode) as string;
      event.preventDefault();
      if(newDateStr!=dateStr){
        panelBase.querySelector('.date-day-item.current')?.classList.remove('current');
        animateCss(panelBase,set>0?'animate-right':'animate-left').then(()=>{
          this.value=parseDate(date as Date,this.mode);
        })
      }else{
        this.value=parseDate(date as Date,this.mode);
      }
    }
  })
}
  render() {
    return html`<div class='date-base' part='base'>
         <div class='date-head'>${this.renderHeader()}</div>
         <div part='panel-base'>
            ${this.innerMode=='date'? html`<div part='date-date' class='date-panel date-date '>${this.renderDatePanel()}</div>`:nothing }
            ${this.innerMode=='month'? html`<div part='date-month' class='date-panel date-month'>${this.renderMonthBody()}</div>`:nothing }
            ${this.innerMode=='year'? html`<div part='date-year' class='date-panel date-year '>${this.renderYearBody()}</div>`:nothing }
         </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-date-panel': SlDatePanel;
  }
}
