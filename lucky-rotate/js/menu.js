/**
 *@param {Object} target 转盘容器节点
 */

 !function() {
 	var doc = document;
 	function Menu (target,settings) {
 		this.target = doc.getElementById(target);
 		this.settings = {};
 		this.settings.originTan = ( settings && settings.originTan ) ?  settings.originTan : 0;

 		this.pieces = this.target.getElementsByTagName('li');
 		this.piecesLen = this.pieces.length;
 		this.durationTime = 6;
 		this.rotateBtn = true;
 		this.init();
 	}
 	Menu.prototype.init = function(){
 		this.initPieces();
 		this.changeDuration();
 	}
 	Menu.prototype.initPieces = function() {
 		if (this.piecesLen <=2 ) {
 			console.warn('pieces is too little')
 			return;
 		};
 		this.rotateTan =  360 / this.piecesLen ;
 		var liSkew = 270 - this.rotateTan;
 		var aSkew = ( liSkew == 0 ) ? 180 : liSkew;

 		for (var i = 0 ; i < this.piecesLen; i++) {
 			var oA = this.pieces[i].querySelector('a');
 			this.pieces[i].style.transform = "rotate("+ i*this.rotateTan +"deg) skew("+ liSkew +"deg)  scale(1)"
 			oA.style.transform = "skew("+ -aSkew +"deg) rotate(0deg) scale(1)"
 		};

 		this.target.style.transform = "rotate("+ this.settings.originTan +"deg)";
 		this.target.style.transitionTimingFunction = "cubic-bezier(.37,.56,.29,.94)";
 		this.changeDuration(6);

 	};
 	Menu.prototype.changeDuration = function( seconds ){
 		this.target.style.transitionDuration =( (seconds !== 'undefined') ? seconds : this.durationTime )+'s';
 	}
 	
 	Menu.prototype.rotate = function(type, cb){
 		if (!this.rotateBtn) {
 			return
 		};
 		this.rotateBtn = false;
 		var tan = type * this.rotateTan;
		var self = this;
 		var randomRand =Math.floor ( Math.random() * 5 ) +5;
 		var totalTan = randomRand * 360 + this.settings.originTan +tan;
 		this.target.style.transform = "rotate("+ totalTan +"deg)";

 		setTimeout(function(){
 			self.rotateBtn = true;
 			cb && cb();

 			self.changeDuration(0);
 			self.settings.originTan = totalTan % 360;

 			setTimeout(function(){
 				self.changeDuration(6);
 			}, 30);

 			self.target.style.transform = "rotate("+ self.settings.originTan +"deg)";
 			self.settings.originTan = totalTan;

 		}, this.durationTime*1000 );
 	}
 	window.Menu = Menu;
 }();