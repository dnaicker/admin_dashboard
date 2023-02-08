import { ngrok } from './../env.js'
import { show_modal } from './../modal.js'

const ngrok_url = await ngrok();

const auth_token = localStorage.getItem('auth_token');

// ------------------------------
// on load
$(document).ready(function () {
	$("#modal_load").load("../modal.html");
	$("#navigation_load").load("../navigation.html");
	
	generate_qr_code("urn:template:CSIR:csir-building-access-card-d54c3e94-867d-48fe-a9e7-32526b838c6f/", '[{"building_number": "43"}]')

	
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
			// sample request values
async function generate_qr_code(template_id, fields_and_values_required) {
	$("#show_qr_code")[0].innerHTML = `<p><img src='https://chart.googleapis.com/chart?cht=qr&chl=/${ngrok_url}/createVerificationQRCodeLookup/wallet_holder_auth_token/${template_id}/${fields_and_values_required}&chs=200x200&chld=L|1' alt='qr code' /><p>`;
}