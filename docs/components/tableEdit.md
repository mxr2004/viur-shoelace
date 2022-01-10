# Table

[component-header:sl-table]

Table components 

```html preview
<div style='margin:10px'>
    <sl-button id='add'>add</sl-button>
    <sl-checkbox id='accordion' value=10 checked>accortion</sl-checkbox>
    <sl-button id='editMode'>edit mode：row</sl-button>
    <sl-select id='trigger'  style='display:inline-block'>
        <sl-menu-item value='click'>click</sl-menu-item>
        <sl-menu-item value='dblclick'>dblclick</sl-menu-item>
        <sl-menu-item value='mouseover'>mouseover</sl-menu-item>
        <sl-menu-item value='contextmenu'>other events such as：contextmenu</sl-menu-item>
    </sl-select>
</div>

<sl-table id='tableDIV' border >
     <sl-column id='index' type="index" align='center' field='index' label='index'   align='left' min-width='80' ></sl-column>
    <sl-column field='name'   label='Name' resize-able  align='left' width='200' ></sl-column>
    <sl-column field='role'  label='Role' resize-able width=150    ></sl-column>
    <sl-column field='sex'  label='Sex'  resize-able  width=150  agile-cell='right'></sl-column>
     <sl-column field='date'   label='Date' resize-able   width=150    agile-cell='right'></sl-column>
    <sl-column field='address'  label='address'  width=180  resize-able  ></sl-column>
    <sl-column field='date-month'  label='Date-Month' resize-able  width=130    ></sl-column>
    <sl-column field='description'  label='描述'  width=100    ></sl-column>
    <sl-column field='check'  label='multi-select' resize-able  width=150    ></sl-column>
    <sl-column field='multi-check'  label='multi-checkbox' resize-able  width=150    ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    const dateList=[
                { id: 10001, name: 'Test1', role: 1,check:[1],'multi-check':[2], sex: 2, age: 28,date:'2018-01-01', address: 'Javascript Test' },
                { id: 10008, name: 'Test8', role: 2, checke:[2], sex: 1, age: 35, address: 'Javascript' },
                { id: 10008, name: 'Test10', role: 2, checke:[3], sex: 1, age: 35, address: 'Javascript' }
                
                ] ;
        for(let i=0,j=300000;i<j;i++){
            dateList.push({name:'new'+(i+4)});
        }
   
    table.dataSource=dateList;
    table.enableVirtualScroll=true;
    table.virtualItemHeight=48;
    /*Ensure non-editing, consistent with the height of the editing line, otherwise the page will be loaded virtually, and Cell Edit will jump*/
    table.customStyle=`
        .tdWrap {
            height:31px;
        }
        input{
            width:80px;
            height:28px;
            outline:none;
            border: solid var(--sl-input-border-width)  var(--sl-input-border-color);
        }
    `;
    //Listen to the last edited cell
    table.addEventListener('sl-cell-edit-before-change',(event)=>{
        console.log('lastEdit===> field=',event.detail.context.column.field +' rowIndex='+event.detail.context.rowIndex,event.detail.td);
        //event.preventDefault can prevent sl-table-edit-cell-into，sl-table-edit-cell-active event
    });

    //Monitor when the TD enters the editing state
    table.addEventListener('sl-cell-edit-start',(event)=>{
       console.log('intoing edit cell===> field=',event.detail.context.column.field +' rowIndex='+event.detail.context.rowIndex ,event.detail.td);
    });


    //Monitor when the TD enters the editing state
    table.addEventListener('sl-cell-edit-active',(event)=>{
       console.log('active cell===> field=',event.detail.context.column.field +' rowIndex='+event.detail.context.rowIndex ,event.detail.td);
    });

    
    
    document.querySelector('sl-column[field=role]').items=[{id:1,name:'project manager'},{id:2,name:'test'},{id:3,name:'implement'}];
    document.querySelector('sl-column[field=role]').edit='select';

    document.querySelector('sl-column[field=check]').items=[{id:1,name:'A'},{id:2,name:'B'},{id:3,name:'C'}];
    document.querySelector('sl-column[field=check]').edit='multi-select';

      document.querySelector('sl-column[field=multi-check]').items=[{id:1,name:'A'},{id:2,name:'B'},{id:new Date(),name:'C'}];
    document.querySelector('sl-column[field=multi-check]').edit='multi-checkbox';



    document.querySelector('sl-column[field=date]').edit='date';
    document.querySelector('sl-column[field=date]').type='date';

    document.querySelector('sl-column[field=date-month]').edit='date';
    document.querySelector('sl-column[field=date-month]').type='date-month';

    document.querySelector('sl-column[field=address]').edit='input';
    document.querySelector('sl-column[field=name]').edit='input';

    //Editing of custom columns
    document.querySelector('sl-column[field=description]').edit=({rowData,column})=>{
        let value=rowData[column.field];
        if(value==undefined|| value==null){
            value='';
        }
        return html`<input .value=${value} @input=${(event)=>rowData[column.field]= event.target.value} />`;
    }
    table.fixedColumns='2,1';
    table.editAccordion=true;
    table.editEnable=true;
    table.tableHeight=500;
    window.table=table;
    //Enable TD multiline dots
    table.enableCellBox=true;
    //TD 内容超过1 行,则...
    table.cellBoxLines=1;
    
    document.querySelector('sl-column[field=sex]').items=[{id:2,name:'Man'},{id:1,name:'Women'}];
    document.querySelector('sl-column[field=sex]').edit='select';
    
    document.querySelector('#add').addEventListener('click',()=>{
        table.dataSource=[{},...table.dataSource]; //添加一行新数据
        //If it is accordion mode, set the first row of data as the edit row, otherwise add the first row of data to the edit row data
        table.currentEditRow=table.editAccordion?[table.dataSource[0]]: [...table.currentEditRow,table.dataSource[0]];
        table.scrollDiv.scrollTop=0;
    });
    document.querySelector('#accordion').addEventListener('sl-change',()=>{
        table.editAccordion=!table.editAccordion;
    });
    document.querySelector('#trigger').value='click';
    document.querySelector('#trigger').addEventListener('sl-change',()=>{
        table.editTrigger=document.querySelector('#trigger').value;
    });


    document.querySelector('#editMode').addEventListener('click',()=>{
        //Edit mode row->column-cell and return to row;
        table.editMode=table.editMode=='row'?'column':(table.editMode=='column'?'cell':'row');
        document.querySelector('#editMode').innerText="edit mode"+table.editMode;
    });

    
</script>
```
### Table Edit related properties
  `enableEdit` Enable editing  
  `editMode` edit mode, support 'row','column','cell'  
  `editAccordion`：true|false :true Indicates that only one row or column can be edited. 
  `editTrigger`：What TD event, go to edit trigger For example 'click','mouseover'

