# Markdown Element

[component-header:sl-markdown-element]

A description of the component goes here.


```html preview
<sl-select id='selectSelct' label='Select the markdown file'>
</sl-select>
<sl-markdown-element  id='markObj'></sl-markdown-element>
<script>
    let markObj=document.querySelector('#markObj');
    let selectSelct=document.querySelector('#selectSelct');
    let host=window.location.host;
    let mdsrc='';
    if(host=='suyouwanggang.github.io'){
        mdsrc='shoelace';
    }
    markObj.mdsrc=mdsrc+'/assets/prism-themes/vditor.md';
    const array=['More Documents.md','components.md','Change Log.md','Markdown Reference.md','vditor.md','README.md'];
    let str='';
    for(let file of array){
        var d=`<sl-menu-item value='${file}'>${file}</sl-menu-item>`;
        str+=d;
    }
    selectSelct.innerHTML=str;
    selectSelct.value='More Documents.md';
    selectSelct.addEventListener('sl-change',(event)=>{
        markObj.mdsrc=mdsrc+`/assets/prism-themes/${event.target.value}`;
    });
</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-markdown-element]
