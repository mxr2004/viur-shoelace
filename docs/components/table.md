# Table

[component-header:sl-table]

Table components

```html preview
<div id='checkBox' style='margin:10px 0'>
    <sl-button size='small'  id='queSheng'>restore column configuration</sl-button>
    Select column configuration
    <sl-checkbox checked >name</sl-checkbox>
    <sl-checkbox checked>role</sl-checkbox>
    <sl-checkbox checked>sex</sl-checkbox>
    <sl-checkbox checked >address</sl-checkbox>
</div>
<sl-table id='tableDIV' cache-key='one'>
     <sl-column id='index' type='index' label='index'   align='center' min-width='70' ></sl-column>
     <sl-column id='checkbox' type='checkbox' align='center' ></sl-column>
    <sl-column field='expaned' label='#'   align='left' min-width='40' ></sl-column>
    <sl-column field='name' sort-able resize-able label='Name'   align='left' min-width='200' ></sl-column>
    <sl-column field='role'  label='Role' resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='sex' sort-able label='Sex'resize-able   order=3 agile-cell='right'></sl-column>
    <sl-column field='address' sort-able label='address' resize-able  order='1'  ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    const dateList=[
                { id: 10001, name: 'Test1', role: 'Test1', sex: 'Man', age: 28, address: 'Javascript' },
                { id: 10001, name: 'Test1', role: 'Test2', sex: 'Man', age: 28, address: 'Javascript From entry to abandonment' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Javascript' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Javascript' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Javascript' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Javascript' }];
     
    
    for(let i=0,j=20000-dateList.length;i<j;i++){
        dateList.push( { id: i, name: 'Test add'+i, role: 'Test1', sex: Math.random()>0.5?'Man':'Women', age: 28, address: 'Javascript'+i });
    }
    table.tableHeight=500;
    table.fixedColumns='3';


    //Enable virtual scrolling
    table.enableVirtualScroll=true;
    //virtual scroll line height
    table.virtualItemHeight=45;
    table.enableCellBox=true;
    //control unit height

    table.dataSource=dateList;
    window.table=table;
    
    
    
    table.addEventListener('sl-table-before-sort',(event)=>{
        console.log(event.detail.column.label +' sortValue '+JSON.stringify(event.detail.sortValue));
    });
     table.addEventListener('sl-table-sort',(event)=>{
        console.log(event.detail.column.label +' sortValue '+JSON.stringify(event.detail.sortValue));
    });
    const queSheng=document.querySelector('#queSheng');
    queSheng.addEventListener('click',(event)=>{
       restoreTableDefault(table);
       restoreTableDefault(table2);
    });
    onEvent(document.querySelector('#checkBox'),'sl-checkbox','sl-change', (event)=>{
        const el=event.delegateTarget;
        const field=el.textContent;
        table.querySelector(`sl-column[field=${field}]`).hidden=!el.checked;
    })
   //Specifies which column the icon for the row extension is in
   table.expandColumn='expaned';
   //Specify that only one row of data can be expanded at a time, other expanded rows will be closed
     table.expandAccordion=true;

    //Specifies that line expansion is lazy mode
    table.expandLazy=true;
    table.expandLazyLoadMethod=(rowData)=>{
        let result={
            columns:['a','b','c'],
            dataSource:[[1,2,3],[4,5,6],[7,8,9]]
        }
         return new Promise((resolve)=>{
            window.setTimeout(()=>{
                resolve(result);
            },300)
        } );
    }

    //The line extension render function that must be configured,
    //The first parameter is the Row Context, and the second parameter is all the columns
    //If it is lazy mode, the third parameter is the return result of the loading method: lazy Load Data
    table.expandRowRender=({rowData},columns,layLoadData)=>{
        let lazyResult=layLoadData?html`lazy load data：${JSON.stringify(layLoadData)}`:'';
        let result=html`<tr><td colspan=${columns.length} >
            <div style=' width:80%;display:grid;grid-template-columns: repeat(2,1fr);'>
            ${columns.map(item=>{
                return html`${rowData[item.field]?html`<span>${rowData[item.field]}</span>`:''}`;
            })}
            <span style='grid-column:span 2'>${lazyResult}<span>
            </div>
        </td></tr>`;
        return result;
    };

</script>
```


### Multi-column header, support column fixed, header table TFoot fixed, sorting, events, front-end cache cache column order, width, whether to display demo

