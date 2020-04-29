$(document).ready(function() {
	promo._after();
	promo.sliderPricing();
	promo.sliderWebsite();
	promo.sliderQuestions();
	promo.sliderScreening();
	promo.sliderMaintenance();
	promo.usersMap();
	promo.autoScroll();
	promo.headerScroll();
	promo.signUpEmail();

	initElementsAnimation();
	initFormGroupDefault();
	memberEggs();
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

function initFormGroupDefault(context) {
	$('.form-group > .form-group-default', context).click(function() {
		$(this)
			.find('input')
			.focus();
	});

	if (!this.initFormGroupDefaultRun) {
		$('body').on('focus', '.form-group > .form-group-default :input', function() {
			$('.form-group > .form-group-default').removeClass('focused');
			$(this)
				.parents('.form-group > .form-group-default')
				.addClass('focused');
		});

		$('body').on('blur', '.form-group > .form-group-default :input', function() {
			$(this)
				.parents('.form-group > .form-group-default')
				.removeClass('focused');
			if ($(this).val()) {
				$(this)
					.closest('.form-group > .form-group-default')
					.find('label')
					.addClass('fade');
			} else {
				$(this)
					.closest('.form-group > .form-group-default')
					.find('label')
					.removeClass('fade');
			}
		});

		// Only run the above code once.
		this.initFormGroupDefaultRun = true;
	}
}

function imgload(src, callback) {
	var image = new Image();
	image.src = src;
	$(image).load(function() {
		callback();
	});
}

function memberEggs() {
	var throttle = false,
		ross = document.getElementById('teamPhoto');

	if (ross) {
		ross.addEventListener('click', function(evt) {
			var member = this;

			if (!throttle && evt.detail === 5) {
				member.className += ' active';
				throttle = true;

				setTimeout(function() {
					member.className = 'members-scroll';
					throttle = false;
				}, 2000);
			}
		});
	}
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

	goToEBookForm: function() {
		var body = $('html, body');
		var form = document.getElementById('eBookForm');
		var positionTop = form.getBoundingClientRect().top + pageYOffset - 10;

		body.animate(
			{
				scrollTop: positionTop,
			},
			800
		);

		setTimeout(function() {
			document.getElementById('ebook-name').focus();
		}, 800);

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

	/*
	 **	Marker animation on Contact Us page
	 */
	usersMap: function() {
		var controller = new ScrollMagic.Controller({});

		/*
		 **	Build scenes
		 */
		new ScrollMagic.Scene({ triggerElement: '#usersMap' }).setClassToggle('#usersMap', 'active').addTo(controller);
	},

	/** Auto scroll for team photo on About page */
	autoScroll: function() {
		var vm = this;
		var container = document.getElementById('teamPhoto');

		if (container) {
			var containerScrollWidth = container.scrollWidth;

			var startScrolling = function() {
				vm.scrollInterval = setInterval(function() {
					if (container.scrollLeft < containerScrollWidth) {
						container.scrollTo({ top: 0, left: container.scrollLeft + 1 });
					}
				}, 20);
			};

			startScrolling();

			container.addEventListener('mouseover', function() {
				clearInterval(vm.scrollInterval);
			});

			container.addEventListener('mouseout', function() {
				startScrolling();
			});
		}
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
