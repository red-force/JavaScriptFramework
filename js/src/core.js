		(function($) {
				$.fn.RFShowInfo = function(message) {
					try {
						var that = this;
						var RFShowInfo = function(message) {
							message = message || '';
							if ('string' !== typeof message || '' === message || 'null' === message || null === message || '""' === message || '"null"' === message || 'undefined' === message || '"undefined"' === message) {
								return;
							} else {
								message = $.RFDecodeURIComponent(message);
							}
							if ((!$.RFIfStrInStupid('RFShowInfo'))) {
								var $PageInfoContainer = that;
								var contentVerticalStyle = 'Middle'; // 'Top'
								try {
									$PageInfoContainer = 0 === $PageInfoContainer.size() ? $($('.RFShowInfoContainer').get(0)) : $PageInfoContainer;
								} catch (ex) {
									// no message
								}
								$PageInfoContainer = $PageInfoContainer.size() > 0 ? $PageInfoContainer : $('<div class="RFShowInfoContainer' + contentVerticalStyle + '" ></div>');
								var $PageInfoContent = $('<span class="RFShowInfoContent' + contentVerticalStyle + '" style="color:#000;position:relative;font-family:微軟雅黑,宋体,ubuntu;">' + '</span>');
								//$PageInfoContent = $('<code style="color:#000;">'+'</code>');
								if (!$PageInfoContainer.hasClass('RFShowInfoContainer')) {
									$PageInfoContainer.addClass('RFShowInfoContainer');
								} else {}
								if (0 === $PageInfoContainer.children().size()) {
									$PageInfoContainer.append($PageInfoContent);
								} else {
									$PageInfoContent = $PageInfoContainer.children(':nth-child(1)');
									if (!$PageInfoContent.hasClass('.RFShowInfoContent')) {
										$PageInfoContent.addClass('RFShowInfoContent');
									} else {}
								}
								var $PageInfoContainerOpacity = $PageInfoContainer.css('opacity');
								$PageInfoContent.text(message).attr('title', message);
								$('body').prepend($PageInfoContainer);
								$PageInfoContainer.parent().append($PageInfoContainer);
								$PageInfoContainer.hide();
								if (window.RF_showPageInfoTimeout) {
									window.clearTimeout(window.RF_showPageInfoTimeout);
								} else {}
								window.RF_showPageInfoTimeout = window.setTimeout(function() {
										if ('none' === $PageInfoContainer.css('display')) {
											$PageInfoContainer.stop().css({
													"display": ("Middle" === contentVerticalStyle ? "table" : "block")
												}).fadeTo(300, 1.0, function() {
													$PageInfoContainer.stop().fadeTo((message.length + 1) * 690, 0.3, function() {
															$PageInfoContainer.stop().hide().css({
																	opacity: $PageInfoContainerOpacity
																});
															$(this).RFExcute('resume');
														});
												}).hover(function() {
													var opacity = $PageInfoContainer.css('opacity') * 1;
													if (0.87 > opacity && opacity > 0.47) {
														$.RFExcute($(this), 'pause');
														// $(this).RFExcute('pause');
													} else {}
												}, function() {
													$(this).RFExcute('resume');
													// $.RFExcute($(this), 'resume');
												}).on('click', function() {
													$PageInfoContainer.stop().hide().stop();
													$(this).RFExcute('resume');
												});
										} else {}
									}, 300);
							} else {
								alert(message);
							}
						};
						RFShowInfo(message);
					} catch (ex) {
						// console.log(ex);
						$.RFAlertEx(ex);
					}
					return this;
				};
				$.fn.RFHistoryBack = function() {
					try {
						if (window.history.back !== window.History.prototype.back) {
							if (0 === this.size()) {
								try {
									delete window.history.back;
								} catch (ex) {
									window.history.back = window.History.prototype.back;
								}
							} else {}
						} else {}
						this.each(function() {
								var $this = $(this);
								window.history.back = function() {
									$this.click();
								};
								if (null !== window.frameElement) {
									try {
										window.frameElement.contentWindow.parent.history.back = window.history.back;
									} catch (ex) {}
								} else {}
								try {
									var location = window.history.location || window.location;
									if (typeof window.history.pushState === 'function') {
										window.history.pushState('rfwill', null, null);
										$(window).on('popstate', function() {
												window.history.pushState('rfgreatwill', null, null);
												// Handle the back (or forward) buttons here
												// Will NOT handle refresh, use onbeforeunload for this.
												$this.click();
											});
									} else {
										var ignoreHashChange = true;
										$(window).on('hashchange', function() {
												if (!ignoreHashChange) {
													ignoreHashChange = true;
													window.location.hash = Math.random();
													// Detect and redirect change here
													// Works in older FF and IE9
													// * it does mess with your hash symbol (anchor?) pound sign
													// delimiter on the end of the URL
													$this.click();
												} else {
													ignoreHashChange = false;
												}
											});
									}
								} catch (ex) {}
							});
					} catch (ex) {
						$.RFAlertEx(ex);
					}
					return this;
				};
				$.RFGetRequestLocationOrigin = function($this) {
					return ($this.attr('request_location_origin') || location.origin || '').replace(/{window.location.origin}/, (window.location.origin || ''));
				};
				$.RFGetRequestLocationPathName = function($this) {
					return ($this.attr('request_location_path_name') || location.pathname || '').replace(/{window.location.pathname}/, (window.location.pathname || ''));
				};
				$.RFGetRequestLocationSearch = function($this) {
					return ($this.attr('request_location_search') || location.search || '').replace(/{window.location.search}/, (window.location.search || ''));
				};
				$.RFGetDataFieldKey = function($Data) {
					var dataFieldKey = '';
					var $_RForAttr = $.RFor('attr'),
						dataKeyName = $_RForAttr.get('data_key');
					dataFieldKey = (($Data.attr(dataKeyName) || $Data.attr('data_id') || '') || ($Data.attr('id') || '').split('_').reverse()[0] || ($Data.attr('name') || '').split('$').reverse()[0]);
					return dataFieldKey;
				};
				$.RFGetDataFieldValue = function($Data) {
					var dataFieldValue = '',
						valueSelector = $Data.prop('value_selector') || $Data.attr('value_selector') || '',
						textSelector = $Data.prop('text_selector') || $Data.attr('text_selector') || '';
					dataFieldValue = $Data.val();
					if (undefined === dataFieldValue || null === dataFieldValue || $Data.is('span')) {
						dataFieldValue = $Data.text();
					} else {}
					if ('' !== textSelector) {
						dataFieldValue = $Data.find(textSelector).text();
					} else {}
					if ('' !== valueSelector) {
						dataFieldValue = $Data.find(valueSelector).val();
					} else {}
					if (undefined === dataFieldValue || null === dataFieldValue) {
						dataFieldValue = '';
					} else {}
					return dataFieldValue;
				};
				$.RFGetData = function(dataHolderSelector, data /* optional */ ) {
					data = data || {};
					var $Data = $((dataHolderSelector || $.RFor('css').getSelector('DATA')));
					$Data.each(function() {
							try {
								var $Data = $(this);
								var dataFieldKey = $.RFGetDataFieldKey($Data);
								var dataFieldValue = $.RFGetDataFieldValue($Data);
								data[dataFieldKey] = dataFieldValue;
							} catch (ex) {
								$.RFAlertEx(ex);
							} finally {
								return this;
							}
						});
					return data;
				};
				$.fn.RFGetData = function(data) {
					return this.each(function() {
							$(this).trigger('getData', data);
						});
				};
				$.RFSetData = function(dataHolderSelector, data) {
					data = data || {};
					var $Data = $((dataHolderSelector || window)),
						dataKeyName = $.RFor('attr').get('data_key'),
						tmpData = '',
						tmp$Data = $(''),
						targetSelectorAry = [],
						targetSelectorAryLength = 0;
					var getSelectedOptions = function(i, el) {
						var $el = $(el),
							myText = ($el.html() === '') ? '&nbsp;' : $el.html();
						return $el.text() === tmpData;
					};
					for (var _dataKey in data) {
						tmpData = data[_dataKey];
						targetSelectorAry = ['[' + dataKeyName + '=' + _dataKey + ']', '[data_id=' + _dataKey + ']', '[id$=' + _dataKey + ']', '[name$=' + _dataKey + ']'];
						targetSelectorAryLength = targetSelectorAry.length;
						targetSelectorAry = targetSelectorAry.reverse();
						while (targetSelectorAryLength-- > 0) {
							try {
								tmp$Data = $Data.find(targetSelectorAry[targetSelectorAryLength]);
								if (tmp$Data.size() > 0) {
									if (true === tmp$Data.is('select')) {
										tmp$Data.children('option').filter(getSelectedOptions).prop('selected', true);
									} else {
										tmp$Data.val(tmpData).text(tmpData);
									}
									tmp$Data.RFTriggerHandler('change');
								} else {
									continue;
								}
							} catch (ex) {}
						}
					}
				};
				$.fn.RFFillData = function() {
					/*
					 */
					var dataKey = $.RFor('DataKey');
					return this.each(function() {
							try {
								var $this = $(this);
								var dataSelector = $.RFor('css').getSelector('DATA');
								// var data = $.RFGetData($this.find(dataSelector).not($this.find(selector + ' ' + dataSelector)));
								var data = $.RFGetData($this.find(dataSelector));
								$this.data(dataKey, data);
							} catch (ex) {
								$.RFAlertEx(ex);
							} finally {
								return this;
							}
						});
				};
				$.RFSubmitData = function(data, options) {
					/*
					 * options:
					 *		location:
					 *			origin: location.origin
					 *			pathname: location.pathname + '/' + options.methodName
					 *		url:
					 *			location.origin + location.pathname + options.methodName
					 *			or
					 *			options.location.origin + options.location.pathname
					 */
					try {
						var that = this;
						options.location = options.location || {};
						options = $.extend({
								type: 'POST',
								url: ((((options.location.origin || "") + (options.location.pathname || "")) || ((location.origin || '') + location.pathname) + '/' + (options.methodName || 'submitData')) + (options.location.search || "")),
								contentType: 'application/json; charset=utf-8',
								data: '{"data":"' + escape($.RFStringify(data)) + '"}',
								//data: '{data:'+ JSON.stringify(data)+'}',
								//data: '{data:'+'"1"'+'}',
								dataType: 'json'
							}, options);
						var successFunc = options.success || function() {},
							errorFunc = options.error || function() {},
							failureFunc = options.failure || function() {};
						options = $.extend(options, {
								success: function(data, textStatusStr, jqHXR) {
									/**
									 * data format "{d:'{status:'',message:'',...}}'"
									 */
									var obj = data;
									if (undefined !== obj && true === $.isPlainObject(obj) && undefined !== obj.d) {
										// eval('obj.d = ' + obj.d);
										switch (obj.d.status) {
											case 'success':
												successFunc.call(that, obj.d, textStatusStr, jqHXR);
												break;
											case 'failure':
												failureFunc.call(that, obj.d, textStatusStr, jqHXR);
												break;
											default:
												$('').RFShowInfo(JSON.stringify((obj.d.status || '' + obj.d.message || '')));
												if (window.console && typeof window.console.log === 'function') {
													window.console.log('[error]' + JSON.stringify(obj.d));
												} else {}
												break;
										}
									} else {
										$('').RFShowInfo('返回数据不合法.');
										if (window.console && typeof window.console.log === 'function') {
											window.console.log('[info]the returned data is supposed to be with a property named \'d\' and with value stored in property \'d\'.');
											window.console.log('[info]' + JSON.stringify(obj) + '.');
										} else {}
									}
								},
								error: function(jqHXR, textStatusStr, errorThrownStr) {
									errorFunc.apply(that, arguments);
								}
							});
						$.ajax(options);
					} catch (ex) {
						// console.log(ex);
						$.RFAlertEx(ex);
					}
					return this;
				};
				$.RFValidatePage = function(options) {
					options = options || {};
					var validationSelector = options.validationSelector || $.RFor('css').getSelector('Validation'),
						$_Validation = options.validation || $(validationSelector),
						validationCount = $_Validation.size(),
						validationMode = options.mode,
						validationSuccess = options.validationSuccess || function() {},
						result = false;
					var $deferred = $.Deferred(function() {
							$_Validation.each(function() {
									try {
										var $_Vali = $(this);
										var beforeValidateResult = {
											result: true
										};
										beforeValidateResult.result = $_Vali.triggerHandler('beforeValidate', [$_Vali, beforeValidateResult]) || beforeValidateResult.result;
										if (false !== beforeValidateResult.result) {
											return $_Vali.triggerHandler($.RFor('event').getInner('validate'), {
													mode: validationMode,
													syncValidation: true,
													validationSuccess: function() {
														if (1 === validationCount--) { // to avoid multi submit
															/*
																validationCount = -1;
																try {
																	validationSuccess();
																} catch (ex) {}
															*/
															result = true;
															$deferred.resolve();
														} else {}
													}
												});
										} else {
											validationCount--;
										}
									} catch (ex) {
										$.RFAlertEx(ex);
									}
								});
						});
					$.when($deferred.promise()).then(function() {
							if (0 === validationCount) {
								try {
									validationSuccess();
								} catch (ex) {}
								result = true;
							} else {
								result = false;
							}
						});
					return $deferred ? result : result;
				};
				$.RFGatherPageData = function(options) {
					options = options || {};
					var data = options.data || {};
					var dataSelector = $.RFor('css').getSelector('DATA');
					var $_DATA = $(dataSelector);
					$_DATA.each(function() {
							try {
								var $_Data = $(this);
								data = $.RFGetData($_Data, data);
							} catch (ex) {
								$.RFAlertEx(ex);
							}
						});
					var $_DATATABLE = $($.RFor('css').getSelector('DataTable'));
					$_DATATABLE.each(function() {
							try {
								var $_DATATABLE = $(this);
								$_DATATABLE.triggerHandler('getData', data);
							} catch (ex) {
								$.RFAlertEx(ex);
							}
						});
					return data;
				};
				$.RFPreloadImgs = function(options) {
					options = options || {};
					var newImages = [],
						loadedImages = 0,
						postAction = function() {},
						arr = options.images || [],
						imageLoadPost = function() {
							loadedImages++;
							if (loadedImages === arr.length) {
								postAction(newImages); //call postAction and pass in newImages array as parameter
							}
						};
					try {
						arr = (typeof arr != 'object') ? [arr] : arr;
						for (var i = 0; i < arr.length; i++) {
							newImages[i] = new Image();
							newImages[i].src = arr[i];
							newImages[i].onload = imageLoadPost;
							newImages[i].onerror = imageLoadPost;
						}
					} catch (ex) {}
					return { //return blank object with done() method
						done: function(f) {
							postAction = f || postAction; //remember user defined callback functions to be called when images load
						}
					};
				};
				$.RFRequire = function(options) {
					try {
						options = options || {};
						var fileName = options.fileName,
							fileType = options.fileType || fileName.split('.').reverse()[0] || 'js',
							fileRef = null,
							fileDomType = '',
							urlName = '',
							checkFunc = function() {
								$('head').find(fileDomType).each(function() {
										var $this = $(this);
										if ($this.attr(urlName) === fileName) {
											fileRef = null;
										} else {}
									});
							};
						switch (fileType) {
							case 'js':
								fileDomType = 'script';
								urlName = 'src';
								fileRef = document.createElement('script');
								fileRef.setAttribute("type", "text/javascript");
								fileRef.setAttribute("src", fileName);
								checkFunc();
								break;
							case 'css':
								fileDomType = 'link';
								urlName = 'href';
								fileRef = document.createElement("link");
								fileRef.setAttribute("rel", "stylesheet");
								fileRef.setAttribute("type", "text/css");
								fileRef.setAttribute("href", fileName);
								checkFunc();
								break;
							case 'png':
							case 'jpg':
							case 'jpeg':
							case 'gif':
								$.RFPreloadImgs({
										images: [fileName]
									});
								break;
							default:
								break;
						}
						if (null !== fileRef) {
							document.getElementsByTagName("head")[0].appendChild(fileRef);
						} else {}
					} catch (ex) {}
				};
			})(jQuery);
		(function($) {
				$.fn.optionClick = function(fn) {
					/*$('select').optionClick(function(){});*/
					return this.each(function() {
							var $select = $(this);
							var val = $select.val();
							var optionClick = false;
							$(this).children('option').each(function(i, e) {
									$(this).on('click', function() {
											optionClick = true;
											//console.log('option being clicked');
											if (val === $(this).val()) {
												$select.trigger('unchange');
											} else {
												// $select.trigger('change');
											}
											fn(this);
											val = $select.val();
										});
								});
							var clicked = 0,
								changed = 0;
							$select.on('change', function() {
									changed++;
								}).on('click', function(ev) {
									var bowserName = '';
									try {
										bowserName = window.Bowser.name;
									} catch (ex) {
										$.RFAlertEx(ex);
									}
									try {
										if (true === optionClick) {
											/*do nothing*/
										} else {
											if ('safari' === bowserName) {
												/* safari */
												if (0 === changed) {
													$select.trigger('unchange');
													fn(this);
												} else {
													changed = 0;
												}
											} else {
												/* chrome */
												if (0 === changed && 0 > ev.offsetX && 0 > ev.offsetY) {
													$select.trigger('unchange');
													fn(this);
												} else {
													changed = 0;
												}
											}
										}
									} catch (ex) {
										$.RFAlertEx(ex);
									}
								});
						});
				};
				$.fn.RFUncheckButtonSet = function() {
					var $this = $(this);
					$this.find(':radio:checked').siblings('.ui-state-active').removeClass('ui-state-active');
					$this.find(':radio:checked').RFExcute(['prop', 'attr'], ['checked', false]);
				};
			})(jQuery);
		/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
