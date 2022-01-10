# Tree

[component-header:sl-tree]

Tree component: the most important thing is to define the data source `rootNodeData`, rendering function `nodeRender`, selection mode support `check`, `radio`, `single`, `node`, internal package `sl-tree-node`, support filtering, support custom rendering

### Node data source `nodeData` 
```javascript
 export type TreeNodeData = {
  id?: string | number; /* ID  */
  parentID?:string|number;/** Parent Node ID**/
  name?: string; /*Node Name*/
  icon?: string; /*Node Icon */
  close?: boolean; /* Whether to close */
  closeable?: boolean; /*false, means the node cannot be collapsed  */
  disable?: boolean; /*true,Indicates a node disble, Cannot be selected */
  [key:string]:unknown; /*Custom Properties */
  children?: TreeNodeData[]; /*Subordinate Nodes */

}
```

```html preview
<sl-button-group id='buttonGroup'>
    <sl-button value='check'>Checkbox</sl-button>
    <sl-button value='radio'>Radio</sl-button>
    <sl-button value='none'>None</sl-button>
    <sl-button type='primary' value='single'>single</sl-button>
    
    <sl-checkbox style='margin-left:20px' id='checkFilter'>Enable or disable filtering</sl-checkbox>
    <sl-checkbox style='margin-left:20px' id='select_hight'>Highlighting</sl-checkbox>
</sl-button-group>
 <div style='margin:10px 0;' id='checkGroup'>
     <sl-checkbox checked style='margin-left:20px' id='includeRoot' > Whether to include the root node</sl-checkbox>
    <sl-checkbox checked style='margin-left:20px' id='checkCasecade' > Check whether to cascade down</sl-checkbox>
    <sl-checkbox checked style='margin-left:20px' id='checkOffCasecade' >Uncheck whether to cascade down</sl-checkbox>
 </div>
<div id='checkTreeValue' style='margin:10px 0;max-height:60px;overflow:hidden;' ></div>
<sl-tree id='sl-tree-div' filter-input-placeholder='Please enter the city name'>
    <div slot='no-data'>No data</div>
    <sl-button slot='footer'>footer</sl-button>
</sl-tree>
<style >
#sl-tree-div::part(base){
    max-height:600px;
}
</style>
<script>
    let treeDiv=document.querySelector('#sl-tree-div');
    let groupDIV=document.querySelector('#buttonGroup');
    let group=groupDIV.querySelectorAll('sl-button');
    for(let k of group){
        k.addEventListener('click',(e)=>{
            let target=e.target;
            treeDiv.selectMode=target.getAttribute('value');
            for(let k of group){
                k.type='default';
                if(k==target){
                    k.type='primary';
                }
            }
        })
    }
    document.querySelector('#checkGroup').addEventListener('sl-change',(event)=>{
        let target=event.target;
        if(target.id=='checkCasecade'){
            treeDiv.checkCasecade=target.checked;
        }else if(target.id=='checkOffCasecade'){
            treeDiv.checkOffCasecade=target.checked;
        }
    })
    document.querySelector('#includeRoot').addEventListener('sl-change',(event)=>{
        let target=event.target;
        treeDiv.includeRoot=target.checked;
    });
    document.querySelector('#select_hight').addEventListener('sl-change',(event)=>{
        let target=event.target;
        treeDiv.select_highlight=target.checked;
    });
 //   treeDiv.customStyle='.redColor{color:red}';
    treeDiv.nodeRender=(data,index,parentData)=>{
        const html=window.html;
        return html`<span class='redColor'>${parentData?index+1:''} ${data.value} ${data.children&&data.children.length>0? '('+data.children.length+')':''}</span>`;
    };
    treeDiv.filterMethod=function(data,filterString){
        return data.value.indexOf(filterString)>=0;
    }
    treeDiv.addEventListener('sl-tree-node-toogle',(event)=>{
        let openData=localStorage.getItem('tree-data');//Store all open nodes
        if(!openData){
            openData=[];
        }else{
            openData=JSON.parse(openData);
        }
        const data=event.detail.nodeData;
        if(data.close){//Close
            let index=openData.indexOf(data.id);
            if(index>=0){
                openData.splice(index,1);
            }
        }else{
            openData.push(data.id);
        }
        localStorage.setItem('tree-data',JSON.stringify(openData));
        console.log(JSON.stringify(event.detail.nodeData.id));
    });
     treeDiv.addEventListener('sl-tree-node-click',(event)=>{
         const el=event.path[0];
         //console.trace('Current clicked tree-node',el);
         console.log(event.detail.node.nodeData.value);
     });
     treeDiv.addEventListener('sl-tree-checkKeys-change',(event)=>{
         document.querySelector('#checkTreeValue').textContent=JSON.stringify(treeDiv.checkedKeys);
     })
  const request = fetch('assets/examples/tree-node-demo.json').then(response=>response.json()).then((json)=>{
    treeDiv.rootNodeData={
        value:'China',
        disable:true,
        children:json
    };

    //Normative data, this json source id is not unique, now adjust the next.
    const setNodeID=(node,parent)=>{
        if(parent){
            node.id=parent.id+'/'+node.value;
        }else{
            node.id=node.value;
        }
        if(Math.random()>0.5){
            node.disable=true;
        }
        const children=node.children;
        if(children){
          for(let k of children){
            setNodeID(k,node);
          }
        }
    }
    setNodeID(treeDiv.rootNodeData);


    /*Iteration Recovery Node Contraction State*/
    const iteratorNodeData=(data,callback)=>{
        callback(data);
        const children=data.children;
        if(children){
          for(let k of children){
            iteratorNodeData(k,callback);
          }
        }
    }
    let openData=localStorage.getItem('tree-data');
    if(!openData){
        openData=[];
    }else{
        openData=JSON.parse(openData);
     }
    const callFun=function(tempData){
       if(openData.indexOf(tempData.id)>=0){
           tempData.close=false;
       }else{
           //tempData.close=true;
       }
    }
    iteratorNodeData(treeDiv.rootNodeData,callFun);
});
 document.querySelector('#checkFilter').addEventListener('sl-change',(event)=>{
        treeDiv.enableFilter=event.target.checked;
    });
</script>
```

