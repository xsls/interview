/**
 * Created by liuchuangui on 2014/7/2.
 */
define([], function(){
    String.prototype.trim = function () {
        return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
    };
	Date.prototype.addDays = function(d){this.setDate(this.getDate() + d);}; 
	Date.prototype.addMonths= function(m){
		var d = this.getDate();  
	    this.setMonth(this.getMonth() + m);  
	    if (this.getDate() < d){					    	
	    	this.setDate(0);  
	    }  
	};
	Date.prototype.addYears = function(y){  
	    var m = this.getMonth();  
	    this.setFullYear(this.getFullYear() + y);  
	    if (m < this.getMonth()){  
	        this.setDate(0);  
	    }  
	};    
});
