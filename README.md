jquery.toodles
==============

Toogle classes on elements with data bindings - the simple (and working) version of jquery.switcheroo


## Get Started

To get started just type this in after the body has loaded.

```
$('[data-toodles=""]').toodles();
```

Now to see how this might work create a style sheet for class

```
.active {
	background-color: red;
}
```

And then you just apply the binding on some element.

```
<div data-toodles>I'm some text, click me to toggle my background color</div>
```

Here is a plunkr to demonstrate a simple [demo](http://plnkr.co/edit/EwA8S0Exxcy6Z53KFdFZ?p=preview).


## More Advanced Toodles

You can pass data options to any data-toodles command to inject in your own customizations to toodles. For example, if you want to change the class of some h1 tag when a button is toggled.

```
<h1>hmm...</h1>
<button data-toodles data-selector="h1">click me</button>
```

You can pass other options using `data-<option name>` and here are the defaults that toodles comes with out of the box. You are also change these when you initialize your toodles after the body has loaded.

```
	$.fn.toodles.defaults =
	{
		selector: '',
		active: 'active',
		inactive: '',

		enter: 'click',
		enterDelay: 0,
		enterHandler: 'toggleClass',

		leave: '',
		leaveDelay: 0,
		leaveHandler: 'removeClass'
	};
```

Here is an [example plunkr](http://plnkr.co/edit/EwA8S0Exxcy6Z53KFdFZ?p=preview) of customizing jquery.toodles and animate.css to make things animate when you hover over them. You can get pretty creative with data-toodles, but it is worth noting that if you end up having something more complex than adding classes to elements then it is probably just time to write your own custom jQuery handler.
