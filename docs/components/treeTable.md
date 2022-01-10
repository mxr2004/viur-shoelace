# Table

[component-header:sl-table]

The Table component enables TreeTable and needs to set the treeConfig property

```html preview
<div style='margin:10px'>
    <sl-checkbox id='checkProp'>select name &nbsp;</sl-checkbox>
    <sl-checkbox id='checkDown' checked>Cascading down&nbsp;</sl-checkbox>
    <sl-checkbox id='checkUp' >Cascading up&nbsp;&nbsp;</sl-checkbox>
    <sl-button onclick="javascript:table.checkValue=null;
     document.querySelector('#checkValueDiv').textContent=table.checkValue?JSON.stringify(table.checkValue):'';"> clear</sl-button>
    <style>
        sl-checkbox  + sl-checkbox {
            margin-right:20px;
        }
    </style>
</div>
<div style='margin:10px;height:28px;overflow:hidden;line-height:28px;' id='checkValueDiv'></div>
<sl-table id='tableDIV' >
    <sl-column type="index"  label='#'  align='center' min-width='40' ></sl-column><!-- type='index' Built-in serial number column, if not satisfied, you can set the column.renderCell property to achieve custom rendering -->
    <sl-column type='checkbox'  label='#'  align='center' ></sl-column><!--type='checkbox' logical column， -->
    <sl-column type='radio'  label=''  align='center' ></sl-column><!--type='radio' logical column， -->
    <sl-column field='name' sort-able resize-able label='Name' width='100%'  align='left' min-width='200' ></sl-column>
    <sl-column field='size' sort-able label='size' align='right'  resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='date' sort-able label='Date'resize-able  min-width='100' order=3 agile-cell='right'></sl-column>
    <sl-column field='type' sort-able label='Type' resize-able min-width='200' order='1'  ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    table.cacheKey='tableDIV';
    table.treeConfig={};
    const dateList=[
        { id: 1000, name: 'Javascript 1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
            id: 1005,
            name: 'Test2',
            type: 'mp4',
            size: null,
            close:false,
            date: '2021-04-01',
                children: [
                { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, name: 'Javascript 4', type: 'html', size: 600,close:false, date: '2021-04-01' },
                {
                    id: 10053,
                    name: 'Javascript 96',
                    type: 'avi',
                    size: null,
                    date: '2021-04-01',
                    children: [
                    { id: 24330, name: 'Javascript 5', type: 'txt', size: 25, date: '2021-10-01' },
                    { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                    { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                    ]
                }
                ]
            },
            { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
            { id: 24555, name: 'Javascript 9', type: 'avi', size: 224, date: '2020-10-01' }
        ];
        table.checkValue=[dateList[0]];
    table.dataSource=dateList;
    table.fixedColumns=2;
    window.table=table;
    table.tableHeight='400px';

    //Customize some data, cannot be selected
    table.checkDisablePropField='disabled';//Or rowData.disabled per row, it cannot be selected
    table.checkDisablePropField=(rowData)=>{
        return rowData.id==0;
    }

    table.addEventListener('sl-table-check-before-change',(event)=>{
        console.log(event.type,event.detail.checkbox);
     });

    table.addEventListener('sl-table-check-change',(event)=>{
        let value=event.detail.value;
        console.log(event.type,value);
        document.querySelector('#checkValueDiv').textContent=table.checkValue?JSON.stringify(table.checkValue):"";
    });
    document.querySelector('#checkValueDiv').textContent=table.checkValue?JSON.stringify(table.checkValue):"";
    document.querySelector('#checkProp').addEventListener('sl-change',(event)=>{
        let checkEl=event.target;
        table.checkPropField=checkEl.checked?'name':undefined;
    });
    document.querySelector('#checkDown').addEventListener('sl-change',(event)=>{
        let checkEl=event.target;
        table.checkTreeCasecadeDown=checkEl.checked;
    });
    document.querySelector('#checkUp').addEventListener('sl-change',(event)=>{
        let checkEl=event.target;
        table.checkTreeCasecadeUp=checkEl.checked;
    });
</script>
```

