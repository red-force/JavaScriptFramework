/*
 * @description: lazyload.
 */
(function($) {
		var $_RForCSS = $.RFor('css'),
			lazyLoadSelector = $_RForCSS.getSelector('LazyLoad'),
			dataSrcName = $_RForCSS.get('data-src'),
			tmp = '';
		/*Lazy Load*/
		(function() {
				/* lazyload.js (c) Lorenzo Giuliani
				 * MIT License (http://www.opensource.org/licenses/mit-license.html)
				 *
				 * expects a list of:  
				 * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
				 */
				$.fn.RFLazyLoad = function(fn) {
					var $lazyLoad = $(this);
					(function($) {
							var loadLazy = function() {
								$lazyLoad.filter('[' + dataSrcName + ']').RFElementInViewport('auto').each(function() {
										var $this = $(this);
										try {
											var $img = $this.clone(),
												src = $.RFExcute($this, 'prop', [dataSrcName]) || $.RFExcute($this, 'attr', [dataSrcName]);
											$img.on('load', function() {
													try {
														window.setTimeout(function() {
																$img.removeAttr(dataSrcName);
																$this.replaceWith($img);
															}, 0);
														/*
																	if (0 !== $this.parent().size()) {
																		$img.removeAttr(dataSrcName);
																		$this.replaceWith($img);
																	} else {
																		$this.prop({
																				src: src
																			});
																	}
																*/
													} catch (ex) {}
												}).prop({
													src: src
												});
										} catch (ex) {}
									});
							};
							loadLazy();
							var $handler = $(window);
							try {
								$handler = $lazyLoad.parents(':scrollable');
								if (0 < $handler.size()) {} else {
									$handler = $(window);
								}
							} catch (ex) {
								$handler = $(window);
							}
							$handler.RFOnOffEvent('scroll', loadLazy);
						})(jQuery);
					return this.each(function(index, element) {});
				};
			})();
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
