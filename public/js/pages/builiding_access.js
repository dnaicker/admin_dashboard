import { ngrok } from './../env.js'
import { show_modal } from './../modal.js'

const ngrok_url = await ngrok();

const auth_token = localStorage.getItem('auth_token');

// ------------------------------
// on load
$(document).ready(function () {
	$("#modal_load").load("../modal.html");
	$("#navigation_load").load("../navigation.html");
	


	
	// setinterval check verification status
				// get verification status based on id
});


// -------------------------
// generate qr code
	// add api to get template id /createVerificationQRCodeLookup
			// send template id
			// generate lookup id on api
			// return template id and lookup id
			// store verification lookup on db
						// date time
						// template id
						// status - pending
						// lookUp - uuid
						// fieldsAndValuesRequired for lookup
async function generate_qr_code() {
	$.ajax({
		url: `${ngrok_url}/trinsicCreateOrLoginAccount/${email}`,
		type: "GET",
		success: function (result) {
			console.log(result);
			challenge = result;
			$("#cover-spin").hide();
			alert("Email has been sent.");
		},
		error: function (error) {
			$("#cover-spin").hide();
			console.log(error);
		}
	});
}