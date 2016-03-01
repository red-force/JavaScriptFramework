		(function() {
				$.fn.RFDropDownList = function() {
					try {
						var $this = $(this),
							$label = $this;
						var RFDropDownList = function() {
							var dropDownList = $this.siblings('.DropDownList') || $this.parents('td:first').find(".DropDownList"),
								txt = dropDownList.children("[selected]").text();
							if (0 === dropDownList.size()) {
								return;
							} else {}
							$this.text(txt).show();
							$this.on("mouseenter", function() {
									if (undefined !== $.fn.skinner.setTimeout) {
										window.clearTimeout($.fn.skinner.setTimeout);
									}
									$.fn.skinner.setTimeout = window.setTimeout(function() {
											//dropDownList = $(dropDownList.get(0));
											if ("readonly" !== dropDownList.attr("readonly") && "disabled" !== dropDownList.attr("disabled")) {
												dropDownList.show();
												// get width of dropDownList
												dropDownList.parent().parent().hide();
												var width = dropDownList.css('width');
												dropDownList.parent().parent().show();
												var container = $label.parents('td:first');
												var cloneLablelID = '_cloneLabel',
													$labelClone = container.children('[id$=' + cloneLablelID + ']');
												//console.log({labelClone1:$labelClone});
												//console.log({$labelText:$label.text()});
												$label.hide();
												if (0 === $labelClone.size()) {
													//console.log($label.text());
													$labelClone = $label.clone(true);
													if (0 !== $('[id=' + $label.attr('id') + cloneLablelID + ']').size()) {
														$('[id=' + $label.attr('id') + cloneLablelID + ']').remove();
													} else {}
													$labelClone.attr('id', $label.attr('id') + cloneLablelID);
												} else if ($labelClone.size() > 1) {
													// container.remove($labelClone);
													$labelClone.remove();
													//console.log({size2:$label});
													$labelClone = $label.clone(true);
													$labelClone.attr('id', $label.attr('id') + cloneLablelID);
												} else {
													// size 1
													if (true === $labelClone.hasClass('Old')) {
														$labelClone.text($label.text());
														$labelClone.removeClass('Old');
													} else {}
												}
												//console.log({labelClone2:$labelClone});
												container.append($labelClone);
												container.on('mouseleave', function() {
														container.append(dropDownList);
														var selectedOptionText = dropDownList.children('option:selected').text();
														if (selectedOptionText !== $label.text()) {
															$label.text(dropDownList.children('option:selected').text());
															window.setTimeout(function() {
																	$label.trigger('change');
																}, 1);
														} else {}
														$label.show();
														//$labelClone.show();
														$(this).children('.select-skinned').remove();
													});
												// console.log(JSON.stringify(dropDownList));
												dropDownList.css("font-family", $this.css("font-family"));
												dropDownList.skinner({
														'type': dropDownList.css("float"),
														'maxitem': '20',
														'width': width,
														'minWidth': (dropDownList.css('min-width') || "40px"),
														'itemMinWidth': (dropDownList.css('min-width') || "40px"),
														'mode': (dropDownList.hasClass('PureText') ? 'pureText' : 'select'),
														'valueNullable': (dropDownList.hasClass('valueNullable') ? true : false),
														'placeHolder': '请选择'
													});
												/*
											var select = dropDownList.parent();
											var  cloneLablelID = '_cloneLabel',
											$labelClone = select.siblings('[id$='+cloneLablelID+']');
											if(0 === $labelClone.size()){
													$labelClone = $label.clone(true);
													$labelClone.attr('id', $label.attr('id') + cloneLablelID );
												}
											select.on('mouseleave',function(){
													select.parent().append(dropDownList);
													$labelClone.text(dropDownList.children('option:selected').text());
													$labelClone.show();
													select.parent().append($labelClone);
													$(this).remove();
												});
										*/
												// $label.hide();
												// $labelClone.hide();
											}
										}, 1);
								});
						};
						RFDropDownList();
					} catch (ex) {
						$.RFAlertEx(ex);
					}
					return this;
				};
			})(jQuery);
		/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
