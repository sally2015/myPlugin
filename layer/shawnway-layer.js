(function(w){
    'use strict';
   	var layer={}
    layer.init=function(){
        
        if(document.getElementById('layer_oby')){//如果已经存在的情况
            this.oLayer.parentNode.removeChild(this.oLayer)
            
        }
        this.oLayer=document.createElement('div');
        this.oLayer.id='layer_oby';
        this.oLayer.className='layer-outer';
     	this.oLayer.style.opacity='0';
        
         document.body.appendChild(this.oLayer);
    }
    layer.timerout=null;//div消失的定时器
    layer.msg=function(msg,time){//消息提示
        var self=this;
        var time=time===undefined?2000:time;//默认两秒钟后消失
        
        this.init();
        if(layer.timerout){
        	clearInterval(layer.timerout);
        }
        this.oLayer.innerHTML=msg;
        
        
        //添加内容后才设置样式
        this.setMsgCss();
        
        document.body.appendChild(this.oLayer);
       
       
        
       	layer.tool.opacityMove(0,1,this.oLayer,function(){
       		
            if(layer.timerout){//防止形成时间队列
            	clearTimeout(layer.timerout);
            }
           	layer.timerout=setTimeout(function(){
                layer.tool.opacityMove(1,0,self.oLayer,function(){
                    	self.oLayer.style.display='none';
                    	self.oLayer.parentNode.removeChild(self.oLayer);

                });
            },time);
        });
        
    }
   	layer.alert=function(msg){
        var self=this;
       	this.oTitle=document.createElement('h4');
       	this.oP=document.createElement('p');
       	this.oTitle.id='title_oby';
        this.init();
        
        if(layer.timerout){
        	clearInterval(layer.timerout);
        }
        if(msg instanceof Object){
        	if(msg.title){
        		this.oTitle.innerHTML=msg.title;
        	}
        	if(msg.isDrag===false){//是否设置为可拖拽
        		layer.isDrag=false;
        	}else{
        		layer.isDrag=true;
        	}
        	this.oP.innerHTML=msg.content;
        }else{
        	this.oTitle.innerHTML='标题';
        	this.oP.innerHTML=msg;
        	layer.isDrag=true;
        }
        
       	
       	this.oLayer.appendChild(this.oTitle);
       	this.oLayer.appendChild(this.oP);
        //添加内容后才设置样式

      	this.setAlertCss();//设置提示层
      	this.setClose();//设置关闭按钮
        this.setConfirmBtn();//设置确认按钮
        
        this.oLayer.addEventListener(layer.closeEvent,closeFn);
        function closeFn(ev){//确认和关闭按钮要执行的函数
            
            if(ev.target.id=='close_oby'||ev.target.id=='confirm_oby'){
            	
                layer.tool.opacityMove(1,0,self.oLayer,function(){
                	if(self.oLayer&&self.oLayer.parentNode){//判断是否存在
                		self.oLayer.style.display='none';
                		self.oLayer.parentNode.removeChild(self.oLayer);
                	}
                	
                	
                });
                
                
            }
        }
    	layer.tool.opacityMove(0,1,this.oLayer);
    	
    	this.dragEvent()//执行可拖拽事件函数
    	
   	}
    layer.setClose=function(){//设置关闭按钮
        
        this.closeBtn=document.createElement('span');
        this.closeBtn.innerHTML='×';
        this.closeBtn.id='close_oby';
        this.closeBtn.className='close-layer';
        this.oLayer.appendChild(this.closeBtn);
        
        //设置样式
        this.closeBtn.style.position='absolute';
        this.closeBtn.style.top='10px';
        this.closeBtn.style.right='10px';
        this.closeBtn.style.fontSize='22px';
        this.closeBtn.style.fontWeight='bold';
        this.closeBtn.style.cursor='pointer';
        
        
    }
    layer.setConfirmBtn=function(){//设置确认按钮
    	
    	this.confirmBtn=document.createElement('span');
        this.confirmBtn.innerHTML='确认';
        this.confirmBtn.id='confirm_oby';
        this.confirmBtn.className='confirm-btn-layer';
        this.oLayer.appendChild(this.confirmBtn);
    	
    	 //设置样式
        this.confirmBtn.style.position='absolute';
        this.confirmBtn.style.bottom='10px';
        this.confirmBtn.style.right='24px';
        this.confirmBtn.style.fontSize='12px';
        this.confirmBtn.style.fontWeight='bold';
        this.confirmBtn.style.cursor='pointer';
        this.confirmBtn.style.padding='8px 18px';
        this.confirmBtn.style.border='1px solid #ddd';
    	
    }

    layer.setMsgCss=function(){//设置提示层样式
         var currentWidth,currentHeight;
        
        
        this.oLayer.style.maxWidth='300px';
        this.oLayer.style.padding='20px 30px';
       
        this.oLayer.style.position='absolute';
      
        this.oLayer.style.wordBreak='break-word';
        currentWidth=parseInt(layer.tool.getStyle(this.oLayer,'width'));
        currentHeight=parseInt(layer.tool.getStyle(this.oLayer,'height'));
        
        this.oLayer.style.marginLeft=-(currentWidth/2+30)+'px';//加上pad
        this.oLayer.style.marginTop=-(currentHeight/2+20)+'px';//加上pad
        this.oLayer.style.top='50%';
        this.oLayer.style.left='50%';
        this.oLayer.style.background='rgba(0,0,0,0.8)';
         this.oLayer.style.boxShadow='none';
        this.oLayer.style.color='#fff';
        
    }
    layer.setAlertCss=function(){//设置弹框样式
    	
    	var currentWidth,currentHeight;
    	
    	this.oLayer.style.border='1px solid #eee'
    	this.oLayer.style.minWidth='260px';
    	this.oLayer.style.maxWidth='360px';
    	this.oLayer.style.minHeight='160px';
    	this.oLayer.style.color='#333';
    	this.oLayer.style.position='absolute';
    	this.oLayer.style.wordBreak='break-word';
    	this.oLayer.style.background='#fff';
    	currentWidth=parseInt(layer.tool.getStyle(this.oLayer,'width'));
        currentHeight=parseInt(layer.tool.getStyle(this.oLayer,'height'));
    	this.oLayer.style.marginLeft=-(currentWidth/2)+'px';
        this.oLayer.style.marginTop=-(currentHeight/2)+'px';
        this.oLayer.style.top='50%';
        this.oLayer.style.left='50%';
        this.oLayer.style.boxShadow='1px 1px 50px rgba(0,0,0,.3)';
        
    	this.oTitle.style.background='#F8F8F8';
    	this.oTitle.style.lineHeight='30px';
    	this.oTitle.style.margin=0;
    	this.oTitle.style.padding='5px 20px';
    	this.oTitle.style.borderBottom='1px solid #eee';
    	this.oTitle.style.cursor='pointer';
    	
    	this.oTitle.style.fontSize='14px';
    	
    	this.oP.style.padding='20px 30px';
    	
        
    }
    layer.dragEvent=function(){//设置可拖拽事件
    	var self=this;
    	if(!this.isDrag||this.isMobile){//false的情况返回或者移动端时也不能拖拽
    		return;
    	}else{
    		drag(self);
    	}
    	
    	function drag(self){
    		
    		var downBtn=false;
    		var startX=0;
    		var startY=0;
    		var posX=0;
    		var posY=0;
    		self.oLayer.onmousedown=function(ev){
    			if(ev.target.id=='title_oby'){
    				downBtn=true;
	    			startX=ev.clientX;
	    			startY=ev.clientY;
	    			posX=self.oLayer.offsetLeft;
	    			posY=self.oLayer.offsetTop;
	    			
    			}
    			return false;
    		}
    		document.onmousemove=function(ev){
    			if(downBtn){
    				self.oLayer.style.left=(ev.clientX-(startX-posX))+'px';
    				self.oLayer.style.top=(ev.clientY-(startY-posY))+'px';
    				self.oLayer.style.margin=0;
    			}
    			return false;
    			
    		}
    		document.onmouseup=function(ev){
    			downBtn=false;
				return false;
    		}
    	}
    }
    layer.timer=null;
    layer.tool={
        getStyle:function(obj,attr){//获取当前样式
            return window.getComputedStyle(obj, null)[attr];
        },
        opacityMove:function(start,end,obj,callback){//透明度变化
            var start=start;
            var end=end;
            var step=start<end?0.1:-0.1;
            
            layer.timer=setInterval(function(){
            	console.log(1)
                start+=step;
                if((step>0&&start>end)||(step<0&&start<end)){
                    clearInterval(layer.timer);
                    callback?callback():'';
                }else{
                    obj.style.opacity=start;
                    
                }
               
            },30)
        },
    	isMobile:function() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
               return true;
            } else {
               return false;
            }
        }
    }
    layer.closeEvent=(function(){//加载只执行一次判断是否为手机,并设置不同的触发事件
    	layer.isMobile=layer.tool.isMobile();
    	return layer.isMobile?'touchend':'click';
    	
    }())
    w.shawnwayLayer=layer;
    
})(window);