### Table Edit related events
  `sl-cell-edit-commit`：The cell has a built-in editor and a value change is triggered. 
  `sl-cell-edit-before-change`：Emmit when before when table  edit cell  change。 
  `sl--cell-edit-start`：The cell starts to enter the edit state (not triggered if the Cell is in the edit state).    
  `sl--cell-edit-active`：The cell is triggered after entering edit mode, at this time column.edit has been fumigated You can get td and cellContext data through event.detail .  
  `order`:sl-cell-edit-before-change->sl--cell-edit-start->sl--cell-edit-active
### Table column Edit properties
  `edit`:Specify the editor for the cell, the built-in ones are'input','text','date','select','multi-select', 'multi-checkbox'  
  `type`: 'date','date-month','date-year',with 'edit=date', edit and set rowData[field], the values are '2020-01-20', '2020-01', '2020', etc.
  `edit`: 'select' behaves as select, which requires the column's `items` attribute to be set similarly to rowData[field]=2 after editing 
  `edit`: 'multi-select' behaves as select, which requires the `items` attribute of the column, edited similarly to set rowData[field]=[1,2,'3'];  
  `edit`: 'multi-checkbox' is represented as a checkbox, which requires the `items` attribute of the column, which is edited similarly to set rowData[field]=[1,2];  
  `edit`: You can receive `CelllContext` as a parameter for a function that returns an HtmlTemplate to implement a custom column editor.
  `Customize the built-in global cell editor`:You can call `registDefaultEditor` 
  ```typescript
  const registDefaultEditor: (editKey: string, editTemplate: (context: CellContext) => TemplateResult<1>) => void;
  ```



