	/**
	 * jQuery printPage Plugin
	 * @version 1.0
	 * @author: Cedric Dugas, http://www.position-absolute.com
	 * @licence: MIT
	 * @description: jQuery page print plugin help you print your page in a better way
	 */ (function($) {
			(function() {
					$.fn.RFPrinter = function(options) {
						var defaultOptions = {
							message: 'Please wait while we create your document'
						};
						$.extend(defaultOptions, options);
						return $(this).each(function(idx, el) {
								try {
									var $this = $(this);
									$this.printPage(defaultOptions);
								} catch (ex) {}
							});
					};
				})();
		})(jQuery);
	/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
