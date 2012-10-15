/**
 * @author Riccardo Strobbia
 * @version 0.1
 * @copyright Robanostra, 13 October, 2012
 * @package AreaGallery
 **/
var Area, jq = jQuery.noConflict();

jQuery(function(){
	startGalleryManager();
});

function startGalleryManager()
{
	var self, AreaGalleryManage;

	AreaGalleryManage =
	{
			url: Area.template_dir+'/xml.php',
			div: jq('<div id="pictures-wrapper" class="wrapper" />'),
			img: null,
			index: 0,
			len:0,
			src: '',
			pictures_array: [],
			dumb_box: jq('<div class="dumbBox" />'),
			nextButton: jq('<a class="nextButton" href="#"/>'),
			prevButton: jq('<a class="prevButton" href="#"/>'),
			closeButton: jq('<a class="closeButton" href="#" />'),
			FADE_FAST:300,
			FADE_SLOW:600,
			init:function()
			{
				self = this;
				self.img = self.setImageTag();
				self.handleClickOnAlbum();
			},
			handleClickOnAlbum:function()
			{
				if( jq('.ngg-album-compact').is('div') )
				{
					jq('.ngg-album-link a').bind('click', function(event){
						event.preventDefault();
						self.showLoadingProgress();
						self.getPicturesArrayAndDisplay( jq(this) );
					});
				}
			},
			getPicturesArrayAndDisplay: function( el )
			{
				var element = el, uri = self.url + '?gid=' + el.attr('rel');
				jq.get(uri, function(data){
					if( data )
					{
						self.pictures_array = jq(data).find( "picture" );
						self.len = self.pictures_array.length;
						self.updateImgSrc();
						self.buildModalBox();
						self.doNext();
						self.doPrev();
						self.closeDialog();
					}
				},
				'xml');
		},
		setImageTag:function()
		{
			return jq('<img class="gallery-pic" src="" alt="" id="gallery-image" />');
		},
		updateImgSrc:function()
		{	
			if( self.img.is('img') ) self.img.remove();
			
			self.img = self.setImageTag();
			self.src = jq( self.pictures_array[self.index] ).find('url');
			self.src = jq( self.src[0] ).text();
			self.img.attr( 'src', self.src );
			self.div.append( self.img );
			return self.img;
		},
		buildModalBox: function()
		{
			var dumbBoxWrap = jq('<div class="dumbBoxWrap" />'), dumbOverlay = jq('<div class="dumbBoxOverlay">&nbsp;</div>'), verticalOffest = jq('<div class="vertical-offset" />');
			dumbBoxWrap.append(dumbOverlay, verticalOffest);
			verticalOffest.append( self.dumb_box );
			self.dumb_box.append( self.div, self.nextButton, self.prevButton, self.closeButton );
			jq('body').append( dumbBoxWrap );
			
			dumbBoxWrap.show( self.FADE_SLOW, function(){
				
			});
			self.img.load(function(){
				self.dumb_box.center();
				self.nextButton.show(self.FADE_FAST);
				self.closeButton.show(self.FADE_FAST);
				self.hideLoadingProgress();
			});
			
			dumbOverlay.bind('mouseup', function(event){
				self.removeEverything();
			});
			
		},
		doNext:function()
		{
			self.nextButton.bind('mouseup', function(event){
				event.stopImmediatePropagation();
				
				var img;
				
				self.index += 1;
				
				self.hideButtons();
				
				self.showLoadingProgress();
				
				self.dumb_box.fadeOut( self.FADE_FAST, function(){	
					img = self.updateImgSrc();
					var el = jq(this);
					img.load(function(){
						el.center();
						self.hideLoadingProgress();
						if( self.index > 0 )
						{
							self.prevButton.fadeIn(self.FADE_FAST);
						}
						if( self.index < self.len-1 )
						{
							self.nextButton.fadeIn( self.FADE_FAST );
						}
						el.fadeIn(self.FADE_SLOW, function(){
							//console.log( jq(this) );
						});
					});
					
				});
			});
		},
		doPrev:function()
		{
			self.prevButton.bind('mouseup', function(event){
				event.stopImmediatePropagation();
				
				var img;
				
				self.index -= 1;
				
				self.hideButtons();
				
				self.showLoadingProgress();
				
				self.dumb_box.fadeOut( self.FADE_FAST, function(){
					img = self.updateImgSrc();
					
					var el = jq(this);
					
					img.load(function(){
						el.center();
						self.hideLoadingProgress();
						if( self.index > 0 )
						{
							self.prevButton.fadeIn(self.FADE_FAST );
						}
						if( self.index < self.len-1 )
						{
							self.nextButton.fadeIn( self.FADE_FAST );
						}
						el.fadeIn(self.FADE_SLOW, function(){
								//console.log( jq(this) );
						});
					});
				});
			});
		},
		hideButtons:function()
		{
			self.prevButton.hide();
			self.nextButton.hide();
			self.closeButton.hide();
		},
		showLoadingProgress: function()
		{
			var src = Area.template_dir + '/images/spin.gif', 	loading = jq('<img class="loading-gif" src="'+src+'" alt="loading" id="loading-gif" />');
			jq('body').append( loading );
			loading.fadeIn('fast');
		},
		hideLoadingProgress:function()
		{
			jq('#loading-gif').fadeOut('fast', function(){
				jq(this).remove();
			});
			self.closeButton.show();
		},
		closeDialog:function()
		{
			self.closeButton.bind('mouseup', function(event){
				self.removeEverything();
			});
		},
		removeEverything: function()
		{
			var container = self.dumb_box.parent().parent();
			container.fadeOut(self.FADE_SLOW, function(){
				self.prevButton.css('display', 'none');
				self.index = 0;
				self.pictures_array = [];
				jq(this).empty().remove();
			});
		}
	};
	AreaGalleryManage.init();
}

jQuery.fn.center = function () {
    var heightRatio = (jQuery(window).height() != 0) 
            ? this.outerHeight() / jQuery(window).height() : 1;
    var widthRatio = (jQuery(window).width() != 0) 
            ? this.outerWidth() / jQuery(window).width() : 1;

    this.css({
        position: 'fixed',
        margin: 0,
        top: (50*(1-heightRatio)) + "%",
        left: (50*(1-widthRatio))  + "%"
    });

    return this;
};