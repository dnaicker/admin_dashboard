import { ngrok } from './../env.js'
import { show_modal } from './../modal.js'

const ngrok_url = await ngrok();

const auth_token = localStorage.getItem('auth_token');

// ------------------------------
// on load
$(document).ready(function () {
	let arr = [];

	$("#modal_load").load("../modal.html");
	$("#navigation_load").load("../navigation.html");

	arr.push('<div class="row">');
	arr.push('<div class="col-lg-6">');
	arr.push(generate_building_qr_code("urn:template:CSIR:csir-building-access-card-d54c3e94-867d-48fe-a9e7-32526b838c6f", '[{"building_number": "43"}]', 43));
	arr.push('</div>');
	arr.push('<div class="col-lg-6">');
	arr.push(generate_building_qr_code("urn:template:CSIR:csir-building-access-card-d54c3e94-867d-48fe-a9e7-32526b838c6f", '[{"building_number": "9"}]', 9));
	arr.push('</div>');
	arr.push('</div>');


	$("#show_qr_code").append(arr.join(''));

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

function generate_building_qr_code(template_id, fields_and_values_required, building_number) {
	let arr = []
	arr.push('<div class="card" style="width: 18rem; padding: 20px; margin: 0px" border->');
	arr.push('<i class="fa-regular fa-building" style="text-align: center; font-size: 40px; color: #065F7D; margin-bottom: 20px;"></i>');
	arr.push('<img src="https://chart.googleapis.com/chart?cht=qr&chl=${ngrok_url}/createVerificationQRCodeLookup/${template_id}/${fields_and_values_required}&chs=200x200&chld=L|1" alt="qr code" class="card-img-top"/>');
	arr.push('<div class="card-body">');
	arr.push('<h5 class="card-title" style="text-align: center; margin-bottom: 40px"><i class="fa-solid fa-address-card" style="margin-right: 15px; color: #067372"></i>Building '+building_number+'</h5>');
	arr.push('<p class="card-text" style="text-align: center">Please scan the following QR code to verify you have access to <b>Building <span id="building_number">' + building_number + '</b>.</p>');
	arr.push('</div>');
	arr.push('</div>');

	return arr.join('');
}