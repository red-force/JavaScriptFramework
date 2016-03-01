		try {
			(function($) {
					$.fn.RFMonthPicker = function(fn) {
						return this.each(function() {
								try {
									var $mp = $(this);
									$(function() {
											$mp.MonthPicker({
													ShowIcon: false,
													i18n: {
														year: "",
														prevYear: "去年",
														nextYear: "明年",
														next5Years: '向后五年',
														prev5Years: '向前五年',
														nextLabel: "后一个",
														prevLabel: "前一个",
														buttonText: "打开月份选择器",
														jumpYears: "选择年份",
														months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
													},
													Format: 'YY-mm',
													ShowPickerMotion: 'fade'
												});
										});
									try {
										$trim('return');
										$(function() {
												var currentText = $.datepicker.regional['zh-CN'].currentText;
												$mp.focus(function() {
														// console.log('FOCUS:' + $mp.datepicker('getDate'));
														$.datepicker.regional['zh-CN'].currentText = '本月';
														$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
														// console.log('FOCUS1:' + $mp.datepicker('getDate'));
													});
												$mp.datepicker({
														changeMonth: true,
														changeYear: true,
														yearRange: 'c-20:c+10',
														showButtonPanel: true,
														dateFormat: 'yy-mm',
														onChangeMonthYear: function(year, month, inst) {
															$(this).val($.datepicker.formatDate('yy-mm', new Date(year, month, 0)));
															// console.log('onChangeMY:' + $mp.datepicker('getDate'));
															// $mp.datepicker('setDate', new Date(year, month - 1, 1));
															$mp.datepicker('setDate', ($.datepicker.formatDate('yy-mm', new Date(year, month, 0))));
															$mp.datepicker("refresh");
															// console.log($mp.datepicker('getDate'));
														},
														beforeShow: function(elmt, inst) {
															// console.log('beforeShow' + $mp.datepicker('getDate'));
															// $mp.datepicker('setDate',$mp.datepicker('getDate'));
															// console.log(inst);
															// console.log($mp.datepicker('getDate'));
														},
														onClose: function(dateText, inst) {
															// console.log('onclose' + $mp.datepicker('getDate'));
															$.datepicker.regional['zh-CN'].currentText = currentText;
															$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
														}
													});
												$mp.focus(function() {
														// console.log('focus:' + $mp.datepicker('getDate'));
														// $mp.datepicker('setDate',$mp.datepicker('getDate'));
														$(".ui-datepicker-calendar").addClass('hide').hide();
														var my = "center top",
															at = "center bottom",
															of = $(this);
														if (240 > (window.innerHeight - $mp.position().top)) {
															my = "center bottom";
															at = "center top";
														} else {}
														$("#ui-datepicker-div").position({
																my: my,
																at: at,
																of: of
															});
													});
											});
									} catch (ex) {}
								} catch (ex) {
									jQuery.RFAlertEx(ex);
								}
							});
					};
				})(jqui);
		} catch (ex) {}
		/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
