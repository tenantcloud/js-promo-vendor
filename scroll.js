_obj = {};

function setConstant(){
	_obj.win = $(window);
	_obj.doc = $(document);
	_obj.html = $('html');
	_obj.body = $('body');
	_obj.win_w = _obj.win.width();
	_obj.win_h = _obj.win.height();
	_obj.doc_h = _obj.doc.height();
	//_obj.ie = false;
	_obj.raf = null;
	_obj.touch = false;
	setMobileVariable();
	//if(_obj.html.hasClass('ie8'))_obj.ie = true;
}

var _articlesList, _scroll = 0, _easingScroll=0,_tempScroll = -1;
$(function(){
	setConstant();
	//
	var windowEvent, debounce;
	if (_obj.touch ) {
		windowEvent = 'orientationchange';
	} else {
		windowEvent = 'resize';
	}
	_obj.win.on(windowEvent, function () {
		onResize();
	});

	setTenant();

});
function setTenant(){
	_articlesList = new ArticlesList($('.parallax'));
	onResize();
}

function animloop() {
	_obj.raf = window.requestAnimationFrame(animloop);
	_easingScroll += (_scroll - _easingScroll) * 0.1;
	doScroll();
}
function doScroll(){
	if(Math.floor(_easingScroll) === _tempScroll)return;
	_tempScroll = Math.floor(_easingScroll);
	_articlesList.doScroll(_tempScroll);
}
function checkScroll(){
	if(_obj.isMobile){
		if(_obj.raf){
			_articlesList.resetScroll();
			_obj.win.off('scroll',onScroll);
			_obj.raf = null;
		}
	}else{
		if(!_obj.raf){
			_tempScroll = _easingScroll -1;
			animloop();
			_obj.win.on('scroll',onScroll);
		}
	}
}
function onScroll(){
	_scroll = _obj.win.scrollTop();
}


function onResize(){
	_obj.win_w = _obj.win.width();
	_obj.win_h = _obj.win.height();
	_obj.doc_h = _obj.doc.height();
	//
	setMobileVariable();
	_articlesList.resize();

	checkScroll();
}
function setMobileVariable(){
	if(_obj.win_w<833){
		_obj.isMobile = true;
		this.menu = document.getElementById('menu');
		classie.add(this.menu, 'gn-open-mobile');
	}else{
		_obj.isMobile = false;
		classie.remove(this.menu, 'gn-open-mobile');
	}

}
