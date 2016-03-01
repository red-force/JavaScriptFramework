	(function($) {
			var $_RForCSS = $.RFor('css'),
				loaderCls = $_RForCSS.get('Loader');
			var $_RForEvent = $.RFor('event');
			var $_RForAttr = $.RFor('attr'),
				loaderStyleAttr = $_RForAttr.get('loader_style'),
				modalAttr = $_RForAttr.get('modal');
			$.fn.RFLoader = function(options) {
				options = options || {};
				try {
					$(this).each(function(idx, el) {
							var $this = $(this);
							var loaderStyle = options.loaderStyle || $this.prop(loaderStyleAttr) || $this.attr('loader_style') || 'facebook',
								modal = (((options.modal || $this.prop(modalAttr) || $this.attr(modalAttr) || false) + '') === 'true'),
								$deferred = options.deferred || {};
							try {
								if (!$this.is('img')) {
									$.RFAlertEx({
											message: 'the loader is supposed to be an img.'
										});
									return;
								} else {}
							} catch (ex) {
								$.RFAlertEx(ex);
							}
							try {
								$this.RFTriggerHandler('rebase');
								if (!$this.hasClass(loaderStyle)) {
									$this.addClass(loaderStyle);
								} else {}
								var rebase = function() {
									try {
										$this.removeClass(loaderStyle);
										$this.css('background-image', '');
										$this.removeAttr('src');
									} catch (ex) {}
								}, eventShow = function() {
										var $window = $(window);
										try {
											// $('body').append($this);
											if (/url\(|URL\(/.test($this.css('background-image') || '')) {
												if ($this.is('img:not([src])')) {
													$this.prop('src', $this.css('background-image').split(')')[0].split('(').reverse()[0].replace(/['"]/g, '')).css('background-image', 'url()');
												} else {
													// for downloading freezing gif bug
													var src = $this.prop('src');
													$this.prop('src', '');
													$this.prop('src', src);
													$this.prop('src', $this.prop('src').split(')')[0].split('(').reverse()[0].replace(/['"]/g, '')).css('background-image', 'url()');
												}
											} else {}
										} catch (ex) {}
										try {
											(function($) {
													/*
												$($this).css({
														'position': 'fixed'
													}).show().position({
														my: 'center center',
														at: 'center center',
														of: $window
													}).hide();
													*/
												})(jqui || $);
										} catch (ex) {}
										try {
											(function($, jQuery) {
													if ('function' === typeof jQuery.fn.RFDialog) {
														$this.stop().RFDialog({
																modal: modal,
																style: 'air',
																width: $this.width(),
																create: function(ev, ui) {
																	try {
																		window.setTimeout(function() {
																				jQuery.RFExcute($deferred, 'resolve');
																			}, 100);
																	} catch (ex) {}
																}
															});
													} else if ('function' === typeof $.fn.dialog) {
														$($this).stop().dialog({
																draggable: false,
																resizable: false
															}).css({
																'min-height': '',
																'max-height': '',
																'padding': '0em'
															}).parent().css({
																'width': '0em',
																'max-width': '0em',
																'height': '0em',
																'max-height': '0em',
																'background-color': 'transparent',
																'border': 'none'
															}).children('.ui-dialog-titlebar').hide();
													} else {
														$this.stop().show();
													}
												})((jqui || $), ($ || jQuery));
										} catch (ex) {}
									},
									eventHide = function() {
										try {
											(function($) {
													window.setTimeout(function() {
															if ('function' === typeof jQuery.fn.RFDialog) {
																$this.RFDialog('close');
															} else if ('function' === typeof $.fn.dialog) {
																$($this).dialog('close');
															} else {
																$this.fadeOut(700);
															}
														}, 300);
													// $this.detach();
												})(jqui || $);
										} catch (ex) {}
									};
								$this.RFOnOffEvent($_RForEvent.getInner('rebase'), rebase).RFOnOffEvent($_RForEvent.getInner('show'), eventShow).RFOnOffEvent($_RForEvent.getInner('hide'), eventHide).RFOnOffEvent('dbclick', function() {
										$this.RFTriggerHandler('hide');
									}).hover(function() {
										$this.css({
												'transform': 'rotate(360deg)'
											});
									}, function() {
										$this.css({
												'transform': ''
											});
									});
							} catch (ex) {
								$.RFAlertEx(ex);
							}
						});
				} catch (ex) {
					$.RFAlertEx(ex);
				}
				return this;
			};
		})(jQuery);
	/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