```html preview
<sl-table id='tableDIV2' border cache-key='two'>
    <sl-column type="index" label='Index' align='center'  min-width='70' ></sl-column>
    <sl-column type="checkbox"  align='center'   ></sl-column>
    <sl-column label='Basic Information'  resize-able >
         <sl-column field='name' resize-able label='Name' min-width='300' sort-able  width='100%' align='left'  ></sl-column>
         <sl-column field='sex' label='Sex'  resize-able  sort-able min-width=60  align='right' order=2></sl-column>
    </sl-column>
    <sl-column field='role' label='Role' align='right' resize-able min-width='200' order=2 ></sl-column>
    <sl-column field='age' label='Age'  resize-able  sort-able min-width=90 align='left' col-align='left' order=1></sl-column>
    <sl-column field='address' label='address'  resize-able min-width=200  order='1'  ></sl-column>
</sl-table>
<script >
    let table2=document.querySelector('#tableDIV2');
    let dateList2=[
                { id: 10001, name: 'Test1', role: 'Test1', sex: 'Man', age: 28, address: 'Javascript' },
                { id: 10001, name: 'Test1', role: 'Test2', sex: 'Man', age: 28, address: 'Javascript' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Javascript' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'table' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'E' },
                { id: 10007, name: 'Test8', role: 'Test', sex: 'Man', age: 29, address: 'F' },
                { id: 10007, name: 'Test9', role: 'Test', sex: 'Man', age: 29, address: 'A' },
                { id: 10007, name: 'Test10', role: 'Test', sex: 'Man', age: 29, address: 'B' },
                { id: 10007, name: 'Test11', role: 'Test', sex: 'Man', age: 29, address: 'C' },
                { id: 10007, name: 'Test12', role: 'Test', sex: 'Man', age: 29, address: 'C' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Javascript' }];

        for(let i=0;i<100000;i++){
            dateList2.push({ id: 10008, name: i+'Test8', role: i+'Develop', sex: 'Man', age: 35, address: 'Javascript' });
        }
    table2.dataSource=dateList2;
    table2.fixedFoot=true;

   
    //Enable virtual scrolling
    table2.enableVirtualScroll=true;
    //virtual scroll line height
    table2.virtualItemHeight=45;
    table2.enableCellBox=true;
   

    table2.customRenderFooter=(columns)=>{
        let result= html`
            ${columns.map(c=>{
                //Note that the principle of column fixation is to select td[uniqueid={c.uniqueID}], pay attention when customizing TFoot
                return html`<td style='background-color:var(--sl-color-neutral-50);' uniqueid=${c.uniqueID} >${c.label}</td>`;
            })}
        `;
        return html`<tr >${result}</tr><tr>${result}</tr>`;
    };
    
   
    table2.addEventListener('sl-table-td-click',(event)=>{
        let detail=event.detail;
        // console.table({type:event.type,td:detail.td.toString(), column:detail.column.field,row:detail.row.toString(),rowData:JSON.stringify(detail.rowData)});
       console.log(detail);
       console.log(event.type,index++);
    });

    // document.body.addEventListener('click',(event)=>{
    //      console.log(event.type,index++);
    // });
    table2.addEventListener('sl-table-tr-click',(event)=>{
        let detail=event.detail;
        // console.table({type:event.type,row:detail.row.toString(),rowData:JSON.stringify(detail.rowData)});
         console.log(detail);
         console.log(event);
         console.log(event.type,index++);
    });
    
    //UI incident    load unload  scroll  resize
    //focus event   blur   focus
    //Mouse event  mouseleave  mouseenter

    //The order in which the three occur, the bubbling stage ：[click, dblclick,]td,tr, document
    //he order in which the three occur, the capture phase ：[mouseenter, mouseleave,]document ,tr,td
   
    
    window.table2=table2;
    table2.fixedColumns=4;
    table2.tableHeight=600;
    table2.sortValue={orderBy:'name',orderType:'ASC'};
</script>
```
### Form custom effects and events to understand several contexts
#### TBody TR context
  ```javascript
  /** Table row context */
export type RowContext = {
  /** row data */
  rowData: any;
  /** row data sequence number */
  rowIndex: number;

  /** TreeTable: parent data corresponding to rowData */
  parentData?: TreeNodeData;
  /** TreeTable: The hierarchy depth of the corresponding tree */
  level?: number;
  /***If TreeTable filters the original data corresponding to rowData  */
  originalData?: TreeNodeData;
  /***TreeTable filter, the upper-level original data of orginalData */
  originalParentData?: TreeNodeData;
};
  ```
