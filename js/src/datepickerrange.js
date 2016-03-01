			try {
				(function($) {
						$.fn.RFDatePickerRange = function(fn) {
							return this.each(function() {
									var $dpr = $(this);
									$.datepicker._defaults.onAfterUpdate = null;
									var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
									$.datepicker._updateDatepicker = function(inst) {
										datepicker__updateDatepicker.call(this, inst);
										var onAfterUpdate = this._get(inst, 'onAfterUpdate');
										if (onAfterUpdate)
											onAfterUpdate.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
									};
									$(function() {
											var cur = -1,
												prv = -1;
											var numberOfMonths = ($dpr.prop('number_of_months') || $dpr.attr('number_of_months') || 2) * 1;
											// $('#jrange div')
											$dpr.datepicker({
													changeMonth: true,
													changeYear: true,
													yearRange: 'c-20:c+10',
													showOtherMonths: false,
													showWeek: true,
													numberOfMonths: numberOfMonths,
													showButtonPanel: true,
													beforeShowDay: function(date) {
														return [true, ((date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
													},
													onSelect: function(dateText, inst) {
														var d1, d2;
														prv = cur;
														cur = (new Date(inst.selectedYear, inst.selectedMonth, (inst.selectedDay))).getTime();
														var dateFormat = $.datepicker._get(inst, 'dateFormat');
														if (prv == -1 || prv == cur) {
															prv = cur;
															//$('#jrange input').val(dateText);
															$dpr.find('input').val(dateText);
														} else {
															d1 = $.datepicker.formatDate(dateFormat, new Date(Math.min(prv, cur)), {});
															d2 = $.datepicker.formatDate(dateFormat, new Date(Math.max(prv, cur)), {});
															// $('#jrange input').val(d1 + ' - ' + d2);
															$dpr.val(d1 + ' - ' + d2);
														}
														// prevent datepicker hide automatically
														$(this).data('datepicker').inline = true;
													},
													onChangeMonthYear: function(year, month, inst) {
														//prv = cur = -1;
													},
													onAfterUpdate: function(inst) {
														inst = $.datepicker._getInst(this);
														/*
										$('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+$.datepicker._get(inst, "closeText")+'</button>')
										// .appendTo($('#jrange div .ui-datepicker-buttonpane'))
										.appendTo($dpr.find('.ui-datepicker-buttonpane'))
											.on('click', function() {
												// $('#jrange div').hide();
												$.datepicker._hideDatepicker();
											});
											*/
													},
													onClose: function() {
														$(this).data('datepicker').inline = false;
													}
												});
											/*
								.position({
									my: 'left top',
									at: 'left bottom',
									// of: $('#jrange input')
									of: $dpr // $('#jrange input')
								}) ;
								$('.ui-state-default').on('click', function(ev) {
									ev.stopPropagation();
								});
								*/
											// $('#jrange input').on('focus', function(e) {
											$dpr.on('focus', function(e) {
													var v = this.value,
														d;
													// var dateFormat = $.datepicker._get(inst, 'dateFormat');
													var inst = $.datepicker._getInst(this);
													var dateFormat = $.datepicker._get(inst, 'dateFormat');
													try {
														if (v.indexOf(' - ') > -1) {
															d = v.split(' - ');
															prv = (-1 === prv ? $.datepicker.parseDate(dateFormat, d[0]).getTime() : prv);
															cur = (-1 === cur ? $.datepicker.parseDate(dateFormat, d[1]).getTime() : cur);
														} else if (v.length > 0) {
															prv = cur = $.datepicker.parseDate(dateFormat, v).getTime();
														}
													} catch (ex) {
														cur = prv = -1;
														jQuery.RFAlertEx(ex);
													}
													if (cur > -1) {
														// $('#jrange div').datepicker('setDate', new Date(cur));
														// $dpr.datepicker('setDate', new Date(cur));
													}
													// $('#jrange div').datepicker('refresh').show();
													// $dpr.datepicker('refresh').show();//  cause Uncaught RangeError: Maximum call stack size exceeded in chrome
												}).on('keypress', function() {});
										});
								});
						};
					})(jqui);
			} catch (ex) {}
			/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
