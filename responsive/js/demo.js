
jQuery(document).ready(function($){
	
	var $demo = $('.demo-container');
	var $controls = $demo.find('.demo-controls');
	var $colorOpsText = $demo.find('.color-ops');
	$controls.hide();
	
	if ( $.browser.msie ) {
  		if(parseInt($.browser.version ) < 9 ){
  			$colorOpsText.hide();
  			$('.demo-label').hide();
  		}
	}
	
	$('.demo-tab').click(function(e){
		e.preventDefault();
		
		$controls.toggle(500);
		$colorOpsText.fadeToggle(500);
		//$demo.toggleClass('demo-open');		
	});
	
	$('#demo-bkg-smoky').click(function(e){
		e.preventDefault();
		$('body').addClass('bkg-smoky').removeClass('bkg-fiber');
	});
	$('#demo-bkg-white').click(function(e){
		e.preventDefault();
		$('body').removeClass('bkg-smoky').removeClass('bkg-fiber');
	});
	$('#demo-bkg-fiber').click(function(e){
		e.preventDefault();
		$('body').addClass('bkg-fiber').removeClass('bkg-smoky');
	});
	
	var $body = $('body');
	$body.data('skinClass', 'skin-red');
	$('.demo-skin').click(function(e){
		e.preventDefault();
	
		var newClass = $(this).attr('data-skinClass');
		$body
			.removeClass($body.data('skinClass'))
			.addClass(newClass)
			.data('skinClass', newClass);
	});
	
	$('#toggle-demo-controls').click(function(e){
		e.preventDefault();
		$('body').toggleClass('demo-hide');
	});
	
});
