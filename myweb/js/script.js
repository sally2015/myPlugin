$(function(){
	
	var oby={}
	
	oby.event=function(){
		
		$('.mynav .language').mouseenter(function(){
				$('.mynav .language').find('ul').fadeIn()
		})
		$('.mynav .language').mouseleave(function(){
			$('.mynav .language').find('ul').fadeOut();
		});
	}
	oby.init=function(){
		
		//第一屏灯的动画
		$('.light_left').addClass('light_active');
		$('.light_right').addClass('light_active');
		
		oby.event();
	}
	oby.init();
})
