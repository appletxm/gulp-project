/**
 * add loading mask effect
 */

window.loading = {
	show : function () {
		$('body').append('<div id="J-loading" class="cm-loading"></div>');
	},

	hide: function () {
		$('#J-loading').remove();
	}
};

module.exports = window.loading;
