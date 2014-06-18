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
	// setup toodles jQuery plugin
	//
	$.fn.toodles = function(options)
	{
		var settings = $.extend( {}, $.fn.toodles.defaults, options );

		return this.each(function(index, element) { ohToodles($(element), settings); });
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
		class: 'active',

		enter: 'mouseenter',
		enterDelay: 0,
		enterHandler: 'addClass',

		leave: 'mouseleave',
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
	// list of handlers we can pick from to handle events
	// we can register more handlers here globally
	// if we want to do something custom
	//
	$.fn.toodles.handlers =
	{
		addClass : function(data)
		{
			data.element.addClass(data.class);
		},

		removeClass : function(data)
		{
			data.element.removeClass(data.class);
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