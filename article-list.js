/**
 * Created by knazar on 14.01.15.
 */
function ArticlesList(el){
	if(!el.get(0))return;
	this.el = el;
	this.articles = this.el.find('section');
	this.article_array = [];
	this.init();
	//console.log(this.articles);
}
ArticlesList.prototype = {
	init: function(){
		var t = this;
		if(_obj.isMobile)return;
		if(_obj.touch)return;
		this.articles.each(function(){
			t.article_array.push(new Article($(this)));
		});
	},
	doScroll:function(s){
		if(!this.el)return;
		for (var i = 0; i < this.article_array.length; i++) {
			this.article_array[i].doScroll(s);
		}
	},
	resetScroll:function(s){
		if(!this.el)return;
		for (var i = 0; i < this.article_array.length; i++) {
			this.article_array[i].resetScroll(s);
		}
	},
	resize: function(){
		if(!this.el)return;
		for (var i = 0; i < this.article_array.length; i++) {
			this.article_array[i].resize();
		}

	}
};
