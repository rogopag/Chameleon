(function( $ ){
	$.fn.galleryScroll = function() {
		var thumbsNum = this.children('div:not(.ngg-clear)').length, imgCont = this.children().eq(0), imgContWidth = imgCont.width() + 12, scrollerButtons = '<div id="previous-button" class="gallery-buttons"></div><div id="next-button" class="gallery-buttons"></div>', el = this, count = 4, control;
		
		console.log(this, thumbsNum);
		var previous = function()
		{
			$('a#left-multi-media').bind('click',function(event){
				
				event.preventDefault();
				console.log('clicked', $(this) );
				if( count == 4 ) next();
				
				if( count == thumbsNum-1 ) $(this).unbind('click');
				
				el.animate({
					left: '-='+imgContWidth.toString()
				},
				{
					duration: 200,
					easing: 'swing',
					step: function(now, fx) 
					{

					},
					complete: function()
					{

					}
				});
				count++;
			});
		}
		
		var next = function()
		{
			$('a#right-multi-media').bind('click',function(event){
				event.preventDefault();
				console.log('clicked', $(this) );
				if( count == 5 ) $(this).unbind('click');
				
				if( count == thumbsNum-1 ) previous();
				
				el.animate({
					left: '+='+imgContWidth.toString()
				},
				{
					duration: 200,
					easing: 'swing',
					step: function(now, fx) 
					{

					},
					complete: function()
					{

					}
				});
				count--;
			});
		}
		previous();
	};
	})( jQuery );