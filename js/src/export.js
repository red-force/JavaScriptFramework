	(function($) {
			$.fn.RFExport = function() {
				try {
					var $_RForCSS = $.RFor('css'),
						loaderSelector = $_RForCSS.getSelector('Loader'),
						loaderCls = $_RForCSS.get('Loader');
					$(this).each(function(idx, el) {
							var $this = $(this);
							$this.RFOnOffEventOfButton('click', function() {
									try {
										var dataSelector = $_RForCSS.getSelector('DATA');
										var data = '',
											$_DATA = $(dataSelector);
										$_DATA.each(function() {
												try {
													var $_Data = $(this);
													data = $.RFGetData($_Data, data);
												} catch (ex) {
													$.RFAlertEx(ex);
												}
											});
										var $iframe = $($_RForCSS.getSelector('ExportFrame'));
										if (0 >= $iframe.size()) {
											$iframe = $('<iframe class="' + $_RForCSS.get('ExportFrame') + '" target="_blank" style="display:none;"/>');
										} else {}
										var tmp = '',
											$window = $(window),
											locationOrigin = $.RFGetRequestLocationOrigin($this),
											locationPathName = $.RFGetRequestLocationPathName($this),
											locationSearch = $.RFGetRequestLocationSearch($this),
											methodID = $this.attr('request_method_id') || 'Export',
											methodName = $this.attr('request_method_name') || 'Excel',
											methodParamKey = $this.attr('request_method_param_key') || 'ExportParam',
											requestLoader = $this.attr('request_loader') || loaderSelector,
											requestLoaderStyle = $this.attr('request_loader_style') || 'facebook',
											$requestLoader = $(requestLoader);
										tmp = (function() {
												var checkDownloadFileCompletely = function() {
													var downloaded = $.RFGetCookie('Downloaded');
													if (downloaded === "True") {
														$requestLoader.RFTriggerHandler('hide');
														$.RFRemoveCookie('Downloaded');
														clearInterval(intervalProgress);
														$iframe.remove();
													} else {}
												};
												var iframeLoad = function() {
													// top.console.log('iframe load');
													$requestLoader.RFTriggerHandler('hide');
												};
												if ('none' !== requestLoader) {
													if (0 === $requestLoader.size()) {
														$requestLoader = $('<img class="' + loaderCls + ' ' + requestLoaderStyle + '" style="width: auto; height: auto; position: relative; left: ' + $window.width() / 2 + 'px; top: ' + $window.height() / 2 + 'px;" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="/>');
													} else {}
												} else {}
												try {
													$requestLoader.RFLoader({
															loaderStyle: requestLoaderStyle
														}).RFTriggerHandler('show');
													// $requestLoader.detach().remove();
												} catch (ex) {}
												try {
													$iframe.off('load', iframeLoad).on('load', iframeLoad).on('load', function() {
															// console.log('iframe load 2');
														}).attr('src', locationOrigin + locationPathName + '?' + methodID + '=' + methodName + '&' + methodParamKey + '=' + JSON.stringify(data));
													$('body').append($iframe);
													intervalProgress = window.setInterval(checkDownloadFileCompletely, 1000);
													// $('body').append($requestLoader);
												} catch (ex) {}
											})();
										tmp = (function() {
												try {
													window.open(locationOrigin + locationPathName + '?' + methodID + '=' + methodName + '&' + methodParamKey + '=' + JSON.stringify(data));
												} catch (ex) {}
											});
										tmp = (function() {
												try {
													var _data = {};
													_data[methodID] = methodName;
													_data[methodParamKey] = escape(JSON.stringify(data));
													$.UnifiedExportFile({
															action: locationOrigin + locationPathName,
															data: _data,
															downloadType: 'Progress',
															ajaxLoadingSelector: loaderSelector
														});
												} catch (ex) {}
											});
									} catch (ex) {
										$.RFAlertEx(ex);
									}
								});
						});
				} catch (ex) {
					$.RFAlertEx(ex);
				}
				return this;
			};
		})(jQuery);
	/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
