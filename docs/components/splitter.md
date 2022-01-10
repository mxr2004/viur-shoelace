# Splitter

[component-header:sl-splitter]

 Splitter component: used for layout, supports left/right splitting, top/bottom splitting

```html preview
<sl-splitter style='height:400px;' min-size='100' id='spliter' max-size='300'>
    <div slot='exta'>
        <sl-menu id='menuDiv'>
            <sl-menu-label>
                Menu Label
            </sl-menu-label>
            <sl-menu-item highlight>left</sl-menu-item>
            <sl-menu-item>right</sl-menu-item>
            <sl-menu-item>top</sl-menu-item>
            <sl-menu-item>bottom</sl-menu-item>
        </sl-menu>    
    </div>
    <div>
        I am the main content, just drag the separator bar to see
        I am the main content, just drag the separator bar to see
        I am the main content, just drag the separator bar to see
    </div>
</sl-splitter>
<script >
    let menuDiv=document.querySelector('#menuDiv');
    let spliter=document.querySelector('#spliter');
    menuDiv.addEventListener('sl-select',(event)=>{
        menuDiv.querySelectorAll('sl-menu-item').forEach((item)=>{
            if(event.detail.item==item){
                item.highlight=true;
            }else{
                item.highlight=false;
            }
        })
        spliter.splitType=event.detail.item.textContent;
    });

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-splitter]
