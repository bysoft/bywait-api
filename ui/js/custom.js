// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');



// When DOM is fully loaded
jQuery(document).ready(function($) {



	/* ---------------------------------------------------------------------- */
	/*	Custom Functions
	/* ---------------------------------------------------------------------- */

	// Fixed scrollHorz effect
	$.fn.cycle.transitions.fixedScrollHorz = function($cont, $slides, opts) {

		$('.image-gallery-slider-nav a').on('click', function(e) {
			$cont.data('dir', '')
			if( e.target.className.indexOf('prev') > -1 ) $cont.data('dir', 'prev');
		});

		$cont.css('overflow', 'hidden');
		opts.before.push($.fn.cycle.commonReset);
		var w = $cont.width();
		opts.cssFirst.left = 0;
		opts.cssBefore.left = w;
		opts.cssBefore.top = 0;
		opts.animIn.left = 0;
		opts.animOut.left = 0-w;

		if( $cont.data('dir') === 'prev' ) {
			opts.cssBefore.left = -w;
			opts.animOut.left = w;
		}

	};

	// Slide effects for #portfolio-items-filter
	$.fn.slideHorzShow = function( speed, easing, callback ) { this.animate( { marginLeft : 'show', marginRight : 'show', paddingLeft : 'show', paddingRight : 'show', width : 'show' }, speed, easing, callback ); };
	$.fn.slideHorzHide = function( speed, easing, callback ) { this.animate( { marginLeft : 'hide', marginRight : 'hide', paddingLeft : 'hide', paddingRight : 'hide', width : 'hide' }, speed, easing, callback ); };

	// Test whether argument elements are parents of the first matched element
	$.fn.hasParent = function(objs) {
		objs = $(objs);
		var found = false;
		$(this[0]).parents().andSelf().each(function() {
			if ($.inArray(this, objs) != -1) {
				found = true;
				return false;
			}
		});
		return found;
	};

	/* end Custom Functions */

	/* ---------------------------------------------------------------------- */
	/*	Main Navigation
	/* ---------------------------------------------------------------------- */

	(function() {

		var $mainNav    = $('#main-nav').children('ul'),
			optionsList = '<option value="" selected>Navigate...</option>';

		// Regular nav
		$mainNav.on('mouseenter', 'li', function() {
			var $this    = $(this),
				$subMenu = $this.children('ul');
			if( $subMenu.length ) $this.addClass('hover');
			$subMenu.hide().stop(true, true).fadeIn(200);
		}).on('mouseleave', 'li', function() {
			$(this).removeClass('hover').children('ul').stop(true, true).fadeOut(50);
		});

		// Responsive nav
		$mainNav.find('li').each(function() {
			var $this   = $(this),
				$anchor = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';

			if( depth ) {
				while( depth > 0 ) {
					indent += '--';
					depth--;
				}
			}

			optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
		}).end()
		  .after('<select class="responsive-nav">' + optionsList + '</select>');

		$('.responsive-nav').on('change', function() {
			window.location = $(this).val();
		});

	})();

	/* end Main Navigation */

	/* ---------------------------------------------------------------------- */
	/*	Min-height
	/* ---------------------------------------------------------------------- */

	(function() {

		// Set minimum height so footer will stay at the bottom of the window, even if there isn't enough content
		$('#content').css( 'min-height', $(window).outerHeight(true) - parseInt( $('body').css('border-top-width') ) - $('#header').outerHeight(true) - $('#footer').outerHeight(true) - $('#footer-bottom').outerHeight(true) + 11 );

	})();

	/* end Min-height */

	/* ---------------------------------------------------------------------- */
	/*	Fancybox
	/* ---------------------------------------------------------------------- */

	(function() {

		// Images
		$('.single-image, .image-gallery').fancybox({
			'transitionIn'  : 'fade',
			'transitionOut' : 'fade',
			'titlePosition' : 'over'
		}).each(function() {
			$(this).append('<span class="zoom">&nbsp;</span>');
		});

		// Iframe
		$('.iframe').fancybox({
			'autoScale'     : false,
			'transitionIn'  : 'fade',
			'transitionOut' : 'fade',
			'type'          : 'iframe',
			'titleShow'     : false
		}).each(function() {
			$(this).append('<span class="zoom">&nbsp;</span>');
		});

	})();

	/* end Fancybox */

	/* ---------------------------------------------------------------------- */
	/*	Features Slider
	/* ---------------------------------------------------------------------- */

	(function() {

		var $slider = $('#features-slider');

		var url = '/photos/popular'
		$.ajax({
			url:url,
			type:'get',
			success:function(data){
				for (var i=0;i<8;i++){
					// console.log(data.photos[i].image_url)
					// console.log(data.photos[i].name + data.photos[i].image_url)
					$('#content.container .projects-carousel li a').length // img + span
					var projectAnchor = $('#content.container .projects-carousel li a')
						var newSrc = data.photos[i].image_url,
							newTxt = data.photos[i].name,
							newDesc = data.photos[i].description
						$('#content.container .projects-carousel li a').eq(i).children('img').attr('src',newSrc)
						$('#content.container .projects-carousel li a').eq(i).children('h5').text(newTxt)
						$('#content.container .projects-carousel li a').eq(i).children('span').text(newDesc)
				}
			}
		})


		$.ajax({
		  url:url,
		  type:'get',
		  success:function(data){
		  	// console.log(data)
		  	for (var i=0;i<5;i++){
			  	var imgSrc = data.photos[i].image_url.replace('/2.','/4.')
			    $('.slide>img').eq(i).attr('src',imgSrc).width('980')

			    $('.slide-content>h2').eq(i).text(data.photos[i].name)

			    $('.slide-content').eq(i).children('p').text(data.photos[i].description)

			    $('.slide-button>h5').eq(i).text(data.photos[i].name)
			    $('.slide-button>.description').eq(i).text(data.photos[i].description)
		  	}


		if( $slider.length ) {

			$('#features-slider').smartStartSlider({
				pos             : 0,
				hideContent     : true,
				timeout         : 3000,
				pause           : false,
				pauseOnHover    : true,
				type            : {
					mode        : 'random',
					speed       : 400,
					easing      : 'easeInOutExpo',
					seqfactor   : 100
				}
			});

		}



		  }
		})


		BY = (function(){

			var by = {
				init:function(){
					by.events()
					by.parseBBC.init()
          by.roviData.getCovers()
          by.video.youtube()
				var url = 'http://vimeo.com/api/v2/channel/serialboxpresents/videos.json'

			/*
        $.ajax({
				  url:url,
				  type:'get',
				  dataType:'jsonp',
				  success:function(data){
				    for (var i=0;i<8;i++){
			      	// console.log(data[i].title)
				      	// console.log(data)
				    	  $('.video-thumbs li').eq(i).find('a>h5').text(data[i].title)
					      $('.video-thumbs li').eq(i).find('a>img').attr({
					      	'src':data[i].thumbnail_medium
					      })
					      $('.video-thumbs li').eq(i).children('a').attr('data-videoid',data[i].id)
					    }
					  }
					})
      */
				},
        video:{
          youtube: function(dataArr){

              var url = 'http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?max-results=50&alt=json&format=1'
              dataArr = []

                  $.ajax({
                    url:url,
                    type:'get',
                    success:function(data){
                    // console.log(data)
                      //console.log(data.feed.entry)
                     // console.log(data.feed.entry.length)
                      $(data.feed.entry).each(function(){
                       //   console.log(this.title.$t)i
console.log(data)
                          dataArr.push({
                              title:this.title.$t,
                              thumb:this.media$group.media$thumbnail[1].url,
                              url:this.link[0].href,
                              videoid:''
                            })
                        })
                        // link[i].href
                        by.video.config = {
                          data:dataArr
                        }
                        // todo: iterate through data obj and fill dom
                        var dataObj = {title:'this title'}
                        var i = 0, listArr = [],

                            dataTpl = '<h5>{{title}}</h5v>'
                            var dataTpl = '<li class="jcarousel-item jcarousel-item-horizontal jcarousel-item-1 jcarousel-item-1-horizontal" style="float: left; list-style-type: none; list-style-position: initial; list-style-image: initial; " jcarouselindex="1"><a data-videoid="{{url}}" href="#!{{url}}" ><img src="{{thumb}}" alt=""><h5 class="title"></h5><span class="categories">{{title}}</span></a></li>'



                        $(by.video.config.data).each(function(){
                            var listSnippet = Mustache.render(dataTpl, by.video.config.data[i])
                              console.log(listSnippet)
                              $('.video-thumbs').append(listSnippet)
                              listArr.push(listSnippet)
                              i++
                            })
                          console.log(listArr)
                    }
                  })
          }
        },
        roviData:{
          init:function(){},
          getCovers:function(){
            //console.log('code here')
          }
        },
				parseBBC:{
					init:function(){
						by.parseBBC.getPhotos()
					},
					getPhotos:function(){
						var radio1Photos = '/v1/bbc/radio1/photos'
						$.ajax({
							url:radio1Photos,
							type:'get',
							success:function(data){
								//console.log(data)
								//console.log(data.galleries)
								var firstPhoto = data.galleries[0].recent_image_fullsize
								//console.log(firstPhoto)
								$('#features-slider-audio').append('<img style=max-width:100% src='+firstPhoto+' />')
                var photoTitle = data.galleries[0].gallery_title
                // $('.audio-photo-thumbs li a h5').text(photoTitle)

                for (var i=0;i<$('.audio-photo-thumbs li').length;i++){
                  var photoTitle = data.galleries[i].gallery_title
                  $('.audio-photo-thumbs li').eq(i).find('a').attr('href',data.galleries[i].galler_url)
                  $('.audio-photo-thumbs li').eq(i).find('a h5').attr('data-id',data.galleries[i].gallery_id).text(photoTitle)
                  $('.audio-photo-thumbs li').eq(i).find('img').attr('src',data.galleries[i].recent_image_thumbnail)
                  $('.audio-photo-thumbs li').eq(i).find('a span').text(data.galleries[i].created)
                }

							}
						})
					}
				},
				events:function(){
					$('.video-thumbs').find('li>a').live('click',function(e){
						e.preventDefault()
						console.log($(this).attr('data-videoid'))
            var videoId = $(this).attr('data-videoid').split('?v=')[1].split('&feature')[0]
						$('iframe').attr('src','http://www.youtube.com/embed/'+videoId)
					})
				},
				scrapeMenu:function(){
					var url = '/v1/vimeo/channels'
					$.ajax({
					  url:url,
					  type:'get',
					  success:function(data){
					    console.log($(data).find('#featured>ul *'))
					    $(data).find('#featured>ul img').remove()
					    // console.log($(data).find('#featured>ul img'))
					    var dataFeatNav = $(data).find('#featured>ul')
					    // console.log($(data).find('#featured>ul img').length)
					//    $(data).find('#featured>ul img').remove()

					    $('#main-nav li').eq(1).find('ul').append($(data).find('#featured>ul *'))
					    $(data).find('#featured>ul img').remove()

					  }
					})
					var links = $('.current').find('ul *')
					$('.current').find('ul').empty()
					// $('.current').find('ul').append(links)

				}
			}
			by.init()
      return by;
		}())






	})();

	/* end Features Slider */

	/* ---------------------------------------------------------------------- */
	/*	Logos Slider
	/* ---------------------------------------------------------------------- */

	(function() {

		var $slider = $('#logos-slider');

		if( $slider.length ) {

			$('#logos-slider').smartStartSlider({
				pos             : 0,
				hideContent     : true,
				contentPosition : 'center',
				timeout         : 3000,
				pause           : false,
				pauseOnHover    : true,
				type            : {
					mode        : 'random',
					speed       : 400,
					easing      : 'easeInOutExpo',
					seqfactor   : 100
				}
			});

		}

	})();

	/* end Logos Slider */

	/* ---------------------------------------------------------------------- */
	/*	Photos Slider
	/* ---------------------------------------------------------------------- */

	(function() {

		var $slider = $('#photos-slider');



// url = '/photos/popular'
// $.ajax({
//   url:url,
//   type:'get',
//   success:function(data){
//     console.log(data.photos)
//     $(data.photos).each(function(){
//       $('body').prepend('<img src=' + this.image_url.replace('/2.','/4.') + '/ >')

//     })
//   }
// })




		// if( $slider.length ) {

		// 	$('#photos-slider').smartStartSlider({
		// 		pos             : 0,
		// 		hideContent     : true,
		// 		contentPosition : 'bottom',
		// 		timeout         : 3000,
		// 		pause           : false,
		// 		pauseOnHover    : true,
		// 		type            : {
		// 			mode        : 'random',
		// 			speed       : 400,
		// 			easing      : 'easeInOutExpo',
		// 			seqfactor   : 100
		// 		}
		// 	});

		// }






	})();

	/* end Photos Slider */

	/* ---------------------------------------------------------------------- */
	/*	Projects Carousel & Post Carousel
	/* ---------------------------------------------------------------------- */

	(function() {

		var $carousel = $('.projects-carousel, .post-carousel,.video-thumbs,.audio-photo-thumbs');

		if( $carousel.length ) {

			var scrollCount;

			if( $(window).width() < 480 ) {
				scrollCount = 1;
			} else if( $(window).width() < 768 ) {
				scrollCount = 2;
			} else if( $(window).width() < 960 ) {
				scrollCount = 3;
			} else {
				scrollCount = 4;
			}

			$carousel.jcarousel({
				animation : 600,
				easing    : 'easeOutCubic',
				scroll    : scrollCount
			});

		}

	})();

	/* end Projects Carousel & Post Carousel */

	/* ---------------------------------------------------------------------- */
	/*	Image Gallery Slider
	/* ---------------------------------------------------------------------- */

	(function() {

		var $slider = $('.image-gallery-slider ul');

		if( $slider.length ) {

			// Run slider when all images are fully loaded
			$(window).load(function() {

				$slider.each(function(i) {
					var $this = $(this);

					$this.css('height', $this.find('li:first img').height() )
						 .after('<div class="image-gallery-slider-nav"> <a class="prev image-gallery-slider-nav-prev-' + i + '">Prev</a> <a class="next image-gallery-slider-nav-next-' + i + '">Next</a> </div>')
						 .cycle({
							 before: function(curr, next, opts) {
								 var $this = $(this);
								 // set the container's height to that of the current slide
								 $this.parent().stop().animate({ height: $this.height() }, opts.speed);
								 // remove temporary styles, if they exist
								 $('.ss-temp-slider-styles').remove();
							 },
							 containerResize : false,
							 easing          : 'easeInOutExpo',
							 fx              : 'fixedScrollHorz',
							 fit             : true,
							 next            : '.image-gallery-slider-nav-next-' + i,
							 pause           : true,
							 prev            : '.image-gallery-slider-nav-prev-' + i,
							 slideExpr       : 'li',
							 slideResize     : true,
							 speed           : 600,
							 timeout         : 0,
							 width           : '100%'
						 });

				});

				// Position nav
				var $arrowNav = $('.image-gallery-slider-nav a');
				$arrowNav.css('margin-top', - $arrowNav.height() / 2 );

				// Pause on nav hover
				$('.image-gallery-slider-nav a').on('mouseenter', function() {
					$(this).parent().prev().cycle('pause');
				}).on('mouseleave', function() {
					$(this).parent().prev().cycle('resume');
				})

			});

			// Resize
			$(window).on('resize', function() {
				$slider.css('height', $slider.find('li:visible img').height() );
			});

		}

	})();

	/* end Image Gallery Slider */

	/* ---------------------------------------------------------------------- */
	/*	Portfolio Filter
	/* ---------------------------------------------------------------------- */

	(function() {

		var $container = $('#portfolio-items');

		if( $container.length ) {

			var $itemsFilter = $('#portfolio-items-filter'),
				mouseOver;

			// Copy categories to item classes
			$('article', $container).each(function(i) {
				var $this = $(this);
				$this.addClass( $this.attr('data-categories') );
			});

			// Run Isotope when all images are fully loaded
			$(window).on('load', function() {

				$container.isotope({
					itemSelector : 'article',
					layoutMode   : 'fitRows'
				});

			});

			// Filter projects
			$itemsFilter.on('click', 'a', function(e) {
				var $this         = $(this),
					currentOption = $this.attr('data-categories');

				$itemsFilter.find('a').removeClass('active');
				$this.addClass('active');

				if( currentOption ) {
					if( currentOption !== '*' ) currentOption = currentOption.replace(currentOption, '.' + currentOption)
					$container.isotope({ filter : currentOption });
				}

				e.preventDefault();
			});

			$itemsFilter.find('a').first().addClass('active');
			$itemsFilter.find('a').not('.active').hide();

			$itemsFilter.on('mouseenter', function() {
				var $this = $(this);

				clearTimeout( mouseOver );

				// Wait 100ms before animating to prevent unnecessary flickering
				mouseOver = setTimeout( function() {
					$this.find('li a').stop(true,true).slideHorzShow(300);
				}, 100);
			}).on('mouseleave', function() {
				clearTimeout( mouseOver );

				$(this).find('li a').not('.active').stop(true,true).slideHorzHide(150);
			});

		}

	})();

	/* end Portfolio Filter */

	/* ---------------------------------------------------------------------- */
	/*	MediaElement
	/* ---------------------------------------------------------------------- */

	(function() {

		var $player = $('video, audio');

		if( $player.length ) {

			$player.mediaelementplayer({
				audioWidth  : '100%',
				audioHeight : '30px',
				videoWidth  : '100%',
				videoHeight : '100%'
			});

			// Fix for player, if in Image Gallery Slider
			$('.mejs-fullscreen-button').on('click', 'button', function() {

				if( $(this).hasParent('.image-gallery-slider ul') ) {

					// Minimize
					if( $(this).parent().hasClass('mejs-unfullscreen') ) {

						$(this).parents('.image-gallery-slider ul').css({
							'height'   : $(this).parents('.image-gallery-slider ul').height(),
							'overflow' : 'hidden',
							'z-index'  : ''
						});

					// Enlarge
					} else {

						// Add temporary styling so cycle slider won't screw up the height totally
						$('head').append('<style class="ss-temp-slider-styles"> .image-gallery-slider ul { height: ' + $(this).parents('.image-gallery-slider ul').css('height') + ' !important; } </style>')

						$(this).parents('.image-gallery-slider ul').css({
							'overflow' : 'visible',
							'z-index'  : '999'
						});

					}
				}

			});

			// Same thing but with an ESC key
			$(document).keyup(function(e) {

				// Minimize
				if (e.keyCode == 27) {

					$('.mejs-fullscreen-button').parents('.image-gallery-slider ul').css({
						'height'   : $('.mejs-fullscreen-button').parents('.image-gallery-slider ul').height(),
						'overflow' : 'hidden',
						'z-index'  : ''
					});

				}

			});

		}

	})();

	/* end MediaElement */

	/* ---------------------------------------------------------------------- */
	/*	FitVids
	/* ---------------------------------------------------------------------- */

	(function() {

		$('.container').each(function(){
			var selectors  = [
				"iframe[src^='http://player.vimeo.com']",
				"iframe[src^='http://www.youtube.com']",
				"iframe[src^='http://blip.tv']",
				"object",
				"embed"
			],
				$allVideos = $(this).find(selectors.join(','));

			$allVideos.each(function(){
				var $this = $(this);
				if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
				var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
				aspectRatio = height / $this.width();
				if(!$this.attr('id')){
					var videoID = 'fitvid' + Math.floor(Math.random()*999999);
					$this.attr('id', videoID);
				}
				$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
				$this.removeAttr('height').removeAttr('width');
			});
		});

	})();

	/* end FitVids */

	/* ---------------------------------------------------------------------- */
	/*	Google Maps
	/* ---------------------------------------------------------------------- */

	(function() {

		var $map = $('#map');

		if( $map.length ) {

			$map.gMap({
				address: 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
				zoom: 16,
				markers: [
					{ 'address' : 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia' }
				]
			});

		}

	})();

	/* end Google Maps */

	/* ---------------------------------------------------------------------- */
	/*	Accordion Content
	/* ---------------------------------------------------------------------- */

	(function() {

		var $container = $('.acc-container'),
			$trigger   = $('.acc-trigger');

		$container.hide();
		$trigger.first().addClass('active').next().show();

		var fullWidth = $container.outerWidth(true);
		$trigger.css('width', fullWidth);
		$container.css('width', fullWidth);

		$trigger.on('click', function(e) {
			if( $(this).next().is(':hidden') ) {
				$trigger.removeClass('active').next().slideUp(300);
				$(this).toggleClass('active').next().slideDown(300);
			}
			e.preventDefault();
		});

		// Resize
		$(window).on('resize', function() {
			fullWidth = $container.outerWidth(true)
			$trigger.css('width', $trigger.parent().width() );
			$container.css('width', $container.parent().width() );
		});

	})();

	/* end Accordion Content */

	/* ---------------------------------------------------- */
	/*	Content Tabs
	/* ---------------------------------------------------- */

	(function() {

		var $tabsNav    = $('.tabs-nav'),
			$tabsNavLis = $tabsNav.children('li'),
			$tabContent = $('.tab-content');

		$tabContent.hide();
		$tabsNavLis.first().addClass('active').show();
		$tabContent.first().show();

		$tabsNavLis.on('click', function(e) {
			var $this = $(this);

			$tabsNavLis.removeClass('active');
			$this.addClass('active');
			$tabContent.hide();

			$( $this.find('a').attr('href') ).fadeIn();

			e.preventDefault();
		});

	})();

	/* end Content Tabs */

	/* ---------------------------------------------------------------------- */
	/*	PHP Widgets
	/* ---------------------------------------------------------------------- */

	(function() {

		function fetchFeed( url, element ) {

			element.html('<img src="img/loader.gif" height="11" width="16" alt="Loading..." />');

			$.ajax({
				url: url,
				dataType: 'html',
				timeout: 10000,
				type: 'GET',
				error:
					function(xhr, status, error) {
						element.html( 'An error occured: ' + error );
					},
				success:
					function(data, status, xhr) {
						element.html( data );
					}
			});

		}

		// Latest Tweets
		var $tweetsContainer = $('.tweets-feed');
		if( $tweetsContainer.length ) fetchFeed( 'php/tweets.php', $tweetsContainer );

		// Latest Flickr Images
		var $flickrContainer = $('.flickr-feed');
		if( $flickrContainer.length ) fetchFeed( 'php/flickr.php', $flickrContainer );

	})();

	/* end PHP Widgets */

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	(function() {

		// Setup any needed variables.
		var $form   = $('.contact-form'),
			$loader = '<img src="img/loader.gif" height="11" width="16" alt="Loading..." />';

		$form.append('<div id="response" class="hidden">');
		var $response = $('#response');

		// Do what we need to when form is submitted.
		$form.on('click', 'input[type=submit]', function(e){

			// Hide any previous response text and show loader
			$response.hide().html( $loader ).show();

			// Make AJAX request
			$.post('php/contact-send.php', $form.serialize(), function( data ) {
				// Show response message
				$response.html( data );

				// Scroll to bottom of the form to show respond message
				var bottomPosition = $form.offset().top + $form.outerHeight() - $(window).height();
				if( $(document).scrollTop() < bottomPosition ) $('html, body').animate({ scrollTop : bottomPosition });
			});

			// Cancel default action
			e.preventDefault();
		});

	})();



	/* end Contact Form */

});
