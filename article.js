/**
 * Created by knazar on 14.01.15.
 */
function Article(el) {
	if (!el.get(0)) return;
	this.el = el;
	this.randomTop = 0;

	this.init();
}
Article.prototype = {
	init: function() {
		if (this.el.hasClass('shadow')) {
			this.title = this.el.find('.title');
		}

		if (this.el.find('.title').get(0) && !this.title) {
			this.scrollable = this.el.find('.title');
		}
	},

	doScroll: function(scrollTop) {
		if (!this.el) return;
		var s = (this.top - scrollTop) / _obj.win_h + 0;

		if (s > 1) s = 1;
		if (s < 0) s = 0;

		if (this.scrollable) {
			this.animeScrollable(s);
		}
		if (this.title) {
			this.scrollShowcase(-scrollTop);
		}
		if (this.randomTop) this.scrollEl(s);
	},
	scrollShowcase: function(scrollTop) {
		this.title.css({
			'-webkit-transform': 'translate3d(0,' + scrollTop / 2 + 'px,0)',
			'-moz-transform': 'translate3d(0,' + scrollTop / 2 + 'px,0)',
			'-ms-transform': 'translate3d(0,' + scrollTop / 2 + 'px,0)',
			'-o-transform': 'translate3d(0,' + scrollTop / 2 + 'px,0)',
			transform: 'translate3d(0,' + scrollTop / 2 + 'px,0)',
		});
		//
	},
	scrollEl: function(s) {
		this.el.css({ 'margin-top': 32 + this.randomTop * s });
	},
	resetScroll: function() {
		if (this.scrollable) {
			this.resetScrollable();
		}
		if (this.title) {
			this.resetSlideshow();
		}
		this.el.css({ 'margin-top': 0 });
	},
	animeScrollable: function(s) {
		var scroll = s * this.height;
		//console.log(this.scrollable);
		this.scrollable.css({
			'-webkit-transform': 'translate3d(0,' + scroll + 'px,0)',
			'-moz-transform': 'translate3d(0,' + scroll + 'px,0)',
			'-ms-transform': 'translate3d(0,' + scroll + 'px,0)',
			'-o-transform': 'translate3d(0,' + scroll + 'px,0)',
			transform: 'translate3d(0,' + scroll + 'px,0)',
		});
	},
	resetSlideshow: function() {
		this.title.css({
			'-webkit-transform': 'translate3d(0,0,0)',
			'-moz-transform': 'translate3d(0,0,0)',
			'-ms-transform': 'translate3d(0,0,0)',
			'-o-transform': 'translate3d(0,0,0)',
			transform: 'translate3d(0,0,0)',
		});
	},
	resetScrollable: function() {
		this.scrollable.css({
			'-webkit-transform': 'translate3d(0,0,0)',
			'-moz-transform': 'translate3d(0,0,0)',
			'-ms-transform': 'translate3d(0,0,0)',
			'-o-transform': 'translate3d(0,0,0)',
			transform: 'translate3d(0,0,0)',
		});
	},
	resize: function() {
		if (!this.el) return;
		this.height = 300;
		this.top = this.el.offset().top - 200;
	},
};
