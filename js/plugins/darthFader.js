//Tkiddle Fading Carousel with Pagination
;(function ($){

	$.fn.darthFader = function ( options ) {

	settings = $.extend({
		slideWrap : undefined,
		controls : undefined,
		pagination : false,
		thumbPopUp : false,
		speed :  400,
		nextButton : '#next',
		prevButton : '#prev',
		auto : true,
		autoSpeed : (options.speed * 6)
	}, options);

	var	slider = $(this),
		imgs = slider.find('img'),
		counter = 0,
		inProgress = false,
		methods = {

			nextImg : function () {
				
				++counter;
	
				if(counter === imgs.length){
					counter = 0;
				}
				imgs.eq(counter).fadeIn(settings.speed);
				imgs.eq(counter - 1).fadeOut(settings.speed, function () {
					inProgress = false;
				});
				methods.activeClasses();
			},
			prevImg : function () {
				imgs.eq(counter).fadeOut(settings.speed);

				--counter;

				imgs.eq(counter).fadeIn(settings.speed, function (){
					inProgress = false;
				});		
				if(counter === -1){
					counter = imgs.length -1;
				}
				methods.activeClasses();
			},
			pagination : function () {
				var pagiImg;
				
				$(settings.slideWrap).append('<ol id="lf_pagination"></ol>');
				$('#lf_pagination').hide();
				
				for(var i = 0; i < imgs.length; i++){

					var imgSrc = slider.find('img').eq(i).attr('src');
						paginationContent = '';

					settings.thumbPopUp ? paginationContent = (i+1) + '<img class="lf_pagination_img" src="'+ imgSrc +'" />' : paginationContent = (i+1);			
					
					$('#lf_pagination').append('<li class="lf_pagination_item">'+ paginationContent +'</li>').fadeIn(settings.speed);
				}

				if(settings.thumbPopUp){
					$('.lf_pagination_item').hover( function (){
						 
						var paginationLeft = $(this).offset().left,
							paginationTop = $(this).offset().top;

							pagiImg = $(this).find('img');

						pagiImg.show().animate({width:'65px'}, 100).offset({top: (paginationTop - 75), left:paginationLeft - (65 / 2.5)});

					}, function (){

						pagiImg.animate({width:'50px'}, 100, function (){
							$(this).hide()
						});

					}); 

				}

				$('#lf_pagination').find('li:eq(0)').addClass('lf_active');
				
				$('.lf_pagination_item').click( function (){
				
					var newSlide =  slider.find('img').eq($(this).index()),
						currentSlide = slider.find('img:visible');
					
					if ($(this).index() === counter || inProgress) {
						return;
					} else {
						inProgress = true;
					} 

					counter = $(this).index();
			
					newSlide.fadeIn(settings.speed);
					currentSlide.fadeOut(settings.speed, function (){
						inProgress = false;
					});
					methods.activeClasses();
				});

			},
			activeClasses : function () {
				$('#lf_pagination li').removeClass('lf_active');
				$('#lf_pagination li').eq(counter).addClass('lf_active');
			}
		};

		$(settings.controls).fadeIn();

		slider.find('img:gt(0)').hide();

		$(settings.nextButton).click( function () { 

			if (inProgress) {
				return;
			} else {
				inProgress = true;
			}
			methods.nextImg(); 
		});

		$(settings.prevButton).click( function () { 
			if (inProgress) {
				return;
			} else {
				inProgress = true;
			} 
			methods.prevImg(); 
		});
		if(settings.pagination){
			methods.pagination();
		}
		
		if(settings.auto){
			var doLazyFader = setInterval(methods.nextImg, (settings.autoSpeed));

			$(settings.slideWrap).hover( function () {
				clearInterval(doLazyFader);
			}, function (){
				doLazyFader = setInterval(methods.nextImg, (settings.autoSpeed));			
			});
		}
		
	}
})(jQuery);