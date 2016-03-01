			(function() {
					$.fn.RFDialog = function(options) {
						options = options || {};
						if ((/\bRFDialog\b/).test(window.stupid)) {
							try {
								var text = $(this).text();
								if ('air' === options.style || '' === text) {
									return this;
								} else {}
								$(this).hide();
								if (true === window.confirm(text)) {
									options.buttons[1].click();
								} else {
									options.buttons[0].click();
								}
							} catch (ex) {}
							return this;
						} else {}
						try {
							if ('air' === options.style) {
								options.draggable = false;
								options.resizable = false;
							} else {}
						} catch (ex) {
							$.RFAlertEx(ex);
						}
						try {
							$(this).each(function() {
									var $this = $(this);
									try {
										(function($) {
												var $dialog = $($this).dialog(options);
												if ('air' === options.style) {
													$dialog.css({
															'min-height': '',
															'max-height': ''
														}).parent().css({
															'width': '0em',
															'max-width': '0em',
															'height': '0em',
															'max-height': '0em',
															'background-color': 'transparent',
															'background-image': 'url()',
															'overflow': 'visible',
															'border': 'none'
														}).children('.ui-dialog-titlebar').hide();
													$this.css({
															'padding': '0em',
															'position': 'fixed',
															'background-repeat': 'no-repeat'
														});
												} else {}
											})(jqui);
									} catch (ex) {}
								});
						} catch (ex) {
							$.RFAlertEx(ex);
						}
						return this;
					};
				})(jQuery);
			/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
