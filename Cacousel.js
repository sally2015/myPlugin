//必须在轮播图片上加上carousel类，carousel 中的图片以定位形式排版
//控制的序列上加dot类
//依赖于jquery开发
(function(w){//函数自执行
	
	
	function Carousel(options){
		
		this.setting={//默认参数
			delay:3000,
			eventWay:'mouseover',
			moveWay:'horizontal'
		}
		
		this.$picList=$('.carousel');
		this.$dotList=$('.dot');
		this.$aDotLi=this.$dotList.find('li');
		this.$aLi=$('.carousel>li');
		
		this.nowIndex=this.$dotList.find('.active').index();
		if(this.nowIndex>=this.$aDotLi.size()){
			this.prevIndex=0;
		}else{
			this.prevIndex=this.nowIndex-1;
		}
		
		

		
		$.extend(this.setting, options);
		this.init();
		this.picEvent();
		this.myInterval();
	}
	
	Carousel.prototype.init=function(){
		var self=this;
		if(this.setting.moveWay=='horizontal'){
			
			$.each(this.$aLi, function(index,item) {
				
				if(index!=self.nowIndex){
					$(item).css('z-index',1).css({left:'100%'});
					
				}else {
					$(item).css('z-index',5).css({left:'50%'});
				}
			});
		}else if(this.setting.moveWay=='vertical'){
			
			$.each(this.$aLi, function(index,item) {
				
				if(index!=self.nowIndex){
					$(item).css('z-index',1).css({top:'-100%'});
					
				}else {
					$(item).css({top:'0%'});
				}
			});
		}
		
	}
	
	Carousel.prototype.picMove=function(nowIndex){
		
		
		var self=this;
		self.nowIndex=nowIndex;

		console.log(self.nowIndex);
		console.log(self.prevIndex);
		if(self.setting.moveWay=='horizontal'){
			
			$.each(this.$aLi, function(index,item) {//horizontal方式move
				
				if(self.nowIndex==self.prevIndex){
					return;
				}
				if(index==self.nowIndex){
					
					$(item).css('z-index',5).animate({left:'50%'});
					
				
					
				}else if(index==self.prevIndex){
					
					$(item).css('z-index',1).animate({'left':'-100%'},function(){
						
						$(this).css('left','100%');
					});
				
				}
			
			});
			
		}else if(self.setting.moveWay=='vertical'){//vertical方式move
			
			$.each(this.$aLi, function(index,item) {
			
				if(index==self.nowIndex){
				
					$(item).css('z-index',5).stop(true,true).animate({top:'0%'});
					
				}else if(index==self.prevIndex){
				
					$(item).css('z-index',1).stop(true,true).animate({top:'100%'},600,function(){
						
						$(this).css('top','-100%');
					});
				}
			
			});
			
		}else{
			$.each(this.$aLi, function(index,item) {//opacity方式move
			
				if(index==self.nowIndex){
				
					$(item).css('z-index',5).animate({opacity:1});
				}else if(index==self.prevIndex){
					
					$(item).css('z-index',1).animate({opacity:0});
					
				}
				
					
			
			});
		}
		
		
	}
	Carousel.prototype.picEvent=function(){
		
		
		var self=this;
		this.$aDotLi.bind(self.setting.eventWay,function(){
			
			self.prevIndex=self.nowIndex;
			
			self.nowIndex=$(this).index();
			
			self.picMove(self.nowIndex);
			
			
			self.changeDot();
			
			
			
		});
	}
	Carousel.prototype.changeDot=function(){
		
		var self=this;
		
		$.each(self.$aDotLi,function(index,item){
			if(index==self.nowIndex){
				$(item).addClass('active');
					
			}else{
				$(item).removeClass('active');
			}
		});
	}
	Carousel.prototype.myTimer=null;
	
	Carousel.prototype.myInterval=function(){
		
		var self=this;
		var temp;
		this.myTimer=setInterval(intervalFn,this.setting.delay);
		
		this.$picList.bind('mouseenter',function(){
			
			clearInterval(self.myTimer)
			
		}).bind('mouseleave',function(){
		
			self.myTimer=setInterval(intervalFn,self.setting.delay);
		
		});
		function intervalFn(){
			
			self.prevIndex=self.nowIndex;
			
			self.nowIndex++;

			if(self.nowIndex>=self.$aDotLi.length){
				self.nowIndex=0;
			}
			
			self.changeDot();
			self.picMove(self.nowIndex);

			
			
		}
	}
	
	w.Carousel=Carousel;
	
})(window)








