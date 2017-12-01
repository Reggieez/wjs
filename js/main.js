'use strict';

$(function(){
	function resize(){
		var windowWidth = $(window).innerWidth();
		//$(window).width() 另一种表示方式 
		var isSmallScreen = windowWidth < 768;
		$("#ad > .carousel-inner > .item").each(function(i,item){
			
			var imgSrc = isSmallScreen ? $(this).data("image-xs") : $(this).data("image-lg");
			$(this).css('backgroundImage','url("'+imgSrc+'")');
			// 不能用backgroud来设置 因为是一个综合的属性 
			//console.log($(item));
			//console.log($(this));
			//这里的$(this)和$(item)作用相同

			//因为我们需要小图时 尺寸等比例变化 所以小图时我们使用img方式
			if (isSmallScreen) {
				$(this).html('<img src="'+ imgSrc +'" alt="" />');
			}else{
				$(this).empty();
			}
		});

		/*用于调整界面缩放时特色模块文字溢出的问题
		第一次的项目仅给.yuan加了hidden-md达到同样效果*/
		$(".yuan").text("(元)");
		if(windowWidth < 1183 && windowWidth > 973){
			$(".yuan").empty();
			$(".panel-main > .panel-body h4").css("margin-bottom","0");
		}

		/*新闻部分样式响应式调整*/
		$("#news ul").css({"left":"0","margin-left":"0","padding-top":"0","padding-bottom":"0"});
		$("#news li").css("float","none");
		if(windowWidth < 751){
			$("#news li").css("float","left");
			$("#news ul").css({"left":"50%","margin-left":"-100px","padding-top":"10px","padding-bottom":"10px"});
			//$(selector).css({"color":"red","font-weight":"bold"})   
			//设置多个属性
		}

		/*合作伙伴响应式调整*/
		$("#partner ul").css({"left":"0","margin-left":"0"});
		// $("#partner .partners").css("width","750px");
		if(windowWidth < 751){
			$("#partner ul").css({"left":"50%","margin-left":"-200px"});
			// $("#partner .partners").css("width","350px");
		}

	}

	$(window).on('resize',resize).trigger('resize');


	/*tooltips提示框需要自行加js代码*/
	$('[data-toggle="tooltip"]').tooltip();


	/*新闻标题的切换*/
	$("#news .nav-pills li").on("click",function(){
		$("#news .news_title").empty();
		$("#news .news_title").text($(this).data("title"));
	});


	/*tablan横向滚动条*/
	var $ulContainer = $("#products .nav-tabs");
	var width = 20;
	$ulContainer.children().each(function(index,element){
		// width += $(element).width();
		width += element.clientWidth;
	});
	if(width > $(window).width()){
		$ulContainer.css("width",width).parent().css("overflow-x","scroll");
	}

	
	/*轮播图触摸滑动*/
	var $carousel = $('.carousel');
	var xStart ,xEnd;
	var xDistance = 0;
	var distance = 50;
	$carousel.on("touchstart",function(e){
		xStart = e.originalEvent.touches[0].clientX;
	});
	$carousel.on("touchmove",function(e){
		xEnd = e.originalEvent.touches[0].clientX;
	});
	$carousel.on("touchend",function(e){
		xDistance = xEnd - xStart;
		if( Math.abs(xDistance) > distance ){
			xDistance > 0 ? $carousel.carousel('prev') : $carousel.carousel('next');
		}
			

	});


});

