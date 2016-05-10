 (function(win){
 	
 	"use strict";
 	
 	function ShawnwayValidation(formId,msg){
            
        this.oForm=document.getElementById(formId);//获取表单元素
        this.msg=msg;
        this.rules=this.msg.rules;//得到验证规则
        this.messages=this.msg.messages;//得到传入的错误提示
        this.tips={//默认的提示消息
                require:'此项必须填写',
                alphDig:'必须为字母数字组合',
                isDigital:'必须为数字',
                isMobile:'必须为手机号码组合',
                isEqualTo:'必须与第一次输入一致',
                minLength:'与要求字符不相符',
                maxLength:'与要求字符不相符'
                
        };
        this.triggerEvent='blur';//默认的验证方式
        
        this.validList=[];
                
                //要验证的元素
        for(var attr in this.rules){
            
            var obj=document.getElementById(attr);
            obj.rules_oby=this.rules[attr];/*_oby防止属性名称冲突,在元素身上绑定事件规则*/
            obj.messages_oby={};//放入消息提示的对象
            obj.isDirty_oby=false;//判断是否为脏数据,即第一次不提示错误信息
            this.validList.push(obj);
        }
        
        this.init();
        }
    ShawnwayValidation.prototype.init=function(){
            this.setTip();
            this.events()
        }
        //设置提示语,每个要验证的元素上都有一个messages_oby对象
    ShawnwayValidation.prototype.setTip=function(){
                
                
            if(this.messages==undefined||ShawnwayValidation.tool.isPlainObject(this.messages)){//没有传入默认提示值得情况
                    
                for(var i=0;i<this.validList.length;i++){//遍历需要验证的元素
                        
                        var obj=this.validList[i];
                        
                        for(var attr in obj.rules_oby){//设置第i个元素的tips
                            
                                if(obj.rules_oby[attr]){//规则为true时,传入默认信息
                                        obj.messages_oby[attr]=this.tips[attr];
                                }
                        }
                }
                    
            }else{//有传入消息提示的情况
                        
                for(var i=0;i<this.validList.length;i++){//遍历需要验证的元素
                        
                    var obj=this.validList[i];
                    var objId=this.validList[i].id;
                    var objMsg=this.messages[objId];//获取第i个传入元素的tip对象
                    
                    for(var attr in obj.rules_oby){//设置第i个元素的tips
                        
                        if(obj.rules_oby[attr]&&(objMsg!==undefined&&objMsg[attr])){//规则为true时,并且有传入tip
                                obj.messages_oby[attr]=objMsg[attr];
                                
                        }else{
                                obj.messages_oby[attr]=this.tips[attr];
                                
                        }
                    }
                }
                            
            }
        }
        
    ShawnwayValidation.prototype.events=function(){//绑定验证事件
        
        var self=this;

        for(var i=0;i<self.validList.length;i++){//遍历每一个元素并添加事件
            
            self.validList[i].addEventListener(self.triggerEvent,triggerFn,false);
            self.validList[i].triggerFn=triggerFn;
            
            function triggerFn(){//触发的验证事件
                
                var oLabel=null;
                var rules=this.rules_oby;
                var messages=this.messages_oby;
                
                
                if(document.getElementById(this.id+'_error')){//判断是否已经创建过
                    oLabel=document.getElementById(this.id+'_error');
                }else{
                    oLabel=document.createElement('label');
                    oLabel.id=this.id+'_error';
                    oLabel.className='error';
                }
                
                
                for(var attr in rules){
                    
                    this[attr+'btn']=false;
                    
                    if(attr==='require'&&rules[attr]){//是否填写

                        var btn=_validFn(this,attr,'isNull',oLabel);
                        if(btn){
                            return;//如果有错误则不再往下执行输出错误信息
                        }
                        
                    }else if(attr==='isDigital'&&rules[attr]){
                        
                        var btn=_validFn(this,attr,'isDigital',oLabel);
                        if(btn){
                            return;//如果有错误则不再往下执行输出错误信息
                        }
                        
                    }else if(attr==='minLength'&&rules[attr]){
                        
                        if(this.value.length<rules[attr]){
                            oLabel.innerHTML=messages[attr];
                
                            this.parentNode.appendChild(oLabel);
                
                            return;
                        }else{
                            oLabel.innerHTML='';
                        }
                        
                    }else if(attr==='maxLength'&&rules[attr]){
                        if(this.value.length>rules[attr]){
                            oLabel.innerHTML=messages[attr];
                
                            this.parentNode.appendChild(oLabel);
                
                            return;
                        }else{
                            oLabel.innerHTML='';
                        }
                            
                    }else if(attr==='isMobile'&&rules[attr]){
                        
                        var btn=_validFn(this,attr,'isMobile',oLabel);
                        if(btn){
                            return;//如果有错误则不再往下执行输出错误信息
                        }
                                            
                    }else if(attr==='alphDig'&&rules[attr]){
                        
                        var btn=_validFn(this,attr,'alphDig',oLabel);
                        if(btn){
                            return;//如果有错误则不再往下执行输出错误信息
                        }
                            
                    }else if(attr==='isEqualTo'&&rules[attr]){
                        
                        var equalObj=document.getElementById(rules[attr]);
                        var btn=_validFn(this,attr,'isEqualTo',oLabel,equalObj);
                        if(btn){
                            return;//如果有错误则不再往下执行输出错误信息
                        }
                    }
                    this[attr+'btn']=true;
                        
                    
                }
                
            }
        }
            
        function _validFn(obj,attr,validFnName,oLabel,equalObj){//内部方法,复用多个错误信息
            var messages=obj.messages_oby;
            
            if(ShawnwayValidation.validFn[validFnName](obj.value,equalObj)){
                oLabel.innerHTML=messages[attr];
                
                obj.parentNode.appendChild(oLabel);
                
                return true;//已经有错误消息
            }else{
                oLabel.innerHTML='';
            }
            
            return false;
        }
            
    }
    ShawnwayValidation.prototype.isValid=function(){//是否已经全部验证完毕
        
        for(var i=0;i<this.validList.length;i++){
            
            var rules=this.validList[i].rules_oby;
            
            for(var attr in rules){
                if(!this.validList[i][attr+'btn']){
                    return false;
                }
            }
            
        }
        
        return true;
        
    }
    ShawnwayValidation.prototype.valid=function(callback){//提交时调用
        
        if(!this.isValid()){//是否全部验证通过
            for(var i=0;i<this.validList.length;i++){
                this.validList[i].triggerFn.call(this.validList[i]);
            }
            return false;
        }else{
            callback?callback():'';
        }
    }
    /*--------工具方法----------------*/
        //判断是否为空对象
        ShawnwayValidation.tool={};
        ShawnwayValidation.tool.isPlainObject=function(obj){
            var btn=false;
                for(var attr in obj){
                            btn=true;
                            break;
                }
                if(btn){
                    return false;
                }else{
                    return true;
                }
        }
        /*--------验证方法----------------*/
        ShawnwayValidation.validFn={};
        ShawnwayValidation.validFn.isNull=function(str){
            
            return ShawnwayValidation.validFn.trim(str)=='';
            
        }
        ShawnwayValidation.validFn.trim=function(str){//去除空字符串
            
            return str.replace(/^\s+/,'').replace(/\s+$/,'');
            
        }
        ShawnwayValidation.validFn.isDigital=function(str){//验证是否为数字
            return !(/^[0-9]+$/.test(str));
        }
        ShawnwayValidation.validFn.isMobile=function(str){//验证是否为手机号码
           return !(/^0?1[3|4|5|8|7][0-9]\d{8}$/.test(str));
        }
        ShawnwayValidation.validFn.alphDig=function(str){//验证是否为数字字母组合
            return !(/^[a-zA-Z0-9]+$/.test(str));
        }
        ShawnwayValidation.validFn.isEqualTo=function(str,obj){//验证是否与之前输入一样
            return !(obj.value==str);
        }
        
        win.ShawnwayValidation=function(formId,msg){
        	
        	return new ShawnwayValidation(formId,msg);
        };
   })(window); 