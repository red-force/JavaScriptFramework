		(function($) {
				var $_RForCSS = $.RFor('css'),
					dataName = $_RForCSS.get('DATA'),
					dataSelector = $_RForCSS.getSelector('DATA'),
					dataTableSelector = $_RForCSS.getSelector('DataTable'),
					dataRowSelector = $_RForCSS.getSelector('DataRow'),
					dataCellSelector = $_RForCSS.getSelector('DataCell'),
					checkRowSelector = $_RForCSS.getSelector('CheckRow'),
					checkReverseSelector = $_RForCSS.getSelector('CheckReverse'),
					checkReverseIconCls = $_RForCSS.get('CheckReverseIcon'),
					checkReverseIconSelector = $_RForCSS.getSelector('CheckReverseIcon'),
					ellipsisCls = $_RForCSS.get('Ellipsis'),
					ellipsisSelector = $_RForCSS.getSelector('Ellipsis'),
					identityCellSelector = $_RForCSS.getSelector('IdentityCell'),
					requestCls = $_RForCSS.get('Request'),
					requestSelector = $_RForCSS.getSelector('Request'),
					rowControllerSelector = $_RForCSS.getSelector(['Request', 'CheckRow']),
					pageFirstSelector = $_RForCSS.getSelector('pageFirst'),
					pagePrevSelector = $_RForCSS.getSelector('pagePrev'),
					pageNextSelector = $_RForCSS.getSelector('pageNext'),
					pageLastSelector = $_RForCSS.getSelector('pageLast'),
					currPageNum = $_RForCSS.getSelector('currPageNum');
				var $_RForRegStr = $.RFor('regstr'),
					ellipsisTitle = $_RForRegStr.get('EllipsisTitle');
				var $_RForAttr = $.RFor('attr'),
					data_key = $_RForAttr.get('data_key');
				var $_RForData = $.RFor('data'),
					dataKey = $_RForData.get('DataKey'),
					infoKey = $_RForData.get('InfoKey');
				$.fn.RFDataTable = function(fn) {
					return this.each(function() {
							var $dataTable = $(this);
							/* * load data to table
							 * the data structre is :[{},{}]
							 * tableInfo :{CurrPageNum:'',PageTotalCount:''}
							 */
							(function($) {
									$dataTable.each(function(index, element) {
											var $table = $(this);
											var tableData = $table.data(dataKey) || {
												data: {},
												checkedData: {}
											},
												tableInfo = $table.data(infoKey) || {
													defaultCheckStatus: false
												};
											//sync
											$table.data(dataKey, tableData);
											$table.data(infoKey, tableInfo);
											// pre draw
											var $dataRow = $table.findNotDescendantOf(dataRowSelector, dataTableSelector);
											$dataRow.each(function(idx, el) {
													try {
														var $el = $(el);
														var $identityCell = ($el.findNotDescendantOf(identityCellSelector, dataTableSelector));
														if ($identityCell.val() !== '') {
															$el.findNotDescendantOf(rowControllerSelector, dataTableSelector).add($el.findNotDescendantOf(dataCellSelector, dataTableSelector)).each(function() { // fuck the ie 6
																	try {
																		var $this = $(this);
																		if ($this.attr('style').indexOf('DISPLAY') !== -1) {
																			$this.show();
																		} else {}
																	} catch (ex) {}
																}).filter('[style~="display:"], [style~="DISPLAY:"], [style*="display:"], [style*="DISPLAY:"]').show();
														} else {
															$el.findNotDescendantOf(rowControllerSelector, dataTableSelector).add($el.findNotDescendantOf(dataCellSelector, dataTableSelector)).filter(':visible').hide();
														}
													} catch (ex) {}
												});
											// add event:
											$table.RFOnOffEvent('loadData', function(ev, data) {
													ev.stopPropagation();
													data = data || {};
													var pageInfo = data.info || [];
													$(pageInfo).each(function(i, o) {
															try {
																$.RFSetData($table.findNotDescendantOf('*', dataTableSelector), o);
															} catch (ex) {}
															for (var p in o) {
																try {
																	// $table.findNotDescendantOf('.' + p, dataTableSelector).RFExcute(['text', 'val'], o[p]);
																} catch (ex) {
																	$.RFAlertEx(ex);
																}
															}
															try {
																var $PageFirstPagePrev = $table.findNotDescendantOf(pageFirstSelector + ',' + pagePrevSelector, dataTableSelector),
																	tmp = ((1 === (o.CurrPageNum * 1)) ? $PageFirstPagePrev.addClass('disabled') : ($PageFirstPagePrev.removeAttr('disabled'), $PageFirstPagePrev.removeClass('disabled'))),
																	$PageNextPageLast = $table.findNotDescendantOf(pageNextSelector + ',' + pageLastSelector, dataTableSelector);
																tmp = (((o.PageTotalCount * 1) === (o.CurrPageNum * 1)) ? $PageNextPageLast.addClass('disabled') : ($PageNextPageLast.removeClass('disabled').removeAttr('disabled')));
															} catch (ex) {
																$.RFAlertEx(ex);
															}
														});
												}).RFOnOffEvent('loadData', function(ev, data) {
													// sync checked data with back
													// and it is not nessecary:
													// if we indeed to set the check status according to the server side.
													// we can and a column with checkbox to sync the status with .CheckRow.
													// and hide the .CheckRow Column.
													ev.stopPropagation();
												}).RFOnOffEvent('loadData', function(ev, data) {
													ev.stopPropagation();
													data = data || {};
													var pageData = data.data || [];
													var $dataRow = $table.findNotDescendantOf(dataRowSelector, dataTableSelector);
													$dataRow.each(function(index, dataRow) {
															var rowData = {},
																$dataRow = $(dataRow);
															try {
																// get rowData and set row elements visibilty
																if (pageData.length > index) {
																	rowData = pageData[index];
																	// console.log(rowControllerSelector);
																	// console.log($dataRow.findNotDescendantOf(rowControllerSelector, dataTableSelector));
																	$dataRow.findNotDescendantOf(rowControllerSelector, dataTableSelector).add($dataRow.findNotDescendantOf(dataCellSelector, dataTableSelector)).each(function() { // fuck the ie 6
																			try {
																				var $this = $(this);
																				if ($this.attr('style').indexOf('DISPLAY') !== -1) {
																					$this.show();
																				} else {}
																			} catch (ex) {}
																		}).filter('[style~="display:"], [style~="DISPLAY:"], [style*="display:"], [style*="DISPLAY:"]').show();
																} else {
																	$dataRow.findNotDescendantOf(rowControllerSelector, dataTableSelector).add($dataRow.findNotDescendantOf(dataCellSelector, dataTableSelector)).filter(':visible').hide();
																}
															} catch (ex) {
																$.RFAlertEx(ex);
															}
															var val = '',
																triggerDataChanged = function(index, dataCell) {
																	$(dataCell).RFExcute(['text', 'html', 'val'], val).triggerHandler('dataChanged', {
																			data: val,
																			rowData: rowData
																		});
																},
																$dataCells = $dataRow.findNotDescendantOf(dataCellSelector, dataTableSelector),
																$dataCell = null;
															$dataCells.each(triggerDataChanged);
															for (var cellCls in rowData) {
																try {
																	// load data
																	val = rowData[cellCls];
																	$dataCell = $dataCells.filter('[' + data_key + '=' + cellCls + '],[id$=' + cellCls + '],.' + cellCls);
																	if (0 === $dataCell.size()) {
																		continue;
																	} else if ($dataCell.is('[title~="' + ellipsisTitle + '"]') || $dataCell.is(ellipsisSelector)) {
																		$dataCell.RFEllipsis();
																	} else {}
																	$dataCell.each(triggerDataChanged);
																} catch (ex) {
																	$.RFAlertEx(ex);
																}
															}
															try {
																var rowDataID = JSON.stringify($.RFGetData($dataRow.findNotDescendantOf(identityCellSelector, dataTableSelector)));
																// set checked
																var checkedStatus = (!tableInfo.defaultCheckStatus);
																if (undefined === tableData.checkedData[rowDataID]) {
																	checkedStatus = !checkedStatus;
																} else {}
																$.RFGetCheckRowCheckBox($dataRow.findNotDescendantOf(checkRowSelector, dataTableSelector)).prop('checked', checkedStatus);
															} catch (ex) {
																$.RFAlertEx(ex);
															}
															/*
																$dataRow.find('._DATA').each(function(index, dataElement) {
																		try {
																			var $dataElement = $(dataElement),
																				val = rowData[$dataElement.attr('id').split('_').reverse()[0]] || '';
																			$dataElement.text(val).trigger('dataChanged', {
																					pageData: val
																				});
																		} catch (e) {}
																	});
															*/
														});
													$(this).triggerHandler('gatherData');
												}).RFOnOffEvent('gatherData', function(ev, data) {
													ev.stopPropagation();
													_RFGatherTableData.apply(this, arguments);
												}).RFOnOffEvent('checkReverse', function(ev, data) {
													ev.stopPropagation();
													tableInfo.defaultCheckStatus = !tableInfo.defaultCheckStatus;
													var func = data.success || data.checkReverseSuccss;
													if ('function' === typeof func) {
														func.apply(this);
													} else {}
												}).RFOnOffEvent('checkAll', function(ev, data) {
													ev.stopPropagation();
													tableInfo.defaultCheckStatus = true;
													tableData.checkedData = {};
													var func = data.success || data.CheckAllSuccess;
													if ('function' === typeof func) {
														func.apply(this);
													} else {}
												});
											$table.findNotDescendantOf(dataRowSelector + ' ' + requestSelector, dataTableSelector).on('click', function(ev) {
													ev.stopPropagation();
													var $this = $(this);
													var $thisTR = $($this.parents(dataRowSelector).get(0));
													/*
														$thisTR.siblings().find('td .DATA').attr('class',function(){
															return $(this).attr('class').replace(/\bDATA\b/,'_DATA');
														});
													*/
													$thisTR.findNotDescendantOf('._' + dataName, dataTableSelector).RFReplace('class', '_' + dataName, dataName);
													/*
													$thisTR.find('._DATA').attr('class', function() {
															return $(this).attr('class').replace(/\b_DATA\b/, 'DATA');
														});
													*/
												}).on('beforeRequest', function(ev) {
													ev.stopPropagation();
													var $this = $(this);
													var $thisTR = $($this.parents(dataRowSelector).get(0));
													$thisTR.findNotDescendantOf(dataSelector, dataTableSelector).RFReplace('class', dataName, '_' + dataName);
													/*
													$thisTR.find('.DATA').attr('class', function() {
															return $(this).attr('class').replace(/\bDATA\b/, '_DATA');
														});
													*/
												});
											$.RFGetCheckRowCheckBox($table.findNotDescendantOf(dataRowSelector + ' ' + checkRowSelector, dataTableSelector)).on('change', function(ev, data) {
													ev.stopPropagation();
													try {
														var $this = $(this);
														var $thisTR = $($this.parents(dataRowSelector).get(0));
														var rowDataID = JSON.stringify($.RFGetData($thisTR.findNotDescendantOf(identityCellSelector, dataTableSelector)));
														var rowNormalData = $.RFGetData($thisTR.findNotDescendantOf(dataCellSelector, dataTableSelector).not(identityCellSelector));
														// toggle checked status
														if (undefined !== tableData.checkedData[rowDataID]) {
															delete tableData.checkedData[rowDataID];
															try {
																tableData.data[rowDataID].checked = undefined;
															} catch (ex) {}
														} else {
															tableData.checkedData[rowDataID] = rowNormalData;
															try {
																tableData.data[rowDataID].checked = !tableInfo.defaultCheckStatus;
															} catch (ex) {}
														}
													} catch (ex) {
														$.RFAlertEx(ex);
													}
												});
										});
								})(jQuery);
							(function($) {
									$dataTable.on('getData', function(ev, data) {
											ev.stopPropagation();
											// $(this).triggerHandler('gatherData');
											_RFGetTableData.apply(this, [data]);
										}).on('reverseCheck', function() {
											_RFReverseCheckData.apply(this, arguments);
										});
								})(jQuery);
						});
				};
				$.RFDataTable = {
					UpdateTableData: function(tableSelector, data) {
						/* the data structre is :[{},{}]*/
						// Example:
						//	$.RFDataTable.UpdateTableData( $table, {
						//			data: result.data.data.TableItemAdding,
						//			info: result.data.data.TableItemAddingInfo
						//		});
						try {
							$(tableSelector).trigger('loadData', data);
						} catch (ex) {
							$.RFAlertEx(ex);
						}
					},
					GetTableData: function(tableSelector) {
						try {
							return $(tableSelector).trigger('gatherData').data();
						} catch (ex) {
							$.RFAlertEx(ex);
						}
					}
				};
				var _RFGatherTableData = function() {
					return $(this).each(function() {
							try {
								var $this = $(this);
								var _tableData = $this.data(dataKey) || {
									data: {},
									checkedData: {}
								};
								var _tableInfo = $this.data(infoKey) || {
									defaultCheckStatus: false,
									currPageNum: 0
								};
								$this.findNotDescendantOf(dataRowSelector, dataTableSelector).each(function() {
										var $dataRow = $(this);
										var rowData = {
											data: {},
											checked: undefined
										};
										rowData.data = $.RFGetData($dataRow.findNotDescendantOf(dataCellSelector, dataTableSelector));
										// add identity field value to table row data.
										var rowDataID = JSON.stringify($.RFGetData($dataRow.findNotDescendantOf(identityCellSelector, dataTableSelector)));
										var rowNormalData = $.RFGetData($dataRow.findNotDescendantOf(dataCellSelector, dataTableSelector).not(identityCellSelector));
										$.RFGetCheckRowCheckBox($dataRow.findNotDescendantOf(checkRowSelector, dataTableSelector)).each(function() {
												try {
													var checked = $(this).prop('checked');
													if (checked !== _tableInfo.defaultCheckStatus) {
														rowData.checked = $(this).prop('checked');
														_tableData.checkedData[rowDataID] = rowNormalData;
													} else {}
												} catch (ex) {}
											});
										_tableData.data[rowDataID] = rowData;
									});
								$this.findNotDescendantOf(currPageNum, dataTableSelector).each(function() {
										var $currPageNum = $(this);
										_tableInfo.currPageNum = $currPageNum.RFExcute(['val', 'txt'], 0);
									});
								$this.data(dataKey, _tableData);
								$this.data(infoKey, _tableInfo);
							} catch (ex) {
								$.RFAlertEx(ex);
							} finally {
								return this;
							}
						});
				};
				var _RFReverseCheckData = function() {
					return $(this).each(function() {
							var $table = $(this);
							// $table.findNotDescendantOf(checkReverseIconSelector, dataTableSelector).trigger('checkReverse');
						});
				};
				var _RFGetTableData = function(data) {
					return $(this).each(function() {
							try {
								var $table = $(this);
								var id = $table.prop('id').split('_').reverse()[0],
									checkedData = ($table.data(dataKey) || {}).checkedData || [];
								data[id] = {
									info: $table.data(infoKey),
									data: $table.data(dataKey),
									checkedStatus: ($table.data(infoKey) || {}).defaultCheckStatus,
									checkedData: []
								};
								$.each((checkedData), function(prop, value) {
										try {
											data[id].checkedData.push($.extend(true, {}, value, JSON.parse(prop)));
										} catch (ex) {
											$.RFAlertEx(ex);
										}
									});
								//data[id] = escape(JSON.stringify(data[id]));
								data[id] = $.RFStringify(data[id]);
							} catch (ex) {
								$.RFAlertEx(ex);
							}
						});
				};
			})(jQuery);
		/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
