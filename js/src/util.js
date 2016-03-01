		(function($) {
				var $_RForEvent = $.RFor('event'),
					$_RForAttr = $.RFor('attr'),
					$_RForData = $.RFor('data');
				$.RFIfStrIn = function(str, ary) {
					return (new RegExp('\\b' + str + '\\b')).test(ary);
				};
				$.RFIfStrInStupid = function(name) {
					return $.RFIfStrIn(name, window.stupid);
				};
				$.RFAlertEx = function(ex) {
					try {
						window.release = window.release || true;
						if (!window.release) {
							var tmp = (undefined === console ? '' : (undefined === console.log ? '' : console.log(ex)));
							if ($.RFIfStrInStupid('RFAlertEx')) {
								alert(ex.message);
							} else {}
						} else {}
					} catch (ee) {}
				};
				$.RFLocationParam = function(paramName) {
					try {
						paramName = paramName || 'IE8';
						var paramValue = (new RegExp('[?&]+(' + paramName + ')=([^&]*)')).exec(window.location.search); // ['&IE8=true','IE8','true']
						return (null !== paramValue ? paramValue[2] : null);
					} catch (ex) {
						$.RFAlertEx(ex);
						return null;
					}
				};
				$.RFDecodeURIComponent = function(text) {
					try {
						text = decodeURIComponent(text);
					} catch (ex) {
						text = unescape(text);
					}
					return text;
				};
				$.fn.RFReplace = function(attrName, originClass, newClass) {
					var originReg = new RegExp('\\b' + originClass + '\\b', 'g');
					return $(this).each(function() {
							var $this = $(this);
							$this.attr(attrName, function() {
									return $this.attr(attrName).replace(originReg, newClass);
								});
						});
				};
				$.RFStringify = function(obj) {
					var result = obj;
					try {
						result = JSON.stringify(obj);
						// result = result.replace(/([^\\])\\\"/g, '$1\\\\\\\"').replace(/([^\\])\"/g, '$1\\\"').replace(/(\")\"/g, '$1\\\"');
					} catch (ex) {
						$.RFAlertEx(ex);
					} finally {
						return result;
					}
				};
				$.fn.findNotDescendantOf = function(targetSelector, parentSelector) {
					var $this = $(this);
					return $this.find(targetSelector).not($this.find(parentSelector).find(targetSelector));
					//return $(':not(' + targetSelector + ' ' + parentSelector + ')', $(this));
					//return $this.find(elementSelector).not($this.find(notParentSelector + ' ' + elementSelector));
					// return $(this).find(':not(' + notParentSelector + ' *)').filter(elementSelector);
				};
				$.RFGetCheckRowCheckBox = function($checkbox, checkboxSelector) {
					checkboxSelector = (checkboxSelector || 'input[type=checkbox]');
					if (true !== $checkbox.is(checkboxSelector)) {
						$checkbox = $checkbox.find(checkboxSelector);
					} else {}
					return $checkbox;
				};
				$.fn.RFOnOffEvent = function(eventName, eventFunc, options) {
					options = options || {};
					switch (options.scope) {
						case 'inner':
							eventName = $_RForEvent.getInner(eventName);
							break;
						default:
							break;
					}
					return $(this).each(function(idx, el) {
							var $this = $(this);
							$this.off(eventName, eventFunc).on(eventName, eventFunc);
						});
				};
				$.fn.RFOnOffEventOfButton = function(eventName, eventFunc, options) {
					options = options || {};
					switch (options.scope) {
						case 'inner':
							eventName = $_RForEvent.getInner(eventName);
							break;
						default:
							break;
					}
					return $(this).each(function(index, el) {
							var $this = $(this),
								defaultCursor = $this.css('cursor'),
								defaultOpacity = $this.css('opacity') || 0.9,
								delayAllowTime = options.delayAllowTime || $this.attr('delay_allow_time') || 400;
							// to support image src change
							var srcStr = $_RForAttr.get('src'),
								_srcStr = $_RForAttr.get('data-src'),
								srcStrURL = '',
								$imgs = $this.find($_RForAttr.getSelector(_srcStr)),
								hasImgToT = $imgs.size();
							if (hasImgToT) {
								$imgs.each(function() {
										var $this = $(this);
										$this.data(_srcStr, $this.attr(_srcStr));
										if ($this.attr(srcStr).indexOf('blank.gif') === -1) {
											try {
												// to support ie6pngfix
												// console.log($this.css('background-image'));
												srcStrURL = $this.css('background-image').split('(')[1].split(')')[0];
											} catch (ex) {
												srcStrURL = $this.attr(srcStr);
											}
										} else {
											srcStrURL = $this.attr(srcStr);
										}
										$this.data(srcStr, srcStrURL);
									});
							} else {}
							$this.css({
									//opacity: 0.7
								}).on($_RForEvent.getInner(eventName), function() {
									$this.trigger(eventName);
									// eventFunc.apply(this, arguments);// duplicate
								}).on(eventName, eventFunc).hover(function() {
									if ('progress' !== $this.css('cursor')) {
										defaultCursor = $this.css('cursor');
										//$this.prop('defaultCursor', $this.css('cursor'));
										//$this.prop('defaultOpacity', $this.css('opacity'));
									} else {}
									// PAY ATTENTION.
									// the stop() here may cause off event abort/fail, while being opterating in height frequency.
									void(hasImgToT && $imgs.each(function() {
												var $this = $(this);
												// $this.css('background-image', 'url(\'' + $this.data(_srcStr) + '\')');
												$this.attr(srcStr, $this.data(_srcStr));
												$this.attr(_srcStr, $this.data(srcStr));
											}));
									$this.stop().off(eventName, eventFunc).css({
											opacity: defaultOpacity,
											cursor: 'progress'
										}).animate({
											opacity: 1
										}, {
											duration: delayAllowTime,
											always: function() {
												if ('auto' !== $this.css('cursor', '').css('cursor')) {
													defaultCursor = $this.css('cursor');
												} else {}
												$this.stop().css({
														cursor: defaultCursor
														/*,
														opacity: defaultOpacity*/
													}).off(eventName, eventFunc).on(eventName, eventFunc);
											}
										});
								}, function() {
									if ('auto' !== $this.css('cursor', '').css('cursor')) {
										defaultCursor = $this.css('cursor');
									} else {}
									void(hasImgToT && $imgs.each(function() {
												var $this = $(this);
												// $this.css('background-image', 'url(\'' + $this.data(srcStr) + '\')');
												$this.attr(srcStr, $this.data(srcStr));
												$this.attr(_srcStr, $this.data(_srcStr));
											}));
									$this.stop().css({
											cursor: defaultCursor
											/*,
											opacity: 1*/
										}).animate({
											opacity: defaultOpacity
										}, {
											always: function() {
												if ('auto' !== $this.css('cursor', '').css('cursor')) {
													defaultCursor = $this.css('cursor');
													// defaultOpacity = $this.prop('defaultOpacity') || defaultOpacity;
												} else {}
												$this.css({
														cursor: defaultCursor,
														opacity: defaultOpacity
													});
											}
										});
								}).on('_mousemove', function() {
									if ('auto' !== $this.css('cursor', '').css('cursor')) {
										defaultCursor = $this.css('cursor');
									} else {}
									$this.stop().css({
											cursor: defaultCursor,
											opacity: defaultOpacity
										});
								});
						});
				};
				$.fn.RFTrigger = function(eventName, options) {
					options = options || {
						scope: 'inner'
					};
					switch (options.scope) {
						case 'inner':
							eventName = $_RForEvent.getInner(eventName);
							break;
						default:
							break;
					}
					return $(this).each(function(index, el) {
							var $this = $(this);
							$this.trigger(eventName, options);
						});
				};
				$.fn.RFTriggerHandler = function(eventName, options) {
					options = options || {
						scope: 'inner'
					};
					switch (options.scope) {
						case 'inner':
							eventName = $_RForEvent.getInner(eventName);
							break;
						default:
							break;
					}
					return $(this).each(function(index, el) {
							var $this = $(this);
							$this.triggerHandler(eventName, options);
						});
				};
				$.fn.RFExcute = function(funcName, args) {
					return $(this).each(function(index, el) {
							try {
								var $this = (this instanceof $) ? this : $(this),
									this0 = $this.get(0),
									funcNameAry = [];
								while (undefined !== this0.jquery && 'function' === typeof this0.get) {
									try {
										this0 = this0.get(0);
									} catch (ex) {
										break;
									}
								}
								if (funcName instanceof Array) {
									funcNameAry = funcNameAry.concat(funcName);
								} else if ('string' === typeof funcName) {
									funcNameAry = [funcName];
								} else {
									funcNameAry = [funcName];
								}
								if (args instanceof Array) {} else {
									args = [args];
								}
								var funcNameAryLength = funcNameAry.length;
								funcNameAry = funcNameAry.reverse();
								while (funcNameAryLength-- > 0) {
									try {
										funcName = funcNameAry[funcNameAryLength];
										func = $this[funcName];
										if ('function' === typeof func) {
											func.apply($this, args);
										} else if ('function' === typeof this0[funcName]) {
											func = this0[funcName];
											func.apply(this0, args);
										} else if ('object' === typeof window.print) {
											// fk ie8
											try {
												func = this0[funcName];
												func();
											} catch (ex) {}
										} else {}
									} catch (ex) {}
								}
							} catch (ex) {}
						});
				};
				$.RFExcute = function(that, func, args, defaultResult) {
					var result = defaultResult;
					try {
						if ('string' === typeof func) {
							func = that[func];
						} else {}
						if ('function' === typeof func) {
							result = func.apply(that, args);
							result = (undefined === result ? defaultResult : result);
						} else {}
					} catch (ex) {
						$.RFAlertEx(ex);
					}
					return result;
				};
				$.RFJumpWindowTo = function(options, name, newName) {
					options = options || {};
					options.location = options.location || {};
					var wind = options.window || window;
					var origin = options.location.origin || window.location.origin || (('' === (window.location.protocol || '') ? '' : window.location.protocol + '//') + (window.location.host || '')) || '',
						pathname = options.location.pathname || window.location.pathname,
						search = options.location.search || '',
						href = options.location.href || '';
					search = (0 !== search.length && 0 !== search.indexOf('?')) ? '?' + search : search;
					if (undefined !== name && undefined !== newName) {
						pathname = pathname.replace(name, newName);
					} else {}
					href = href || (origin + pathname + search) || '';
					if (true === options.encodeURI) {
						href = window.encodeURI(href);
					} else {}
					if (true === options.traceBack) {
						wind.location.href = (href);
					} else {
						wind.location.replace(href);
					}
				};
				$.RFAddCookie = function(name, value, expires, path, domain) {
					var str = name + "=" + escape(value);
					if (expires !== "") {
						var date = new Date();
						date.setTime(date.getTime() + expires * 24 * 3600 * 1000); //expires单位为天 
						str += ";expires=" + date.toGMTString();
					}
					if (path !== "") {
						str += ";path=" + path; //指定可访问cookie的目录 
					}
					if (domain !== "") {
						str += ";domain=" + domain; //指定可访问cookie的域 
					}
					document.cookie = str;
				};
				/********************************************
					Read cookie from document.cookie
				*********************************************/
				$.RFGetCookie = function(cookieName) {
					var cookieValue = document.cookie;
					var c_start = cookieValue.indexOf(" " + cookieName + "=");
					if (c_start == -1) {
						c_start = cookieValue.indexOf(cookieName + "=");
					}
					if (c_start == -1) {
						cookieValue = null;
					} else {
						c_start = cookieValue.indexOf("=", c_start) + 1;
						var c_end = cookieValue.indexOf(";", c_start);
						if (c_end == -1) {
							c_end = cookieValue.length;
						}
						cookieValue = unescape(cookieValue.substring(c_start, c_end));
					}
					return cookieValue;
				};
				/********************************************
					Remove cookie in document.cookie
				*********************************************/
				$.RFRemoveCookie = function(cookieName) {
					var cookies = document.cookie.split(";");

					for (var i = 0; i < cookies.length; i++) {
						var cookie = cookies[i];
						var eqPos = cookie.indexOf("=");
						var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
						if (name == cookieName) {
							document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
						}
					}
				};
				$.RFElementInViewport = function(el, topOffset /*used to pre-detect the el*/ ) {
					var result = true;
					try {
						var windowInnerHeight = (window.innerHeight || document.documentElement.clientHeight),
							rect = el.getBoundingClientRect();
						topOffset = ('auto' === topOffset ? windowInnerHeight / 10 : (topOffset || 0));
						result = (((rect.top >= 0 && (rect.top - topOffset) <= windowInnerHeight) || (rect.top < 0 && (topOffset + el.height + rect.top) > 0)) && rect.left >= 0);
					} catch (ex) {}
					return result;
				};
				$.fn.RFElementInViewport = function(topOffset) {
					return this.filter(function(index, el) {
							try {
								return $.RFElementInViewport(this, topOffset);
							} catch (ex) {
								return true;
							}
						});
				};
			})(jQuery);
		/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
