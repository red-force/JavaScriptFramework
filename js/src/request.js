/*RFRequest*/
(function($) {
		try {
			(function() {
					$.fn.RFRequest = function() {
						var $_RForCSS = $.RFor('css');
						var loaderCls = $_RForCSS.get('Loader'),
							loaderSelector = $_RForCSS.getSelector('Loader');
						var $_RForEvent = $.RFor('event');
						return this.each(function() {
								var $this = $(this),
									$body = $('body'),
									$window = $(window),
									locationOrigin = $.RFGetRequestLocationOrigin($this),
									locationPathName = $.RFGetRequestLocationPathName($this),
									locationSearch = $.RFGetRequestLocationSearch($this),
									methodName = $this.attr('request_method_name'),
									url = $this.attr('request_url') || undefined,
									validationMode = $this.prop('validationMode') || $this.attr('validation_mode'),
									syncRequest = $this.is('[sync_request]') || false,
									requestMode = $this.prop('request_mode') || $this.attr('request_mode') || 'ajax',
									requestTraceBack = $this.prop('requestTraceBack') || $this.attr('request_trace_back') || 'false',
									requestEncodeURI = $this.prop('requestEncodeURI') || $this.attr('request_encode_uri') || 'false',
									requestLoader = $this.attr('request_loader') || loaderSelector,
									requestLoaderStyle = $this.attr('request_loader_style') || 'facebook',
									requestLoaderStyleSync = requestLoaderStyle + 'Sync',
									$requestLoader = $(requestLoader + '.' + requestLoaderStyle),
									requestValidationSelector = $this.prop('requestValidationSelector') || $this.attr('request_validation_selector'),
									requestTriggerByEventName = $this.prop('requestTriggerByEventName') || $this.attr('request_trigger_by_event_name') || 'click',
									elementsTargetSelector = $this.attr('target_selector') || $_RForCSS.getSelector('ResponseBody');
								if (undefined !== methodName && '' !== methodName) {
									methodName = (methodName || ($this.attr('name') || $this.attr('id')).split('_').reverse()[0]);
								} else {
									methodName = '';
								}
								if ('none' !== requestLoader) {
									if (0 === $requestLoader.size()) {
										$requestLoader = $('<img class="' + loaderCls + ' ' + (syncRequest ? requestLoaderStyleSync : requestLoaderStyle) + '" modal="true" style="position: relative; left: ' + $window.width() / 2 + 'px; top: ' + $window.height() / 2 + 'px;" />');
										$('body').append($requestLoader.hide());
									} else {}
								} else {}
								$this.RFOnOffEventOfButton(requestTriggerByEventName, function() {
										var $this = $(this);
										if (true === $this.prop('disabled')) { // avoid user multi click cause multi submit
											return;
										} else {
											$this.prop('disabled', true);
										}
										if ($this.is('[readonly]') || $this.is('[disable]') || $this.is('.disabled') || $this.is('.readonly')) {
											return;
										} else {}
										var data = {};
										var validationSuccess = function() {
											$this.trigger('beforeRequest', {
													data: data
												});
											var size = (requestValidationSelector ? $(requestValidationSelector) : $(dataSelector).filter(validationSelector)).filter('[title]').filter($_RForCSS.getSelector('ui-state-highlight')).size();
											if (0 !== size) {
												return;
											} else {}
											var $deferred = $.Deferred(function() {
													try {
														$requestLoader.RFLoader({
																loaderStyle: (syncRequest ? requestLoaderStyleSync : requestLoaderStyle),
																deferred: this
															}).RFTriggerHandler('show');
														var time = 0;
														if (syncRequest) {
															time = 470;
														} else {}
														window.setTimeout(function() {
																$deferred.resolve();
															}, time);
													} catch (ex) {}
												});
											$.when($deferred.promise()).then(function() {
													$.RFSubmitData(data, {
															"location": {
																origin: locationOrigin,
																pathname: locationPathName + ('' === methodName ? '' : '/' + methodName),
																search: locationSearch
															},
															methodName: methodName,
															url: url,
															sync: syncRequest,
															async: !syncRequest,
															success: function(result) {
																var requestSuccessEvent = ($._data($this.get(0), 'events') || {}).requestSuccess || [
																	function() {}
																];
																if (undefined !== result.location && null !== result.location && (undefined !== result.location.href || undefined !== result.location.search)) {
																	var $elementsTargetSelector = ($(elementsTargetSelector)),
																		targetSelector = ' .ResponseBody>*';
																	if (0 === $elementsTargetSelector.size()) {
																		$elementsTargetSelector = $('body');
																		targetSelector = '';
																		// window.location = (result.location.href || (result.location.search || '?view=1'));
																	} else {}
																	try {
																		window.setTimeout(function() {
																				$requestLoader.RFReplace('class', requestLoaderStyleSync, requestLoaderStyle).RFLoader({
																						loaderStyle: requestLoaderStyle
																					}).RFTriggerHandler('show');
																				$elementsTargetSelector.load((result.location.href || ((result.location.protocal || '') + (result.location.hostname || '') + (result.location.port || '') + (result.location.pathname || '') + (result.location.search || ''))) + targetSelector, {
																						data: JSON.stringify((result.data || {}))
																					}, function(responseText, textStatus, jqXHR) {
																						if ('success' === textStatus) {
																							if ('' !== result.message) {
																								$('').RFShowInfo(JSON.stringify(result.message));
																							} else {}
																							try {
																								window.setTimeout(function() {
																										$('body').trigger('load', {
																												data: result
																											});
																									}, 100);
																								try {
																									requestSuccessEvent.each(function(idx, elm) {
																											elm.handler.call($this, {}, {
																													data: result
																												});
																										});
																								} catch (ex) {
																									// no err message
																								}
																								try {
																									(function($) {
																											try {
																												if ($elementsTargetSelector.is($_RForCSS.getSelector('Dialog'))) {
																													jqui($elementsTargetSelector).dialog('open');
																												}
																											} catch (ex) {}
																										})(jqui);
																								} catch (ex) {}
																								window.setTimeout(function() {
																										$('body').trigger('ready', {
																												data: result
																											});
																									}, 100);
																							} catch (ex) {
																								$.RFAlertEx(ex);
																							}
																						} else {
																							try {
																								$('').RFShowInfo(responseText.split('title>')[1].split('</')[0] + textStatus);
																							} catch (ed) {
																								$('').RFShowInfo(responseText + textStatus);
																							}
																						}
																						$requestLoader.RFTriggerHandler('hide');
																					});
																			}, 120);
																	} catch (ex) {}
																} else {
																	if ('' !== result.message) {
																		$('').RFShowInfo(JSON.stringify(result.message));
																	} else {}
																}
																$this.trigger('requestSuccess', {
																		data: result
																	});
																$this.trigger('afterRequest', {
																		data: result
																	});
															},
															beforeSend: function() {
																try {
																	/*
																	$requestLoader.RFLoader({
																			loaderStyle: requestLoaderStyle
																		}).RFTriggerHandler('show');
																		*/
																} catch (ex) {}
															},
															failure: function(result) {
																if ('' !== result.message) {
																	$('').RFShowInfo(JSON.stringify(result.message));
																} else {}
																$this.trigger('requestFailure', {
																		data: result
																	});
																$this.trigger('afterRequest', {
																		data: result
																	});
															},
															error: function(result) {
																// {readyStatus:4,responseText:'未連接到所引用的網絡服務,或,所引用的網絡服務返回信息異常,請聯繫信息部。 ', status:200, statusText:'OK'}
																try {
																	if ('' !== result.message) {
																		$('').RFShowInfo(JSON.stringify(result.message));
																	} else {}
																	if (200 === result.status) {
																		if (-1 !== result.responseText.indexOf('<!DOCTYPE')) {
																			$(window.document.head).html(result.responseText.replace(/<head>(.*)<\/head>/, '$1'));
																			$(window.document.body).html(result.responseText.replace(/<body>(.*)<\/body>/, '$1'));
																		} else {
																			$('').RFShowInfo(JSON.stringify(result.responseText));
																		}
																	} else {}
																} catch (ex) {}
																try {
																	$this.trigger('requestFailure', {
																			data: result
																		});
																	$this.trigger('afterRequest', {
																			data: result
																		});
																} catch (ex) {}
															},
															complete: function(jqHXR, textStatus) {
																try {
																	if ($requestLoader.hasClass((syncRequest ? requestLoaderStyleSync : requestLoaderStyle))) {
																		$requestLoader.RFTriggerHandler('hide');
																	} else {}
																} catch (ex) {}
															}
														});
												}, function() {}, function() {
													console.log(arguments);
												});
										};
										switch (requestMode) {
											case 'jump':
												validationSuccess = function() {
													try {
														$requestLoader.RFLoader({
																loaderStyle: requestLoaderStyleSync
															}).RFTriggerHandler('show');
														$.RFJumpWindowTo({
																traceBack: (requestTraceBack === 'true'),
																encodeURI: (requestEncodeURI === 'true'),
																location: {
																	href: url,
																	search: locationSearch + (('true' === $this.attr('request_drop_jumping_data')) ? '' : '&rfjumpdata=' + encodeURI(JSON.stringify(data)))
																}
															}, window.location.pathname, locationPathName);
													} catch (ex) {}
												};
												break;
											case 'back':
												validationSuccess = function() {
													try {
														if ('' !== document.referrer || undefined === document.referrer) {
															$requestLoader.RFLoader({
																	loaderStyle: requestLoaderStyleSync
																}).RFTriggerHandler('show');
															window.history.back();
														} else {}
													} catch (ex) {}
												};
												break;
											default:
												break;
										}
										(function() {})();
										data = $.RFGatherPageData(data);
										var validationSelector = $.RFor('css').getSelector('Validation');
										var dataSelector = $.RFor('css').getSelector('DATA');
										var $_Validation = $((requestValidationSelector || (dataSelector + validationSelector)));
										var validationCount = $_Validation.size();
										if (false === $this.triggerHandler($_RForEvent.get('beforeValidate'), [$_Validation, data])) {
											validationCount = 0;
										} else {}
										if (0 === validationCount) {
											validationSuccess();
										} else {
											$_Validation.each(function() {
													try {
														var $_Vali = $(this);
														var beforeValidateResult = {
															result: true
														};
														$_Vali.trigger($_RForEvent.get('beforeValidate'), [$_Vali, beforeValidateResult]);
														if (false !== beforeValidateResult.result) {
															$_Vali.trigger('validate', {
																	mode: validationMode,
																	validationSuccess: function() {
																		if (1 === validationCount--) { // to avoid multi submit
																			validationCount = -1;
																			validationSuccess();
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
										}
										window.setTimeout(function() {
												$this.removeProp('disabled');
											}, 700);
									}, {
										delayAllowTime: 100
									});
							});
					};
				})();
		} catch (ex) {
			$.RFAlertEx(ex);
		}
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
