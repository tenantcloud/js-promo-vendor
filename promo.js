$(document).ready(function() {
	promo._after();
	promo.sliderPricing();
	promo.sliderWebsite();
	promo.sliderQuestions();
	promo.sliderScreening();
	promo.sliderMaintenance();
	promo.headerScroll();
	promo.postHeaderScroll();
	promo.progressBar();
	promo.signUpEmail();

	initElementsAnimation();
	statusAnimation();
});

/*
 **	Init Element Animations
 */
function initElementsAnimation() {
	'use strict';

	if ($('.element_from_fade').length > 0 && $('.no_animation_on_touch').length === 0) {
		$('.element_from_fade').each(function() {
			var $this = $(this);

			$this.appear(
				function() {
					$this.addClass('element_from_fade_on');
				},
				{ accX: 0, accY: -100 }
			);
		});
	}

	if ($('.element_from_left').length > 0 && $('.no_animation_on_touch').length === 0) {
		$('.element_from_left').each(function() {
			var $this = $(this);

			$this.appear(
				function() {
					$this.addClass('element_from_left_on');
				},
				{ accX: 0, accY: -100 }
			);
		});
	}

	if ($('.element_from_right').length > 0 && $('.no_animation_on_touch').length === 0) {
		$('.element_from_right').each(function() {
			var $this = $(this);

			$this.appear(
				function() {
					$this.addClass('element_from_right_on');
				},
				{ accX: 0, accY: -100 }
			);
		});
	}

	if ($('.element_from_top').length > 0 && $('.no_animation_on_touch').length === 0) {
		$('.element_from_top').each(function() {
			var $this = $(this);

			$this.appear(
				function() {
					$this.addClass('element_from_top_on');
				},
				{ accX: 0, accY: -100 }
			);
		});
	}

	if ($('.element_from_bottom').length > 0 && $('.no_animation_on_touch').length === 0) {
		$('.element_from_bottom').each(function() {
			var $this = $(this);

			$this.appear(
				function() {
					$this.addClass('element_from_bottom_on');
				},
				{ accX: 0, accY: -100 }
			);
		});
	}

	if ($('.element_transform').length > 0 && $('.no_animation_on_touch').length === 0) {
		$('.element_transform').each(function() {
			var $this = $(this);

			$this.appear(
				function() {
					$this.addClass('element_transform_on');
				},
				{ accX: 0, accY: -100 }
			);
		});
	}
}

function imgload(src, callback) {
	var image = new Image();
	image.src = src;
	$(image).load(function() {
		callback();
	});
}

function statusAnimation() {
	var index = 0,
		statusArray = document.querySelectorAll('#elementItems .items-point');

	if (statusArray.length) {
		statusArray[0].classList.add('active');

		setInterval(function() {
			statusArray[index].classList.remove('active');
			index = (index + 1) % statusArray.length;
			statusArray[index].classList.add('active');
		}, 4000);
	}
}

var promo = {
	goUp: function() {
		var body = $('html, body');
		body.animate(
			{
				scrollTop: 0,
			},
			800
		);
		return false;
	},

	_after: function() {
		$(window).scroll(function() {
			var scrollTop = $(this).scrollTop();

			if (scrollTop > 400) {
				$('#go-up').addClass('show');
				setTimeout(function() {
					$('#go-up').addClass('anim');
				}, 100);
			} else {
				$('#go-up').removeClass('anim');
				$('#go-up').removeClass('show');
			}
		});
	},

	sliderPricing: function() {
		$('.carousel-pricing').carousel({
			interval: false,
		});
	},

	sliderWebsite: function() {
		$('.carousel-website').carousel({
			interval: 5000,
		});
	},

	sliderScreening: function() {
		$('.carousel-screening').carousel({
			interval: 3000,
		});
	},

	sliderMaintenance: function() {
		var sliderItems = document.querySelector('.carousel-inner'),
			sliderIndicators = document.querySelector('.carousel-indicators');

		$('.carousel-maintenance').carousel({
			interval: 5000,
		});

		if (sliderItems && sliderIndicators) {
			sliderItems.firstElementChild.classList.add('active');
			sliderIndicators.firstElementChild.classList.add('active');
		}
	},

	sliderQuestions: function() {
		$('.contact-questions-1').carousel({
			interval: 2500,
			pause: false,
		});

		$('.contact-questions-2').carousel({
			interval: 2500,
			pause: false,
		});

		$('.contact-questions-3').carousel({
			interval: 2500,
			pause: false,
		});
	},

	headerScroll: function() {
		var headerFixed = document.getElementById('headerFixed');

		if (headerFixed) {
			_checkScroll();

			window.addEventListener('scroll', function() {
				_checkScroll();
			});
		}

		function _checkScroll() {
			if ($(window).scrollTop() >= 1) {
				headerFixed.classList.add('is-scrolled');
			} else {
				headerFixed.classList.remove('is-scrolled');
			}
		}
	},

	postHeaderScroll: function() {
		var postHeader = document.getElementById('postHeader');
		var menuToggle = document.getElementById('ng-toggle');

		if (postHeader) {
			_checkScroll();

			window.addEventListener('scroll', function() {
				_checkScroll();
			});
		}

		function _checkScroll() {
			if ($(window).scrollTop() >= 350) {
				postHeader.classList.add('is-scrolled');
				menuToggle.classList.add('is-scrolled');
			} else {
				postHeader.classList.remove('is-scrolled');
				menuToggle.classList.remove('is-scrolled');
			}
		}
	},

	progressBar: function() {
		$(document).scroll(function (e) {
			var scrollAmount = $(window).scrollTop();
			var documentHeight = $(document).height();
			var windowHeight = $(window).height();
			var scrollPercent = (scrollAmount / (documentHeight - windowHeight)) * 100;
			var roundScroll = Math.round(scrollPercent);

			$('.progress-bar').css('width', scrollPercent + '%');
		});
	},

	signUpEmail: function() {
		var elementInput = document.getElementById('signUpInput');
		var elementButton = document.getElementById('signUpButton');

		if (elementInput && elementButton) {
			var baseHref = elementButton.href;

			elementInput.addEventListener('input', function(e) {
				elementButton.href = baseHref + '&email=' + e.target.value;
			});
		}
	},
};
