	(function($) {
			(function() {
					/*
					 *init data for $.RFValidate
					 */
					if (!$.RFValidator) {
						$.RFValidator = {};
					}
					if (!$.RFValidator.message) {
						$.RFValidator.message = {};
					}
					if (!$.RFValidator.func) {
						$.RFValidator.func = {};
					}
					/*
						090909090909676574205c75303030206c696b6520636f64650a09090909
						09097661722069203d2034353030303b0a09090909090976617220737472
						203d2027273b0a0909090909097768696c6528692d2d297b0a0909090909
						0909737472202b3d20272027202b207061727365496e7428692c20313629
						2e746f537472696e6728313629202b273a272b20537472696e672e66726f
						6d43686172436f6465287061727365496e7428692c20313629293b0a0909
						090909090969662869253232303d3d3d30297b0a0909090909090909636f
						6e736f6c652e6c6f6728737472293b0a0909090909090909737472203d20
						27273b0a09090909090909097d0a0909090909097d0a
					*/
					$.RFValidator.func.validate = $.RFValidator.func.validate || {
						'Required': function(val) {
							return ('' !== (val || '').trim());
						},
						'Email': function(val) {
							var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
							return re.test(val);
						},
						'ChineseIDCode': function(val) {
							var res = false;
							try {
								var idcard = val,
									Messages = [true,
										"身份证号码位数不对!",
										"身份证号码出生日期超出范围或含有非法字符!",
										"身份证号码校验错误!",
										"身份证地区不合理!"
									],
									area = {
										11: "北京",
										12: "天津",
										13: "河北",
										14: "山西",
										15: "内蒙古",
										21: "辽宁",
										22: "吉林",
										23: "黑龙江",
										31: "上海",
										32: "江苏",
										33: "浙江",
										34: "安徽",
										35: "福建",
										36: "江西",
										37: "山东",
										41: "河南",
										42: "湖北",
										43: "湖南",
										44: "广东",
										45: "广西",
										46: "海南",
										50: "重庆",
										51: "四川",
										52: "贵州",
										53: "云南",
										54: "西藏",
										61: "陕西",
										62: "甘肃",
										63: "青海",
										64: "宁夏",
										65: "新疆",
										71: "台湾",
										81: "香港",
										82: "澳门",
										91: "国外"
									},
									Y, JYM,
									S, M,
									idcard_array = idcard.split('') || [];
								if (area[parseInt(idcard.substr(0, 2))] === null) {
									res = Messages[4];
								} else {
									switch (idcard.length) {
										case 15:
											if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
												ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
											} else {
												ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
											}
											if (ereg.test(idcard)) {
												res = Messages[0];
											} else {
												res = Messages[2];
											}
											break;
										case 18:
											if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
												ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式 
											} else {
												ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式 
											}
											if (ereg.test(idcard)) {
												S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
												Y = S % 11;
												M = "F";
												JYM = "10X98765432";
												M = JYM.substr(Y, 1);
												if (M == idcard_array[17]) {
													res = Messages[0];
												} else {
													res = Messages[3];
												}
											} else {
												res = Messages[2];
											}
											break;
										default:
											res = Messages[1];
											break;
									}
								}
							} catch (ex) {}
							return res;
						} || function(val) {
							var re = /^(([0-9]{15})|([0-9]{17}[0-9X]))$/;
							return re.test(val);
						},
						'PhoneNumber': function(val) {
							var re = /((^\d{11}$)|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
							return re.test(val);
						},
						'MobilePhoneNumber': function(val) {
							var re = /((^\d{11}$)|(^((\d{4}|\d{3})-(\d{11}))$))/;
							return re.test(val);
						},
						'Number': function(val) {
							var re = /(^\d*$)|(^\d[\d\.]*\d$)/;
							return re.test(val);
						},
						'Integer': function(val) {
							var re = /(^\d*$)/;
							return re.test(val);
						},
						'Date': function(val) {
							val = (val.replace(/[-\W]/g, "/"));
							if (-1 === val.indexOf('/') && 8 === val.length) {
								val = val.substring(0, 4) + '/' + val.substring(4, 6) + '/' + val.substring(6, 8);
							} else {}
							var newDate = (new Date(val.replace(/[-\W]/g, "/"))),
								fullYear = (newDate.getFullYear()),
								date = (newDate.getDate());
							return ('' === val.trim() || (!isNaN(fullYear) && !val.indexOf(fullYear) && val.lastIndexOf(date) >= 7));
						},
						'MaxLength': function(val, len) {
							var blen = $.RFExcute(val, 'byteLength', [], (val || '').length);
							return (len >= blen ? true : $.RFValidator.getValidationMessage('MaxLength').replace(/\{0\}/g, len).replace(/\{1\}/g, blen));
						},
						'DateRange': function(val) {
							var valAry = val.split(' - ');
							var result = true;
							try {
								for (var i = 0; i < valAry.length; i++) {
									if (false === $.RFValidator.func.validate.Date(valAry[i]) || i > 1) {
										result = false;
									} else {}
								}
							} catch (ex) {
								$.RFAlertEx(ex);
							}
							return result;
						},
						'NoFullWidth': function(val) {
							var result = true,
								valLength = val.length;
							try {
								var tmpAry = [];
								while (valLength-- > 0) {
									unicode = val.charCodeAt(valLength);
									if (65280 < unicode && unicode < 65375) {
										tmpAry.push($.RFExcute(String, fromCharCode, [unicode], unicode));
									} else {}
								}
								if (tmpAry.length > 0) {
									result = tmpAry.join(',').substring(0, 8);
									var suffix = ((tmpAry.length * 2 > 7) ? '...' : '') || '';
									result = '请输入' + result + suffix + '的半角字符!';
								} else {}
							} catch (ex) {}
						}
					};
					$.RFValidator.message.validate = $.RFValidator.message.validate || {
						'Required': '请提供此项信息',
						'Email': '请提供E-mail地址',
						'ChineseIDCode': '请提供有效的身份证号码',
						'PhoneNumber': '请提供有效的电话号码',
						'MobilePhoneNumber': '请提供有效的手机号码',
						'Number': '请输入数字',
						'Integer': '请输入整数',
						'Date': '请提供有效的日期',
						'DateRange': '请提供有效的日期',
						'MaxLength': '请确保输入内容不超过{0}个字(另，汉字，一个顶俩)'
					};
					$.RFValidator.addValidation = function(name, message, func) {
						if (undefined === $.RFValidator.func.validate[name] && undefined === $.RFValidator.message.validate[name]) {
							$.RFValidator.func.validate[name] = func;
							$.RFValidator.message.validate[name] = message;
						} else {}
					};
					$.RFValidator.deleteValidation = function(name) {
						delete $.RFValidator.func.validate[name];
						delete $.RFValidator.message.validate[name];
					};
					$.RFValidator.replaceValidation = function(name, message, func) {
						$.RFValidator.deleteValidation(name);
						$.RFValidator.addValidation(name, message, func);
					};
					$.RFValidator.getValidationMessage = function(name) {
						var res = $.extend(true, {}, $.RFValidator.message.validate);
						if (undefined !== name) {
							try {
								res = res[name] || res;
							} catch (ex) {}
						} else {}
						return res;
					};
					$.RFValidator.getValidationFunc = function(name) {
						var res = $.extend(true, {}, $.RFValidator.func.validate);
						if (undefined !== name) {
							try {
								res = res[name] || function() {};
							} catch (ex) {}
						} else {}
						return res;
					};
				})();
			$.fn.RFValidate = function(validationRule, validationMessage, validationFunc) {
				validationRule = validationRule || '';
				validationMessage = validationMessage || $.RFValidator.message.validate;
				validationFunc = validationFunc || $.RFValidator.func.validate;
				validationMessage = $.extend({}, $.RFValidator.message.validate, validationMessage);
				validationFunc = $.extend({}, $.RFValidator.func.validate, validationFunc);
				/*
				 * validationRule: the name of validation rules;
				 * validationMessage: the message of validation;
				 * validationFunc: the func of validation;
				 */
				try {
					var that = this;
					/*
					 * validation
					 */
					var $tobeValidated = $(this);
					$tobeValidated.each(function() {
							var $this = $(this),
								$ValidationContainer = $this.prev('.ValidationContainer'),
								$ValidationMessage = null; // $this.prev('.ValidationMessage');
							if (0 !== $ValidationContainer.size()) {
								$ValidationMessage = $ValidationContainer.children('.ValidationMessage');
								if (0 === $ValidationMessage.size()) {
									$ValidationContainer.remove();
									$ValidationMessage = null;
								} else {}
							} else {}
							if (null === $ValidationMessage) {
								$ValidationMessage = $this.prev('.ValidationMessage');
								if (0 === $ValidationMessage.size()) {
									$ValidationMessage = $('<span class="ValidationMessage" style="display:none;cursor:pointer;">' + '</span>');
								} else {}
								$ValidationContainer = $ValidationMessage.wrap('<div class="ValidationContainer">' + '</div>').parent();
								$('body').append($ValidationContainer);
								$this.before($ValidationContainer);
							} else {}
							$ValidationMessage.css({
									'bottom': $this.parent().height() - $this.height() - $this.position().top + $this.height()
								});
							var validationMessageOnClick = function() {
								$(this).fadeOut();
							};
							$ValidationMessage.RFOnOffEvent('click', validationMessageOnClick);
							var validationOnChange = function() {
								$ValidationMessage.text($this.attr('title'));
								$ValidationMessage.hide();
							};
							$this.RFOnOffEvent('change blur validate ' + $.RFor('event').getInner('validate'), validationOnChange);
							var $message = $this.prev('.ValidationContainer').children('.ValidationMessage');
							if ($message.size() === 0) {
								return;
							} else {}
							var showValidateMessage = function(ev, message) {
								var $message = $(this),
									fadeOutUnitTime = 690;
								try {
									$message.RFOnOffEvent('mouseenter', function() {
											$(this).RFExcute('pause');
										}).RFOnOffEvent('mouseleave', function() {
											$(this).RFExcute('resume');
										});
									message = message || $.data($message.get(0), 'message') || '';
									if ((undefined === window.stupid && undefined !== window.IE) || (undefined === window.IE && null === $.RFLocationParam())) {
										$message.css('z-index', (Math.max($this.css('z-index'), 1) || 1));
										var messageOpacity = $message.css('opacity');
										if (0.69 > messageOpacity) {
											if (message !== $message.text()) {
												messageOpacity = 0.9;
											} else {
												messageOpacity = 0.69;
											}
										} else {}
										$message.text(message).stop().fadeTo(300, messageOpacity, function() {
												$message.stop().fadeTo(((message.length + 1) * fadeOutUnitTime), 0.3, function() {
														$message.stop().hide().css({
																opacity: 0.9
															});
													});
											}).on('click', function() {
												$message.stop().hide().css({
														opacity: 0.9
													});
											});
									} else {
										$.RFValidator.alertCloseTime = $.RFValidator.alertCloseTime || 0;
										$.RFValidator.alert = function(message) {
											if (100 < (new Date()).getTime() - $.RFValidator.alertCloseTime) {
												if (undefined !== window.alert.prototype) {
													window.alert.apply(window, arguments);
												} else { // FUCKING IE 8
													$('.ValidationContainer').css({
															'display': 'inline'
														});
													Function.prototype.apply.call(window.alert, window, arguments);
												}
												$.RFValidator.alertCloseTime = (new Date()).getTime();
											} else {
												/*no continue*/
											}
										};
										$.RFValidator.alert(($this.attr('data_name') || $this.parent().prev().text()) + ' ' + message);
									}
								} catch (ex) {}
							};
							$message.RFOnOffEvent($.RFor('event').getInner('show'), showValidateMessage);
							$this.RFOnOffEvent($.RFor('event').getInner('showValidationMessage'), function(ev, message) {
									$message.RFTriggerHandler('show', [message]);
								});
						});
					$tobeValidated.each(function() {
							var $this = $(this),
								$message = $this.prev('.ValidationContainer').children('.ValidationMessage');
							if ($message.size() === 0) {
								return;
							} else {}
							var tobeValidatedOnChange = function(e, options) {
								/*which will cause func lost
										if ((new Date()).getTime() - ($.data(this, 'validationTime') || 0) < 300) { // avoid multi validate 
											return;
										} else {
											$.data(this, 'validationTime', (new Date()).getTime());
										}
										*/
								var $this = $(this),
									thisVal = ($this.val() || $this.prop('val')),
									message = '',
									defaultOptions = {
										mode: $this.prop('validationMode') || $this.attr('validation_mode') || 'normal',
										validationSuccess: function() {},
										validationFailure: function() {},
										syncValidation: false,
										failedValidation: []
									};
								options = $.extend(true, defaultOptions, options);
								var validateFunc = function() {
									try {
										// thisVal = $this.val();// not support value_selector
										thisVal = $.RFGetDataFieldValue($this);
										thisVal = ('' === thisVal ? thisVal : (thisVal || $this.prop('val') || thisVal));
										if ($this.is(':focus')) {
											return;
										} else {}
										var validations = validationRule || $this.attr('validation') || '';
										if ('' !== validations) {
											validations = validations.split(' ').reverse();
											var validationsLength = validations.length;
											if ((null === thisVal || '' === $.trim(thisVal)) && (-1 !== validations.indexOf('Required') && !$.RFExcute($this, validationFunc.Required, [thisVal || '']))) {
												message = validationMessage.Required || message;
												options.failedValidation.push({
														name: 'Required',
														message: message
													});
											} else {
												while (validationsLength-- > 0) {
													var validationName = validations[validationsLength];
													var validMessge = true;
													if ('function' === typeof validationFunc[validationName]) {
														validMessge = $.RFExcute($this, validationFunc[validationName], [thisVal]);
													} else if ((new RegExp(/MaxLength[0-9]+/g)).test(validationName)) {
														if ('function' === typeof validationFunc.MaxLength) {
															validMessge = ($.RFExcute($this, validationFunc.MaxLength, [thisVal, validationName.match(/[0-9]+/)[0]]));
														} else {}
													} else {}
													if (true !== validMessge) {
														message = (false !== validMessge ? validMessge : (validationMessage[validationName] || message));
														options.failedValidation.push({
																name: validationName,
																message: message
															});
													} else {}
												}
											}
											$.data($message.get(0), 'message', message);
										} else {}
										if ($this.is(':focus')) {
											return;
										} else {}
										if ('' !== message) {
											switch (options.mode) {
												case 'normal':
													if ('none' === $message.css('display')) {
														$message.RFTriggerHandler('show', [message]);
													} else {}
													if (undefined === $.data($this.get(0), 'attr.title')) {
														$.data($this.get(0), 'attr.title', $this.attr('title'));
													} else {}
													$this.attr('title', message).addClass("ui-state-highlight");
													break;
												case 'quiet':
													break;
												default:
													break;
											}
											options.validationFailure.apply($this, [options.failedValidation]);
										} else {
											$this.attr('title', $.data($this.get(0), 'attr.title') || '').removeClass("ui-state-highlight");
											// $this.removeAttr("title").removeClass("ui-state-highlight");
											$message.text('√ ');
											$message.hide();
											if ('function' === typeof options.validationSuccess) {
												options.validationSuccess.apply($this);
											}
										}
									} catch (ex) {
										// console.log($tobeValidated);
										// console.log(ex);
										$.RFAlertEx(ex);
									}
								};
								if (options.syncValidation) {
									validateFunc();
								} else {
									window.setTimeout(validateFunc, 100);
								}
							};
							$this.RFOnOffEvent('change blur validate ' + $.RFor('event').getInner('validate'), tobeValidatedOnChange).RFOnOffEvent('focus', function() {
									$message.stop().hide().css({
											opacity: 0.9
										});
								});
						});
				} catch (ex) {
					$.RFAlertEx(ex);
				}
				return this;
			};
		})(jQuery);
	/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