### Custom rendering `nodeRender`
Receive nodeData , return the tree node custom return data
```javascript
/**
 * Node custom rendering
 * (data: TreeNodeData, index?:number, parentData?:TreeNodeData,): TemplateResult<1>;
 */
export interface NodeRenderInterface {
  /** data:Node Data Source， index: Order number in the upper level，parentData:Parent Node Data */
  (data: TreeNodeData, index?: number, parentData?: TreeNodeData): TemplateResult<1>;
}
```

### Built-in filtering
 `filter`：Enable or disable filtering, if enabled, one more input filter by default (you can also slot=[name=filter] to replace the custom internal filter)
 `filterString`:Filtering parameters
 `filterMethod`:The filter function receives nodeData and determines whether the node matches.
```javascript
 export interface TreeNodeFilter{
    /**
     * data:Need to match the data, the developer does not have to recurse the child data
     */
    (data:TreeNodeData, ...searchData:unknown[]):boolean;
  }
```
### Tree node data traverser works with `iteratorNodeData`,`NodeVistor`.
```javascript
 /** Node traverser    (node: TreeNodeData, index:number=0,parentNode?: TreeNodeData) */
export interface NodeVistor {
  /** @node:Nodes to be traversed，paretNode:Parent Node,index:Same level order number */
  (node: TreeNodeData,  parentNode?: TreeNodeData,index?:number)
}
interface iteratorNodeDataType {
  /** data:TreeNodeData, callback:Traverser functions，parentData：Higher level data，parentChildrenIndex:The order of data in the superordinate  **/
  (data: TreeNodeData, callback: NodeVistor, parentData?: TreeNodeData,parentChildrenIndex:number=0)=>void;
} 

import {iteratorNodeData} from 'tree-node-util';
const data=tree.rootNodeData;
const result=[];
const callBack=(node,parentNode)=>{
    if(node.disable){ //Collect all disable nodes
        result.push(node);
    }
}
//iteratorNodeData internally encapsulates the auto-recursive child nodes
iteratorNodeData(data,callBack);
```
### `tree-node-util` `convertListToTreeNodeData` converts an array of {id,parentID,name } objects into TreeNodeData 
```javascript
    import {convertListToTreeNodeData} from 'tree-node-util';
    const array=[{
        id:10,
        parentID:0,
        name:'A',
    },{
        id:11,
        parentID:0,
        name:'B',
    },{
        id:12,
        parentID:11,
        name:'B_1',
    }]
    const root={id:0,name:root};
    convertListToTreeNodeData(array,root);
    //After execution root.children has two children `A, B` . The `B` node has a child node `B_1`
```


TODO Tree node dragging, moving up and down, upgrade and downgrade functions

### Second Example

TODO

[component-metadata:sl-tree]
