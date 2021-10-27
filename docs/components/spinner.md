# Spinner

[component-header:sl-spinner]

Spinners are used to show the progress of an indeterminate operation.

```html preview
<sl-spinner></sl-spinner>
```

## Examples

### First Example

Spinners are sized based on the current font size. To change their size, set the `font-size` property on the spinner itself or on a parent element as shown below.

```html preview
<sl-spinner></sl-spinner>
<sl-spinner style="font-size: 2rem;"></sl-spinner>
<sl-spinner style="font-size: 3rem;"></sl-spinner>
```

### Color

The spinner's colors can be changed by setting the `--indicator-color`

```html preview
<sl-spinner style="font-size: 3rem; --indicator-color: deeppink"></sl-spinner>
```

### Speed

The spinner's speed can be changed by setting the `--speed`

```html preview
<sl-spinner style="font-size: 2rem; --speed: .5s"></sl-spinner>
```

[component-metadata:sl-spinner]
