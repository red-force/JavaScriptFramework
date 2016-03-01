/*
 * @description: file uploader.
 */
/*
<form method="post" enctype="multipart/form-data" action="http://hotblocks.nl/_http_server.php">
    <label for="picture">Upload picture</label>:
    <input type="file" id="picture">
    <span id="filename"></span>
</form>
$('#picture').change(function(e) {
    var filepath = this.value;
    var m = filepath.match(/([^\/\\]+)$/);
    var filename = m[1];
    $('#filename').text(filename);
    setTimeout((function(form) {
        return function() {
            form.submit();
        }
    })(this.form), 1000);
});
#picture {
    /opacity: 0;
    filter: alpha(opacity=0);/
    position: absolute;
    left: -9999px;
}
 */

(function($) {
		var $_RForCSS = $.RFor('css'),
			dataName = $_RForCSS.get('DATA'),
			dataSelector = $_RForCSS.getSelector('DATA'),
			dataTableSelector = $_RForCSS.getSelector('DataTable'),
			$_RForData = $.RFor('data'),
			$_RForRegStr = $.RFor('regstr'),
			ellipsisTitle = $_RForRegStr.get('EllipsisTitle'),
			tmp = '';
		/* FileUploader */
		(function() {
				$.fn.RFFileUploader = function(fn) {
					return this.each(function(index, element) {
							var $fileUploader = $(this);
							(function() {
									var idStr = $fileUploader.attr('rf_id') || $fileUploader.attr('id') || (Math.random().toString().substring(2, 30));
									var idKeyStr = 'RFFileUploader';
									var inputFileIDStr = idKeyStr + idStr + '_input_file';
									var action_url = $fileUploader.attr('rf_action_url');
									var $form = $('<form method="post" enctype="multipart/form-data" action="' + action_url + '"></form>');
									var $label = $('<label for="' + inputFileIDStr + '"></label>:');
									var $input_file = $('<input type="file" id="' + inputFileIDStr + '">');
									var $file_name = $('<span id="' + idKeyStr + 'filename"></span>');
									$fileUploader.after($form);
									$form.append($label).append($input_file).append($file_name);
									$label.append($fileUploader);
									$input_file.RFOnOffEvent('change', function(e) {
											var filepath = this.value;
											var m = filepath.match(/([^\/\\]+)$/);
											var filename = m[1];
											$file_name.text(filename);
											var timeoutNameStr = inputFileIDStr + 'Timeout';
											window.clearTimeout(window[timeoutNameStr]);
											window[timeoutNameStr] = setTimeout((function(form) {
														return function() {
															form.submit();
														};
													})($form), 100);
										}, {
											scope: 'outer'
										});
								})();
						});
				};
			})();
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
