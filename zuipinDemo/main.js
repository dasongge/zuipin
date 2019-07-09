console.log("加载完成");

/*
	配置路径
 */
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"parabola": "parabola",
		"banner": "banner",
		"ddh":'dh',
		"bannerbutton":"bannerbutton",
		"special":"special",
		"toutiao":"toutiao",
		"liebiao":"liebiao",
		"shopping":"shopping",
		"xiangqing":"xiangqing"
	},
	shim: {
		//jquer-cookie是依赖于jquery开发的
		"jquery-cookie": ["jquery"],
		//声明不遵从AMD规范的.js文件
		"parabola": {
			exports: "_"
		}
	}
})

//去用
require(["banner","dh","last","center","bannerbutton","special","toutiao","liebiao","shopping","xiangqing"],function(slide,ddh,last,content,bannerbutton,special,toutiao,liebiao,shopping,xiangqing){
	slide.banner();
	ddh.ddh();
	last.last();
	content.content();
	bannerbutton.bannerbutton();
	special.special();
	toutiao.toutiao();
	liebiao.liebiao();
	shopping.shopping();
	xiangqing.xiangqing();
})
