/**
 * format time string
 */

var formatDateTime = {
	doFormat: function(dateTimeString) {

		if(dateTimeString && dateTimeString !== '' && dateTimeString !== 'null' && dateTimeString !== 'undefined'){
			dateTimeString = dateTimeString.replace(/T/g, ' ').replace(/Z/g, '');
		}

		return dateTimeString;
	}
};

module.exports = formatDateTime;
