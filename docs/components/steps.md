# Steps

[component-header:sl-steps]

A description of the component goes here.

```html preview
<style>

    sl-step{
        min-width:150px;
    }
    sl-step::part(step-description){
        color:rgb(var(--sl-color-gray-500));
    }
</style>
<sl-steps id="sl-steps">
    <sl-step title='EasyTrack 6' description='July 2011'></sl-step>
    
    <sl-step title='EasyTrack 9' icon='star-fill' description='July 2016'></sl-step>
    <sl-step title='EasyTrack 10' description='July 2019'></sl-step>
    <sl-step title='EasyTrack 11' description='Under planning and construction'>
        <div slot='step-description'>Under planning and construction<br>
            ### Second Example<br>
            <sl-button>Menu</sl-button><br>
            ### Second Example<br>
            ### Second Example<br>
            ### Second Example<br>
            
        </div>
    </sl-step>
</sl-steps>
<div style='margin-top:10px;'></div>
<sl-button id='changeStepVertial'>Horizontal/vertical</sl-button>
<sl-button id='changeStep'>+1</sl-button>
<script >
    document.querySelector('#changeStepVertial').addEventListener('click',()=>{
       const stepObj= document.querySelector('#sl-steps');
       stepObj.vertical=!stepObj.vertical;
    });

     document.querySelector('#changeStep').addEventListener('click',()=>{
       const stepObj= document.querySelector('#sl-steps');
       const steps=stepObj.childStep;
       if(stepObj.current+1<steps.length){
         stepObj.current=stepObj.current+1;
       }else{
           stepObj.current=0;
       }
       
    })

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-steps]
