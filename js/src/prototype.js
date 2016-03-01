		(function($) {
				/*js prototype*/
				if (!String.prototype.trim) {
					(function() { // Make sure we trim BOM and NBSP
							var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
							String.prototype.trim = function() {
								return this.replace(rtrim, '');
							};
						})();
				}
				if (!String.prototype.byteLength) {
					(function() {
							String.prototype.byteLength = function(len) {
								if (isNaN(len)) {
									return (function(txt) {
											var txtLength = txt.length;
											var bLength = 0;
											while (txtLength) {
												var charTxt = txt.charCodeAt(--txtLength);
												if (charTxt > 255 || charTxt < 0) bLength++;
											}
											return (bLength + txt.length);
										})(this);
								} else {
									return (function(txt, len) {
											var txtLength = txt.length;
											if (txtLength > len) return false;
											if (txtLength * 2 <= len) return true;
											//else len >= txtLength > len/2
											var zhMaxNum = len - txtLength;
											while (zhMaxNum && txtLength) {
												var charTxt = txt.charCodeAt(--txtLength);
												if (charTxt > 255 || charTxt < 0) zhMaxNum--;
											}
											//alert(zhMaxNum + ';' + txtLength);
											if (zhMaxNum > 0) return true;
											if (zhMaxNum === 0 && txtLength === 0) return true;
											else return false;
										})(this, len);
								}
							};
						})();
				}
				if (!Number.prototype.dec2hex) {
					(function() {
							Number.prototype.dec2hex = function dec2hex(len) {
								var hex = "";
								var dec = this;
								while (dec) {
									var last = dec & 15;
									hex = String.fromCharCode(((last > 9) ? 55 : 48) + last) + hex;
									dec >>= 4;
								}
								if (len) {
									while (hex.length < len) hex = '0' + hex;
								}
								return hex;
							};
						})();
				}
				// 根据 ISO 8601 改良后的代码
				// e.g: Date.format("PYYYY-MM-DD Thh:mm:ss");
				if (!Date.prototype.format) {
					Date.prototype.format = function(formatStr) {
						var x = this;
						var y = formatStr;
						var pt = 'P';
						var z = {
							P: {
								m: x.getMonth() + 1,
								M: x.getMonth() + 1,
								d: x.getDate(),
								D: x.getDate()
							},
							T: {
								h: x.getHours(),
								H: x.getHours(),
								m: x.getMinutes(),
								M: x.getMinutes(),
								s: x.getSeconds(),
								S: x.getSeconds()
							}
						};
						y = y.replace(/(P+|T+|M+|D+|h+|m+|s+)/g, function(v) {
								var result = '';
								switch (v) {
									case 'P':
										pt = 'P';
										break;
									case 'T':
										pt = 'T';
										break;
									default:
										// result = ((v.length > 1 ? "0" : "") + eval('z.' + pt + '.' + v.slice(-1))).slice(-2); 
										result = ((v.length > 1 ? "0" : "") + z[pt][v.slice(-1)]).slice(-2);
										break;
								}
								return result;
							});
						return y.replace(/(Y+)/g, function(v) {
								return x.getFullYear().toString().slice(-v.length);
							});
					};
				}
				//history back
				try {
					if (!window.History.prototype) {
						window.History = window.History || {
							prototype: {
								back: window.history.back
							}
						};
					}
				} catch (ex) {}
			})(jQuery);
		/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
