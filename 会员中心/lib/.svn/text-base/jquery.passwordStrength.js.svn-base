function passwordStrength(){
	/*return this.each(function(){
		var that = this;that.opts = {};
		that.opts = $.extend({}, $.fn.passwordStrength.defaults, options);
		
		that.div = $(that.opts.targetDiv);
		that.defaultClass = that.div.attr('class');
		
		that.percents = (that.opts.classes.length) ? 100 / that.opts.classes.length : 100;
		 v = $(this).keyup(function(){
			if( typeof el == "undefined" )
				this.el = $(this);
			var s = getPasswordStrength (this.value);
			console.log(s);
			var p = this.percents;
			var t = Math.floor( s / p );			
			if( 100 <= s ) t = this.opts.classes.length - 1;	
			this.div.removeAttr('class').addClass( this.defaultClass ).addClass( this.opts.classes[ t ]);	
		})*/
           $("#password").bind("keyup", function () {
               var s = getPasswordStrength(this.value);
               var p = this.percents;
               var t = Math.floor(s / p);
               alert(t);
           });
	};
	//��ȡ����ǿ��
	function getPasswordStrength(H){
		var D=H.length;
		if(D==0){
			return 0;
		}
		if(D>6){
			D=6;
		}
		var E = 0;
		var F=H.replace(/[0-9]/g,"");
		var G=(H.length-F.length);
		if(G>3){G=3}
		var A=H.replace(/[A-Za-z]/g,"");
		var C=(H.length-A.length);
		if(C>3){C=3}
		var B=H.replace(/\W/g,"");
		var I=(H.length-B.length);
		if(I>3){I=3}
		if(D==6){
			E = 1;
			if(C > 0){
				E =  1;
			}
			
			if(G > 0 && I > 0 || G > 0 && C > 0 || I > 0 && C > 0){
				E = 2;
			}
			
			if(G > 0 && I > 0 && C > 0){
				E = 3;
			}
		}
		return E;
	}

	
/*$.fn.passwordStrength.defaults = {
	classes : Array('is1','is2','is3'),
	targetDiv : '# ',
	cache : {}
}
$.passwordStrength = {};
$.passwordStrength.getRandomPassword = function(size){
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var size = size || 8;
		var i = 1;
		var ret = ""
		while ( i <= size ) {
			$max = chars.length-1;
			$num = Math.floor(Math.random()*$max);
			$temp = chars.substr($num, 1);
			ret += $temp;
			i++;
		}
		return ret;			
}*/