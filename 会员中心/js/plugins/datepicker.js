define(["jquery", "datepicker", "datepickerCn", "config" ], function ($, datepicker, datepickerCn, config) {
    return {
        init: function () {
            var datepickers = $('.date');
            for (var i = 0; i < datepickers.length; i++) {
                var datepicker = $(datepickers[i]);
                datepicker.datepicker({language: "zh-CN", format: config.dateFormats["date"]}).on("change", function (e) {
                    var $this = $(e.target);
                    var beforeDateEl = $this.data("beforeDate");
                    var afterDateEl = $this.data("afterDate");
                    $(beforeDateEl).datepicker("setStartDate", $this.val());
                    $(afterDateEl).datepicker("setEndDate", $this.val());
                    
                    if($("#aYear").hasClass("yearsDate")){
	                    var yearsDate = new Date($this.val());
	                    yearsDate.setFullYear(yearsDate.getFullYear()+1);
	                    if(yearsDate<new Date()){
	                    	$(beforeDateEl).datepicker("setEndDate", yearsDate);
	                    }
	                    yearsDate.setFullYear(yearsDate.getFullYear()-2);
	                    $(afterDateEl).datepicker("setStartDate", yearsDate);
                    }

                    if ($(afterDateEl) && $(beforeDateEl).val()){
                        if ($this.val() < $(afterDateEl).val()){
                            $(afterDateEl).val(null);
                            $(afterDateEl).blur();
                        }
                    }

                    if ($(beforeDateEl) && $(afterDateEl).val()){
                        if ($this.val() < $(beforeDateEl).val()){
                            $(beforeDateEl).val(null);
                            $(beforeDateEl).blur();
                        }
                    }
                });
                var beforeDateEl = datepicker.data("beforeDate");
                var afterDateEl = datepicker.data("afterDate");
                datepicker.datepicker("setEndDate", $(beforeDateEl).val());
                datepicker.datepicker("setStartDate", $(afterDateEl).val());
            }
        }
    };
});