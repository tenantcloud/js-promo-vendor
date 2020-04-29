var lazyInt;

lazyInt = function() {

	var placeholder = document.querySelectorAll('.placeholder-micro:not(.init)'),
		i = 0;

	while (i < placeholder.length) {
		// 1: load small image and show it
		var small = placeholder[i].querySelector('.simg'),
			img = new Image();

		img.onload = (function(i) {
			placeholder[i].classList.add('spinner');
			return function() {
				placeholder[i].querySelector('.simg').classList.add('loaded');
			}
		})(i);
		img.src = small.src;

		// 2: load large image
		var imgLarge = new Image();
		imgLarge.onload = (function(i) {
			return function() {
				placeholder[i].classList.add('init');
				placeholder[i].classList.remove('spinner');
				placeholder[i].querySelector('.limg').classList.add('loaded');
			}
		})(i);

		imgLarge.src = placeholder[i].getAttribute('data-large');
		imgLarge.classList.add('limg');
		// 3  show large image
		placeholder[i].appendChild(imgLarge);
		i++;
	}
};

window.onload = lazyInt;