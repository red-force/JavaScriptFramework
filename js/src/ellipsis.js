/*
 * @description: ellipsis.
 */

(function($) {
		var $_RForCSS = $.RFor('css'),
			dataName = $_RForCSS.get('DATA'),
			dataSelector = $_RForCSS.getSelector('DATA'),
			dataTableSelector = $_RForCSS.getSelector('DataTable'),
			checkRowSelector = $_RForCSS.getSelector('CheckRow'),
			checkAllSelector = $_RForCSS.getSelector('CheckAll'),
			checkAllIconCls = $_RForCSS.get('CheckAllIcon'),
			checkAllIconSelector = $_RForCSS.getSelector('CheckAllIcon'),
			ellipsisCls = $_RForCSS.get('Ellipsis'),
			ellipsisSelector = $_RForCSS.getSelector('Ellipsis'),
			$_RForData = $.RFor('data'),
			$_RForRegStr = $.RFor('regstr'),
			ellipsisTitle = $_RForRegStr.get('EllipsisTitle'),
			tmp = '';
		/* Ellipsis */ (function() {
				$.fn.RFEllipsis = function(fn) {
					return this.each(function(index, element) {
							var $ellipsis = $(this);
							if ('ellipsis' !== $ellipsis.css('text-overflow')) {
								$ellipsis.css('text-overflow', 'ellipsis');
							} else {}
							(function() {
									var setTitle = function(ev) {
										/*
										 * setting the $ellipsis's title,
										 * if the title is empty , the text or text prop will be set to  the title.
										 * else, if the title contain regex of EllipsisTitle, the EllipsisTitle substring will be replace with the text/text prop.
										 */
										try {
											$(ev).RFExcute('stopPropagation');
											var title = $ellipsis.attr('title'),
												text = $ellipsis.text() || $ellipsis.prop('text') || '';
											if (null !== title.match(ellipsisTitle)) {
												$ellipsis.attr('title', title.replace(ellipsisTitle, text));
											} else {
												$ellipsis.attr('title', text);
											}
										} catch (ex) {
											$.RFAlertEx(ex);
										}
									};
									$ellipsis.off('change dataChanged', setTitle).on('change dataChanged', setTitle);
								})();
						});
				};
			})();
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
