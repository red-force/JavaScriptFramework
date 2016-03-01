(function($) {
		var RFor = {
			'DataKey': 'rfdata',
			'css': {
				getSelector: function(value) {
					var rs = '';
					try {
						if ('function' === typeof value.join) {
							var valueLength = value.length,
								tmpAry = [];
							while (valueLength-- > 0) {
								tmpAry.push(RFor.css.get(value[valueLength]));
							}
							value = tmpAry.join(',.');
						} else {
							value = RFor.css.get(value);
						}
						rs = '.' + value;
					} catch (ex) {}
					return rs;
				},
				get: function(value) {
					var rs = '';
					try {
						rs = RFor.css[value] || value;
					} catch (ex) {}
					return rs;
				},
				'ASC': 'ASC',
				'CheckRow': 'CheckRow',
				'CheckReverse': 'CheckReverse',
				'CheckReverseIcon': 'CheckReverseIcon',
				'CheckAll': 'CheckAll',
				'CheckAllIcon': 'CheckAllIcon',
				'DatePicker': 'DatePicker',
				'DatePickerRange': 'DatePickerRange',
				'DATA': 'DATA',
				'DataTable': 'DataTable',
				'DataRow': 'DataRow',
				'DataCell': 'DataCell',
				'DESC': 'DESC',
				'DropDownList': 'DropDownList',
				'DropDownListLabel': 'DropDownListLabel',
				'Ellipsis': 'Ellipsis',
				'Export': 'Export',
				'IdentityCell': 'IdentityCell',
				'Loader': 'Loader',
				'pageFirst': 'pageFirst',
				'pagePrev': 'pagePrev',
				'pageNext': 'pageNext',
				'pageLast': 'pageLast',
				'Printer': 'Printer',
				'MonthPicker': 'MonthPicker',
				'RadioContainer': 'RadioContainer',
				'Request': 'Request',
				'ResponseBody': 'ResponseBody',
				'ScrollPrev': 'ScrollPrev',
				'ScrollNext': 'ScrollNext',
				'SC': 'SC',
				'SelectMenu': 'SelectMenu',
				'Sortable': 'Sortable',
				'SortableIcon': 'SortableIcon',
				'Validation': 'Validation',
				'YScrollableContainer': 'YScrollableContainer',
				'ZZ': ''
			},
			'attr': {
				getSelector: function(value) {
					var rs = '';
					try {
						rs = '[' + RFor.attr.get(value) + ']';
					} catch (ex) {}
					return rs;
				},
				get: function(value) {
					var rs = '';
					try {
						rs = RFor.attr[value] || value;
					} catch (ex) {}
					return rs;
				},
				'target_selector': 'target_selector',
				'data_key': 'data_key' // data key
			},
			'regstr': {
				get: function(value) {
					var rs = '';
					try {
						rs = RFor.regstr[value];
					} catch (ex) {}
					return rs;
				},
				EllipsisTitle: '{ellipsis}'
			},
			'data': {
				getSelector: function(value) {
					var rs = '';
					try {
						rs = RFor.data[value];
					} catch (ex) {}
					return rs;
				},
				get: function(value) {
					var rs = '';
					try {
						rs = RFor.data[value];
					} catch (ex) {}
					return rs;
				},
				'DataKey': 'rfdata',
				'InfoKey': 'rfinfo',
				'_src': 'data-src'
			},
			'event': {
				get: function(value) {
					var rs = '';
					try {
						rs = RFor.event[value] || value;
					} catch (ex) {}
					return rs;
				},
				getInner: function(value) {
					var rs = '';
					try {
						rs = 'rf' + RFor.event.get(value);
					} catch (ex) {}
					return rs;
				}
			},
			'text': {
				get: function(value) {
					var rs = '';
					try {
						rs = RFor.text[value];
					} catch (ex) {}
					return rs;
				},
				'check reverse': '反选',
				'check all': '全选',
				'reorder': '排序'
			}
		};
		$.RFor = function(className, classValue) {
			var result = '';
			try {
				$.extend(true, RFor[className], classValue);
				result = RFor[className] || '';
			} catch (ex) {}
			return result;
		};
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
