/**
 * Toodles is a disney character on Mickey Mouse Clubhouse that shows up
 * anytime the gang is in trouble. My daughter loves this show, and I couldn't
 * think of anything more clever.
 *
 * @author  Kelt <kelt@dockins.org>
 * @license  MIT
 *
 * @usage: $('[data-toodles]').toodles(options);
 *
 */
(function($)
{
	//
	// this is used for event delegation
	//
	var allEvents = "abort blur click dblclick focus focusin focusout input keydown keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select unload wheel";

	//
	// setup toodles jQuery plugin
	//
	$.fn.toodles = function(options, delegation)
	{
		var settings = $.extend( {}, $.fn.toodles.defaults, options );

		if (typeof delegation === 'undefined') {
			return this.each(function(index, element) { ohToodles($(element), settings); });
		}

		delegation = typeof delegation === 'string' ? $(delegation) : delegation;

		ohDelegatedToodles(this.selector, settings, delegation);
	};

	//
	// defaults that we setup for this
	// plugin. these are just sensible
	// defaults which might be overridden
	// per element by data-attributes
	//
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

	//
	// register the event handlers on this element
	// to handle switching classes. we use the data
	// from default settings which can be overriden
	// by setting data-attributes on the element too
	//
	function ohToodles(element, settings)
	{
		var data = extractData(element, settings);

		// register an enter event handler
		if (data.enter)
		{
			element.on(data.enter, function()
			{
				// call the handler that is registered
				setTimeout(function() { $.fn.toodles.handlers[data.enterHandler](data); }, data.enterDelay);
			});
		}

		// register a leave event handler
		if (data.leave)
		{
			element.on(data.leave, function()
			{
				// call the handler that is registered
				setTimeout(function() { $.fn.toodles.handlers[data.leaveHandler](data); }, data.leaveDelay);
			});
		}
	}

	//
	// sometimes you'll want to delegate toodles to a parent
	// element so you don't have to reinitialize toodles over
	// and over, this is useful when you are removing elements
	// out of the DOM (say for ajax or templating)
	//
	function ohDelegatedToodles(selector, settings, delegation)
	{
		delegation.on(allEvents, selector, function(event)
		{
			var element = $(event.currentTarget);
			var data = extractData(element, settings);

			if (data.enter == event.type)
			{
				return setTimeout(function() { $.fn.toodles.handlers[data.enterHandler](data); }, data.enterDelay);
			}

			if (data.leave == event.type)
			{
				return setTimeout(function() { $.fn.toodles.handlers[data.leaveHandler](data); }, data.leaveDelay);
			}
		});
	}

	//
	// list of handlers we can pick from to handle events
	// we can register more handlers here globally
	// if we want to do something custom
	//
	$.fn.toodles.handlers =
	{
		toggleClass: function(data)
		{
			if (data.inactive) data.element.toggleClass(data.inactive);
			if (data.active) data.element.toggleClass(data.active);
		},

		addClass : function(data)
		{
			if (data.inactive) data.element.removeClass(data.inactive);
			if (data.active) data.element.addClass(data.active);
		},

		removeClass : function(data)
		{
			if (data.inactive) data.element.addClass(data.inactive);
			if (data.active) data.element.removeClass(data.active);
		}
	}

	//
	// this extracts data from the element and uses settings as a default
	// this way we can get all the information we need to use in other
	//
	function extractData(element, settings)
	{
		var data = $.extend( {}, settings, element.data() );

		data.element = (data.selector == '') ? element : $(data.selector);

		return data;
	}

})(jQuery);