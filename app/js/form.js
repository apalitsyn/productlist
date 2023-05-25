(function() {
	'use strict';

	var validation = function(){
		let fields = document.getElementsByClassName('js-validation'),
			errorCounter = 0,
			errorsList = "",
			errorsContainer = document.getElementById('formErrors');


		if(fields.length > 0){
			for(let i = 0; fields.length > i; i++) {
				let thisValue = fields[i].value,
					thisPattern = new RegExp(fields[i].dataset.pattern),
					thisError = fields[i].dataset.error;

				if(thisValue == "" || !thisPattern.test(thisValue)) {
					errorCounter++;
					errorsList += '<li>'+thisError+'</li>';
				}
			}
		}

		if(errorCounter > 0) {
			errorsContainer.innerHTML = '<ul>'+errorsList+'</ul>';
			return false;
		} else {
			return true;
		}
	}

	document.getElementById('myform').onsubmit = function() {
	    return validation();
	};
})();
