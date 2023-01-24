import { show_modal } from './modal.js';

const ngrok_url = "http://4358-2001-4200-7000-9-4df7-7e23-9a67-4220.ngrok.io";

var challenge = '';

// ------------------------------
export async function login_email(email) {
	const data = {}

	$.ajax({
		url: `${ngrok_url}/trinsicCreateOrLoginAccount/${email}`,
		type: "GET",
		success: function (result) {
			console.log(result);
			challenge = result;

			alert("Email has been sent.");


			//save challenge
			// show_modal('One Time Pin', 'Please check email inbox for one time password sent.');
		},
		error: function(error) {
			// show_modal('Error', error.responseText);
		}
	});
}

// ------------------------------
export async function login_otp(otp) {
	const data = {}

	// challenge acquired globally from email login response
	data['challenge'] = JSON.stringify(challenge.challenge.data);
	data['otp'] = otp;

	console.log('send otp request',data);

	$.ajax({
		dataType: 'json',
		data: data,
		url: `${ngrok_url}/trinsicRegisterAccountChallengeString`,
		type: "POST",
		success: function (result) {
			console.log(result);
			$('#cover-spin').hide();

			// navigate to admin dashboard
			console.log(window.location.hostname);

			// location.assign(window.location.hostname);
			
			// $.ajax({
			// 	url: '/wallet',

			// })

		},
		error: function(error) {
			$('#cover-spin').hide();
			console.log(error);
		}
	});
}