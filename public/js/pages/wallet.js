import { ngrok } from './../env.js'
import { show_modal, show_copy_modal } from './../modal.js'

const ngrok_url = await ngrok();

const auth_token = localStorage.getItem('auth_token');

let select_template_id = null;

// ------------------------------
// on load
$(document).ready(function () {
	$("#modal_load").load("../modal.html");
	$("#navigation_load").load("../navigation.html");

	// loader spinner
	$('#cover-spin').show();

	// create dropdown of template ids
	get_credentials_for_wallet();
});

var clipboard = new ClipboardJS('.copy-btn');

clipboard.on('success', function (e) {
	// document.execCommand("copy");
	navigator.clipboard.writeText(e.text);

	// e.clearSelection();
});

clipboard.on('error', function (e) {
	console.error('Action:', e.action);
	console.error('Trigger:', e.trigger);
});

// ------------------------------
async function get_credentials_for_wallet() {
	let data = {};

	data['auth_token'] = auth_token;

	data['query'] = "SELECT c.id, c.type, c.data FROM c";

	$.ajax({
		dataType: 'json',
		data: data,
		url: `${ngrok_url}/searchWallet`,
		type: "POST",
		success: function (result) {
			console.log(result);
			let new_arr = [];
			const arr = parse_items(result.items);
			let temp = [];

			// loop through item array
			$.each(arr, function (idx, val) {

				//================================================
				// creating selection fields based on credential data
				// extract data object in item array
				if(typeof val.data !== 'string') {
					$.each(val.data, function (idx, data) {
						if(idx == 'credentialSubject') {
							let obj = {};
							$.each(data, function (idx, subject) {
								// add values to temp list
								if(idx != 'id') {
									obj[idx] = subject;
								}
							});
							temp.push(obj);

							// update obj array table to contain fields 					
							val['fields'] = obj;
						}

						if(idx == 'type') {
							let type_obj = {};

							$.each(data, function (idx, subject) {
								if(idx === 1) {
									type_obj[idx] = subject;
									val['credential_template_name'] = subject;
								}
							});
						}
					});
				}
			});

			//================================================
			// load table 
			load_table(arr);

			// hide spinner
			$('#cover-spin').hide();
		},
		error: function (result) {
			show_modal('Error', 'Server could not complete request.');
		}
	});
}


// ------------------------------
function parse_items(data) {
	let arr = [];

	for (let item in data) {
		let obj = JSON.parse(data[item]);
		arr.push(obj);
	}

	return arr;
}

// ------------------------------
function load_table(data) {
	$('#list_credentials').bootstrapTable('destroy').bootstrapTable({
		data: data,
		search: "true",
		detailView: "true",
		showToggle: "true",
		showFullScreen: "true",
		pagination: "true",
		showPaginationSwitch: "true",
		detailFormatter: function (index, row) {
			let data = row.data;
			let list = [];

			if (typeof row.data === 'string') {
				data = JSON.parse(row.data);
			}
			
			list = expand_row_detail_html(data, []);
			
			list.unshift('<div style="inline-size: calc(50% - 500px); overflow-wrap: break-word;">');
			list.push('</div>');

			return list.join('');
		},

		columns: [
			[
				{
					field: 'id',
					title: 'Credential ID',
					formatter: function (value, row) {
						return "<a href='javascript:void(0)' class='view_credential'>" + value + "</a>";
					},
					events: window.operateEvents,
				},
				{
					field: 'credential_template_name',
					title: 'Credential Template Name',
					events: window.operateEvents,
				},
				{
					field: '',
					align: 'center',
					title: 'Actions',
					formatter: function (value, row) {
						let arr = [];
						arr.push('<a class="revokation_credential_status" title="check revocation status" href="javascript:void(0)" title="revokation_credential_status">');
						arr.push('<i class="fa-solid fa-circle-check"></i>');
						arr.push('</a>');
						return arr.join('');
					},
					events: window.operateEvents,
				}
			],
		]
	})
}


// ------------------------------
async function get_credential_schema_data(index, row) {
		let arr = []

		let result = await $.get(data.credentialSchema[0].id, function (data, status) {
			return expand_row_detail_html(data, arr);
		});

}

