/*
 * @description: checkreverse.
 */

(function($) {
		var $_RForCSS = $.RFor('css'),
			dataName = $_RForCSS.get('DATA'),
			dataSelector = $_RForCSS.getSelector('DATA'),
			dataTableSelector = $_RForCSS.getSelector('DataTable'),
			checkRowSelector = $_RForCSS.getSelector('CheckRow'),
			checkReverseSelector = $_RForCSS.getSelector('CheckReverse'),
			checkReverseIconCls = $_RForCSS.get('CheckReverseIcon'),
			checkReverseIconSelector = $_RForCSS.getSelector('CheckReverseIcon'),
			$_RForData = $.RFor('data'),
			tmp = '';
		/*Sortable Table column*/
		(function() {
				$.fn.RFCheckReverse = function(fn) {
					return this.each(function(index, element) {
							var $checkReverse = $(this);
							(function($) {
									var $icon = $checkReverse.find(checkReverseIconSelector);
									if (0 === $icon.size()) {
										$icon = $('<span class="' + checkReverseIconCls + '" title="' + $.RFor('text').get('check reverse') + '"></span>');
										$checkReverse.prepend($icon);
									} else {}
									var $valueField = $icon.find(dataSelector);
									if (0 === $valueField.size()) {
										$valueField = $('<span class="' + dataName + ' hide"></span>');
										$icon.append($valueField);
									} else {}
									var checkReverse = function(ev) {
										try {
											$table = $checkReverse.parents(dataTableSelector + ':first');
											var $visibleCheckRowCheckBox = $.RFGetCheckRowCheckBox($table.findNotDescendantOf(checkRowSelector, dataTableSelector)).filter(':visible');
											if (0 < $visibleCheckRowCheckBox.size()) {
												$table.triggerHandler('checkReverse', {
														checkReverseSuccss: (function() {
																// var $table = $(this);
																$visibleCheckRowCheckBox.each(function() {
																		//给当前勾选的checkbox取反；  其中!$(this).attr("checked")是先获取他的属性，再取反，充当第二个参数；
																		//attr方法只有一个参数时是取值，两个参数时是设值；
																		var $checkbox = $(this);
																		$checkbox.prop('checked', !$checkbox.prop('checked'));
																	});
															})
													});
											} else {}
										} catch (ex) {
											$.RFAlertEx(ex);
										}
									};
									$icon.RFOnOffEventOfButton('click', checkReverse);
								})(jQuery);
						});
				};
			})();
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