#### TBody TR TD context
  ```javascript
 /** Table TBody TD context */
export type CellContext = {
  /**column */
  column: SlColumn;
  /** row data */
  rowData: any;
  /** row data sequence number */
  rowIndex: number;
  /**column rendering order, starting from 0 */
  colIndex: number;

  /** When TreeTable, the superior data */
  parentData?: TreeNodeData;
  /** When TreeTable, the corresponding tree level depth */
  level?: number;
  /***If TreeTable filters the original data corresponding to rowData */
  originalData?: TreeNodeData;
  /***TreeTable filter, the upper-level original data of orginalData  */
  originalParentData?: TreeNodeData;
};
  ```
#### THead TDTH context
  ```javascript
 /** Table TH context */
export type CellHeadContext = {
  /**column */
  column: SlColumn;
  /**column index，start from 0 */
  colIndex: number;
  /** The row number of the table header where the column is located */
  colRowIndex: number;
  /** how many rows the column spans */
  rowspan: number;
  /** how many columns to span */
  colspan: number;
};
 ```
### Adjust column order
 ```javascript
            //Change the order of the columns below the sl-table
        function setColumnOrder(field,order){
            document.querySelector(`sl-column[field=${field}]`).order=order;
        }
        setColumnOrder('role',0);
        setColumnOrder('sex',1);
        setColumnOrder('name',2);
        setColumnOrder('address',-1);
```
### fixed column
```javascript
    //get table object
    let table=document.querySelector('#tableDIV');
    //Fixed first two columns
    table.fixedColumns='2';
    //Fixed first two columns, last column
    table.fixedColumns='2,1';
    //Fixed first 1 column, last 1 column
    table.fixedColumns=[1,1];
```
### row expansion
```javascript
    
    //Specifies which column the icon for the row extension is in
   table.expandColumn='name';
   //Specify that only one row of data can be expanded at a time, other expanded rows will be closed
    table.expandAccordion=true;

    //Specifies that line expansion is lazy mode
    table.expandLazy=true;
    table.expandLazyLoadMethod=(rowData)=>{
        let result={
            columns:['a','b','c'],
            dataSource:[[1,2,3],[4,5,6],[7,8,9]]
        }
         return new Promise((resolve)=>{
            window.setTimeout(()=>{
                resolve(result);
            },300)
        } );
    }

    //The line extension render function that must be configured,
    //The first parameter is row Context data, and the second parameter is all columns
    //If it is lazy mode, the third parameter is lazy Load Data
    table.expandRowRender=({rowData},columns,layLoadData)=>{
        let layResult=layLoadData?html`  
            懒加载数据${JSON.stringify(layLoadData)}`:'';
        let result=html`<tr><td colspan=${columns.length}>
            <div style='margin:10px auto; width:80%;display:grid;grid-template-columns: repeat(2,1fr);'>
            ${columns.map(item=>{
                return html`<span>${rowData[item.field]?rowData[item.field]:''}</span>`;
            })}
            </div>
            <span style='gri-column:span 2'>${layResult}</span>
        </td></tr>`;
        return result;
    };
```
### virtual scroll
```javascript
    let dateList=[];
    for(let i=0,j=20000;i<j;i++){
        dateList.push( { id: i, name: 'Test add'+i, role: 'Test1', sex: 'Man', age: 28, address: 'Javascript from entry to abandonment'+i });
    }
    table.tableHeight='400px';
    //Enable virtual scrolling
    table.enableVirtualScroll=true;
    //virtual scroll line height
    table.virtualItemHeight=45;
    table.customStyle=`div.tdWrap{height:28px;overflow:hidden;}`;//control unit height
    table.dataSource=dateList;
```

