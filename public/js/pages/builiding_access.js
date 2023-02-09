import { ngrok } from './../env.js'
import { show_modal } from './../modal.js'

const ngrok_url = await ngrok();

const auth_token = localStorage.getItem('auth_token');

// ------------------------------
// on load
$(document).ready(function () {
	$("#modal_load").load("../modal.html");
	$("#navigation_load").load("../navigation.html");
	
	generate_building_qr_code("urn:template:CSIR:csir-building-access-card-d54c3e94-867d-48fe-a9e7-32526b838c6f", '[{"building_number": "43"}]', 43)
	generate_building_qr_code("urn:template:CSIR:csir-building-access-card-d54c3e94-867d-48fe-a9e7-32526b838c6f", '[{"building_number": "9"}]', 9)

	// setinterval check verification status
				// get verification status based on id
});


// -------------------------
// generate qr code
	// add api to get template id /createVerificationQRCodeLookup
			// display placeholder for auth_token
			// request template id
			// generate lookup id on api call
			// store verification lookup on db
						// date time
						// template id
						// status - pending
						// lookUp - uuid
						// fieldsAndValuesRequired for lookup
			// return template id and lookup id

async function generate_building_qr_code(template_id, fields_and_values_required, building_number) {
	let arr = []

	arr.push('<h4>Building <span id="building_number">'+ building_number +'</span></h4>')
	arr.push(`<p><img src='https://chart.googleapis.com/chart?cht=qr&chl=/${ngrok_url}/createVerificationQRCodeLookup/${template_id}/${fields_and_values_required}&chs=200x200&chld=L|1' alt='qr code' /><p>`)
	arr.push('<p class="access_details">Please scan the following QR code to verify you have access to building <span id="building_number">'+ building_number +'</span>.</p>')

	$("#show_qr_code").append(arr.join(''));


}