(function ($) {
	'use strict';
	var Promo = function () {
		this.VERSION = "1.1.0";
		this.AUTHOR = "TenantCloud";
		this.SUPPORT = "support@tenantcloud.com";
		this.pageScrollElement = 'html, body';
		this.$body = $('body');
	};

	Promo.prototype.initAutoImageScroller = function () {
		$('[data-pages="auto-scroll"]').each(function () {
			var y = 0;
			var interval;
			var Screen = $(this).find('.iphone-border');
			var img = Screen.find('img');

			var endOfImage = false;
			var scroll = function () {
				var screenHeight = Screen.height();
				var swipeDistance = screenHeight / 2;
				if (y - swipeDistance <= -img.height() + screenHeight) {
					y = -img.height() + screenHeight;
					endOfImage = true;
				} else {
					y -= swipeDistance;
				}
				img.css({'transform': 'translateY(' + y + 'px)'});
				if (endOfImage) {
					y = 0;
					clearInterval(interval);
					setTimeout(function () {
						img.css({'transform': 'translateY(' + y + 'px)'});
						endOfImage = false;
						interval = setInterval(scroll, 1000);
					}, 2000);
				}
			};
			interval = setInterval(scroll, 1000);
		})
	};

	Promo.prototype.init = function () {
		this.initAutoImageScroller();
	};

	$.Promo = new Promo();
	$.Promo.Constructor = Promo;

})(window.jQuery);

(function ($) {
	'use strict';
	var Float = function (element, options) {
		this.$element = $(element);
		this.options = $.extend(true, {}, $.fn.pgFloat.defaults, options);
		var _this = this;
		var _prevY;

		function update() {
			var element = _this.$element;
			var w = $(window).scrollTop();
			var translateY = (w - element.offset().top) * _this.options.speed;
			var delay = _this.options.delay / 1000;
			var curve = _this.options.curve;
			var maxTopTranslate = _this.options.maxTopTranslate;
			var maxBottomTranslate = _this.options.maxBottomTranslate;
			if (maxTopTranslate == 0) {
				if (element.offset().top + element.outerHeight() < w)return;
			}
			if (maxBottomTranslate == 0) {
				if (element.offset().top > w + $(window).height())return;
			}
			if (_prevY < translateY) {
				if (maxTopTranslate != 0 && Math.abs(translateY) > maxTopTranslate)return;
			} else {
				if (maxBottomTranslate != 0 && Math.abs(translateY) > maxBottomTranslate)return;
			}
			element.css({
				'transition': 'transform ' + delay + 's ' + curve,
				'transform': 'translateY(' + translateY + 'px)',
			});
			_prevY = translateY;
		}

		$(window).bind('scroll', function () {
			update()
		});
		$(window).bind('load', function () {
			update()
		});
	};

	Float.VERSION = "1.0.0";
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('pgFloat');
			var options = typeof option == 'object' && option;
			if (!data)$this.data('pgFloat', (data = new Float(this, options)));
			if (typeof option == 'string')data[option]();
		})
	}

	var old = $.fn.pgFloat;
	$.fn.pgFloat = Plugin;
	$.fn.pgFloat.Constructor = Float;
	$.fn.pgFloat.defaults = {topMargin: 0, bottomMargin: 0, speed: 0.1, delay: 1000, curve: 'ease'};
	$.fn.pgFloat.noConflict = function () {
		$.fn.pgFloat = old;
		return this;
	};

	$(window).on('load', function () {
		$('[data-pages="float"]').each(function () {
			var $pgFloat = $(this);
			$pgFloat.pgFloat($pgFloat.data())
		});
	});

})(window.jQuery);

