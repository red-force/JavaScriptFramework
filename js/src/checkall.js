/*
 * @description: checkall.
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
			$_RForData = $.RFor('data'),
			tmp = '';
		/*Check All*/
		(function() {
				$.fn.RFCheckAll = function(fn) {
					return this.each(function(index, element) {
							var $checkAll = $(this);
							(function($) {
									var $icon = $checkAll.find(checkAllIconSelector);
									if (0 === $icon.size()) {
										$icon = $('<span class="' + checkAllIconCls + '" title="' + $.RFor('text').get('check all') + '"></span>');
										// $icon = $('<input class="' + checkAllIconCls + '" title="' + $.RFor('text').get('check reverse') + '" type="checkbox"></input>');
										$checkAll.prepend($icon);
									} else {}
									var $valueField = $icon.find(dataSelector);
									if (0 === $valueField.size()) {
										$valueField = $('<span class="' + dataName + ' hide"></span>');
										$icon.append($valueField);
									} else {}
									var checkAll = function(ev) {
										try {
											$table = $checkAll.parents(dataTableSelector + ':first');
											var $visibleCheckRowCheckBox = $.RFGetCheckRowCheckBox($table.findNotDescendantOf(checkRowSelector, dataTableSelector)).filter(':visible');
											if (0 < $visibleCheckRowCheckBox.size()) {
												$table.triggerHandler('checkAll', {
														CheckAllSuccess: (function() {
																// var $table = $(this);
																$visibleCheckRowCheckBox.each(function() {
																		//给当前勾选的checkbox取反；  其中!$(this).attr("checked")是先获取他的属性，再取反，充当第二个参数；
																		//attr方法只有一个参数时是取值，两个参数时是设值；
																		var $checkbox = $(this);
																		$checkbox.prop('checked', (true || !$checkbox.prop('checked')));
																	});
															})
													});
											} else {}
										} catch (ex) {
											$.RFAlertEx(ex);
										}
									};
									$icon.RFOnOffEventOfButton('click', checkAll);
								})(jQuery);
						});
				};
			})();
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
