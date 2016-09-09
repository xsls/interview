jQuery.validator.addMethod("date", function (value, element) {
    return this.optional(element) || (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value) && Date.parse(value)!=null);
}, "请输入有效的日期(yyyy-mm-dd)");
jQuery.validator.addMethod("nonNegativeInteger", function (value, element) {
    return this.optional(element) || /^\d*$/.test(value);
}, "请输入非负整数");
jQuery.validator.addMethod("positiveInteger", function (value, element) {
    return this.optional(element) || /^[1-9]\d*$/.test(value);
}, "请输入正整数");
jQuery.validator.addMethod("greaterThanZero", function (value, element) {
    return this.optional(element) || (/^\d+$/.test(value) && parseInt(value) > 0);
}, "输入的数值必须大于0");
jQuery.validator.addMethod("lessThanNum", function (value, element, params) {
    return this.optional(element) || (/^[0-9]+(.[0-9]+)?$/.test(value) && Math.floor(value) < params);
}, "输入的数值必须小于100");
jQuery.validator.addMethod("nonNegativeNum", function (value, element) {
    return this.optional(element) || /^(\d*(\.\d+)?)$/.test(value);
}, "请输入非负数");
jQuery.validator.addMethod("mobileNumber", function (value, element) {
    return this.optional(element) || /^0?1[0-9]{10}$/.test(value);
}, "请输入正确的手机号码");
jQuery.validator.addMethod("mobileOrEmail", function (value, element) {
    return this.optional(element)
        || /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(value)
        || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
}, "请输入正确的手机号码或邮箱");
jQuery.validator.addMethod("toHunNonNegInt", function (value, element) {
    return this.optional(element) || /^(\d{1,2}|100)$/.test(value);
}, "请输入0到100整数");
jQuery.validator.addMethod("totalHundred", function (value, element, param) {
    var target = $(param);
    return this.optional(element) || parseInt(target.val()) + parseInt(value) === 100;
}, "请确认百分比的和是否为100");
jQuery.validator.addMethod("nonSpecialChars", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\u4E00-\u9FA5,\.&\(\)@]*$/.test(value);
}, "请不要输入特殊字符或者全角字符");
jQuery.validator.addMethod("numberAlpha", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9]*$/.test(value);
}, "只能输入数字和字母");
jQuery.validator.addMethod("hsCode", function (value, element) {
    return this.optional(element) || /^[0-9][0-9\.\s]*[0-9]$/.test(value);
}, "请输入正确的HS编码");
jQuery.validator.addMethod("numLengthLimit", function (value, element) {
    return this.optional(element) || (value.length <= 12);
}, "请输入长度为12位以内的非负数");
jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
	  return this.optional(element) || /^\d{15}|\d{17}(?:\d|x|X)$/.test(value);
	}, "请正确输入您的身份证号码");
    //验证固定电话   
jQuery.validator.addMethod( "checkTel",function(value,element){      
	var pattern =/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;   
	if(value!=''){if(!pattern.exec(value)){return false;}};   
	return true;    
    } ,  "  <font color='red'>请输入有效的固定电话！</font>" ); 
jQuery.validator.addMethod( "checkFax",function(value,element){      
	var pattern =/^(\d{3,4}-)?\d{7,8}$/;
	if(value!=''){if(!pattern.exec(value)){return false;}};   
	return true;    
    } ,  "  <font color='red'>请输入有效的传真号码！</font>" );   
jQuery.validator.addMethod( "check3W",function(value,element){      
	var pattern =/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\/.?/;
	if(value!=''){if(!pattern.exec(value)){return false;}};   
	return true;    
    } ,  "  <font color='red'>请输入有效的网址！</font>" );
jQuery.validator.addMethod( "checkQQ",function(value,element){      
	var pattern =/^[1-9]{1}[0-9]{4,8}$/;
	if(value!=''){if(!pattern.exec(value)){return false;}};   
	return true;    
    } ,  "  <font color='red'>请输入有效的QQ！</font>" );   
jQuery.validator.addMethod( "checkWeiXin",function(value,element){      
	var pattern =/^\w+$/;
	if(value!=''){if(!pattern.exec(value)){return false;}};   
	return true;    
    } ,  "  <font color='red'>请输入有效的微信名！</font>" );  
//验证身份证号是否重复   
jQuery.validator.addMethod( "checkIdCardNumber",function(value,element){      
    var flag=true;   
    jQuery.ajax({type:"get",url:ctx+"/userInfo/queryIdNumber",   
    async:false,cache:false,data:{ identityNumber:value,method:"get"},dataType:"json",scriptCharset:"UTF-8",success:function(data){   
        if(data){   
            flag=false;   
        }   
    }});   
    return flag;   
} ,  "  <font color='red'>此身份证已经被注册！请检查后再试！</font>" );
jQuery.validator.addMethod("decimalOne", function (value, element, params) {
    if (value.length < 1) {
        return true;
    }
    var reg = new RegExp("^[0-9]+(.[0-9]{1," + params + "})?$");
    if (value.match(reg)) {
        return true;
    } else {
        return false;
    }
}, "最多输入一位小数");
jQuery.validator.addMethod("stringCheck", function(value, element) {
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "只能包括中文字、英文字母、数字和下划线");
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
            length++;
        }
    }
    return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, "请确保输入的值不少于4个字符(汉字算2个字符)");