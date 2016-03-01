		(function($) {
				var $_RForCSS = $.RFor('css'),
					dataName = $_RForCSS.get('DATA'),
					dataSelector = $_RForCSS.getSelector('DATA'),
					sortableSelector = $_RForCSS.getSelector('Sortable'),
					sortableIconSelector = $_RForCSS.getSelector(['DESC', 'ASC', 'SC']),
					descCls = $_RForCSS.get('DESC'),
					descSelector = $_RForCSS.getSelector('DESC'),
					ascCls = $_RForCSS.get('ASC'),
					ascSelector = $_RForCSS.getSelector('ASC'),
					scCls = $_RForCSS.get('SC'),
					scSelector = $_RForCSS.getSelector('SC'),
					$_RForData = $.RFor('data'),
					tmp = '';
				/*Sortable Table column*/ (function() {
						$.fn.RFSortable = function(fn) {
							return this.each(function(index, element) {
									var $sortable = $(this);
									(function($) {
											var $icon = $sortable.find(sortableIconSelector);
											if (0 === $icon.size()) {
												$icon = $('<span class="' + descCls + '" title="' + $.RFor('text').get('reorder') + '"></span>');
												$sortable.append($icon);
											} else {}
											var $valueField = $icon.find(dataSelector);
											if (0 === $valueField.size()) {
												$valueField = $('<span class="' + dataName + ' hide"></span>');
												$icon.append($valueField);
											} else {}
											$sortable.on('beforeRequest', function() {
													/*
													 * we change the sort value before request.
													 */
													var $this = $(this);
													try {
														if ('pointer' === $this.css('cursor')) {
															var value = $valueField.text().toLowerCase();
															switch (value) {
																case 'desc':
																	$valueField.text('asc');
																	break;
																case 'asc':
																	$valueField.text('sc');
																	break;
																default:
																	$valueField.text('desc');
																	break;
															}
														} else {}
													} catch (ex) {
														$.RFAlertEx(ex);
													}
												}).on('requestSuccess', function(ev, data) {
													/*
													 * we change the icon on click success.
													 */
													var $this = $(this);
													try {
														if ('pointer' === $this.css('cursor')) {
															var value = $valueField.text().toLowerCase();
															switch (value) {
																case 'desc':
																	$icon.removeClass(descCls).addClass(ascCls);
																	break;
																case 'asc':
																	$icon.removeClass(ascCls).addClass(scCls);
																	break;
																default:
																	$icon.removeClass(scCls).addClass(descCls);
																	break;
															}
														} else {}
													} catch (ex) {
														$.RFAlertEx(ex);
													}
												}).on('requestFailure', function() {
													/*
													 * we restore the sort value on click failure.
													 */
													var $this = $(this);
													try {
														if ('pointer' === $this.css('cursor')) {
															var value = $valueField.text().toLowerCase();
															switch (value) {
																case 'desc':
																	$valueField.text('sc');
																	break;
																case 'asc':
																	$valueField.text('desc');
																	break;
																default:
																	$valueField.text('asc');
																	break;
															}
														} else {}
													} catch (ex) {
														$.RFAlertEx(ex);
													}
												});
										})(jQuery);
								});
						};
					})();
			})(jQuery);
		/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
