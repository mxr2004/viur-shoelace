# Transfer

[component-header:sl-transfer]

A description of the component goes here.

```html preview
<sl-transfer id='transeferDIV' style='height:500px;--list-width:400px;' ></sl-transfer>
<script>
    window.transfer=document.querySelector('#transeferDIV');
    // Custom search placehold
    // transfer.filterPlaceholder=['Please enter','a'];
    // transfer.filterPlaceholder='Please enter a name';
    const dataSource=[];
    const targetSelectedKeys=[];
    let size=100;
    for(let i=0,j=size;i<j;i++){
        dataSource.push({
            id:i+1,
            name:`name ${i+1}`,
            description:`descritpion ${i+1}`
        });
        if((i+1)%5==0){
            targetSelectedKeys.push(i+1);
        }
    }
    transfer.dataSource=dataSource;
    transfer.targetKeys=targetSelectedKeys;

    //Customized filtering
    transfer.filterMethod=(item,value)=>{
         if (value == null || value == '' || value.trim() == '' ) {
            return true;
        }
        value=value.toLowerCase();
        return item.name.includes(value)||item.description.includes(value);
    };
   
    
</script>
```

### Custom data rendering
```javascript
//Custom Data Rendering
     transfer.renderItem=function(item){
         return html`<sl-avatar style='--size:2em;' initials="${(item.id+'').substring(0,2)}"></sl-avatar><span style='margin-left:5px' >${item.name} --${item.description}</span>`;
     };
```
### Data rendering as a table
```javascript
    transfer.tableTemplate=function(direction){
        console.log('tableTemplate='+direction);
        return html`<sl-table  .stripe=${true}>
                    <sl-column type='checkbox'></sl-column>
                    <sl-column type='index' width='40' align='center' label='#'></sl-column>
                    <sl-column label='名称' resize-able width='100%'  field='name'></sl-column>
                    <sl-column label='description' resize-able width='150' align='right' field='description'></sl-column>
            </sl-table>`;
    }
    
```
### First Example

TODO

### Second Example

TODO

[component-metadata:sl-transfer]
