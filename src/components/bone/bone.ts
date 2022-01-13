import {LitElement, html, TemplateResult,PropertyValues} from 'lit';
import {customElement, property, query, queryAll} from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { state } from 'lit/decorators.js';
import styles from './bone.styles';
import {pullAt,unset} from 'lodash';


/**
 * @since 2.0
 * @status experimental
 * @viur 0.5
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
@customElement('sl-bone')
export default class SlBone extends LitElement {
  static styles = styles;

  @queryAll('.lang-chooser') langChooser: HTMLElement[];

  @state() boneValue = "";
  @state() boneWidgetCollection:any = "";
  @state() languageList = []


  /** Wenn set the bone contains multiple values */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /** Wenn set the bone is readOnly */
  @property({ type: Boolean, reflect: true, attribute: "read-only" }) readOnly = false;

  /** Wenn set the bone musst have a valid value */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Bones start value */
  @property({ type: String, reflect: false }) value ="";

  /** id of value widget */
  @property({ type: String, reflect: true}) widget = "value";


  /** Can take a Array of Languages */
  @property({ type: String, reflect: true }) languages = "";

  /** active language index */
  @property({ type: Number, reflect: true, attribute: 'active-language' }) activeLanguage = 0;

  @watch('languages')
  convertLanguages(){
    // convert JSON list to Array
    if (!this.languages){
      this.languageList = []
      return 0
    }

    try{
      this.languageList =JSON.parse(this.languages.replaceAll("'",'"'))
    }catch(e){
      console.log(e)
      this.languageList = []
    }

  }

  @watch('value')
  convertValue(){
    let val:any = ""
    if (this.languages || this.multiple){
      // requires structured data
      try{
         val = JSON.parse(this.value.replaceAll("'",'"'))
      }catch {
        val = ""
      }

    }else{
      val = this.value
    }

    // language but value no lang wrapper
    // language and multiple but value is not array
    if (this.languages && val.constructor !== Object){
      if (this.multiple && val.constructor !== Array){
        if (!val){
          val = []
        }else{
          val = [val]
        }

      }

      this.convertLanguages()
      let _val = {}
      for(let i of this.languageList){
        _val[i] = val
      }
      val = _val

    //language and multiple and we got a language wrapper but vals not multiple
    }else if (this.languages && this.multiple && val.constructor === Object){
      for(let i in val){
        if (val[i].constructor !== Array){
          val[i] = [val[i]]
        }
      }
    }

    //language and not multiple, Convert values back to string
    else if (this.languages && !this.multiple && val.constructor === Object){
      for(let i in val){
          val[i] = JSON.stringify(val[i])
      }
    }

    //multiple but value is not Array
    if (!this.languages && this.multiple && val.constructor !== Array){
      if (!val){
        val = []
      }else{
        val = [JSON.stringify(val)]
      }

    }

    this.boneValue = val
  }

  generateBoneWidget(val,lang,index){
    let boneWidget = [];
    if(!this.shadowRoot.querySelector('slot')){
      return null
    }

    if (this.boneWidgetCollection){
     if (lang && index!==null && this.boneWidgetCollection[lang] && Object.keys(this.boneWidgetCollection[lang]).length> index){
       return this.boneWidgetCollection[lang][index]
     }
     else if( lang && index===null && this.boneWidgetCollection[lang]){
       return this.boneWidgetCollection[lang]
     }
     else if( !lang && index!==null && this.boneWidgetCollection.length > index){
       return this.boneWidgetCollection[index]
     }
     else if( !lang && index===null){
       return this.boneWidgetCollection
     }
   }

    let bone_template = this.shadowRoot.querySelector('slot').assignedNodes();

    for(let i in bone_template){
      let tpl = bone_template[i].cloneNode()

      if (tpl.nodeType!==Node.TEXT_NODE && tpl.getAttribute('id') === this.widget){
         tpl.value = val
         tpl.dataset.lang = lang
         tpl.dataset.index = index
         tpl.addEventListener("sl-input", this.updateValues)
      }

      boneWidget.push(tpl)
    }

     if (lang && index!==null){
       if (!this.boneWidgetCollection){
         this.boneWidgetCollection = {}
       }
       if (!this.boneWidgetCollection || !(lang in this.boneWidgetCollection)){
         this.boneWidgetCollection[lang]=[boneWidget]
       }else{
         this.boneWidgetCollection[lang][index] = boneWidget
       }
     }
     else if( lang && index===null){
       if (!this.boneWidgetCollection){
         this.boneWidgetCollection = {}
       }
       this.boneWidgetCollection[lang] = boneWidget
     }
     else if( !lang && index!==null){
       if (!this.boneWidgetCollection){
         this.boneWidgetCollection = []
      }
       this.boneWidgetCollection[index] = boneWidget
     }
     else if( !lang && index===null){
       this.boneWidgetCollection = boneWidget
     }

    return boneWidget
  }


  updateValues = (e)=>{
    let lang = e.target.dataset.lang === "null"?null:e.target.dataset.lang
    let index = e.target.dataset.index === "null"?null:e.target.dataset.index

   if (lang && index===null){
      this.boneValue[lang][index] = e.target.value
   }
   else if( lang && index!==null){
     this.boneValue[lang] = e.target.value
   }
   else if( !lang && index!==null){
     this.boneValue[index] = e.target.value
   }
   else if( !lang && index===null){
     this.boneValue = e.target.value
   }

   this.value = JSON.stringify(this.boneValue)
  }

  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
  }

  handleSlotChange(){
    this.requestUpdate()
  }

  addNewValue(e){
    console.log(e.target.dataset.lang)
    if (e.target.dataset.lang){
       this.boneValue[e.target.dataset.lang].push('')
    }else{
      this.boneValue.push('')
    }
    this.value = JSON.stringify(this.boneValue)
    //this.requestUpdate()
  }

  removeValue(e){
    let lang = e.target.dataset.lang === undefined?null:e.target.dataset.lang
    let index = e.target.dataset.index

    if (lang) {
      pullAt(this.boneValue[lang],index)
      pullAt(this.boneWidgetCollection[lang],index)
    }else{
      pullAt(this.boneValue,index)
      pullAt(this.boneWidgetCollection,index)
    }

    this.value = JSON.stringify(this.boneValue)
    this.requestUpdate()
  }

  toggleLanguage(e){
    if(!e.target.dataset.index){
      return 0
    }
    this.activeLanguage = parseInt(e.target.dataset.index)
  }

  isValid(){
    if (this.required){
      if (this.languages && this.multiple){

      }else if (this.languages){

      }else if (this.multiple){

      }else{
        if (!this.boneValue){
          return false
        }
      }
    }
    return true
  }

  render() {
    return html`
      <div class="bone">

        <!--Language chooser -->
        ${this.languageList.length>0 ? html`
           <sl-tab-group variant="flap">
            ${this.languageList.map((key, index) => html`
                <sl-tab slot="nav" panel="${index}_panel" @click="${this.toggleLanguage}" data-index="${index}">${key}</sl-tab>
            `)}

             ${this.languageList.map((key, index) => html`
                <sl-tab-panel name="${index}_panel">
                  ${this.multiple?html`
                    <sl-button-group class="entry-actions ${this.activeLanguage === index?'is-active':''}">
                       <sl-button size="small" outline variant="success" data-lang="${key}" @click="${this.addNewValue}">
                         <sl-icon name="plus" class="button-icon"></sl-icon>
                       </sl-button>
                    </sl-button-group>`:``}

                 <div class="entry entry-language">
                   ${this.multiple?html`
                    ${this.boneValue[key].map( (val, index) => html`
                      <!--multi language, multiple -->
                        <div class="entry-value-multiple">${this.generateBoneWidget(val,key,index)}
                          <sl-button size="small" outline variant="danger" @click="${this.removeValue}" data-lang="${key}" data-index="${index}">
                            <sl-icon name="delete" class="button-icon"></sl-icon>
                          </sl-button>
                        </div>
                      `)}
                    `:
                    html`
                      <!--multi language, no multiple -->
                      ${this.generateBoneWidget(this.boneValue[key],key,null)}
                    `}

                 </div>

                </sl-tab-panel>
             `)}
          </sl-tab-group>
          `:
          html`
           ${this.multiple?html`
              <!--only multiple -->
             <sl-button size="small" outline variant="success" @click="${this.addNewValue}"><sl-icon name="plus" class="button-icon"></sl-icon></sl-button>`:``}
            <div class="entry">
                ${this.multiple?html`
                ${this.boneValue.map( (val, index) => html`
                    <div class="entry-value-multiple">${this.generateBoneWidget(val,null, index)}
                      <sl-button size="small" outline variant="danger" @click="${this.removeValue}" data-index="${index}"><sl-icon class="button-icon" name="delete"></sl-icon></sl-button>
                    </div>
                `)}
              `:
              html`
                <!--not multiple, no languages -->
                ${this.generateBoneWidget(this.boneValue,null,null)}
              `}
             </div>
          `
        }

      </div>

      <slot style="display: none" @slotchange=${this.handleSlotChange}> </slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-bone': SlBone;
  }
}