(function ($) {
	'use strict';
	var Header = function (element, options) {
		this.$body = $('body');
		this.$element = $(element);
		this.options = $.extend(true, {}, $.fn.header.defaults, options);
		if (this.$element.attr('data-pages-header') == "autoresize")
			this.options.autoresize = true;
		if (this.$element.attr('data-pages-header') != null)
			this.options.minimizedClass = this.options.minimizedClass + ' ' + this.$element.attr('data-pages-resize-class');
	};

	Header.prototype.updateAffix = function () {
		if (this.$element.attr('data-pages-autofixed') == "true") {
			this.$element.affix({offset: this.$element.offset().top})
		}
	};
	Header.prototype.addMinimized = function () {
		if (!this.$element.hasClass(this.options.minimizedClass)) {
			this.$element.addClass(this.options.minimizedClass);
			if (this.$element.hasClass(this.options.m_btn)) {
				this.$element.addClass('btn-default--green');
				this.$element.removeClass('btn-default--white');
			}
		}
	};
	Header.prototype.removeMinimized = function () {
		this.$element.removeClass(this.options.minimizedClass);
		if (this.$element.hasClass(this.options.m_btn)) {
			this.$element.removeClass('btn-default--green');
			this.$element.addClass('btn-default--white');
		}
	};

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('pg.header');
			var options = typeof option == 'object' && option;
			if (!data)$this.data('pg.header', (data = new Header(this, options)));
			if (typeof option == 'string')data[option]();
		})
	}

	var old = $.fn.header;
	$.fn.header = Plugin;
	$.fn.header.Constructor = Header;
	$.fn.header.defaults = {duration: 350, autoresize: false, minimizedClass: 'minimized', m_btn: 'muduleBtn'};
	$.fn.header.noConflict = function () {
		$.fn.header = old;
		return this;
	};

	$(window).on('load', function () {
		$('[data-pages="header"]').each(function () {
			var $header = $(this);
			$header.header($header.data())
		});
	});

	$(window).on("scroll", function () {
		var ScrollTop = parseInt($(window).scrollTop());
		if (ScrollTop > 1) {
			$('[data-pages="header"]').header('addMinimized');
			$('[data-pages="header-btn"]').header('addMinimized');

		} else {
			if (ScrollTop < 10) {
				$('[data-pages="header"]').header('removeMinimized');
				$('[data-pages="header-btn"]').header('removeMinimized');
			}
		}
	});
})(window.jQuery);

(function ($) {
	'use strict';
	var Parallax = function (element, options) {
		this.$element = $(element);
		this.$body = $('body');
		this.options = $.extend(true, {}, $.fn.parallax.defaults, options);
		this.$coverPhoto = this.$element.find('.cover-photo');
		this.$content = this.$element.find('.inner');
		if (this.$coverPhoto.find('> img').length) {
			var img = this.$coverPhoto.find('> img');
			this.$coverPhoto.css('background-image', 'url(' + img.attr('src') + ')');
			img.remove();
		}
		this.translateBgImage();
	};
	Parallax.VERSION = "1.0.0";
	Parallax.prototype.animate = function (translate) {
		var scrollPos;
		var pagecoverHeight = this.$element.height();
		var opacityKeyFrame = pagecoverHeight * 50 / 100;
		var direction = 'translateX';
		scrollPos = $(window).scrollTop();
		if (this.$body.hasClass('mobile')) {
			scrollPos = -(translate);
		}
		direction = 'translateY';
		this.$coverPhoto.css({'transform': direction + '(' + scrollPos * this.options.speed.coverPhoto + 'px)'});
		this.$content.css({'transform': direction + '(' + scrollPos * this.options.speed.content + 'px)',});
		this.translateBgImage();
	};
	Parallax.prototype.translateBgImage = function () {
		var scrollPos = $(window).scrollTop();
		var pagecoverHeight = this.$element.height();
		if (this.$element.attr('data-pages-bg-image')) {

			var relativePos = this.$element.offset().top - scrollPos;
			if (relativePos > -pagecoverHeight && relativePos <= $(window).height()) {
				var displacePerc = 100 - ($(window).height() - relativePos) / ($(window).height() + pagecoverHeight) * 100;
				this.$element.css({'background-position': 'center ' + displacePerc + '%'});
			}
		}
	};
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('pg.parallax');
			var options = typeof option == 'object' && option;
			if (!data)$this.data('pg.parallax', (data = new Parallax(this, options)));
			if (typeof option == 'string')data[option]();
		})
	}

	var old = $.fn.parallax;
	$.fn.parallax = Plugin;
	$.fn.parallax.Constructor = Parallax;
	$.fn.parallax.defaults = {speed: {coverPhoto: 0.3, content: 0.17}}
	$.fn.parallax.noConflict = function () {
		$.fn.parallax = old;
		return this;
	};
	$(window).on('load', function () {
		$('[data-pages="parallax"]').each(function () {
			var $parallax = $(this);
			$parallax.parallax($parallax.data())
		})
	});
	$(window).on('scroll', function () {
		$('[data-pages="parallax"]').parallax('animate');
	});
})(window.jQuery);