// ------------------------------
// display credential data
function expand_row_detail_html(data, arr) {

	// to display the credential proof dynamically
	$.each(data, function (key, value) {
		if (typeof value === 'object') {
			if(Array.isArray(value) && typeof value[0] == 'object') {
				// display the credential fields normally
				arr.push('<p><b>' + format_field_names(key) + ':</b></p>');

				// for credential schema traversal 
				$.each(value[0], function (idx, val) {
					if (typeof idx === 'number') {
						arr.push('<li>' + val + '</li>')
					} else {
						arr.push('<li><u>' + idx + '</u>: ' + val + '</li>')
					}
				});				
			} else { 
				//for objects in general that aren't credentials
				arr.push('<p><b>' + format_field_names(key) + ':</b></p>');
				$.each(value, function (idx, val) {
					if (typeof idx === 'number') {
						arr.push('<li>' + val + '</li>')
					} else {
						// show field name and
						arr.push('<li><u>' + idx + '</u>: ' + val + '</li>')
					}
				});
			}

			arr.push('<br/>')

		} else {		 
			arr.push('<p><b>' + format_field_names(key) + ':</b> ' + value + '</p>')
		}
	})
	return arr;
}

// ------------------------------
window.operateEvents = {
	'click .generate_proof': function (e, value, row, index) {
		let data = {};
		data['auth_token'] = auth_token;
		data['credential_id'] = row.id;

		$.ajax({
			dataType: 'json',
			data: data,
			url: `${ngrok_url}/createCredentialProof`,
			type: "POST",
			success: function (result) {
				console.log('success', result);
				let arr = [];
				const json = JSON.parse(result["proofDocumentJson"]);
				const data = expand_row_detail_html(json, arr);

				show_copy_modal('Credential Proof', result, data.join(""), function (data) {
					alert("Copied to clipboard");
					navigator.clipboard.writeText(data);
					// copyToClipboard(data);
				});
			},
			error: function (result) {
				console.log('error', result);
				show_modal('Error', 'Server could not complete request.');
			}
		});
	},
	'click .view_credential': function (e, value, row, index) {
		let arr = [];
		show_copy_modal('Copy Credential JSON-LD', row.data, expand_row_detail_html(row.data, arr).join(""), function (data) {
			alert("Credential copied to clipboard");
			navigator.clipboard.writeText(data);
			// copyToClipboard(data);
		});
	},
	'click .revokation_credential_status': function (e, value, row, index) {
		let data = {};
		data['auth_token'] = auth_token;
		data['credential_status_id'] = row.data.credentialStatus.id

		$.ajax({
			dataType: 'json',
			data: data,
			url: `${ngrok_url}/checkRevocationStatus`,
			type: "POST",
			success: function (result) {
				console.log('success', result);
				let arr = [];
				show_modal('Credential Revocation Status', 'Revoked: ' + result.revoked + ' ' + (!result.revoked ? ' <i class="fa-solid fa-circle-check" style="color: #C3DA8C"></i>' : '<i class="fa-solid fa-circle-exclamation" style="color: #F2A71B"></i>'));
			},
			error: function (result) {
				console.log('error', result);
				show_modal('Error', 'Server could not complete request.');
			}
		});
	}
}

// ------------------------------
// validate if input fields have values
function validate_form() {
	const credential_template_form = document.getElementById('show_fields')
	credential_template_form.classList.add('was-validated');

	if (credential_template_form.checkValidity() === false) {
		show_modal('Error', 'Please complete all input fields.');
		return false;
	}

	return true;
}


// ------------------------------
function format_field_names (params) {
	let arr = [];
	var i=1;
	var character='';
	arr.push(params[0].toUpperCase());
	while (i <= params.length){
			character = params.charAt(i);

			if (character == character.toUpperCase()) {
					arr.push(' ');
			}

			arr.push(character);
			i++;
	}

	return arr.join("");
}

// ------------------------------
$("#logout").click(function	(e) {
	e.preventDefault();

	//clear local storage
	window.localStorage.clear();

	// navigate to home page
	window.location.assign("/html/index.html");

});