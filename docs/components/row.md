# Row

[component-header:sl-row]

css grid layout component implementation

```html preview
<sl-row  columns='3' grap=5>
   <sl-col span='2' class='cell minTd'> Two columns </sl-col>
   <sl-col  class='cell minTd'>A column</sl-col>
</sl-row>
<sl-row   grap=10>
   <sl-col span='2' class='cell minTd'>Two columns</sl-col>
   <sl-col  class='cell'> A column</sl-col>
    <sl-col span=9 class='cell'>Nine columns（Default is divided into 12 columns）</sl-col>
</sl-row>
<style>
    .cell{
         border:1px solid #f2f2f2;
         border-radius:5px;
    }
    sl-row + sl-row{
        margin:10px 0;
    }
    .minTd{
        height:100px;
    }
</style>
```

## Multi-row layout
```html preview
<sl-row grap='2' columns='3' style=' margin:10px 0;'>
    <sl-col  row='2' class='cell'>A </sl-col>
    <sl-col  span=2 class='cell' >B </sl-col>
    <sl-col  class='cell'  >C </sl-col>
    <sl-col class='cell'  >D </sl-col>
</sl-row>
```
### Dashboard layout, nested
```html preview
<sl-row grap='10' columns='4' style=' margin:10px 0;'>
    <sl-col span='4' >
        <sl-row columns='4' grap='10px'>
            <sl-col class='cell minTd'>1</sl-col>
            <sl-col class='cell minTd'>2</sl-col>
            <sl-col class='cell minTd'>3</sl-col>
            <sl-col class='cell minTd'>4</sl-col>
        </sl-row>
    </sl-col>
    <sl-col span='3' class='cell' >
        <div style='height:400px' >Middle of the dashboard</div>
    </sl-col>
    <sl-col span=1 class='cell'  >Right side of the instrument panel </sl-col>
</sl-row>
```

### Multi-Row Equivalents
```html preview
<sl-row   columns=6 grap=2>
    <sl-col  class='cell minTd'>1</sl-col>
    <sl-col  class='cell minTd'>2</sl-col>
    <sl-col  class='cell minTd'>3</sl-col>
    <sl-col  class='cell minTd'>4</sl-col>
    <sl-col  class='cell minTd'>5</sl-col>
    <sl-col  class='cell minTd'>6</sl-col>
    <sl-col  class='cell minTd'>7</sl-col>
    <sl-col  class='cell minTd'>8</sl-col>
    <sl-col  class='cell minTd'>9</sl-col>
    <sl-col  class='cell minTd'>10</sl-col>
    <sl-col  class='cell minTd'>11</sl-col>
    <sl-col  class='cell minTd'>12</sl-col>
</sl-row>
```
TODO

[component-metadata:sl-row]
# Col
[component-header:sl-col]
[component-metadata:sl-col]