### custom row style
```javascript
    //get table object
    let table=document.querySelector('#tableDIV');
    //Set the style inside the table
    table.customStyle=`
        .red td[field=name] {
           color:red
        }
        .green td{
            color:green;
        }
        .name{
            font-weight:bold;
        }
        .sex{
            font-size:1.2em;
        }
    `;
     //custom tbody tr class
     //rowData row data source object, index is the serial number of rowData in the data source
    table.customRenderRowClassMap=({rowData,rowIndex})=>{
        return {
                red:rowIndex%2==0,
                green:rowIndex%2==1
        };
    };
```
### custom cell style
```javascript
    //get table object
    let table=document.querySelector('#tableDIV');
     //custom tbody tr class
     // The parameter is obj:Cell Context
     //For the name column, rowData['name']=='Test4', set a special background color
    table.customRenderCellStyle=({column,rowData})=>{
        return {
            'font-size':column.field=='name'&&rowData['name']=='Test1'?'20px':'14px'
        };
    };
     table.customStyle=`
        .name{
            font-weight:bold;
        }
        .sexWomen{
            color:red;
        }
    `;
    //custom tbody tr td class
    //Add class: name to the name column, add class to the sex column with sex='Women' :sexWomen,
    table.customRenderCellClassMap=({column,rowData})=>{
        return {
            name:column.field=='name',
            sexWomen:column.field=='sex'&&rowData['sex']=='Women'  
        };
    };


    //At the same time, set attributes attribute, style, class, event to Tr
    table.customRenderRowSpread=({rowData,rowIndex})=>{
        return {
            '.Value':rowData, //tr.Value=rowData
            '.Index':rowIndex, //tr.Index=rowIndex
            'name':rowData['name'],// tr.getAttribute('name')=rowData['name']
            style:{'font-weight':'bold',color:rowIndex%2==0?'red':''}, //'font-weight:bold;cor:red'
            class:['class01','class02'], //{class01:true, class02:true} //'class01 class02 class03'
            '@click':(event)=>{console.log(rowData);console.log(rowIndex);} //tr.addEventListener('click')
        }
    }
```
### custom cell rendering
```javascript
    //get table object
    let table=document.querySelector('#tableDIV');
    //renderCell Receive Cell Context
    document.querySelector('sl-column[field=sex]').renderCell=({rowData})=>{
        let sex=rowData['sex'].toLowerCase();
        return window.html`${sex=='man'?'男人':'女人'}`;
    }
```
### custom header
```javascript
    //get table object
    let table=document.querySelector('#tableDIV');
    //renderCell receives the CellHeadContext as a parameter
    document.querySelector('sl-column[field=sex]').renderCol=({column})=>{
        return window.html`<span>${column.label} <font color='red'>*</font>`;
    }
    //ustomize the style for th
    table.customRenderCellHeadStyle=({column})=>{
        return {
            'font-weight':column.field=='name'?'bold':''
        }
    }
    table.customStyle=`.class01{color:red}`;
     //custom class for th
    table.customRenderCellHeadClassMap=({column})=>{
        return {
            'class01':column.field=='name'
        }
    }

     //Give th a custom attribute, style, class, event at the same time
    table.customRenderCellHeadSpread=({column,colIndex,colRowIndex})=>{
        return {
            field:column.field,
            '@click':(event)=>{
                console.log(column.field);
            },
            '.Index':colIndex,
            '.colRowIndex':colRowIndex
        }
    }


```

### cell merge
```javascript
    let lastSex=null;
    let table=document.querySelector('#tableDIV');
    let dateList=table.dataSource;
    //Custom TD rendering function: gender column, merge down equals
    table.querySelector('sl-column[field=sex]').renderCell=({column,rowData,rowIndex})=>{
        if(rowIndex==0)  {
           lastSex=null;
        }
        let value=rowData[column.field];
        if(value==lastSex){//If gender is equal to last gender, this cell is merged and not rendered
            return null; 
        }
        let _rowSpan_=1;
       for(let i=rowIndex+1,j=dateList.length;i<j;i++){
            let nextValue=dateList[i][column.field];
            if(nextValue==value){
                _rowSpan_+=1;
            }else{
                break ;
            }
        }
        lastSex=value;
        return  {
            template: value,
            rowspan:_rowSpan_
        };
    };

    //The name column of the first row is merged with the following columns
    table.querySelector('sl-column[field=name]').renderCell=({column,rowData,rowIndex})=>{
        if(rowIndex==0){
            return {
                template:html`${rowData[column.field]}`,
                colspan:2
            }
        }else {
            return html`${rowData[column.field]}`;
        }
    };

   table.querySelector('sl-column[field=name]').nextElementSibling.renderCell=({column,rowData,rowIndex})=>{
        if(rowIndex==0){
            return null;
        }else{
            return html`${rowData[column.field]}`;
        }
    }
```


[component-metadata:sl-table]
<br>
<br>
[component-header:sl-column]
column Component: used to define the header
[component-metadata:sl-column]