The Table component enables TreeTable lazy loading, and virtual scroll loading
```html preview
<sl-table id='tableDIV2' border>
    <sl-column type="index"  label='#'  align='center' min-width='60'  ></sl-column>
    <sl-column type="checkbox"  label='#'  align='center' min-width='40' ></sl-column>
    <sl-column field='name'  sort-able resize-able label='Name' width='100%' max-width='600' align='left' min-width='200' ></sl-column>
    <sl-column field='size' sort-able label='size' align='right' resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='date' sort-able label='Date'resize-able  min-width='100' order=3 agile-cell='right'></sl-column>
    <sl-column field='type' sort-able label='Type'  resize-able min-width='200' order='1'  ></sl-column>
</sl-table>
<script >
    const table2=document.querySelector('#tableDIV2');
    table2.treeConfig={treeNodeColumn:'name',lazy:true ,hasChildProp:'hasChild'};
    
    table2.cacheKey='treeTable';
    table2.treeLoadingNodeMethod=(cellContext)=>{
        let rowData=cellContext.rowData;
        let name=rowData.name;

        let result=[];
        for(let i=0;i<200;i++){
            let sub={name:' ajax chapter'+(Math.random()+'').substring(2,7),type:'mp3',size:rowData.size+(i*1000),date:'2028-08-11',hasChild:Math.random()>0.6};
            if(table2.checkValue&&table2.checkValue.includes(rowData)){
                table2.checkValue.push(sub);
            }
            result.push(sub); 
        }  
        return new Promise((resolve)=>{
            window.setTimeout(()=>{
                resolve(result);
            },300)
        } );
    };
    const dateList=[
        { id: 1000, name: 'Javascript 1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
            id: 1005,
            name: 'LitElement',
            type: 'mp4',
            size: null,
            close:false,
            date: '2021-04-01',
                children: [
                { id: 24300, name: 'LitElement 1', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, name: 'LitElement 2', type: 'html', size: 600, date: '2021-04-01' },
                {
                    id: 10053,
                    name: 'LitElement 3',
                    type: 'avi',
                    size: null,
                    close:false,
                    date: '2021-04-01',
                    children: [
                    { id: 24330, name: 'LayLoader 01 ', type: 'txt', size: 25, date: '2021-10-01', hasChild:true },
                    { id: 21011, name: 'LayLoader 02', type: 'pdf', size: 512, date: '2020-01-01' ,hasChild:true },
                    { id: 22200, name: 'LayLoader 03', type: 'js', size: 1024, date: '2021-06-01', hasChild:true}
                    ]
                }
                ]
            },
            { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' , hasChild:true},
            { id: 24555, name: 'Lit Element', type: 'avi', size: 224, date: '2020-10-01', hasChild:true }
        ];
   
    //Enable virtual scrolling
    table2.enableVirtualScroll=true;
    table2.stripe=true;//斑马线
    //virtual scroll line height
    table2.virtualItemHeight=45;
    table2.customStyle=`div.tdWrap{height:28px;}`;//control unit height
    table2.dataSource=dateList;
    table2.fixedColumns=3;
    window.table2=table2;
    table2.treeNodeNoWrap=false;
    table2.tableLayoutFixed=true;
    table2.tableMaxHeight=400;
</script>
```


```javascript

/**
 * Define tabular data as tree type
 */
export type TreeConfig = {
  //Tree child node attribute, must be 'chidren';
  // childrenProp:'children';
  //tree node id attribute
  idProp?: string;
  //tree node indent
  indent?: number;
  //For nodes of the same level, only one can be expanded at a time, to be implemented
  accordion?: boolean;
  //whether to show the root node
  //includeRoot: boolean;
  //Whether to lazy load by default
  lazy?: boolean;
  //Specify the column field where treeNodeColumn is located
  treeNodeColumn: string;
  //When lazy loading, which attribute identifies a child node
  hasChildProp?: string;
};
export const defaultTreeConfig: TreeConfig = {
  idProp: 'id',
  //childrenProp:'children',
  indent: 14,
  accordion: false,
  lazy: false,
  treeNodeColumn: 'name',
  hasChildProp: 'hasChild'
};
```