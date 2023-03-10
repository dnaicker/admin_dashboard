import { login_email, login_otp } from './pages/login.js';
import { show_modal, simpler_modal, OTPInput } from './modal.js';

const UUIDv4 = function b(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) }

// ------------------------------
// on load
$(document).ready(function () {
	$("#modal_load").load("modal.html");
	$("#svg_elements").load("svg_elements.html");
	start_page();
});

// ------------------------------
async function start_page() {

}

// ------------------------------
function hide_otp() {
	console.log(document.getElementById("show_otp"));
	var show_otp = document.getElementById("show_otp");
	if (show_otp.style.display === "none") {
		show_otp.style.display = "block";
	} else {
		show_otp.style.display = "none";
	}
};

// ------------------------------
// event handler
$("#send_otp").click(function () {
	console.log("send_otp");
	
	login_email();
	
	hide_otp();
});

// on enter key press
$(".login_input").keypress(function (event) {
	console.log('enter key pressed', event.key);
	if (event.key === "Enter") {
		event.preventDefault();
		login_logic();
	}
});

// ------------------------------
// event handler: login click
$("#login_btn").click(function (e) {
	e.preventDefault();
	login_logic();
});


function login_logic() {
	// check if field empty
	if($(".login_input").val() == "") {
		// show error
		simpler_modal('Email Required', 'Please provide an email address to <u>login</u> or <u>register</u> into admin dashboard.');
		return;
	}

	// get input email address
	let email = $(".login_input").val();

	// send login email address to server
	login_email(email);

	// dislpay modal
	$("#login_modal").modal('show');

	OTPInput();
	
	// add event handler to submit button
	// on email button click

	// add event handler for otp submit after otp field display
	$("#otp_login").click(function () {

		// turn of button if double pressed
		$('#otp_login').attr("disabled", true);

		// grab data from otp numeric fields
		const otp_val = $("#first").val() + $("#second").val() + $("#third").val() + $("#fourth").val() + $("#fifth").val() + $("#sixth").val();

		console.log(otp_val);
		
		// send otp details to server
		login_otp(otp_val);
		
		// hide modal after a few seconds
		$("#login_modal").modal('hide');
	});
}