# Layout

[component-header:sl-layout]

Flex Layout component simple implementation

```html preview
<sl-layout  style='height:400px'>
    <sl-layout expand class='c' >expand extension</sl-layout>
    <sl-layout class='b' cross='end'><span >Bottom of secondary axis</span></sl-layout>
    <sl-layout class='a'  cross='center'><span  >Secondary axis Center</span></sl-layout>
    <sl-layout column class='c' main='space-around'>
        <span >space-around</span>
        <span >space-around</span>
        <span >space-around</span>
        <span >space-around</span>
        <span >space-around</span>
    </sl-layout>
</sl-layout>
<style >
    .a{
        background-color:rgba(33, 150, 243, 0.5);
    }
    .b{
            background-color:rgba(33, 243, 103, 0.5);
      }
    .c{
            background-color:#4285f4;
      }
      .item{
          margin:10px;
          background-color:red;
          color:#FFF;
      }
</style>
```


## Vertical layout

```html preview
<sl-layout column style='height:400px'>
    <sl-layout expand class='a' >Expand to fill spindle height</sl-layout>
    <sl-layout class='b' main='end' >
        <span class='item'>B</span>
        <span class='item' >XX</span>
    </sl-layout>
    <sl-layout class='c' main='space-between' >
        <span  class='item'>between</span>
        <span  class='item'>between</span>
    </sl-layout>
     <sl-layout class='b' main='space-around' >
        <span class='item'>arround</span>
        <span class='item' >arround</span>
    </sl-layout>
</sl-layout>
```


[component-metadata:sl-layout]
