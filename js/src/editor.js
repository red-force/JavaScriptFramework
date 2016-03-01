	(function($) {
			$.fn.RFEditor = function() {
				try {
					var $_RForCSS = $.RFor('css'),
						editorSelector = $_RForCSS.getSelector('Editor'),
						editorCls = $_RForCSS.get('Editor'),
						loaderSelector = $_RForCSS.getSelector('Loader'),
						loaderCls = $_RForCSS.get('Loader');
					$(this).each(function(idx, el) {
							var $this = $(this);
							if('function' === typeof $this.ckeditor){
								return;
							}else{}
							var $editor = $this.ckeditor(function(){
								$this.triggerHandler('loadSuccess');
							});
						});
				} catch (ex) {
					$.RFAlertEx(ex);
				}
				return this;
			};
		})(jQuery);
	/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
