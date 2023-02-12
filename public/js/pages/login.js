import { show_modal } from './../modal.js';
import { ngrok } from './../env.js'

const ngrok_url = await ngrok();

console.log(ngrok_url);

var challenge = '';

// ------------------------------
export async function login_email(email) {
	const data = {}
	
	// $("#cover-spin").show();
	
	$.ajax({
		url: `${ngrok_url}/trinsicCreateOrLoginAccount/${email}`,
		type: "GET",
		success: function (result) {
			console.log(result);
			challenge = result;
			// $("#cover-spin").hide();
			// alert("Email has been sent.");
		},
		error: function (error) {
			$("#cover-spin").hide();
			console.log(error);
		}
	});
}

// ------------------------------
export async function login_otp(otp) {
	$("#cover-spin").show();
	const data = {}

	// challenge acquired globally from email login response
	data['challenge'] = JSON.stringify(challenge.challenge.data);
	data['otp'] = otp;

	console.log('send otp request', data);

	$.ajax({
		dataType: 'json',
		data: data,
		url: `${ngrok_url}/trinsicRegisterAccountChallengeString`,
		type: "POST",
		success: function (result) {
			console.log(result);
			$('#cover-spin').hide();

		},
		error: function (error) {
			$('#cover-spin').hide();
			console.log(error);

			// store auth_token in local storage
			window.localStorage.setItem('auth_token', error.responseText);

			window.location.assign("/html/pages/wallet.html");
		}
	});
}