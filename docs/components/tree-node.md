# Tree Node

[component-header:sl-tree-node]

TreeNode : has two properties, `nodeData`,`nodeRender`

## nodeData node data source
```javascript
 export type TreeNodeData = {
  id?: string | number; /* ID  */
  parentID?:string|number;/** Parent Node ID**/
  name?: string; /*Node Name*/
  icon?: string; /*Node Icon */
  close?: boolean; /* Whether to close */
  closeable?: boolean; /*false, means the node cannot be collapsed */
  disable?boolean;/** disable ,can't select state ***/
  [key:string]:unknown; /*Custom Properties */
  children?: TreeNodeData[]; /*Subordinate Nodes  */
  _parent?: TreeNodeData ; //Parent node, internal use
}
```

## nodeRender 
Receive nodeData , return the tree node custom return data
```javascript
 export interface NodeRenderInterface{
  (data:TreeNodeData):TemplateResult<1>;
}
```

```html preview
<sl-tree-node id='rootNode'></sl-tree-node>
<script>
    let rootNode=document.querySelector('#rootNode');
    rootNode.nodeRender=(data)=>{
        const html=window.html;
        return html`${data.value} ${data.children&&data.children.length>0? '('+data.children.length+')':''}`;
    };
   
    rootNode.addEventListener('sl-node-toogle',(event)=>{
        console.log(event.detail.node.nodeData);
        let openData=localStorage.getItem('tree-data');//Store all open nodes
        if(!openData){
            openData=[];
        }else{
            openData=JSON.parse(openData);
        }
        const data=event.detail.nodeData;
        if(data.close){//关闭
            let index=openData.indexOf(data.id);
            if(index>=0){
                openData.splice(index,1);
            }
        }else{
            openData.push(data.id);
        }
        localStorage.setItem('tree-data',JSON.stringify(openData));
        console.log(JSON.stringify(event.detail.nodeData.value));
    });
     rootNode.addEventListener('sl-node-click',(event)=>{
         const el=event.path[0];
         console.trace('The current clicked tree-node',el);
         console.log(event.detail.node.nodeData.value);
     })
  const request = fetch('assets/examples/tree-node-demo.json').then(response=>response.json()).then((json)=>{
    rootNode.nodeData={
        value:'China',
        children:json
    };
//Normative data, this json source id is not unique, now adjust the next.
    const setNodeID=(node,parent)=>{
        if(parent){
            node.id=parent.id+'/'+node.value;
        }else{
            node.id=node.value;
        }
        const children=node.children;
        if(children){
          for(let k of children){
            setNodeID(k,node);
          }
        }
    }
    setNodeID(rootNode.nodeData);

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
    iteratorNodeData(rootNode.nodeData,callFun);
});

    
  

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-tree-node]
